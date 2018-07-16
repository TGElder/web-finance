import {Table} from "./Table"
import {DAO} from "../dao/DAO";
import {Reading} from "./../model/Reading";
import { formatDate } from '../utils/DateFormatter';
declare const hx: any;

export class ReadingTable extends Table<Reading> {

    constructor(readingDAO: DAO<Reading>, parameters: object) {
        super("#reading_table", readingDAO, parameters);
    }

    getOptions(): object {
        return {
            pageSize: 1,
            filterEnabled: false,
            sort: {column: "when", direction: "desc"}
        };
    }

    getHeaders(): object[] {
        return [
            {name: 'Account', id: 'account'},
            {name: 'Amount', id: 'amount'},
            {name: 'When', id: 'when'}
        ];
    }

    createRowFromObject(reading: Reading): object {
        return {
            id: reading.getId(), cells: {
                account: reading.getAccount().getName(),
                amount: reading.getAmount() / 100,
                when: formatDate(reading.getWhen())
        }};
    }

}

