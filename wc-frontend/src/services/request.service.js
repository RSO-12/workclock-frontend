import axios from "axios";
import TokenService from "./token.service";
import { useAccountStore } from "@/store/account.store";

const RequestService = {
    init(baseUrl) {
        axios.defaults.baseURL = baseUrl;
    },
    get(path, params, headers, responseType) {
        return this.request('GET', path, null, params, headers, responseType);
    },
    post(path, data, params, headers) {
        console.log(data)
        return this.request('POST', path, data, params, headers, null);
    },
    put(path, data, params, headers) {
        return this.request('PUT', path, data, params, headers, null);
    },
    patch(path, data, params, headers) {
        return this.request('PATCH', path, data, params, headers, null);
    },
    delete(path, data, params, headers) {
        return this.request('DELETE', path, data, params, headers, null);
    },
    async request(method, url, data, params, headers, responseType) {
        return axios({
            method: method,
            url: url,
            data: data,
            params: params,
            headers: headers || TokenService.getHeader(),
            responseType: responseType,
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error);
            useAccountStore().logOut();
        })
    }
}

export default RequestService;