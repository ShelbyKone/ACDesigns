<template>
  <v-container>
    <v-row class="justify-center mt-1">
      <v-col class="col-md-6" align="center">
        <v-form class="mb-3" ref="form" v-on:submit.prevent="onSubmit">
          <v-text-field
            v-model="design.title"
            label="Title"
            :rules="rules.required"
            color="dark"
            filled
            dense
            clearable
          >
          </v-text-field>
          <v-text-field
            v-model="design.designCode"
            label="Design Code"
            :rules="rules.required"
            color="dark"
            filled
            dense
            clearable
          >
          </v-text-field>
          <v-textarea
            v-model="design.description"
            name="input-7-1"
            label="Description"
            :rules="rules.required"
            color="dark"
            filled
            flat
          ></v-textarea>
          <v-select
            v-model="design.type"
            :items="filter"
            label="Design Type"
            :rules="rules.required"
            filled
            dense
          ></v-select>
          <v-combobox
            v-model="design.tags"
            label="Tags"
            color="dark"
            :rules="rules.tags"
            hint="Enter between 3 and 7 tags"
            append-icon=""
            multiple
            chips
            persistent-hint
            filled
          >
            <template v-slot:no-data>
              <v-list-item class="my-n2">
                <v-list-item-content>
                  <v-list-item-title>
                    Press <kbd>enter</kbd> to add tag.
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template v-slot:selection="{ attrs, item, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                close
                @click:close="remove(item)"
              >
                {{ item }}
              </v-chip>
            </template>
          </v-combobox>
          <v-file-input
            label="Design Image"
            v-model="design.image"
            :rules="rules.required"
            accept=".png, .jpeg, .jpg"
            prepend-icon="mdi-camera"
            color="dark"
          ></v-file-input>
          <div>
            <p v-if="error" class="error--text">
              {{ error }}
            </p>
            <v-btn type="submit" class="mt-3" color="dark" dark>Post</v-btn>
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
export default {
  name: "DesignCreate",
  data: function () {
    return {
      design: {
        user: "",
        designCode: "",
        image: null,
        title: "",
        type: "",
        description: "",
        tags: [],
      },
      loading: false,
      error: "",
      filter: ["Shirt", "Dress", "Hat", "Path", "Misc"],
      rules: {
        required: [(v) => !!v || "Required"],
        tags: [
          (v) => {
            if (!v || v.length < 3 || v.length > 7)
              return "Enter between 3 and 7 tags";
            if (v.length >= 3 || v.length <= 7) {
              for (const item of v) {
                if (item.length > 15)
                  return "All tags must be less than 15 characters";
              }
            }
            return true;
          },
        ],
      },
    };
  },
  methods: {
    remove(item) {
      this.design.tags.splice(this.design.tags.indexOf(item), 1);
      this.design.tags = [...this.design.tags];
    },
    onSubmit: async function () {
      if (this.$refs.form.validate()) {
        console.log("hi");
      } else {
        console.log("not valid");
      }
    },
  },
};
</script>