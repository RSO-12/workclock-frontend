<template>
  <v-container class="ma-0 pa-25" fluid style="background-color: #F9FAFC; height:100vh">
    <v-row>
      <v-col>
        <v-sheet class="time-card pa-2 ma-4 br-15 font-weight-bold d-flex align-center">
          <div class="time-display flex-grow-1 d-flex justify-center">01:45:02</div>
          <v-select class="select-menu" :class="selectClass" v-model="selectedOption"
            :items="['Start', 'Work', 'Remote', 'Break', 'Lunch', 'Stop']" dense rounded solo hide-details></v-select>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row no-gutters class="mt-4">
      <v-col>
        <v-sheet class=" pa-10 mx-4 br-15">
          <v-row>
            <v-col class="d-flex flex-column justify-center text-left">
              <span class="card-titles font-weight-medium">WORK HOURS</span>
              <span class="font-weight-bold grid-cards-font">{{ this.workHours }} h</span>
            </v-col>
            <v-col>
              <img src="../assets/doughnut.png" alt="chart" height="150px">
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>

      <v-col>
        <v-sheet class="d-flex flex-column pa-10 mx-4 br-15 font-weight-bold">
          <v-row>
            <v-col class="d-flex flex-column justify-center text-left">
              <span class="card-titles font-weight-medium">OVERTIME HOURS</span>
              <span class="font-weight-bold grid-cards-font">{{ this.overtimeHours }} h</span>
            </v-col>
            <v-col>
              <img src="../assets/doughnut-overtime.png" alt="chart" height="150px">
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>

      <v-col>
        <v-sheet class="d-flex flex-column pa-10 mx-4 br-15 font-weight-bold">
          <v-row>
            <v-col class="d-flex flex-column justify-center text-left">
              <span class="card-titles font-weight-medium">ALL HOURS</span>
              <span class="font-weight-bold grid-cards-font">{{ this.hoursTogether }} h</span>
            </v-col>
            <v-col>
              <img src="../assets/doughnut-all.png" alt="chart" height="150px">
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row no-gutters class="mt-4 text-left">
      <v-col>
        <v-sheet class="grid-cards pa-10 mx-4 br-15">
          <span class="card-titles font-weight-bold" style="color: black">Yearly analytics</span>
          <v-divider></v-divider>
          Graph
        </v-sheet>
      </v-col>
      
      <v-col>
        <v-sheet class="grid-cards pa-10 mx-4 br-15">
          <span class="card-titles font-weight-bold" style="color: black"> Daily overview</span>
          <v-divider></v-divider>
          Graph 
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HomePageComponent",
  data() {
    return {
      workHours: 80,
      overtimeHours: 100,
      hoursTogether: 180,
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
.br-15 {
  border-radius: 15px !important;
}

.card-titles {
  font-size: 1.2em;
  color: #AEB6C2
}

.time-card {
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  font-size: 2em;
}

.grid-cards-font {
  font-size: 3.5em;
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
  background-color: #5048E4 !important;
}

.select-work {
  background-color: #14B8A6 !important;
}

.select-remote {
  background-color: #FFB020 !important;
}

.select-break {
  background-color: #FA7E48 !important;
}

.select-lunch {
  background-color: #AB5FD4 !important;
}

.select-stop {
  background-color: #D14343 !important;
}
</style>