<template>
  <v-container>
    <v-card>
      <v-card-title>{{angler}}</v-card-title>
    </v-card>
  </v-container>
</template>
<script>
export default {
  props: ["records", "angler"],
};
</script>
