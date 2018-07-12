import * as http from "typed-rest-client/HttpClient"
import * as Cookies from "js-cookie";
import { IHeaders } from "typed-rest-client/Interfaces";
declare const hx: any;

export class Logout {

    private client: http.HttpClient;

    constructor() {
        this.client = new http.HttpClient('frontend');
        hx.select("#logout_button").add(hx
            .button({context: 'contrast'})
            .text('Logout'))
            .on('click', () => this.post());
    }

    private async post(): Promise<void> {
        let headers: IHeaders = {"X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN")};
        try {
            await this.client.post(window.location.origin + "/logout", "", headers);
            location.reload();
            return;
        }
        catch(err) {
            console.log(err);
            throw new Error("Failed to logout");
        }
    }

}

