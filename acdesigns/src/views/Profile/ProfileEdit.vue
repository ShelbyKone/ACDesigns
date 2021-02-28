<template>
  <v-container>
    <v-row class="justify-center mt-1">
      <v-col class="col-md-6" align="center">
        <v-form>
          <v-text-field label="Email" color="dark" filled dense clearable>
          </v-text-field>
          <v-text-field label="Island Rep" color="dark" filled dense clearable>
          </v-text-field>
          <v-text-field label="Island Name" color="dark" filled dense clearable>
          </v-text-field>
          <v-text-field
            label="Creator Code"
            color="dark"
            filled
            dense
            clearable
          >
          </v-text-field>
          <v-textarea
            name="input-7-1"
            label="About"
            color="dark"
            filled
            flat
          ></v-textarea>
          <div>
            <v-btn small>Upload Image</v-btn>
            <span class="ml-3">No image selected.</span>
          </div>
          <div class="mt-6">
            <v-btn color="dark" dark>Update</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ProfileEdit",
};
</script>