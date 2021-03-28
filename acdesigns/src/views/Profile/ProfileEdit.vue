<template>
  <v-container>
    <v-row class="justify-center mt-1">
      <v-col class="col-md-6" align="center">
        <v-form v-on:submit.prevent="onSubmit" ref="form">
          <v-text-field
            label="Email"
            v-model="email"
            :rules="rules.required"
            color="dark"
            filled
            dense
            disabled
          >
          </v-text-field>
          <v-text-field
            label="Resident Name"
            v-model="user.islandRep"
            :rules="rules.required"
            color="dark"
            filled
            dense
            clearable
          >
          </v-text-field>
          <v-text-field
            label="Island Name"
            v-model="user.islandName"
            :rules="rules.required"
            color="dark"
            filled
            dense
            clearable
          >
          </v-text-field>
          <v-text-field
            label="Creator Code"
            v-model="user.creatorCode"
            color="dark"
            filled
            dense
            clearable
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
            <v-btn type="submit" class="mt-3" color="dark" dark>Update</v-btn>
            <v-progress-circular
              v-if="loading"
              class="mt-3 ml-3"
              color="primary"
              indeterminate
            ></v-progress-circular>
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
  name: "ProfileEdit",
  data: function () {
    return {
      error: "",
      email: "",
      user: {},
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
        }

        try {
          await auth.updateUser(formData);
          this.$router.push({ name: "About", params: { id: this.user._id } });
        } catch (error) {
          this.loading = false;
          this.error = error;
        }
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    auth.getUser(to.params.id).then((res) => { //TODO: redirect if not correct user
      next((vm) => {
        vm.user = res.data.user;
        vm.email = auth.getEmail();
      });
    });
  },
};
</script>