<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="10" class="mx-auto">
        <v-card class="pa-5">
          <v-card-title>Record New Fish</v-card-title>
          <v-divider></v-divider>
          <v-form
            ref="form"
            @submit.prevent="submitForm"
            class="pa-5"
            enctype="multipart/form-data"
          >
            <v-text-field
              label="Fish Species"
              v-model="record.species"
              prepend-icon="mdi-fish"
              :rules="rules"
            ></v-text-field>
            <v-text-field
              label="Name of Angler"
              v-model="record.angler"
              prepend-icon="mdi-account"
              :rules="rules"
            ></v-text-field>
            <v-text-field
              label="Weight of Fish"
              v-model="record.weight"
              prepend-icon="mdi-scale"
              :rules="rules"
            ></v-text-field>
            <v-select
              label="Reservoir"
              :items="reservoirs"
              v-model="record.reservoir"
              prepend-icon="mdi-map"
              :rules="rules"
            ></v-select>
            <v-textarea
              label="Comments"
              v-model="record.comment"
              prepend-icon="mdi-note"
            ></v-textarea>
            <v-btn type="submit" class="mt-3" color="primary">Add Fish</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import API from "../api";
export default {
  data() {
    return {
      rules: [(value) => !!value || "This field is required"],
      record: {
        species: "",
        angler: "",
        weight: "",
        reservoir: "",
        comment: "",
        date: "",
      },
      reservoirs:[ "Muscoot", "Croton"] 
    };

  },
  methods: {

    async submitForm() {
      const formData = new FormData();
      formData.append("species", this.record.species);
      formData.append("angler", this.record.angler);
      formData.append("weight", this.record.weight);
      formData.append("reservoir", this.record.reservoir);
      formData.append("comment", this.record.comment);
      if (this.$refs.form.validate()) {
        const response = await API.addRecord(formData);
        this.$router.push({
          name: "Home",
          params: { message: response.message },
        });
      }
        
    },
  },
};
</script>