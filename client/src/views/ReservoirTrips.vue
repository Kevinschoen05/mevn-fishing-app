<template>
  <v-container fill-height>
    <v-card width="100%" color="#F6F6F6">
      <h1>{{ reservoir }}</h1>
      <h2>Total Trips: {{ totalTrips }}</h2>
      <h2>Total Weight: {{ totalWeight.toFixed(2) }} Pounds</h2>
    </v-card>
    <v-row no-gutters class="d-flex justify-space-between align-center">
      <v-col sm="4" class="pa-3" v-for="date in tripDates" :key="date">
        <v-card
          class="pa-1"
          @click="
            (overlay = !overlay), (clickedDate = date), filterRecords(records)
          "
          color="#F6F6F6"
        >
          <v-card-title  class="headline">{{ date }}</v-card-title>
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
export default {
  name: "ReservoirTrips",
  emits: ["records", "tripDates"],

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
    formatDates(dateString) {
      var formattedDate = dateString.slice(0, 10);
      return formattedDate;
    },

    filterRecords(records) {
      for (var i = 0; i < records.length; i++) {
        var date = this.formatDates(records[i].date);
        if (date == this.clickedDate) {
          this.recordsByDate.push(records[i]);
        }
      }
    },
    purgeTable() {
      this.recordsByDate = [];
    },

    calcTripTotals(tripRecords) {
      for (var i = 0; i < tripRecords.length; i++) {
        this.totalWeight += tripRecords[i].weight
        
      }
      this.totalTrips = this.tripDates.length;
    },
  },

  async created() {
    this.records = await API.getRecordsByReservoir(this.reservoir);
    this.getTripDates(this.records);
    this.calcTripTotals(this.records);
  },
};
</script>
