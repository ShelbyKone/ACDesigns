<template>
  <div>
    <v-hover v-slot="{ hover }">
      <v-card
        width="300"
        :elevation="hover ? 2 : 0"
        class="rounded-0"
        :class="{ 'on-hover': hover }"
        align="center"
      >
        <v-img :aspect-ratio="16 / 9" width="300" :src="design.image"> </v-img>
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
        <v-card-actions>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn color="secondary" elevation="0" v-on="on" dark fab small>
                <v-icon dark> mdi-heart </v-icon>
              </v-btn>
            </template>
            <span>Favorite</span>
          </v-tooltip>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <router-link :to="{ name: 'Design', params: { id: design._id } }">
                <v-btn color="primary" elevation="0" v-on="on" dark fab small>
                  <v-icon dark> mdi-information-variant </v-icon>
                </v-btn>
              </router-link>
            </template>
            <span>More Info</span>
          </v-tooltip>
        </v-card-actions>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
export default {
  name: "DesignCard",
  props: ["design"],
};
</script>