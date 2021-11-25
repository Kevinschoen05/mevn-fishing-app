<template>
  <v-container fill-height>
    <v-alert
      border="left"
      close-text="Close Alert"
      color="green accent-4"
      dismissible
      v-if="this.$route.params.message"
      >{{ this.$route.params.message }}</v-alert
    >
    <v-row no-gutters class="d-flex justify-space-between">
      <v-col
        sm="4"
        class="pa-4"
        v-for="reservoir in reservoirs"
        :key="reservoir.name"
      >
        <v-card class="pa-1" :to="reservoir.link">
          <v-img height="250" :src="reservoir.image"> </v-img>
          <v-card-title class="headline">{{ reservoir.name }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import crotonImage from "../assets/crotonThumbnail.png";
import muscootImage from "../assets/muscootThumbnail.png";
export default {
  name: "Home",
  data() {
    return {
      reservoirs: [
        {
          name: "Muscoot",
          image: muscootImage,
          link: "/Muscoot",
        },
        {
          name: "Croton",
          image: crotonImage,
          link: "/Croton",
        },
      ],
    };
  },
};
</script>
