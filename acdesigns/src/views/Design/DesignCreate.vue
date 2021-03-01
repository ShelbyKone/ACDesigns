<template>
  <v-container>
    <v-row class="justify-center mt-1">
      <v-col class="col-md-6" align="center">
        <v-form class="mb-3">
          <v-text-field label="Title" color="dark" filled dense clearable>
          </v-text-field>
          <v-text-field
            label="Creator Code"
            color="dark"
            filled
            dense
            clearable
          >
          </v-text-field>
          <v-text-field label="Design Code" color="dark" filled dense clearable>
          </v-text-field>
          <v-textarea
            name="input-7-1"
            label="About"
            color="dark"
            filled
            flat
          ></v-textarea>
          <v-combobox
            v-model="tags"
            :items="items"
            chips
            label="Tags"
            multiple
            color="dark"
            append-icon=""
            filled
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                close
                @click="select"
                @click:close="remove(item)"
              >
                {{ item }}
              </v-chip>
            </template>
          </v-combobox>
          <p class="text--secondary mt-n6">Press enter to add a new tag.</p>
          <div class="mt-5">
            <v-btn small>Upload Image</v-btn>
            <span class="ml-3">No image selected.</span>
          </div>
          <div class="mt-6">
            <v-btn color="dark" dark>Post</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DesignCreate",
  data: function () {
    return {
      tags: [
        "dress",
        "beige",
        "floral",
        "flowers",
      ],
    };
  },
  methods: {
    remove(item) {
      this.tags.splice(this.tags.indexOf(item), 1);
      this.tags = [...this.tags];
    },
  },
};
</script>