<template>
  <v-container v-if="design" class="my-4">
    <v-row class="justify-center">
      <v-col
        class="col-md-8 col-lg-6 col-xl-4"
        :align="this.$vuetify.breakpoint.mdAndUp ? 'left' : 'center'"
      >
        <v-card
          width="500"
          :min-height="this.$vuetify.breakpoint.mdAndUp ? 453 : 0"
        >
          <v-card-title class="justify-center">{{ design.title }}</v-card-title>
          <v-card-subtitle class="pb-0 mb-n4 text-center">{{
            design.type
          }}</v-card-subtitle>
          <v-card-subtitle class="pb-2 text-center">{{
            design.designCode
          }}</v-card-subtitle>
          <v-img
            :src="design.image + '?v=' + design.imageVersion"
            :aspect-ratio="16 / 9"
            width="500"
          >
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
                <router-link
                  :to="{
                    name: 'Search',
                    query: { term: tag, filter: 'all' },
                  }"
                  class="subtle--text no-underline"
                >
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
          v-if="design.user._id"
          :to="{ name: 'About', params: { id: design.user._id } }"
          class="no-underline"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-card v-on="on" max-width="300" height="320" align="center">
                <v-card-text class="pt-5 pb-0">
                  <v-img
                    :src="
                      design.user.image
                        ? design.user.image + '?v=' + design.user.imageVersion
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
                    {{ design.user.islandRep }}
                  </v-card-title>
                  <div>
                    <v-icon> mdi-island </v-icon> {{ design.user.islandName }}
                  </div>
                  <v-card-subtitle class="text-center d-block text-truncate">{{
                    design.user.creatorCode ? design.user.creatorCode : '-'
                  }}</v-card-subtitle>
                </v-card-text>
              </v-card>
            </template>
            <span>View Profile</span>
          </v-tooltip>
        </router-link>
        <v-card class="mt-10" max-width="300" align="center">
          <v-row align="center">
            <v-col class="pa-0 mr-n6">
              <v-card-text class="mt-2">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      :color="iconColor"
                      class="elevation-3"
                      @click="toggleFavorite"
                      v-on="on"
                      dark
                      fab
                      small
                    >
                      <v-icon class="mt-1" dark>mdi-heart</v-icon>
                    </v-btn>
                  </template>
                  <span>{{ tooltip }}</span>
                </v-tooltip>
                <v-card-subtitle class="pb-0 pt-1 text-center">
                  {{ likes }} Favorites
                </v-card-subtitle>
              </v-card-text>
            </v-col>
            <v-col class="pa-0 ml-n6">
              <v-card-text>
                <v-row justify="center">
                  <ShareNetwork
                    network="twitter"
                    :url="url"
                    :title="design.title + ' (' + design.designCode + ')'"
                    class="no-underline"
                  >
                    <v-btn icon><v-icon>mdi-twitter</v-icon></v-btn>
                  </ShareNetwork>
                  <ShareNetwork
                    network="facebook"
                    :url="url"
                    :title="design.title + ' (' + design.designCode + ')'"
                    class="no-underline"
                  >
                    <v-btn icon><v-icon>mdi-facebook</v-icon></v-btn>
                  </ShareNetwork>
                </v-row>
                <v-row justify="center">
                  <ShareNetwork
                    network="reddit"
                    :url="url"
                    :title="design.title + ' (' + design.designCode + ')'"
                    class="no-underline"
                  >
                    <v-btn icon><v-icon>mdi-reddit</v-icon></v-btn>
                  </ShareNetwork>
                  <ShareNetwork
                    network="pinterest"
                    :media="design.image"
                    :url="url"
                    :title="design.title + ' (' + design.designCode + ')'"
                    class="no-underline"
                  >
                    <v-btn icon><v-icon>mdi-pinterest</v-icon></v-btn>
                  </ShareNetwork>
                </v-row>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-col class="col-md-12 col-lg-9 col-xl-6" align="center">
        <v-card class="mt-2" align="center">
          <v-card-text class="black--text">{{
            design.description
          }}</v-card-text>
        </v-card>
        <v-row
          v-if="$store.state.userId == design.user._id"
          justify="center"
          class="mt-8"
        >
          <v-btn
            v-if="design"
            :to="{ name: 'DesignEdit', params: { id: design._id } }"
            class="mr-6 no-underline"
            small
            >Edit Design</v-btn
          >
          <v-dialog v-model="dialog" max-width="290">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click="dialog = true"
                class="ml-6"
                v-bind="attrs"
                v-on="on"
                small
                >Delete Design</v-btn
              >
            </template>
            <v-card>
              <v-card-title class="subtle--text text-center">
                Are you sure you want to delete this design?
              </v-card-title>
              <v-card-actions>
                <v-btn text @click="dialog = false"> No </v-btn>
                <v-spacer></v-spacer>
                <v-btn text @click="deleteDesign" color="error"> Yes </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as ds from "../../services/DesignService";
import * as fs from "../../services/FavoritesService";

export default {
  name: "Design",
  data: function () {
    return {
      design: null,
      dialog: false,
      errorPage: false,
      url: window.location.href,
    };
  },
  computed: {
    iconColor() {
      if (this.design.likes) {
        if (this.$store.state.isLoggedIn)
          return this.design.likes.includes(this.$store.state.userId)
            ? "secondary"
            : "grey lighten-1";
        else return "grey lighten-1";
      } else return "grey lighten-1";
    },
    tooltip() {
      if (this.design.likes) {
        if (this.$store.state.isLoggedIn)
          return this.design.likes.includes(this.$store.state.userId)
            ? "Unfavorite"
            : "Favorite";
        else return "Favorite";
      } else return "Favorite";
    },
    likes() {
      return this.design.likes ? this.design.likes.length : 0;
    },
  },
  methods: {
    deleteDesign: async function () {
      try {
        this.loading = true;
        await ds.deleteDesign(this.design._id);
        this.$router.push({ name: "Home", query: { sort: "popular" } });
      } catch (error) {
        this.loading = false;
      }
    },
    toggleFavorite: async function () {
      if (this.$store.state.isLoggedIn) {
        if (this.design.likes.includes(this.$store.state.userId)) {
          try {
            await fs.deleteFavorite(this.design._id);
            const index = this.design.likes.indexOf(this.$store.state.userId);
            this.design.likes.splice(index, 1);
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            await fs.addFavorite(this.design._id);
            this.design.likes.push(this.$store.state.userId);
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        this.$router.push({ name: "Login" });
      }
    },
  },
  beforeRouteEnter: async function (to, from, next) {
    try {
      const res = await ds.getDesign(to.params.id);
      next((vm) => {
        vm.design = res.data.design;
      });
    } catch (error) {
      console.log(error); //TODO: create a 'design does not exist' page
      this.errorPage = true;
    }
  },
};
</script>