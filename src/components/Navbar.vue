<template>
  <div>
    <v-app-bar color="dark" height="80" elevation="0" app>
      <router-link
        :to="{ name: 'Home', query: { sort: 'popular' } }"
        class="no-underline"
      >
        <v-btn
          color="secondary"
          class="elevation-0"
          :class="{ 'mx-4': $vuetify.breakpoint.smAndUp }"
          dark
          fab
          small
        >
          <v-icon dark> mdi-home </v-icon>
        </v-btn>
      </router-link>
      <div class="hidden-md-and-down">
        <v-btn to="/design-create" class="mx-4" text dark exact>
          <span>Post Design</span>
        </v-btn>
        <v-btn
          to="/login"
          v-if="!$store.state.isLoggedIn"
          class="mx-4"
          text
          dark
          exact
        >
          <span>Login</span>
        </v-btn>
        <v-btn
          to="/register"
          v-if="!$store.state.isLoggedIn"
          class="mx-4"
          text
          dark
          exact
        >
          <span>Register</span>
        </v-btn>
        <v-btn
          :to="{ name: 'About', params: { id: this.$store.state.userId } }"
          v-if="$store.state.isLoggedIn"
          class="mx-4"
          text
          dark
          exact
        >
          <span>Profile</span>
        </v-btn>
        <v-btn
          :to="{
            name: 'Designs',
            params: { id: this.$store.state.userId },
          }"
          v-if="$store.state.isLoggedIn"
          class="mx-4"
          text
          dark
          exact
        >
          <span>My Designs</span>
        </v-btn>
        <v-btn
          :to="{
            name: 'Favorites',
            params: { id: this.$store.state.userId },
          }"
          v-if="$store.state.isLoggedIn"
          class="mx-4"
          text
          dark
          exact
        >
          <span>My Favorites</span>
        </v-btn>
        <v-btn
          v-on:click.prevent="logout"
          v-if="$store.state.isLoggedIn"
          class="mx-4"
          text
          dark
          exact
        >
          <span>Logout</span>
        </v-btn>
      </div>
      <v-col fluid>
        <v-form v-on:submit.prevent="search">
          <v-text-field
            :placeholder="$vuetify.breakpoint.xs ? '' : 'Search Designs'"
            v-model="searchTerm"
            class="ml-4"
            color="primary"
            prepend-inner-icon="mdi-magnify"
            dark
            hide-details
            filled
            rounded
            dense
          >
          </v-text-field>
        </v-form>
      </v-col>
      <v-btn
        @click="search"
        color="primary"
        class="ml-n10 elevation-0"
        :class="{ 'mr-4': $vuetify.breakpoint.smAndUp }"
        dark
        fab
        small
      >
        <v-icon dark> mdi-magnify </v-icon>
      </v-btn>
      <v-menu
        content-class="elevation-0 mt-3"
        transition="slide-y-transition"
        close-on-click
        offset-y
        dark
      >
        <template v-slot:activator="{ on }">
          <v-btn
            class="elevation-0 hidden-lg-and-up"
            :class="{ 'mr-4': $vuetify.breakpoint.smAndUp }"
            v-on="on"
            dark
            icon
            x-large
          >
            <v-icon dark> mdi-menu </v-icon>
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
    return {
      searchTerm: "",
    };
  },
  methods: {
    logout() {
      try {
        auth.logout();
        this.$router
          .push({ name: "Home", query: { sort: "popular" } })
          .catch(() => {});
      } catch (error) {
        console.log(error);
      }
    },
    search: function () {
      const term = this.searchTerm;
      this.searchTerm = "";
      this.$router.push({
        name: "Search",
        query: { term: term, filter: "all" },
      });
    },
  },
};
</script>