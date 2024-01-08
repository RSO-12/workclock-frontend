<template>
  <div class="home-layout">
    <div class="sidebar d-flex flex-column">
      <div class="d-flex justify-center align-center" style="height: 64px !important;">
        <h1>WORKCLOCK</h1>
      </div>
      <div class="nav-buttons">
        <v-btn v-for="(item, index) in navItems" :key="index" class="nav-button" variant="solo"
          :class="{ 'button-active': currentComponent === item.component }" @click="currentComponent = item.component">
          {{ item.title }}
        </v-btn>
      </div>
      <footer class="mt-auto py-5">
        <span>© Brina Jehart, Janez Sedeljšak</span>
      </footer>
    </div>
    <div class="main-content d-flex flex-column">
      <div class="d-flex justify-end pa-2" style="background-color: #EAEAEA">
        <img class="profile" src="../assets/user.png" alt="profile">
      </div>
      <div>
        <component :is="currentComponent"></component>
      </div>
    </div>
  </div>
</template>

<script>
import HomePageComponent from '@/components/HomePageComponent.vue';
import AnalyticsComponent from '@/components/AnalyticsComponent.vue';
import HistoryComponent from '@/components/HistoryComponent.vue';

export default {
  name: 'HomeView',
  components: { HomePageComponent },
  data() {
    return {
      currentComponent: HomePageComponent,
      navItems: [
        { title: 'Time tracker', component: HomePageComponent },
        { title: 'Analytics', component: AnalyticsComponent },
        { title: 'History', component: HistoryComponent },
      ],
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
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
  background-color: #E3E3E3;
}

.main-content {
  flex-grow: 1;
  flex-basis: 0;
}

.nav-buttons {
  width: 100%;
}

.nav-button {
  margin: 0.5rem 0;
  text-transform: none;
  width: 90%;
  height: 40px !important;
  background-color: #F2F2F2;
  border-radius: 5px;
  color: black;
  justify-content: flex-start;
}

footer {
  margin-top: auto;
  text-align: center;
  background-color: #EAEAEA;
}

.profile {
  background-color: #D9D9D9;
  border-radius: 50%;
  height: 48px;
  width: 48px;
}
</style>