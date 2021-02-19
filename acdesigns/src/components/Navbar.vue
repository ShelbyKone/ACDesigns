<template>
  <div>
    <v-app-bar color="dark" height="80" elevation="0" app>
      <router-link to="/" class="hidden-xs-only white--text">
        <h3>ACDesigns</h3>
      </router-link>
      <router-link
        to="/"
        class="hidden-sm-and-up"
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
          <v-list-item v-if="$store.state.isLoggedIn">
            <v-btn to="/login" text block>
              <span>Login</span>
            </v-btn>
          </v-list-item>
          <v-list-item v-if="$store.state.isLoggedIn">
            <v-btn to="/profile" text block>
              <span>Profile</span>
            </v-btn>
          </v-list-item>
          <v-list-item v-if="$store.state.isLoggedIn">
            <v-btn to="/user-designs" text block>
              <span>My Designs</span>
            </v-btn>
          </v-list-item>
          <v-list-item v-if="$store.state.isLoggedIn">
            <v-btn to="/favorites" text block>
              <span>My Favorites</span>
            </v-btn>
          </v-list-item>
          <v-list-item v-if="$store.state.isLoggedIn">
            <v-btn v-on:click.prevent="logout" text block>
              <span>Logout</span>
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<style>
a {
  text-decoration: none !important;
}
</style>

<script>
export default {
  name: "Navbar",
  data: function () {
    return {
    };
  },
  methods: {
    logout: function () {
      console.log("logged out");
      this.$router.push({ name: "Home" });
    },
  },
};
</script>