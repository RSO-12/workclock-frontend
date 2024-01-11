import TokenService from "./token.service";
import RequestService from "./request.service";
import axios from "axios";

const UserService = {
    async logIn(gmail, password) {
        const request = {
            method: 'POST',
            url: 'services/v1/auth/login',
            headers: { 'Content-Type': 'application/json' },
            data: { 'gmail': gmail, 'password': password },
        }
        const response = await axios(request);
        TokenService.setToken(response.data.token);
        return response.data;
    },
    async register(name, gmail, password) {
        const request = {
            method: 'POST',
            url: 'services/v1/auth/register',
            headers: { 'Content-Type': 'application/json' },
            data: { 'name': name, 'gmail': gmail, 'password': password },
        }
        const response = await axios(request);
        return response.data;
    },
    async getUser(){
        return await RequestService.get('services/v1/auth/profile');
    },
}

export default UserService;