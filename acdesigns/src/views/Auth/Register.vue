<template>
  <v-container>
    <v-row class="justify-center mt-12">
      <v-col class="col-xl-4 col-lg-6 col-md-8 col-sm-10" align="center">
        <v-card class="rounded-0">
          <v-card-title class="justify-center text-h4">Register</v-card-title>
          <v-card-text>
            <v-form v-on:submit.prevent="onSubmit" ref="form">
              <v-text-field
                label="Resident Name"
                v-model="islandRep"
                :rules="rules.required"
                tabindex="1"
                color="dark"
                dense
                clearable
              >
              </v-text-field>
              <v-text-field
                label="Island Name"
                v-model="islandName"
                :rules="rules.required"
                tabindex="2"
                class="mt-6"
                color="dark"
                dense
                clearable
              >
              </v-text-field>
              <v-text-field
                label="Email"
                v-model="email"
                :rules="rules.required"
                tabindex="3"
                autocomplete="on"
                class="mt-6"
                color="dark"
                dense
                clearable
              >
              </v-text-field>
              <v-text-field
                label="Password"
                v-model="password"
                :rules="rules.required"
                tabindex="4"
                autocomplete="on"
                class="mt-6"
                color="dark"
                type="password"
                dense
                clearable
              >
              </v-text-field>
              <div>
                <p v-if="error" class="error--text">
                  {{ error }}
                </p>
              </div>
              <v-btn type="submit" class="mt-3" color="dark" dark>
                Register
              </v-btn>
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
  name: "Register",
  data: function () {
    return {
      email: "",
      islandRep: "",
      islandName: "",
      password: "",
      error: "",
      rules: {
        required: [(v) => !!v || "Required"],
      },
    };
  },
  methods: {
    onSubmit: async function () {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password,
          islandRep: this.islandRep,
          islandName: this.islandName,
        };
        try {
          await auth.register(user);
          this.$router.push({ name: "Home" });
        } catch (error) {
          this.error = error;
        }
      }
    },
  },
};
</script>