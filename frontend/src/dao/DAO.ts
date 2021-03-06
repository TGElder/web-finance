import * as rm from "typed-rest-client/RestClient"
import { Entity } from "../model/Entity"
import * as Cookies from "js-cookie";
import { IHeaders } from "typed-rest-client/Interfaces";

export class DAO<T extends Entity<T>> {

    private service: string;
    private client: rm.RestClient;
    private base: T;

    constructor(client: rm.RestClient, service: string, base: T) {
        this.service = window.location.origin + service;
        this.client = client;
        this.base = base;
    }

    async getAll(parameters: object): Promise<T[]> {
        try {
            let url: string = this.service + this.parametersToString(parameters);
            let restRes: rm.IRestResponse<object[]> = await this.client.get<object[]>(url);

        
            let out: T[] = [];
            for (let entity of restRes.result) {
                out.push(this.base.fromObject(entity))
            }
            return out;
        }
        catch(err) {
            console.log(err);
            throw new Error("Failed to get all from backend");
        }
    }

    async get(id: number): Promise<T> {
        try {
            let url: string = this.service + "/" + id;
            let restRes: rm.IRestResponse<object[]> = await this.client.get<object[]>(url);
            return this.base.fromObject(restRes.result);
        }
        catch(err) {
            console.log(err);
            throw new Error("Failed to get from backend");
        }
    }

    private parametersToString(parameters: object): string {
        return '?' + Object.keys(parameters).map(function(key) {
            return key + '=' + parameters[key];
        }).join('&');
    }

    async post(t: T): Promise<void> {
        let headers: IHeaders = {"X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN")};
        try {
            let data: object = t.toPostObject();
            await this.client.create<object>(
                this.service, 
                data,
                {additionalHeaders: headers});
            return;
        }
        catch(err) {
            console.log(err);
            throw new Error("Failed to post to backend");
        }
    }

}

