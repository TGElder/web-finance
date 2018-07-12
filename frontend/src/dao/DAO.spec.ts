import { expect } from 'chai';
import 'mocha';
import { Account } from '../model/Account'
import { DAO } from './DAO';
import * as rm from "typed-rest-client/RestClient"

it('should get the list of accounts', (done) => {

    let dao: DAO<Account> = new DAO(new rm.RestClient('test', ""), "/accounts", Account.base());

    dao.getAll({}).then( (accounts) => {
        expect(accounts).to.deep.equal([
            {
                "id": 1,
                "name": "Savings"
            },
            {
                "id": 2,
                "name": "Personal"
            }
        ]);
    }).then(done).catch(err => done(err));
});

it('should get an account', (done) => {

    let dao: DAO<Account> = new DAO(new rm.RestClient('test', ""), "/accounts", Account.base());

    dao.get(1).then( (account) => {
        expect(account).to.deep.equal(
            {
                "id": 1,
                "name": "Savings"
            });
    }).then(done).catch(err => done(err));
});