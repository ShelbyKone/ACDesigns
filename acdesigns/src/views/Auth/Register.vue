<template>
  <v-container>
    <v-row class="justify-center mt-12">
      <v-col class="col-md-6" align="center">
        <v-card flat class="rounded-0">
          <v-card-title class="justify-center text-h3"
            >Register</v-card-title
          >
          <v-card-text>
            <v-form>
              <v-text-field
                label="Email"
                color="dark"
                dense
                clearable
              >
              </v-text-field>
              <v-text-field
                label="Username"
                class="mt-6"
                color="dark"
                dense
                clearable
              >
              </v-text-field>
              <v-text-field
                label="Password"
                class="mt-6"
                color="dark"
                type="password"
                dense
                clearable
              >
              </v-text-field>
              <v-btn class="mt-3" color="dark" dark>Register</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Register",
};
</script>