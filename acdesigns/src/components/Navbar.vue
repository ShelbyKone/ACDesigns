<template>
  <div>
    <v-app-bar color="dark" height="80" elevation="0" app>
      <router-link to="/">
        <h3 class="mr-4 white--text">ACDesigns</h3>
      </router-link>
      <v-spacer></v-spacer>
      <v-text-field
        placeholder="Search Designs"
        class="mr-2 mt-7"
        color="primary"
        prepend-inner-icon="mdi-magnify"
        dark
        filled
        rounded
        dense
        clearable
      ></v-text-field>
      <v-btn color="primary" class="mr-4 elevation-0" dark fab small>
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
          <v-btn class="elevation-0" color="secondary" v-on="on" dark fab small>
            <v-icon dark> mdi-account-circle </v-icon>
          </v-btn>
        </template>
        <v-list color="dark">
          <v-list-item v-if="$store.state.isLoggedIn"
            ><v-btn to="/register" text>
              <span>Register</span>
            </v-btn>
          </v-list-item>
          <v-list-item v-if="$store.state.isLoggedIn">
            <v-btn v-on:click.prevent="logout" text>
              <span>Logout</span>
            </v-btn>
          </v-list-item>
          <v-list-item v-if="$store.state.isLoggedIn">
            <v-btn to="/login" text>
              <span>Login</span>
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
      profileMenu: false,
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