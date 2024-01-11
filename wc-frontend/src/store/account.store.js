import router from '@/router';
import UserService from '@/services/user.service'
import TokenService from '@/services/token.service';
import { useSocketStore } from '@/store/socket.store';
import { defineStore } from 'pinia'

export const useAccountStore = defineStore('account', {
  state: () => {
    return {
      isAdmin: false,
      user: null,
    }
  },
  getters: {
  },
  actions: {
    logOut() {
      this.isAdmin = false;
      this.user = null;
      useSocketStore().close()
      TokenService.clear();
      router.push({ name: "login" });
    },
    async updateUser(data) {
      const response = await UserService.updateUserProfile(data);
      this.user = response;
    },
    async getUser() {
      const response = await UserService.getUser();
      this.user = response;
      this.isAdmin = response.is_admin;
    }
  },
})
