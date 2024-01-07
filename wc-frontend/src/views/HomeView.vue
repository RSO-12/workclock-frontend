<template>
    <div class="home-layout">
      <div class="sidebar">
        <h2>WORKCLOCK</h2>
      </div>  
      <HomePageComponent class="main-content"></HomePageComponent>
    </div>
    <router-view></router-view>
</template>

<script>
import HomePageComponent from '@/components/HomePageComponent.vue';


export default {
    name: 'HomeView',
    components: { HomePageComponent }
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
</style>