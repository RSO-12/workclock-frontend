<template>
  <router-view>

  </router-view>
  <LoaderWorkClock />
</template>

<script>
import LoaderWorkClock from "@/components/LoaderWorkClock.vue";
export default {
  name: 'App',
  components: {
    LoaderWorkClock,
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap');


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html{
  overflow: hidden !important;
}
</style>
