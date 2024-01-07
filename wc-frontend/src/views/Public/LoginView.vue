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
                    <v-text-field
                        class="input-field"
                        label="Username"
                        v-model="username"
                        variant="solo"
                        rounded="lg"
                        bg-color="rgba(255, 255, 255, 0.02)"
                    ></v-text-field>
                    <v-text-field
                        variant="solo"
                        bg-color="rgba(255, 255, 255, 0.02)"
                        rounded="lg"
                        label="Password"
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

export default {
    data() {
    return {
      username: "",
      password: "",
      errors: "",
    };
  },
  name: 'LoginView',
  methods: {
    logIn() {
        
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