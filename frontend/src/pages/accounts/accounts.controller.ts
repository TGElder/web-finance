import { DAO } from './../../dao/DAO'
import { Account } from './../../model/Account'
import { AccountsView } from "./accounts.view";
import * as rm from "typed-rest-client/RestClient"
declare const hx: any;

let view: AccountsView = new AccountsView();
let client: rm.RestClient = new rm.RestClient('frontend', "");
view.init(new DAO(client, "/accounts", Account.base()));
