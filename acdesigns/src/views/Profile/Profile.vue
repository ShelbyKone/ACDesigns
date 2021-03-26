<template>
  <v-container>
    <v-row justify="center" class="mt-2">
      <v-col align="center">
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
          <router-link
            :to="{ name: 'ProfileEdit', params: { id: $route.params.id } }"
            class="mr-6"
            >Update Profile</router-link
          >
          <router-link to="/reset-password" class="ml-6"
            >Change Password</router-link
          >
        </v-row>
        <v-row class="mt-4" justify="center">
          <v-btn
            :to="{ name: 'About', params: { id: $route.params.id } }"
            class="mx-6 secondary black--text"
            >About</v-btn
          >
          <v-btn
            :to="{ name: 'Favorites', params: { id: $route.params.id } }"
            class="mx-6 secondary black--text"
            >Favorites</v-btn
          >
          <v-btn
            :to="{ name: 'Designs', params: { id: $route.params.id } }"
            class="mx-6 secondary black--text"
            >Designs</v-btn
          >
        </v-row>
      </v-col>
    </v-row>
    <v-row class="mt-6" justify="center">
      <router-view :user="user"></router-view>
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
    auth.getUser(to.params.id).then((res) => {
      next((vm) => {
        vm.user = res.data.user;
      });
    });
  },
};
</script>