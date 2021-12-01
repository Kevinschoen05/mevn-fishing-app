<template>
  <v-container fill-height>
    <v-row
      no-gutters
      sm="6"
      class="pa-4"
      v-for="angler in anglers"
      :key="angler"
    >
      <slot>
        <angler-card :records="records" :angler="angler"></angler-card>
      </slot>
    </v-row>
  </v-container>
</template>
<script>
import AnglerCard from "../components/AnglerCard.vue";
import API from "../api";
export default {
  components: { AnglerCard },
  data() {
    return {
      records: [],
      anglers: [],
    };
  },
  methods: {
    getAnglersList(records) {
      var anglersList = [];
      for (var i = 0; i < records.length; i++) {
        var angler = records[i].angler;
        anglersList.push(angler);
      }
      this.anglers = [...new Set(anglersList)];
      console.log(this.anglers);
    },
  },
  async created() {
    this.records = await API.getAllRecords();
    this.getAnglersList(this.records);
  },
};
</script>