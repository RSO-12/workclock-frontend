import axios from "axios";
import TokenService from "./token.service";
import { useAccountStore } from "@/store/account.store";

const RequestService = {
    init(baseUrl){
        axios.defaults.baseURL = baseUrl;
    },
    get(path, params, headers){
        return this.request('GET', path, null, params, headers, null);
    },
    post(path, data, params, headers){
        return this.request('POST', path, data, params, headers, null);
    },
    put(path, data, params, headers){
        return this.request('PUT', path, data, params, headers, null);
    },
    patch(path, data, params, headers){
        return this.request('PATCH', path, data, params, headers, null);
    },
    delete(path, params, headers){
        return this.request('DELETE', path, null, params, headers, null);
    },
    async request(method, url, data, params, headers, responseType){ 
        return axios({
            method: method,
            url: url,
            data: data,
            params: params,
            headers: headers || TokenService.getHeader(),
            responseType: responseType,
        }).then(response => {
            if(response.data.results != undefined){
                return this.handleList(response);
            }
            return response.data;
        }).catch(error => {
            console.log(error);
            useAccountStore().logOut();
        })
    },
    handleList(response){
        const res = response.data.results;
        res._metadata = {
            count: response.data.count,
            next: response.data.next,
            previous: response.data.previous,
        };
        return res;
    },
}

export default RequestService;