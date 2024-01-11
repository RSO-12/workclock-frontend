<template>
  <div class="profile-layout">
    <v-dialog v-model="profileSettinsDialog" @click:outside="clearPassFields" width="500px">
      <v-card class="rounded-lg pa-0">
        <v-card-text>
          <v-container class="pa-2">
            <v-row>
              <v-col>
                <v-sheet class="text-center">
                  <h3>Account settings</h3>
                </v-sheet>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="pa-0 pt-2">
                <v-sheet height="100%">
                  <div class="text-subtitle-2 text-medium-emphasis text-left">
                    NAME
                  </div>
                  <v-text-field v-model="name" type="text" variant="solo" :rules="nameRules()"
                    :error-messages="errors.name"></v-text-field>
                </v-sheet>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="pa-0">
                <v-sheet height="100%">
                  <div
                    class="pl-1 text-subtitle-2 text-medium-emphasis text-left"
                  >
                    NEW PASSWORD
                  </div>
                  <v-text-field
                    v-model="newPass"
                    type="password"
                    variant="solo"
                    :rules="passwordRules()"
                    :error-messages="errors.password"
                  ></v-text-field>
                </v-sheet>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="pa-0">
                <v-sheet height="100%">
                  <div
                    class="pl-1 text-subtitle-2 text-medium-emphasis text-left"
                  >
                    CONFIRM PASSWORD
                  </div>
                  <v-text-field
                    v-model="confirmPass"
                    type="password"
                    variant="solo"
                    :rules="confirmPasswordRules()"
                  ></v-text-field>
                </v-sheet>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="text-left pa-0 pb-3">
                <v-btn
                  class="mr-2"
                  color="primary"
                  @click="(profileSettinsDialog = false), logout()"
                >
                  Logout
                </v-btn>
              </v-col>
              <v-col class="text-right pa-0 pb-3">
                <v-btn
                  class="mr-2"
                  color="primary"
                  @click="(profileSettinsDialog = false), clearPassFields()"
                >
                  Cancel
                </v-btn>
                <v-btn color="primary" @click="(profileSettinsDialog = false), changePassword()"> Save </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import { useAccountStore } from '@/store/account.store';

export default {

  data: () => ({
    profileSettinsDialog: false,
    name: "Brina",
    currentUser: null,
    newPass: null,  
    confirmPass: null,
    errors: [],
  }),
  methods: {
    openChangePass() {
      this.$refs.changePasswordComponent.passDialog = !this.$refs.changePasswordComponent.passDialog;
    },
    nameRules() {
      return [
        (value) => {
          if (!value) {
            return "Name cannot be empty.";
          }
          if (value.length > 0) {
            return true;
          }
          return "Name cannot be empty.";
        },
      ];
    },
    updateUser(){
      return;
    },
    logout(){
      useAccountStore().logOut();
    },
    clearPassFields() {
      this.newPass = "";
      this.confirmPass = "";
    },
    changePassword(){
      return;
    },
    passwordRules() {
      return [
        (value) => {
          if (!value || value.length < 8) {
            return "Password needs to be at least 8 characters.";
          }
          return true;
        },
      ];
    },
    confirmPasswordRules() {
      return [
        (value) => {
          if (!value) {
            return "Confirm password cannot be empty.";
          }
          if (this.confirmPass && value !== this.newPass) {
            return "Passwords don't match!";
          }
          return true;
        },
      ];
    },
    resetChanges() {
      this.userData = JSON.parse(JSON.stringify(this.originalUserData));
    },
    saveChanges() {
      this.originalUserData = JSON.parse(JSON.stringify(this.userData));
    },
    hasErrors() {
      return this.passwordRules().every(
        (rule) => rule(this.confirmPass) === true
      );
    },
  },
}

</script>

<style>
.profile-layout {
  height: 100vh;
  background-color: #eeeff2;
}
</style>