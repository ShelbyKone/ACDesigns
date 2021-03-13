<template>
  <v-container class="my-4">
    <v-row class="justify-center">
      <v-col
        class="col-md-8 col-lg-6 col-xl-4"
        :align="this.$vuetify.breakpoint.mdAndUp ? 'left' : 'center'"
      >
        <v-card max-width="500" class="rounded-0">
          <v-card-title class="justify-center">{{ title }}</v-card-title>
          <v-card-subtitle class="pb-2 text-center">{{
            designId
          }}</v-card-subtitle>
          <v-img :src="imageURL" :aspect-ratio="16 / 9" width="500"> </v-img>
          <v-card-text>
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
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        class="col-md-4 col-lg-3 col-xl-2"
        :align="this.$vuetify.breakpoint.mdAndUp ? 'right' : 'center'"
      >
        <v-card max-width="250" class="rounded-0" align="center">
          <v-card-text class="py-9">
            <v-img
              :src="imageURL2"
              class="rounded-circle"
              :aspect-ratio="9 / 9"
              width="150"
            ></v-img>
            <v-card-title class="justify-center">
              <router-link
                :to="{ name: 'About', params: { id: '123' } }"
                class="black--text no-underline"
              >
                Username
              </router-link>
            </v-card-title>
            <v-card-subtitle class="pb-0 text-center"
              >1234-1234-1234</v-card-subtitle
            >
          </v-card-text>
        </v-card>
        <v-card max-width="250" class="rounded-0 mt-10" align="center">
          <v-row>
            <v-col>
              <v-card-text class="mt-1">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      color="secondary"
                      class="elevation-3"
                      v-on="on"
                      dark
                      fab
                    >
                      <v-icon dark> mdi-heart </v-icon>
                    </v-btn>
                  </template>
                  <span>Favorite</span>
                </v-tooltip>
              </v-card-text>
            </v-col>
            <v-col class="ml-n16">
              <v-card-text class="mt-n2">
                <v-card-title class="justify-center">123</v-card-title>
                <v-card-subtitle class="pb-0 text-center">
                  Favorites
                </v-card-subtitle>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-col class="col-md-12 col-lg-9 col-xl-6" align="center">
        <v-card class="rounded-0 mt-4" align="center">
          <v-card-text
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.</v-card-text
          >
        </v-card>
        <v-expansion-panels>
          <v-expansion-panel class="mt-4 white">
            <v-expansion-panel-header> Comments </v-expansion-panel-header>
            <v-expansion-panel-content> </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Design",
  data: function () {
    return {
      title: "Flower Dress",
      imageURL:
        "https://i.pinimg.com/originals/bf/61/74/bf61742604dafed27f29956362eb7bc7.jpg",
      imageURL2:
        "https://cdn.vox-cdn.com/thumbor/ODdbH80D3RbvdrAkjvKBkYVnWiM=/0x0:1280x720/1200x800/filters:focal(538x258:742x462)/cdn.vox-cdn.com/uploads/chorus_image/image/66760053/EXWjbofU4AAS42b.0.jpg",
      designId: "1234-1234-1234",
      tags: [
        "dress",
        "beige",
        "floral",
        "flowers",
        "modern inspiration",
        "belt",
        "animal crossing",
        "tan",
        "tulips",
        "summer",
      ],
    };
  },
};
</script>