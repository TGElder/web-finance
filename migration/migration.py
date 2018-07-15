from textbase import Textbase
import requests
import json
from datetime import datetime 

base = "http://localhost:8080"
db_path = "/mnt/storage/Documents/finance/database"

tb = Textbase(db_path)

tb.cursor.execute("""
SELECT account FROM
(
    SELECT _from account FROM transfers

    UNION ALL

    SELECT _to account FROM transfers

    UNION ALL

    SELECT _from account FROM commitments

    UNION ALL

    SELECT _to account FROM commitments

    UNION ALL

    SELECT _account account FROM readings
)
GROUP BY 1
ORDER BY COUNT(*) DESC
""")

accounts = {}

for row in tb.cursor.fetchall():
    r = requests.post('{}/accounts'.format(base), json = {'name': row[0]})
    r2 = requests.get(r.headers["Location"])
    accounts[row[0]] = r2.json()["id"]

tb.cursor.execute("""
SELECT * FROM transfers
""")

for row in tb.cursor.fetchall():
    epoch_second = datetime.strptime(row[5], "%d-%m-%y").strftime("%s")
    post = {"from": {"id": accounts[row[1]]}, "to": {"id": accounts[row[2]]}, "what": row[3], "amount": row[4], "epochSecond": epoch_second}
    requests.post('{}/transfers'.format(base), json = post)

tb.cursor.execute("""
SELECT * FROM close_dates
""")

closures = {}

for row in tb.cursor.fetchall():
    closures[row[0]] = datetime.strptime(row[1], "%d-%m-%y").strftime("%s")

tb.cursor.execute("""
SELECT * FROM commitments
""")

for row in tb.cursor.fetchall():
    epoch_second = datetime.strptime(row[5], "%d-%m-%y").strftime("%s")
    post = {"from": {"id": accounts[row[1]]}, "to": {"id": accounts[row[2]]}, "what": row[3], "amount": row[4], "epochSecond": epoch_second}
    r = requests.post('{}/commitments'.format(base), json = post)
    id = r.headers["Location"].split("/")[-1]
    if row[0] in closures:
        post = {"commitment": {"id": id}, "epochSecond": closures[row[0]]}
        requests.post('{}/commitments/close'.format(base), json = post)

tb.cursor.execute("""
SELECT * FROM readings
""")

for row in tb.cursor.fetchall():
    epoch_second = datetime.strptime(row[3], "%d-%m-%y").strftime("%s")
    post = {"account": {"id": accounts[row[1]]}, "amount": row[2], "epochSecond": epoch_second}
    requests.post('{}/readings'.format(base), json = post)