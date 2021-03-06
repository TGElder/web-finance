import { expect } from 'chai';
import 'mocha';
import { Reading } from './../model/Reading'
import { ReadingTable } from './ReadingTable'
import { formatDate } from '../utils/DateFormatter';

it('should be able to create a row from a reading', (done) => {
    let reading: Reading = Reading.base().fromObject({
        "id": 123,
        "account": { "id": 1, "name": "Personal" },
        "amount": 4567,
        "epochSecond": 1000
    });

    let readingTable: ReadingTable = new ReadingTable(null, {});

    let row: object = readingTable.createRowFromObject(reading);

    expect(row).to.deep.equals({
        "id": 123,
        "cells": {
            "account": "Personal",
            "amount": 45.67,
            "when": formatDate(new Date(1000000))
        }
    });
    
    done();
});