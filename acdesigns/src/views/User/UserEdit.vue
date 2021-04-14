<template>
  <v-container v-if="user">
    <v-row class="justify-center mt-1">
      <v-col class="col-md-10 col-lg-8 col-xl-6" align="center">
        <v-form v-on:submit.prevent="onSubmit" ref="form">
          <v-text-field
            label="Resident Name"
            v-model="user.islandRep"
            :rules="rules.required"
            color="dark"
            filled
            dense
          >
          </v-text-field>
          <v-text-field
            label="Island Name"
            v-model="user.islandName"
            :rules="rules.required"
            color="dark"
            filled
            dense
          >
          </v-text-field>
          <v-text-field
            label="Creator Code"
            v-model="user.creatorCode"
            color="dark"
            filled
            dense
            hint="Example: MA-1234-1234-1234"
          >
          </v-text-field>
          <v-textarea
            label="About"
            v-model="user.about"
            color="dark"
            filled
            flat
          ></v-textarea>
          <v-file-input
            label="Profile Image"
            v-model="image"
            class="mt-n4"
            accept=".png, .jpeg, .jpg"
            prepend-icon="mdi-camera"
            color="dark"
          ></v-file-input>
          <div>
            <p v-if="error" class="error--text">
              {{ error }}
            </p>
            <v-row class="mt-3">
              <v-btn
                :to="{ name: 'About', params: { id: user._id } }"
                class="ml-3"
                exact
                >Cancel</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn type="submit" class="mr-3" :loading="loading"
                >Update</v-btn
              >
            </v-row>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as auth from "../../services/UserService";
import FormData from "form-data";

export default {
  name: "UserEdit",
  data: function () {
    return {
      user: null,
      error: "",
      image: null,
      loading: false,
      rules: {
        required: [(v) => !!v || "Required"],
      },
    };
  },
  methods: {
    onSubmit: async function () {
      if (this.$refs.form.validate()) {
        this.loading = true;

        let formData = new FormData();
        formData.append("_id", this.user._id);
        formData.append("islandRep", this.user.islandRep);
        formData.append("islandName", this.user.islandName);
        formData.append("creatorCode", this.user.creatorCode);
        formData.append("about", this.user.about);

        if (this.image) {
          formData.append("image", this.image);
          formData.append("imageVersion", this.user.imageVersion);
        }

        try {
          await auth.updateUser(formData);
          this.$store.dispatch("authenticate");
          this.$router.push({ name: "About", params: { id: this.user._id } });
        } catch (error) {
          this.loading = false;
          this.error = error;
        }
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    try {
      auth.getUser(to.params.id).then((res) => {
        next((vm) => {
          vm.user = res.data.user;
        });
      });
    } catch (error) {
      console.log(error);
    }
  },
};
</script>