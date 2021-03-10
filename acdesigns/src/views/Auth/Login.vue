<template>
  <v-container>
    <v-row class="justify-center mt-12">
      <v-col class="col-xl-4 col-lg-6 col-md-8 col-sm-10" align="center">
        <v-card class="rounded-0">
          <v-card-title class="justify-center text-h4">Login</v-card-title>
          <v-card-text>
            <v-form v-on:submit.prevent="onSubmit">
              <v-text-field
                label="Email"
                v-model="email"
                autocomplete="on"
                tabindex="1"
                color="dark"
                dense
                clearable
              >
              </v-text-field>
              <v-text-field
                label="Password"
                v-model="password"
                autocomplete="on"
                tabindex="2"
                color="dark"
                type="password"
                class="mt-6"
                dense
                clearable
              >
              </v-text-field>
              <div>
                <p v-if="error" class="error--text">
                  {{ error }}
                </p>
                <router-link to="/register" class="grey--text">
                  Don't have an account? Sign up here!
                </router-link>
              </div>
              <div>
                <router-link to="/reset-password" class="grey--text">
                  Forgot your password?
                </router-link>
              </div>
              <v-btn type="submit" class="mt-3" color="dark" dark>Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as auth from "../../services/AuthService";

export default {
  name: "Login",
  data: function () {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    onSubmit: async function () {
      const user = {
        email: this.email,
        password: this.password,
      };
      try {
        await auth.login(user);
        this.$router.push({ name: "Home" });
      } catch (error) {
        this.error = error.message;
        this.email = "";
        this.password = "";
      }
    },
  },
};
</script>