<template>
  <v-container>
    <v-row class="justify-center mt-12">
      <v-col class="col-md-6" align="center">
        <v-card class="rounded-0">
          <v-card-title class="justify-center text-h3"
            >Login</v-card-title
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
                label="Password"
                color="dark"
                type="password"
                class="mt-6"
                dense
                clearable
              >
              </v-text-field>
              <div>
                <router-link to="/register" class="grey--text">
                  Don't have an account? Sign up here!
                </router-link>
              </div>
              <div>
                <a class="grey--text">Forgot your password?</a>
              </div>
              <v-btn class="mt-3" color="dark" dark>Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Login",
};
</script>