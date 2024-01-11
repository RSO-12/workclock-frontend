<template>
    <div class="login-container">
        <div class="login-content d-flex flex-column align-center">
            <div>
                <img
                    class="svg-image"
                    style="position: absolute; left: 0; bottom: 0; overflow: hidden"
                    :src="require('@/assets/svgs/undraw_welcoming_re_x0qo.svg')"
                    alt="photo"
                />
            </div>
                <v-card
                class="login-card pa-5 rounded-lg">
                <h2 class="mb-4" style="font-family: 'Inter', sans-serif;">WORKCLOCK</h2>
                <v-card-text
                    class="pa-0">
                    <div class="pl-1 text-subtitle-2 text-medium-emphasis text-left">
                        EMAIL
                    </div>
                    <v-text-field
                        class="input-field"
                        placeholder="john@google.com"
                        v-model="email"
                        variant="solo"
                        rounded="lg"
                        bg-color="rgba(255, 255, 255, 0.02)"
                    ></v-text-field>
                    <div class="pl-1 text-subtitle-2 text-medium-emphasis text-left">
                        PASSWORD
                    </div>
                    <v-text-field
                        variant="solo"
                        bg-color="rgba(255, 255, 255, 0.02)"
                        rounded="lg"
                        placeholder="123456"
                        v-model="password"
                        type="password"
                    ></v-text-field>
                </v-card-text>
                <v-card-actions class="pa-0 d-flex justify-end">
                    <v-btn
                    class="font-weight-bold rounded-lg"
                    color="primary"
                    size="1"
                    style="width: 130px; height: 44px"
                    variant="flat"
                    @click="logIn()">
                        Login
                    </v-btn>
                </v-card-actions>
            </v-card>
            </div>
        </div>
</template>

<script>
import { useAccountStore } from "@/store/account.store.js";
import UserService from "@/services/user.service.js";
import { mapStores } from "pinia";
import { useSocketStore } from "@/store/socket.store";

export default {
    data() {
    return {
      email: "",
      password: "",
      errors: "",
    };
  },
  computed: {
    ...mapStores(useAccountStore, useSocketStore)
  },
  name: 'LoginView',
  methods: {
    logIn() {
      UserService.logIn(this.email, this.password)
        .then(({ is_admin }) => {
          this.accountStore.isAdmin = is_admin;
          useSocketStore().connect(this.email);
          this.$router.push({ name: "home" });
        })
        .catch(() => {
          this.errors = 'Invalid credentials';
        });
    }
  },
}

</script>

<style>

.login-container {
  position: relative;
  background-color: #F2F2F2;
  height: 100vh !important;
  width: 100vw !important;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-content {
  width: min(calc(100vw - 16px), 500px);
}

.login-container .v-field__input {
  border-radius: 10px !important;
  width: 100%;
}

.login-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login-content .v-text-field {
  width: 100%;
}

.login-card > .v-card-text {
  width: 100%;
}

.login-card > .v-card-actions {
  width: 100%;
  justify-content: flex-end;
}

</style>