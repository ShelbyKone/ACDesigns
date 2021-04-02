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
      <v-bottom-navigation class="elevation-0" absolute grow>
        <v-btn>
          <span>{{ design.likes }} Favorites</span>
          <v-icon color="secondary">mdi-heart</v-icon>
        </v-btn>
        <v-btn :to="{ name: 'Design', params: { id: design._id } }">
          <span>Details</span>
          <v-icon color="primary">mdi-information</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "DesignCard",
  props: ["design"],
};
</script>