<template>
  <v-container>
    <v-row class="justify-center mt-12">
      <v-col class="col-md-6" align="center">
        <v-card class="rounded-0">
          <v-card-title class="justify-center text-h3">Login</v-card-title>
          <v-card-text>
            <v-form v-on:submit.prevent="onSubmit">
              <v-text-field
                label="Email"
                v-model="email"
                autocomplete="on"
                color="dark"
                dense
                clearable
              >
              </v-text-field>
              <v-btn type="submit" class="mt-3" color="dark" dark>Reset Password</v-btn>
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
    };
  },
  methods: {
    onSubmit: async function () {
      await auth.resetPassword(this.email);
      this.$router.push({ name: "Login" });
    },
  },
};
</script>