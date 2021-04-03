<template>
  <div>
    <v-card width="300" align="center" min-height="350">
      <v-img :aspect-ratio="16 / 9" width="300" :src="design.image"
        ><template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </v-row> </template
      ></v-img>
      <v-card-title class="justify-center">{{ design.title }}</v-card-title>
      <v-card-subtitle class="pb-0 text-center">{{
        design.designCode
      }}</v-card-subtitle>
      <div class="text-center">
        <v-chip
          v-for="(tag, index) in design.tags"
          v-bind:key="index"
          class="ma-1"
          x-small
        >
          <router-link to="/search" class="dark--text no-underline">
            {{ tag }}
          </router-link>
        </v-chip>
      </div>
      <v-bottom-navigation class="elevation-0 subtle--text" absolute grow>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn @click="toggleFavorite" v-on="on">
              <span>{{ design.likes }} Favorites</span>
              <v-icon color="secondary">{{ icon }}</v-icon>
            </v-btn>
          </template>
          <span>{{ tooltip }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              :to="{ name: 'Design', params: { id: design._id } }"
              v-on="on"
            >
              <span>Details</span>
              <v-icon color="primary">mdi-information</v-icon>
            </v-btn>
          </template>
          <span>More Details</span>
        </v-tooltip>
      </v-bottom-navigation>
    </v-card>
  </div>
</template>

<script>
import * as fs from "../services/FavoritesService";

export default {
  name: "DesignCard",
  props: ["design"],
  data: function () {
    return {};
  },
  computed: {
    icon() {
      if (this.$store.state.isLoggedIn)
        return this.$store.state.user.favorites.includes(this.design._id)
          ? "mdi-close-circle"
          : "mdi-heart";
      else return "mdi-heart";
    },
    tooltip() {
      if (this.$store.state.isLoggedIn)
        return this.$store.state.user.favorites.includes(this.design._id)
          ? "Unfavorite"
          : "Favorite";
      else return "Favorite";
    },
  },
  methods: {
    toggleFavorite: async function () {
      if (this.$store.state.isLoggedIn) {
        if (this.$store.state.user.favorites.includes(this.design._id)) {
          try {
            await fs.deleteFavorite(this.design._id);
            const index = this.$store.state.user.favorites.indexOf(
              this.design._id
            );
            this.$store.state.user.favorites.splice(index, 1);
            this.design.likes--;
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            await fs.addFavorite(this.design._id);
            this.$store.state.user.favorites.push(this.design._id);
            this.design.likes++;
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        this.$router.push({ name: "Login" });
      }
    },
  },
};
</script>