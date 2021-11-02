import axios, { AxiosResponse } from "axios";
import FormData from 'form-data';
import { QueryResponse } from 'src/types/interfaces';

class DigQueryService {
    readonly lookup: Function
    constructor(lookup: Function) {
        this.lookup = lookup;
    }
}

function lookup(domain: string, qType: string) {
    const form = new FormData();
    form.append('domain', domain);
    form.append('dnsType', qType);
    const params = new URLSearchParams({ domain: domain, dnsType: qType });
    const config = {
        timeout: 6000,
    };
    return axios.post("/dig-exec", params.toString(), config)
        .then((response: AxiosResponse) => {
            // todo: make sure the response is valid for successful case
            // succeed
            const resp: QueryResponse = {
                result: response,
                reject: null,
                error: null,
            }
            return resp;
        }, (reason: any) => {
            // reject
            const reject: QueryResponse = {
                result: null,
                reject: reason,
                error: null,
            }
            return reject
        })
        .catch((err) => {
            const failed: QueryResponse = {
                result: null,
                reject: null,
                error: err,
            }
            if (axios.isCancel(err)) {
                failed.error = new Error("API request got canceled.")
            }
            
            return failed
        })
}
const queryService = new DigQueryService(lookup);
export default queryService 