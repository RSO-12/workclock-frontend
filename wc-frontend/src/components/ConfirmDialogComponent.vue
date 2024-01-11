<template>
    <v-dialog v-model="confirmDialog" width="500px">
      <v-card class="rounded-lg">
        <v-card-text class="pa-2">
          <v-container class="pa-1">
            <v-row>
              <v-col class="text-center px-0">
                  <v-icon :icon="this.icon" :color="this.color" style="font-size: 2.8em;"></v-icon>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="pa-0 text-center">
                <div class="pl-1 text-h6 text-medium-emphasis">
                  {{ this.title }}
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="pa-0 mt-4 text-center">
                <div class="pl-1 text-subtitle-2 text-medium-emphasis">
                  {{ this.message }}
                </div>
              </v-col>
            </v-row>
            <v-row class="mt-10">
              <v-col class="text-center  px-0">
                <v-btn @click="noFunction" class="mr-5" variant="text">Cancel</v-btn>
                <v-btn :color="this.color" @click="yesFunction"> Confirm </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    data() {
      return {
        id: null,
        title: null,
        message: null,
        onYes: null,
        onNo: null,
        icon: null,
        color: null,
        confirmDialog: false,
      };
    },
    methods: {
      onConfirmDialog(id, title, message, onYes, onNo, icon, color) {
        this.confirmDialog = true;
        this.id = id;
        this.title = title;
        this.message = message;
        this.onYes = onYes;
        this.onNo = onNo;
        this.icon = icon;
        this.color = color;
      },
      onCancelDialog(id) {
        if (id == this.id) {
          this.confirmDialog = false;
        }
      },
      yesFunction() {
        this.confirmDialog = false;
        this.onYes();
      },
      noFunction() {
        this.confirmDialog = false;
        this.onNo();
      },
    },
    mounted() {
      this.$eventBus.$on("confirmDialog", this.onConfirmDialog);
      this.$eventBus.$on("cancelDialog", this.onCancelDialog);
    },
  };
  </script>
  
  <style></style>
  