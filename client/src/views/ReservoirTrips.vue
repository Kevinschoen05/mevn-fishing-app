<template>
  <v-container fill-height>
    <v-row no-gutters class="d-flex justify-space-between align-center">
      <v-col sm="4" class="pa-3" v-for="date in tripDates" :key="date">
        <v-card
          class="pa-1"
          @click="
            (overlay = !overlay), (clickedDate = date), filterRecords(records)
          "
        >
          <v-card-title class="headline">{{ date }}</v-card-title>
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
  },

  async created() {
    this.records = await API.getRecordsByReservoir(this.reservoir);
    this.getTripDates(this.records);
  },
};
</script>
