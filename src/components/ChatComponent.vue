<template>
  <div class="message-container">
    <v-list-item
      v-for="(msg, index) in visibleMessages"
      :key="index"
      class="mb-2 message-content"
    >
      <v-list-item-title class="text-left">
        <span class="font-weight-bold">{{ msg.sender }}</span>
        <span class="ml-2" style="color: rgb(200, 200, 200); font-size: 0.9em">
          {{ msg.timestamp }}
        </span>
      </v-list-item-title>
      <v-list-item-subtitle style="opacity: 1 !important" class="text-left">
        <span>{{ msg.message }}</span>
      </v-list-item-subtitle>
    </v-list-item>
  </div>
</template>

<script>
import { useSocketStore } from "@/store/socket.store";
import { mapStores } from "pinia";

export default {
  name: "ChatComponent",
  data: () => ({}),
  computed: {
    ...mapStores(useSocketStore),
    visibleMessages() {
      return useSocketStore().messages;
    },
  },
};
</script>

<style>
.message-container {
  overflow-y: auto;
  padding: 10px 0px;
}

.message-content {
  background-color: #5048e4 !important;
  border-radius: 15px !important;
  padding: 5px 10px !important;
  color: white !important;
}
</style>
