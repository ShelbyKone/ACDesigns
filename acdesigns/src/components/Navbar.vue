<template>
  <div>
    <v-app-bar app dark color="primary" height="80">
      <div class="d-flex align-center">
        <router-link style="text-decoration: none; color: inherit" to="/">
          <div class="display-1">ACDesigns</div>
        </router-link>
      </div>
      <v-spacer></v-spacer>
      <div class="hidden-sm-and-down">
        <v-btn to="/" text>
          <span class="mr-2">Home</span>
        </v-btn>
        <v-btn to="/quizzes" text>
          <span class="mr-2">Host A Game</span>
        </v-btn>
        <v-btn to="/register" v-if="!$store.state.isLoggedIn" text>
          <span class="mr-2">Register</span>
        </v-btn>
        <v-btn to="/login" v-if="!$store.state.isLoggedIn" text>
          <span class="mr-2">Login</span>
        </v-btn>
        <v-btn v-if="$store.state.isLoggedIn" v-on:click.prevent="logout" text>
          <span class="mr-2">Logout</span>
        </v-btn>
        <v-btn v-if="$store.state.isLoggedIn" text disabled>
          <span class="mr-2 secondary--text">{{
            this.$store.state.username ? this.$store.state.username : "User"
          }}</span>
        </v-btn>
      </div>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click="toggleDrawer">
      </v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app right temporary>
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item to="/">
            <v-list-item-title class="primary--text">Home</v-list-item-title>
          </v-list-item>
          <v-list-item to="/quizzes" v-if="$store.state.isLoggedIn">
            <v-list-item-title class="primary--text">
              Host A Game
            </v-list-item-title>
          </v-list-item>
          <v-list-item to="/register" v-if="!$store.state.isLoggedIn">
            <v-list-item-title class="primary--text">
              Register
            </v-list-item-title>
          </v-list-item>
          <v-list-item to="/login" v-if="!$store.state.isLoggedIn">
            <v-list-item-title class="primary--text"> Login </v-list-item-title>
          </v-list-item>
          <v-list-item
            v-on:click.prevent="logout"
            v-if="$store.state.isLoggedIn"
          >
            <v-list-item-title class="primary--text">
              Logout
            </v-list-item-title>
          </v-list-item>
          <v-list-item disabled v-if="$store.state.isLoggedIn">
            <v-list-item-title class="secondary--text">
              {{
                this.$store.state.username ? this.$store.state.username : "User"
              }}
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>

export default {
  name: "Navbar",
  data: function () {
    return {
      drawer: false,
    };
  },
  methods: {
    toggleDrawer: function () {
      this.drawer = !this.drawer;
    },
    logout: function () {
      console.log('logged out')
      this.drawer = false;
      this.$router.push({ name: "Home" });
    },
  },
};
</script>