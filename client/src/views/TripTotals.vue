<template>
  <v-container class="totals ">
    <h2>Total Fish: {{ totalFish }}</h2>
    <h2>Total Weight: {{ totalWeight.toFixed(2) }}</h2>
    <h2>Anglers: {{ anglers }}</h2>
  </v-container>
</template>

<script>
export default {
  props: ["date", "records"],
  data() {
    return {
      totalFish: 0,
      totalWeight: 0,
      anglers: [],
    };
  },
  methods: {
    getTotals(date) {
      var anglersList = [];
      for (var i = 0; i < this.records.length; i++) {
        if (date === this.records[i].date.substring(0, 10)) {
          this.totalWeight += this.records[i].weight;
          this.totalFish++;
          anglersList.push(this.records[i].angler);
        }
      }
      this.anglers = [...new Set(anglersList)];
    },
  },
  created() {
    this.getTotals(this.date);
  },
};
</script>

<style scoped>
    .totals{ 
        text-align: center;
        align-content: center;
    }
</style>