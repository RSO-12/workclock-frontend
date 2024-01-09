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
            {{ item.title }}
          </v-btn>
          <v-divider v-else-if="isAdmin"></v-divider>
        </template>
      </div>
      <footer class="mt-auto py-4">
        <span>© Brina Jehart, Janez Sedeljšak</span>
      </footer>
    </div>
    <div class="main-content d-flex flex-column">
      <div class="content-header d-flex justify-content-between pa-2" style="background-color: #FFFFFF; height: 55px;">
        <span class="ml-5" style="font-size: 1.4em; font-weight: 600;">{{ currentTitle }}</span>
        <img class="profile mr-5" src="../assets/user.png" alt="profile" @click="openProfile()">
      </div>
      <div>
        <component :is="currentComponent"></component>
      </div>
    </div>
  </div>
</template>

<script>
import HomePageComponent from '@/components/HomePageComponent.vue';
import HistoryComponent from '@/components/HistoryComponent.vue';
import AdminControlPanelComponent from '@/components/AdminControlPanelComponent.vue';
import ProfileComponent from '@/components/Profile/ProfileComponent.vue';

export default {
  name: 'HomeView',
  components: { HomePageComponent },
  data() {
    return {
      currentComponent: HomePageComponent,
      currentTitle: 'Time tracker',
      isAdmin: true,
      navItems: [
        { title: 'Time tracker', component: HomePageComponent, isDivider: false },
        { title: 'History', component: HistoryComponent, isDivider: false },
        { title: 'Account', component: ProfileComponent, isDivider: false },
        { title: 'Control panel', component: AdminControlPanelComponent, isDivider: true },
      ],
    };
  },
  methods: {
    navigateTo(item) {
      this.currentComponent = item.component
      this.currentTitle = item.title;
    },
    openProfile(){
      this.$router.push('/profile');
    },
  },
  created() {
    if (this.isAdmin) {
      this.navItems.push({ title: 'Control panel', component: AdminControlPanelComponent, isDivider: false });
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

footer {
  margin-top: auto;
  text-align: center;
  background-color: #192130;
  color: #9CA3AF;
}

.profile {
  background-color: #D9D9D9;
  border-radius: 50%;
  height: 48px;
  width: 48px;
  cursor: pointer;
}
</style>