<template>
  <v-row class="mt-6 mb-6" justify="center">
    <v-col class="col-sm-12 col-md-12 col-lg-10 col-xl-9">
      <v-row justify="center" class="mb-n7">
        <v-select
          class="shrink"
          color="dark"
          :items="sort"
          :value="sort[0]"
          filled
          rounded
          dense
        ></v-select>
      </v-row>
      <v-row class="mx-auto" justify="center">
        <DesignCard
          v-for="design in designs"
          v-bind:key="design._id"
          :design="design"
          class="ma-3"
        />
      </v-row>
      <v-row class="mt-6" justify="center">
        <v-btn @click="loadMore" :loading="loading">Load More</v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>

<style>
.v-select__selections input {
  max-width: 11px;
}
</style>

<script>
import DesignCard from "@/components/DesignCard";
import * as ds from "../services/DesignService";

export default {
  name: "Home",
  data: function () {
    return {
      designs: [],
      sort: ["Popular", "New"],
      loading: false,
    };
  },
  methods: {
    loadMore: async function() {
      this.loading = true
    }
  },
  beforeRouteEnter(to, from, next) {
    try {
      ds.getDesigns().then((res) => {
        next((vm) => {
          vm.designs = res.data.designs;
        });
      });
    } catch (error) {
      console.log(error);
    }
  },
  components: {
    DesignCard,
  },
};
</script>