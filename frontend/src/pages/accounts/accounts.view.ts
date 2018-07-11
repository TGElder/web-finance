import { DAO } from "./../../dao/DAO";
import { Account } from "./../../model/Account";
import { AccountForm } from "../../components/AccountForm";
import { AccountTable } from "../../components/AccountTable";
import { Logout } from "../../components/Logout";
declare const hx: any;

export class AccountsView{

    private accountTable: AccountTable;

    init(accountDAO: DAO<Account>) {
        this.accountTable = new AccountTable(accountDAO);
        let accountForm: AccountForm = new AccountForm(accountDAO, this.refresh.bind(this));
        this.accountTable.init();
        accountForm.init();
        new Logout();
        new hx.Collapsible('#account_collapsible')
    }

    public async refresh(): Promise<void> {
        this.accountTable.refresh();
    }
    
}

