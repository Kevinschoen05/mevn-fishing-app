<template>
  <v-container class="totals">
    <ul>
      <li>
        <h2> Total Fish: {{ totalFish }}</h2>
      </li>
      <li>
        <h2>Total Weight: {{ totalWeight.toFixed(2) }}</h2>
      </li>
      <li>
        <ul>
          <li>
            <h2>Anglers:</h2>
          </li>
          <li v-for="angler in anglers" :key="angler">
            <h2>{{ angler }}</h2>
          </li>
        </ul>
      </li>
    </ul>
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
.totals {
  text-align: center;
  align-content: center;
}

ul {
  list-style-type: none;
  text-align: center;
  padding: 0;
}

li {
  display: inline-block;
  padding-right: 16px;
}
</style>