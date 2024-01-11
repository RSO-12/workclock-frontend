<template>
    <div class="notification-wrapper">
      <v-alert
        v-for="notification in notifications"
        :key="notification.id"
        :title="notification.title"
        :text="notification.text"
        :type="notification.type"
        variant="flat"
        closable
        density="compact"
        class="mt-2"
      >
      </v-alert>
    </div>
  </template>
  
  <script>
  export default {
    name: "NotificationComponent",
    data() {
      return {
        id: 0,
        notifications: [],
      };
    },
    methods: {
      onNotification(options) {
        const id = this.id++;
        const actualId = options.id?? id;
  
        const index = this.notifications.findIndex(x => x.id == actualId);
        if(index >= 0){
          clearTimeout(this.notifications[index].callBack);
          this.notifications.splice(index, 1);
        }
        this.notifications.push({
          id: actualId,
          ...options,
          callBack: setTimeout(() => {
            this.notifications = this.notifications.filter((x) => x.id != actualId);
          }, options.timeout ?? 2500),
        });
      },
    },
    mounted() {
      this.$eventBus.$on("notification", this.onNotification);
    },
  };
  </script>
  
  <style>
  .notification-wrapper {
    z-index: 9999;
    position: absolute;
    right: 15px;
    bottom: 15px;
  }
  </style>