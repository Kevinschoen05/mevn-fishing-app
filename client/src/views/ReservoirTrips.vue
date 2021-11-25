<template>
  <v-container fill-height>
    <v-card class="header" width="100%" img="'../assets/muscoot.jpeg'">
      <h1>{{ reservoir }} Reservoir</h1>
      <h2>Total Trips: {{ totalTrips }}</h2>
      <h2>Total Weight: {{ totalWeight.toFixed(2) }} lbs</h2>
    </v-card >
    <v-row no-gutters class="justify-space-between align-center">
      <v-col sm="12" class="pa-3" v-for="date in tripDates" :key="date">
        <v-card
          @click="
            (overlay = !overlay), (clickedDate = date), filterRecords(records)
          "
          color="#F6F6F6" 
        >
          <v-card-title class="headline">{{ date }}</v-card-title>
          <trip-totals :date="date" :records="records"></trip-totals>
        </v-card>
      </v-col>
    </v-row>
    <v-overlay :value="overlay">
      <v-row>
        <v-data-table :headers="headers" :items="recordsByDate"> </v-data-table>
      </v-row>
      <v-row justify="center" class="pt-4">
        <v-btn @click="(overlay = !overlay), purgeTable()"
          >Close Trip Details</v-btn
        >
      </v-row>
    </v-overlay>
  </v-container>
</template>

<script>
import API from "../api";
import TripTotals from "./TripTotals.vue";
export default {
  name: "ReservoirTrips",
  emits: ["records", "tripDates"],
  components: { TripTotals },
  data() {
    return {
      reservoir: this.$route.params.reservoir,
      records: [],
      tripDates: [],
      recordsByDate: [],
      totalWeight: 0,
      totalTrips: 0,
      overlay: false,
      clickedDate: "",
      headers: [
        { text: "Species", value: "species" },
        { text: "Angler", value: "angler" },
        { text: "Weight", value: "weight" },
      ],
    };
  },
  methods: {
    //takes full set of fish records and pulls only the unique dates so there are no duplicate dates
    getTripDates(records) {
      var recordDates = [];
      for (var i = 0; i < records.length; i++) {
        var date = this.formatDates(records[i].date);
        recordDates.push(date);
      }
      //this is the logic to set the tripDates array to just the unique dates from the records
      this.tripDates = [...new Set(recordDates)];
    },

    //formats the dates to get rid of timestamp portion
    formatDates(dateString) {
      var formattedDate = dateString.slice(0, 10);
      return formattedDate;
    },

    //gets all the records that occurred on a single date
    filterRecords(records) {
      for (var i = 0; i < records.length; i++) {
        var date = this.formatDates(records[i].date);
        if (date == this.clickedDate) {
          this.recordsByDate.push(records[i]);
        }
      }
    },

    //clears data table on the "Close Trip Details" button so the table does not continue to aggregate as you view more trips
    //without refreshing

    purgeTable() {
      this.recordsByDate = [];
    },

    //Calculates Header data that sums total weight and total amount of trips that occurred on the reservoir
    calcReservoirTotals(reservoirRecords) {
      for (var i = 0; i < reservoirRecords.length; i++) {
        this.totalWeight += reservoirRecords[i].weight;
      }
      this.totalTrips = this.tripDates.length;
    },

    //Calculates the total fish and total weight for each given trip
    calcTripTotals() {},
  },

  async created() {
    this.records = await API.getRecordsByReservoir(this.reservoir);
    this.getTripDates(this.records);
    this.calcReservoirTotals(this.records);
  },
};
</script>
<style scoped>

h1{
  font-size: 70px;
}
.headline {
  background-color: #212121;
  padding-top: 5px;
  padding-bottom: 5px;
  color: white
}

.header {
  text-align: center;
  color: black;
  background: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url('../assets/muscoot.jpeg') center center  !important;
  background-size: cover;

}




</style>