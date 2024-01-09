<template>
    <div class="text-center">
        <v-btn color="primary">
            Add user
            <v-dialog class="add-user-modal-dialog" v-model="addUserDialog" activator="parent">
                <v-card class="add-user-modal-card pa-5">
                    <v-card-text class="pa-0 ma-0 text-center">
                        <h2>Add user</h2>
                        <img src="../assets/people.png" alt="People" height="100px" width="100px">
                    </v-card-text>
                    <div class="pl-1 text-subtitle-2 text-medium-emphasis text-left">
                        NAME
                    </div>
                    <v-text-field v-model="name" placeholder="John Doe" variant="solo" rounded="lg" bg-color="rgba(255, 255, 255, 0.02)"
                        :rules="nameRules()" clearable :counter="20" maxlength="20"
                        :error-messages="errors.name"></v-text-field>
                    <div class="pl-1 text-subtitle-2 text-medium-emphasis text-left">
                        EMAIL
                    </div>
                    <v-text-field v-model="email" type="email" placeholder="john@google.com" variant="solo" rounded="lg"
                        bg-color="rgba(255, 255, 255, 0.02)" :rules="emailRules()"
                        :error-messages="errors.email"></v-text-field>
                    <div class="pl-1 text-subtitle-2 text-medium-emphasis text-left">
                        PASSWORD
                    </div>
                    <v-text-field v-model="password" placeholder="not_123456" type="password" variant="solo" rounded="lg"
                        bg-color="rgba(255, 255, 255, 0.02)" :rules="passwordRules()"
                        :error-messages="errors.password"></v-text-field>
                    <div class="pl-1 text-subtitle-2 text-medium-emphasis text-left">
                        CONFIRM PASSWORD
                    </div>
                    <v-text-field v-model="cPassword" placeholder="not_123456" type="password" variant="solo" rounded="lg"
                        bg-color="rgba(255, 255, 255, 0.02)" :rules="confirmPasswordRules()"
                        :error-messages="errors.password"></v-text-field>
                    <v-checkbox value="1" label="Is admin" type="checkbox"></v-checkbox>
                    <v-card-actions class="d-flex justify-end">
                        <v-btn color="primary" variant="flat" @click="clearData()">Cancel</v-btn>
                        <v-btn color="primary" variant="flat" @click="addUser()">Add user</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-btn>
    </div>
</template>

<script>

export default {
    name: 'AdminControlPanelComponent',
    data: () => ({
        name: "",
        email: "",
        password: "",
        cPassword: "",
        errors: [],
        addUserDialog: false,
    }),
    methods: {
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
                    if (this.password && value !== this.password) {
                        return "Password doesn't match!";
                    }
                    return true;
                },
            ];
        },
        emailRules() {
            return [
                (value) => {
                    if (!value) {
                        return "Email cannot be empty.";
                    }
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        return "Invalid email format.";
                    }
                    return true;
                },
            ];
        },
        addUser() {
            if (this.isFormValid) {
                this.clearData();
                alert("User added!");
            }
        },
        clearData() {
            this.addUserDialog = false;
            this.name = "";
            this.email = "";
            this.password = "";
            this.cPassword = "";
        },
    },
    computed: {
        isFormValid() {
            return (
                this.name &&
                this.email &&
                this.password &&
                this.cPassword &&
                this.password === this.cPassword
            );
        },
    },
}
</script>

<style>
.add-user-modal-dialog {
    width: 35%;
    margin: auto;
}

.add-user-modal-card {}
</style>