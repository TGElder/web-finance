import { DAO } from './../../dao/DAO'
import { Account } from './../../model/Account'
import { AccountsView } from "./accounts.view";
declare const hx: any;

let view: AccountsView = new AccountsView();
view.init(new DAO("/accounts", Account.base()));
