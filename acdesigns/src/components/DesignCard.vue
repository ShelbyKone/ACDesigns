<template>
  <div>
    <v-hover v-slot="{ hover }">
      <v-card
        width="250"
        :elevation="hover ? 5 : 0"
        class="rounded-0"
        :class="{ 'on-hover': hover }"
        align="center"
      >
        <v-img :aspect-ratio="16/9" width="250" :src="imageURL"> </v-img>
        <v-card-title class="justify-center">{{ title }}</v-card-title>
        <v-card-subtitle class="pb-0 text-center">{{
          designId
        }}</v-card-subtitle>
        <div class="text-center">
          <v-chip
            v-for="(tag, index) in tags"
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
              <v-btn
                color="secondary"
                elevation="0"
                v-on="on"
                dark
                fab
                small
              >
                <v-icon dark> mdi-heart </v-icon>
              </v-btn>
            </template>
            <span>Favorite</span>
          </v-tooltip>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <router-link :to="{name: 'Design', params: {id: '123'}}">
                <v-btn
                  color="primary"
                  elevation="0"
                  v-on="on"
                  dark
                  fab
                  small
                >
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
  props: ["title", "imageURL", "designId", "tags"],
};
</script>