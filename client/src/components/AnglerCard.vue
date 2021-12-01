<template>
  <v-container>
    <v-card>
      <v-card-title>{{angler}}</v-card-title>
        <h2 v-for=" species in speciesList" :key="species">{{species}}</h2>
    </v-card>
  </v-container>
</template>
<script>
export default {
  props: ["records", "angler"],
  data() {
      return {
          speciesList: [],
      }
  },
  methods: {
      getSpeciesList(angler){
          var fishList =[];
          for (var i =0; i < this.records.length; i++ ){
              if(angler === this.records[i].angler){
                  fishList.push(this.records[i].species)
              }
          }
          this.speciesList =[...new Set(fishList)]
      }
  },
  async created(){
      this.getSpeciesList(this.angler)
  }
};
</script>
