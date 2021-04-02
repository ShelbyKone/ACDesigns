<template>
  <v-container class="my-4">
    <v-row class="justify-center">
      <v-col
        class="col-md-8 col-lg-6 col-xl-4"
        :align="this.$vuetify.breakpoint.mdAndUp ? 'left' : 'center'"
      >
        <v-card width="500" min-height="453" class="rounded-0">
          <v-card-title class="justify-center">{{ design.title }}</v-card-title>
          <v-card-subtitle class="pb-2 text-center">{{
            design.designCode
          }}</v-card-subtitle>
          <v-img :src="design.image" :aspect-ratio="16 / 9" width="500">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <v-card-text>
            <div class="text-center">
              <v-chip
                v-for="(tag, index) in design.tags"
                v-bind:key="index"
                class="ma-1"
                small
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
        <router-link
          :to="{ name: 'About', params: { id: user._id } }"
          class="no-underline"
        >
          <v-card max-width="250" class="rounded-0" align="center">
            <v-card-text class="pt-6 pb-1">
              <v-img
                :src="
                  user.image
                    ? user.image
                    : require('@/assets/default_profile_pic.png')
                "
                class="rounded-circle"
                :aspect-ratio="9 / 9"
                width="150"
                ><template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="primary"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
              <v-card-title class="justify-center">
                {{ user.islandRep }}
              </v-card-title>
              <div><v-icon> mdi-island </v-icon> {{ user.islandName }}</div>
              <v-card-subtitle class="text-center">{{
                user.creatorCode
              }}</v-card-subtitle>
            </v-card-text>
          </v-card>
        </router-link>
        <v-card max-width="250" class="rounded-0 mt-10" align="center">
          <v-row>
            <v-col class="py-0 my-0">
              <v-card-text class="mt-2">
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
              <v-card-text class="mt-n5">
                <v-card-title class="justify-center">{{
                  design.likes
                }}</v-card-title>
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
        <v-card class="rounded-0 mt-2" align="center">
          <v-card-text class="black--text">{{
            design.description
          }}</v-card-text>
        </v-card>
        <v-row
          v-if="$store.state.userId == user._id"
          justify="center"
          class="mt-6"
        >
          <router-link
            :to="{ name: 'DesignEdit', params: { id: design._id } }"
            class="mr-6 no-underline"
            >Edit Design</router-link
          >
          <a @click="deleteDesign" class="ml-6">Delete Design</a>
        </v-row>
        <!--
        <v-expansion-panels>
          <v-expansion-panel class="mt-8 white">
            <v-expansion-panel-header> Comments </v-expansion-panel-header>
            <v-expansion-panel-content> </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as ds from "../../services/DesignService";

export default {
  name: "Design",
  data: function () {
    return {
      design: {},
      user: {},
    };
  },
  methods: {
    deleteDesign: async function () {
      try {
        await ds.deleteDesign(this.design._id);
        this.$router.push({ name: "Home" });
      } catch (error) {
        console.log(error);
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    try {
      ds.getDesign(to.params.id).then((res) => {
        next((vm) => {
          vm.design = res.data.design;
          vm.user = res.data.design.user;
        });
      });
    } catch (error) {
      console.log(error); //TODO: create a 'design does not exist' page
    }
  },
};
</script>