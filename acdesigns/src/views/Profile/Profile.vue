<template>
  <v-container>
    <v-row justify="center" class="mt-2">
      <v-col align="center">
        <v-img
          :src="
            user.image
              ? user.image + '?v=' + user.imageVersion
              : require('@/assets/default_profile_pic.png')
          "
          class="rounded-circle"
          :aspect-ratio="9 / 9"
          width="150"
          ><template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <h1 class="mt-2">{{ user.islandRep }}</h1>
        <v-row
          v-if="$store.state.userId == $route.params.id"
          justify="center"
          class="mb-4 mt-2"
        >
          <v-btn
            :to="{ name: 'ProfileEdit', params: { id: $route.params.id } }"
            class="no-underline mr-6" small
            >Update Profile</v-btn
          >
          <v-btn to="/reset-password" class="ml-6" small
            >Change Password</v-btn
          >
        </v-row>
        <v-row class="mt-4" justify="center">
          <v-col class="col-md-12 col-lg-10 col-xl-8">
            <v-tabs
              fixed-tabs
              icons-and-text
              background-color="transparent"
              color="dark"
            >
              <v-tab :to="{ name: 'About', params: { id: $route.params.id } }">
                About
                <v-icon>mdi-account</v-icon>
              </v-tab>
              <v-tab
                :to="{ name: 'Designs', params: { id: $route.params.id } }"
              >
                Designs
                <v-icon>mdi-lead-pencil</v-icon>
              </v-tab>
              <v-tab
                :to="{ name: 'Favorites', params: { id: $route.params.id } }"
              >
                Favorites
                <v-icon>mdi-heart</v-icon>
              </v-tab>
            </v-tabs>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="mt-6" justify="center">
      <v-col class="col-md-12 col-lg-10 col-xl-8" align="center">
        <router-view :user="user"></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as auth from "../../services/UserService";

export default {
  name: "Profile",
  data: function () {
    return {
      user: {},
    };
  },
  beforeRouteEnter(to, from, next) {
    try {
      auth.getUser(to.params.id).then((res) => {
        next((vm) => {
          vm.user = res.data.user;
        });
      });
    } catch (error) {
      console.log(error); //TODO: create a 'user does not exist' page
    }
  },
};
</script>