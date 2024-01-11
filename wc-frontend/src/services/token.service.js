import StorageService from "./storage.service";

const TokenService = {
    accessToken: null,
    accessTokenKeyName: `${process.env.VUE_APP_NAME}_access_token`,
    getAccessToken() {
        this.accessToken = StorageService.get(this.accessTokenKeyName);
        return this.accessToken;
    },
    setToken(accessToken) {
        StorageService.save(this.accessTokenKeyName, accessToken);
        this.getAccessToken();
    },
    clear() {
        StorageService.remove(this.accessTokenKeyName);
        this.getAccessToken();
    },
    getHeader() {
        if (this.accessToken) {
            return { 'Authorization': `Bearer ${this.getAccessToken()}`, 'Content-Type': 'application/json' };
        }
        return { 'Content-Type': 'application/json' };
    },
    readFromStorage() {
        this.getAccessToken();
    },
}

export default TokenService;