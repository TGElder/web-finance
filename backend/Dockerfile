FROM zenika/alpine-maven:3-jdk8

ENV WEB_FINANCE_DATABASE /database/database

COPY src src
COPY pom.xml .

RUN mvn package

CMD java -jar target/*.jar
