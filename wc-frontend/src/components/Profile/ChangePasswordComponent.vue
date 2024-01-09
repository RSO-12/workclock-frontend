<template>
    <v-dialog v-model="passDialog" width="500px">
      <v-card class="rounded-lg pa-0" >
        <v-card-text>
          <v-container class="pa-2">
            <v-row>
              <v-col>
                <v-sheet class="text-center" >
                  <h3>Update your password</h3>
                </v-sheet>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="pa-0 pt-2">
                <v-sheet height="100%">
                  <div class="text-subtitle-2 text-medium-emphasis text-left">
                    CURRENT PASSWORD
                  </div>
                  <v-text-field
                    v-model="currentPass"
                    type="password"
                    variant="solo"
                    :rules="currentPasswordRule()"
                    :error-messages="errors.old_password"
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
              <v-col class="text-right pa-0 pb-3">
                <v-btn
                  class="mr-2"
                  color="primary"
                  @click="(passDialog = false), clearPassFields()"
                >
                  Cancel
                </v-btn>
                <v-btn color="primary" :loading="changingPassLoader" @click="changePassword()"> Save </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>

<script>

export default {
  name: "ChangePasswordComponent",
  data: () => ({
    currentUser: null,
    passDialog: false,
    changingPassLoader: false,
    currentPass: null,
    newPass: null,
    confirmPass: null,
    errors:[],
  }),
  components: {},
  methods: {
    clearPassFields() {
      this.currentPass = "";
      this.newPass = "";
      this.confirmPass = "";
    },
    currentPasswordRule() {},
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
};
</script>