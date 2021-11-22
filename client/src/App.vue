
   
<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Reservoir Fishing</v-list-item-title>
          <v-list-item-subtitle>2020</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.link" link>
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn :to="homeLink" text=true  :ripple="false" background-color: transparent>
        <v-toolbar-title>Reservoir Fishing</v-toolbar-title>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view :key="$route.fullPath"></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    selectedItem: 1,
    items: [
      { title: "Muscoot", icon: "mdi-map", link: "/muscoot" },
      { title: "Croton", icon: "mdi-map", link: "/croton" },
      { title: "Record Fish", icon: "mdi-note-plus", link: "/add-record" },
    ],
    homeLink: "/",
  }),
};
</script>

<style scoped>
.v-btn::before {
  background-color: transparent;
}
</style>