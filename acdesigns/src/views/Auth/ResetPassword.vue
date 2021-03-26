<template>
  <v-container>
    <v-row class="justify-center mt-12">
      <v-col class="col-xl-4 col-lg-6 col-md-8 col-sm-10" align="center">
        <v-card class="rounded-0">
          <v-card-title class="justify-center text-h4"
            >Reset Password</v-card-title
          >
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
              <div>
                <p v-if="error" class="error--text">
                  {{ error }}
                </p>
              </div>
              <v-btn type="submit" class="mt-3" color="dark" dark>Submit</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as auth from "../../services/UserService";

export default {
  name: "Login",
  data: function () {
    return {
      email: "",
      error: "",
    };
  },
  methods: {
    onSubmit: async function () {
      try {
        await auth.resetPassword(this.email);
        this.$router.push({ name: "Login" });
      } catch (error) {
        this.error = error.message
      }
    },
  },
};
</script>