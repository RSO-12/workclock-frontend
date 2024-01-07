<template>
  <v-container class="ma-0" fluid style="background-color: #F2F2F2;">
    <v-row>
      <v-col>
        <v-sheet class="time-card pa-2 ma-4 br-15 font-weight-bold d-flex align-center">
          <div class="time-display flex-grow-1 d-flex justify-center">01:45:02</div>
            <v-select
              class="select-menu"
              :items="['Start', 'Work', 'Remote', 'Break', 'Lunch', 'Stop']"
              label="soon"
              dense
              solo
              hide-details
          ></v-select>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row no-gutters class="mt-4">
      <v-col>
        <span class="card-titles">Work hours</span>
        <v-sheet class="grid-cards pa-10 mx-4 br-15 font-weight-bold"> 80 </v-sheet>
      </v-col>

      <v-col>
        <span class="card-titles">Overtime hours</span>
        <v-sheet class="grid-cards pa-10 mx-4 br-15 font-weight-bold"> 100 </v-sheet>
      </v-col>

      <v-col>
        <span class="card-titles">Together</span>
        <v-sheet class="grid-cards pa-10 mx-4 br-15 font-weight-bold"> 180 </v-sheet>
      </v-col>
    </v-row>

    <v-row no-gutters class="mt-4">
      <v-col>
        <span class="card-titles">Yearly analytics</span>
        <v-sheet class="grid-cards pa-10 mx-4 br-15"> Graph </v-sheet>
      </v-col>

      <v-col>
        <span class="card-titles"> Daily overview</span>
        <v-sheet class="grid-cards pa-10 mx-4 br-15"> Graph </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HomePageComponent",
  methods: {
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

</style>