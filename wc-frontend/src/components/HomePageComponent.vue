<template>
  <v-container class="ma-0" fluid style="background-color: #F2F2F2; height:100vh">
    <v-row>
      <v-col>
        <v-sheet class="time-card pa-2 ma-4 br-15 font-weight-bold d-flex align-center">
          <div class="time-display flex-grow-1 d-flex justify-center">01:45:02</div>
            <v-select
              class="select-menu"
              :class="selectClass"
              v-model="selectedOption"
              :items="['Start', 'Work', 'Remote', 'Break', 'Lunch', 'Stop']"
              dense
              rounded
              solo
              hide-details
          ></v-select>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row no-gutters class="mt-4">
      <v-col>
        <span class="card-titles font-weight-medium">Work hours</span>
        <v-sheet class="grid-cards pa-10 mx-4 br-15 font-weight-bold"> 80 </v-sheet>
      </v-col>

      <v-col>
        <span class="card-titles font-weight-medium">Overtime hours</span>
        <v-sheet class="grid-cards pa-10 mx-4 br-15 font-weight-bold"> 100 </v-sheet>
      </v-col>

      <v-col>
        <span class="card-titles font-weight-medium">Together</span>
        <v-sheet class="grid-cards pa-10 mx-4 br-15 font-weight-bold"> 180 </v-sheet>
      </v-col>
    </v-row>

    <v-row no-gutters class="mt-4">
      <v-col>
        <span class="card-titles font-weight-medium">Yearly analytics</span>
        <v-sheet class="grid-cards pa-10 mx-4 br-15"> Graph </v-sheet>
      </v-col>

      <v-col>
        <span class="card-titles font-weight-medium"> Daily overview</span>
        <v-sheet class="grid-cards pa-10 mx-4 br-15"> Graph </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HomePageComponent",
  data() {
    return {
      selectedOption: 'Start',
      selectColor: '#53A2BE',
    };
  },
  methods: {
  },
  computed: {
    selectClass() {
      switch (this.selectedOption) {
        case 'Start':
          return 'select-start';
        case 'Work':
          return 'select-work';
        case 'Remote':
          return 'select-remote';
        case 'Break':
          return 'select-break';
        case 'Lunch':
          return 'select-lunch';
        case 'Stop':
          return 'select-stop';
        default:
          return 'select-start';
      }
    }
  },
};
</script>

<style>
.br-15{
    border-radius: 15px !important;
}

.card-titles{
    font-size: 1.2em;
}

.time-card {
    display: flex;
    align-items: center; 
    position: relative;
    justify-content: space-between;
    font-size: 2em;
}

.grid-cards{
    font-size: 2em;
}

.flex-grow-1 {
    flex: 1;
}

.select-menu {
  position: absolute;
  right: 0px;
  min-width: 150px;
}

.select-start {
  background-color: #53A2BE !important;
}

.select-work{
  background-color: #499F68 !important;
}

.select-remote {
  background-color: #FAC748 !important;
}

.select-break {
  background-color: #FA7E48 !important;
}

.select-lunch {
  background-color: #AB5FD4 !important;
}

.select-stop {
  background-color: #E63946 !important;
}

</style>