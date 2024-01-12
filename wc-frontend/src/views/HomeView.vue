<template>
  <div class="home-layout">
    <div class="sidebar d-flex flex-column">
      <div class="d-flex justify-center align-center" style="height: 55px !important;">
        <h1>WORKCLOCK</h1>
      </div>
      <div class="nav-buttons">
        <template v-for="(item, index) in navItems" :key="index">
          <v-btn v-if="!item.isDivider" class="nav-button" variant="solo"
            :class="{ 'button-active': currentComponent === item.component }" @click="navigateTo(item)">
            <v-icon left class="mr-2" size="24">{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
          <v-divider v-else-if="accountStore.isAdmin"></v-divider>
        </template>
      </div>
      <footer class="mt-auto py-4">
        <span>© Brina Jehart, Janez Sedeljšak</span>
      </footer>
    </div>
    <div class="main-content d-flex flex-column">
      <div class="content-header d-flex justify-end pa-2">
        <!--<span class="ml-5" style="font-size: 1.4em; font-weight: 600;">{{ currentTitle }}</span>-->
        <v-icon class="profile" size="45" @click="openProfile()">mdi-account-circle</v-icon>
      </div>
      <div>
        <component :is="currentComponent"></component>
      </div>
    </div>
    <div>
      <ProfileComponent ref="profileSettings"></ProfileComponent>
    </div>
    <div class="chat-button">
      <v-btn icon variant="tonal" elevation="1" @click="openChat()">
        <v-icon icon="mdi-chat" size="30" color="#101827"></v-icon>
      </v-btn>
    </div>
    <div v-if="isChatOpen" class="chat-window">
      <v-row class="chat-head d-flex justify-space-between align-center px-2">
        <v-col cols="auto" class="pa-0 ma-0">
          <span class="font-weight-bold">Community chat</span>
        </v-col>
        <v-col cols="auto" class="pa-0 ma-0 d-flex justify-end">
            <v-icon @click="isChatOpen = false" color="red" variant="text" size="26">mdi-close</v-icon>
        </v-col>
      </v-row>
      <div class="chat-messages ma-3">
        <ChatComponent></ChatComponent>
      </div>
      <div class="d-flex align-end chat-text-field-container">
        <v-form style="width: 100%;">
          <v-text-field hide-details="auto" v-model="message" variant="solo" clear-icon="mdi-close-circle" clearable
            placeholder="Message" type="text" style="width: 100%;" ref="chatInput"
            @keydown.enter.prevent="sendMessage" @click:clear="clearMessage">
            <template v-slot:append-inner>
              <v-icon class="mdi mdi-send" @click="sendMessage"></v-icon>
            </template>
          </v-text-field>
        </v-form>
      </div>
    </div>
  </div>
  <NotificationsComponent></NotificationsComponent>
  <ConfirmDialogComponent></ConfirmDialogComponent>
</template>

<script>
import { mapStores } from "pinia";
import HomePageComponent from '@/components/HomePageComponent.vue';
import HistoryComponent from '@/components/HistoryComponent.vue';
import AdminControlPanelComponent from '@/components/AdminControlPanelComponent.vue';
import ProfileComponent from '@/components/Profile/ProfileComponent.vue';
import ChatComponent from '@/components/ChatComponent.vue';
import UsersComponent from '@/components/UsersComponent.vue';
import NotificationsComponent from '@/components/NotificationsComponent.vue';
import ConfirmDialogComponent from '@/components/ConfirmDialogComponent.vue';
import { useSocketStore } from '@/store/socket.store';
import { useAccountStore } from '@/store/account.store';

export default {
  name: 'HomeView',
  components: {
    HomePageComponent,
    ChatComponent,
    ProfileComponent,
    UsersComponent,
    NotificationsComponent,
    ConfirmDialogComponent,
  },
  data() {
    return {
      currentComponent: HomePageComponent,
      currentTitle: 'Time tracker',
      isChatOpen: true,
      message: "",
      navItems: [
        { title: 'Time tracker', component: HomePageComponent, icon: 'mdi-clock', isDivider: false },
        { title: 'History', component: HistoryComponent, icon: 'mdi-history', isDivider: false },
        { title: 'Control panel', component: AdminControlPanelComponent, icon: 'mdi-security', isDivider: true },
      ],
    };
  },
  computed: {
    ...mapStores(useSocketStore, useAccountStore),
  },
  methods: {
    navigateTo(item) {
      this.currentComponent = item.component
      this.currentTitle = item.title;
    },
    openProfile() {
      this.$refs.profileSettings.profileSettinsDialog = true;
    },
    openChat() {
      this.isChatOpen = !this.isChatOpen;
    },
    sendMessage() {
      if (this.message == "") {
        return;
      }
      useSocketStore().send(this.message);
      this.clearMessage();
    },
    clearMessage() {
      this.message = "";
    },
  },
  created() {
    if (useAccountStore().isAdmin) {
      this.navItems.push({ title: 'Control panel', component: AdminControlPanelComponent, icon: 'mdi-security', isDivider: false });
      this.navItems.push({ title: 'Users', component: UsersComponent, icon: 'mdi-account-group', isDivider: false });
    }
  },
}

</script>

<style scoped>
.home-layout {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 300px;
  background-color: #101827;
  color: #12B981;
}

.main-content {
  flex-grow: 1;
  flex-basis: 0;
  overflow-y: auto;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FFFFFF;
  height: 55px;
  box-shadow: 0 4px 6px rgba(65, 74, 108, 0.1);
}

.nav-buttons {
  width: 100%;
}

.nav-button {
  margin: 0.5rem 0;
  text-transform: none;
  width: 90%;
  height: 40px !important;
  border-radius: 5px;
  color: #9CA3AF;
  justify-content: flex-start;
  font-weight: 600;
}

.nav-button:hover {
  background-color: #242A38;
}

.nav-button:active {
  color: #12B981;
}

.nav-button:focus {
  color: #12B981;
  background-color: #242A38;
}

.chat-button {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 1000;
}

.chat-window {
  display: grid;
  grid-template-rows: 50px 1fr auto; /* Header, Messages, Input */
  grid-template-columns: 100%; /* Single column layout */
  gap: 10px;
  position: fixed;
  right: 20px;
  bottom: 80px;
  width: 400px;
  height: 500px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 40px 60px rgba(0, 0, 0, 0.1);
  z-index: 2000;
  box-sizing: border-box;
}

.chat-head {
  background-color: #1e2737;
  color: white;
  margin: 0px;
  height: 50px !important;
  border-radius: 5px;
}

.chat-messages {
  max-height: calc(100% - 130px);
  overflow-y: auto;
  flex-grow: 1;
  flex: 1;
  box-sizing: border-box;
}

footer {
  margin-top: auto;
  text-align: center;
  background-color: #192130;
  color: #9CA3AF;
}

.profile:hover {
  opacity: 0.8;
}
</style>