<template>
  <v-btn color="primary" class="font-weight-bold" @click="openChangePass">
    Change password
  </v-btn>
  <div>
    <ChangePasswordComponent ref="changePasswordComponent"></ChangePasswordComponent>
  </div>
</template>

<script>

import ChangePasswordComponent from "./ChangePasswordComponent.vue";

export default {
  data() {

  },
  components: { 
    ChangePasswordComponent
  },
  methods: {
    openChangePass() {
      this.$refs.changePasswordComponent.passDialog = true;
    },
  },
}

</script>