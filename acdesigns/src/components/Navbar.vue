<template>
  <div>
    <v-app-bar color="dark" height="80" elevation="0" app>
      <router-link to="/" class="hidden-xs-only white--text no-underline">
        <h3>ACDesigns</h3>
      </router-link>
      <router-link
        to="/"
        class="hidden-sm-and-up no-underline"
        :class="{ 'mr-2': $vuetify.breakpoint.xs }"
      >
        <v-btn color="secondary" class="elevation-0" dark fab small>
          <v-icon dark> mdi-home </v-icon>
        </v-btn>
      </router-link>
      <v-spacer></v-spacer>
      <v-text-field
        placeholder="Search Designs"
        class="mt-7"
        color="primary"
        prepend-inner-icon="mdi-magnify"
        dark
        filled
        rounded
        dense
      ></v-text-field>
      <v-btn color="primary" class="ml-n10 elevation-0" dark fab small>
        <v-icon dark> mdi-magnify </v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-menu
        content-class="elevation-0 mt-3"
        transition="slide-y-transition"
        close-on-click
        offset-y
        dark
      >
        <template v-slot:activator="{ on }">
          <v-btn
            class="elevation-0"
            :class="{ 'ml-2': $vuetify.breakpoint.xs }"
            color="secondary"
            v-on="on"
            dark
            fab
            small
          >
            <v-icon dark> mdi-account-circle </v-icon>
          </v-btn>
        </template>
        <v-list color="dark">
          <v-list-item v-if="!$store.state.isLoggedIn">
            <v-btn to="/login" text block exact>
              <span>Login</span>
            </v-btn>
          </v-list-item>
          <v-list-item v-if="!$store.state.isLoggedIn">
            <v-btn to="/register" text block exact>
              <span>Register</span>
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn to="/design-create" text block exact>
              <span>Post Design</span>
            </v-btn>
          </v-list-item>
          <v-list-item v-if="$store.state.isLoggedIn">
            <v-btn
              :to="{ name: 'About', params: { id: this.$store.state.userId } }"
              text
              block
              exact
            >
              <span>Profile</span>
            </v-btn>
          </v-list-item>
          <v-list-item v-if="$store.state.isLoggedIn">
            <v-btn
              :to="{
                name: 'Designs',
                params: { id: this.$store.state.userId },
              }"
              text
              block
              exact
            >
              <span>My Designs</span>
            </v-btn>
          </v-list-item>
          <v-list-item v-if="$store.state.isLoggedIn">
            <v-btn
              :to="{
                name: 'Favorites',
                params: { id: this.$store.state.userId },
              }"
              text
              block
              exact
            >
              <span>My Favorites</span>
            </v-btn>
          </v-list-item>
          <v-list-item v-if="$store.state.isLoggedIn">
            <v-btn v-on:click.prevent="logout" text block exact>
              <span>Logout</span>
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import * as auth from "../services/UserService";

export default {
  name: "Navbar",
  data: function () {
    return {};
  },
  methods: {
    logout() {
      try {
        auth.logout();
        this.$router.push({ name: "Home" }).catch(() => {});
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>