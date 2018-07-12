import { DAO } from "./../../dao/DAO";
import { Account } from "./../../model/Account";
import { Reading } from "./../../model/Reading";
import { Transfer } from "./../../model/Transfer";
import { AccountView } from "./account.view";
import { Commitment } from "../../model/Commitment";
import { CommitmentClosure } from "../../model/CommitmentClosure";
import * as rm from "typed-rest-client/RestClient"
declare const hx: any;

let view: AccountView = new AccountView();
let client: rm.RestClient = new rm.RestClient('frontend', "");
view.init(
    new DAO(client, "/accounts", Account.base()),
    new DAO(client, "/readings", Reading.base()),
    new DAO(client, "/transfers", Transfer.base()),
    new DAO(client, "/commitments", Commitment.base()),
    new DAO(client, "/commitments/close", CommitmentClosure.base())
);