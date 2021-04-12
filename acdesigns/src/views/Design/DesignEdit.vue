<template>
  <v-container v-if="design">
    <v-row class="justify-center mt-1">
      <v-col class="col-md-10 col-lg-8 col-xl-6" align="center">
        <v-form class="mb-3" ref="form" v-on:submit.prevent="onSubmit">
          <v-text-field
            v-model="design.title"
            label="Title"
            :rules="rules.title.concat(rules.required)"
            color="dark"
            filled
            dense
          >
          </v-text-field>
          <v-text-field
            v-model="design.designCode"
            label="Design Code"
            :rules="rules.designCode"
            color="dark"
            filled
            dense
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
            color="dark"
            filled
            dense
          ></v-select>
          <v-combobox
            v-model="design.tags"
            label="Tags"
            color="dark"
            :rules="rules.tags"
            hint="Enter between 3 and 6 tags"
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
            v-model="image"
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
import * as ds from "../../services/DesignService";
import FormData from "form-data";

export default {
  name: "DesignCreate",
  data: function () {
    return {
      design: null,
      image: null,
      loading: false,
      error: "",
      filter: ["Shirt", "Dress", "Hat", "Path", "Misc"],
      rules: {
        required: [(v) => !!v || "Required"],
        title: [
          (v) => v.length < 30 || "Title must be less than 30 characters",
        ],
        designCode: [
          (v) =>
            v.length == 17 ||
            "Design code must follow format MO-1234-1234-1234",
        ],
        tags: [
          (v) => {
            if (!v || v.length < 3 || v.length > 6)
              return "Enter between 3 and 6 tags";
            if (v.length >= 3 || v.length <= 6) {
              for (const item of v) {
                if (item.length > 14)
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
        this.loading = true;

        let formData = new FormData();
        formData.append("_id", this.design._id);
        formData.append("user", this.design.user._id);
        formData.append("title", this.design.title);
        formData.append("designCode", this.design.designCode);
        formData.append("description", this.design.description);
        formData.append("type", this.design.type);
        formData.append("tags", JSON.stringify(this.design.tags));

        if (this.image) {
          formData.append("image", this.image);
        }

        try {
          let res = await ds.updateDesign(formData);
          this.$router.push({ name: "Design", params: { id: res.data.id } });
        } catch (error) {
          this.loading = false;
          this.error = error;
        }
      }
    },
  },
  beforeRouteEnter: async function (to, from, next) {
    try {
      let res = await ds.getDesign(to.params.id);
      next((vm) => {
        vm.design = res.data.design;
      });
    } catch (error) {
      console.log(error); //TODO: redirect if design doesn't exist
    }
  },
};
</script>