import { DAO } from "./../../dao/DAO";
import { Account } from "./../../model/Account";
import { Reading } from "./../../model/Reading";
import { Transfer } from "./../../model/Transfer";
import { AccountView } from "./account.view";
import { Commitment } from "../../model/Commitment";
import { CommitmentClosure } from "../../model/CommitmentClosure";
declare const hx: any;

let view: AccountView = new AccountView();
view.init(
    new DAO("/accounts", Account.base()),
    new DAO("/readings", Reading.base()),
    new DAO("/transfers", Transfer.base()),
    new DAO("/commitments", Commitment.base()),
    new DAO("/commitments/close", CommitmentClosure.base())
);