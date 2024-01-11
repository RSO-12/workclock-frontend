<template>
  <div class="users-layout">
    <div class="users-content">
      <v-container class="pa-0 ma-0 mb-5" style="width: 100%">
        <v-row class="justify-space-between">
          <v-col class="text-left d-flex flex-row align-center">
            <h3>Users</h3>
            <v-icon class="ml-2" color="green" @click="openAddUserDialog()"
              >mdi-account-plus</v-icon
            >
          </v-col>
          <v-col class="text-right justify-end align-center">
            <v-text-field
              class="flex-full-width"
              density="comfortable"
              placeholder="Search"
              prepend-inner-icon="mdi-magnify"
              rounded
              theme="light"
              variant="solo"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <table class="users-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td>{{ user.name }}</td>
            <td>{{ user.gmail }}</td>
            <td>
              <v-icon
                class="action-btn mr-2"
                color="blue"
                @click="openEditUserDialog"
                >mdi-pencil</v-icon
              >
              <v-icon
                class="action-btn"
                color="red"
                @click="deleteUser(user.id)"
                >mdi-delete</v-icon
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <v-dialog class="add-user-modal-dialog" v-model="editUserDialog">
    <v-card class="add-user-modal-card pa-5">
      <v-card-text class="pa-0 ma-0 text-center">
        <h3>Edit user</h3>
      </v-card-text>
      <div class="pl-1 text-subtitle-2 text-medium-emphasis text-left">
        NAME
      </div>
      <v-text-field
        v-model="name"
        placeholder="John Doe"
        variant="solo"
        rounded="lg"
        bg-color="rgba(255, 255, 255, 0.02)"
        :rules="nameRules()"
        clearable
        :counter="20"
        maxlength="20"
        :error-messages="errors.name"
      ></v-text-field>
      <div class="pl-1 text-subtitle-2 text-medium-emphasis text-left">
        EMAIL
      </div>
      <v-text-field
        v-model="email"
        type="email"
        placeholder="john@google.com"
        variant="solo"
        rounded="lg"
        bg-color="rgba(255, 255, 255, 0.02)"
        :rules="emailRules()"
        :error-messages="errors.email"
      ></v-text-field>
      <div class="pl-1 text-subtitle-2 text-medium-emphasis text-left">
        PASSWORD
      </div>
      <v-text-field
        v-model="password"
        placeholder="not_123456"
        type="password"
        variant="solo"
        rounded="lg"
        bg-color="rgba(255, 255, 255, 0.02)"
        :rules="passwordRules()"
        :error-messages="errors.password"
      ></v-text-field>
      <div class="pl-1 text-subtitle-2 text-medium-emphasis text-left">
        CONFIRM PASSWORD
      </div>
      <v-text-field
        v-model="cPassword"
        placeholder="not_123456"
        type="password"
        variant="solo"
        rounded="lg"
        bg-color="rgba(255, 255, 255, 0.02)"
        :rules="confirmPasswordRules()"
        :error-messages="errors.password"
      ></v-text-field>
      <v-checkbox value="1" label="Is admin" type="checkbox"></v-checkbox>
      <v-card-actions class="d-flex justify-end">
        <v-btn
          color="primary"
          variant="flat"
          @click="openEditUserDialog(), clearData()"
          >Cancel</v-btn
        >
        <v-btn
          color="primary"
          variant="flat"
          @click="openEditUserDialog(), editUser()"
          >Edit user</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog class="add-user-modal-dialog" v-model="addUserDialog">
    <v-card class="add-user-modal-card pa-5">
      <v-card-text class="pa-0 ma-0 text-center">
        <h3>Add user</h3>
      </v-card-text>
      <div class="pl-1 text-subtitle-2 text-medium-emphasis text-left">
        NAME
      </div>
      <v-text-field
        v-model="name"
        placeholder="John Doe"
        variant="solo"
        rounded="lg"
        bg-color="rgba(255, 255, 255, 0.02)"
        :rules="nameRules()"
        clearable
        :counter="20"
        maxlength="20"
        :error-messages="errors.name"
      ></v-text-field>
      <div class="pl-1 text-subtitle-2 text-medium-emphasis text-left">
        EMAIL
      </div>
      <v-text-field
        v-model="email"
        type="email"
        placeholder="john@google.com"
        variant="solo"
        rounded="lg"
        bg-color="rgba(255, 255, 255, 0.02)"
        :rules="emailRules()"
        :error-messages="errors.email"
      ></v-text-field>
      <div class="pl-1 text-subtitle-2 text-medium-emphasis text-left">
        PASSWORD
      </div>
      <v-checkbox value="1" label="Is admin" type="checkbox"></v-checkbox>
      <v-card-actions class="d-flex justify-end">
        <v-btn color="primary" variant="flat" @click="clearData()"
          >Cancel</v-btn
        >
        <v-btn color="primary" variant="flat" @click="addUser()"
          >Add user</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import RequestService from "@/services/request.service";
import { useLoader } from "@/store/loading.store";

export default {
  name: "UserComponent",
  data: () => ({
    name: "",
    email: "",
    password: "",
    cPassword: "",
    errors: [],
    addUserDialog: false,
    editUserDialog: false,
    users: [],
  }),
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      const response = await RequestService.get("services/v1/auth/all");
      this.users = response.users;
    },
    async deleteUser(userId) {
      if (
        confirm(`Are you sure you want to delete this user? (id=${userId})`) ===
        false
      ) {
        return;
      }

      useLoader().show();
      try {
        await RequestService.delete("services/v1/auth/remove-user", {
          user_id: userId,
        });
        await this.fetchUsers();
      } catch (error) {
        console.log(error);
      } finally {
        useLoader().hide();
      }
    },
    openAddUserDialog() {
      this.addUserDialog = !this.addUserDialog;
    },
    openEditUserDialog() {
      this.editUserDialog = !this.editUserDialog;
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
    async addUser() {
      if (this.isFormValid) {
        useLoader().show();
        try {
          const response = await RequestService.post(
            "services/v1/auth/register",
            {
              name: this.name,
              gmail: this.email,
              is_admin: false,
            }
          );
          if (response) {
            alert("Created new user successfully!");
            await this.fetchUsers();
          }
        } catch (error) {
          console.log(error);
        } finally {
          this.clearData();
          useLoader().hide();
        }
      }
    },
    editUser() {
      return;
    },
    clearData() {
      this.addUserDialog = false;
      this.name = "";
      this.email = "";
    },
  },
  computed: {
    isFormValid() {
      return !!(this.name && this.email);
    },
  },
};
</script>

<style>
.users-layout {
  height: 100vh;
  background-color: #eeeff2;
  padding: 25px 25px;
}

.users-content {
  padding: 20px;
  background-color: white;
  border-radius: 15px;
}

.users-table {
  width: 100%;
}

.users-table,
thead,
tbody,
tr,
th,
td {
  border: none !important;
  border-spacing: 0px !important;
}

.users-table th {
  height: 50px;
  background-color: #ebecf3;
}

.users-table tr:hover {
  background-color: #d4d7df;
}

.users-table tr:nth-child(even) {
  background-color: #eeeff3;
}

.users-table tr:nth-child(even):hover {
  background-color: #d4d7df;
}

.add-user-modal-dialog {
  width: 35%;
  margin: auto;
}
</style>
