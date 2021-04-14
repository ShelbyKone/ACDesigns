<template>
  <div align="center">
    <v-col class="col-lg-10 col-xl-9">
      <v-row class="mt-2 mb-n8" justify="center">
        <v-select
          class="shrink"
          color="dark"
          :items="sortOptions"
          :value="sort"
          @change="changeSort"
          width="5"
          filled
          rounded
          dense
        ></v-select>
      </v-row>
      <v-row class="mx-auto" align="center" justify="center">
        <DesignCard
          v-for="design in designs"
          v-bind:key="design._id"
          :design="design"
          class="ma-3"
        />
      </v-row>
      <v-row class="mt-6 mb-3" justify="center">
        <v-btn @click="loadMore" :loading="loading">Load More</v-btn>
      </v-row>
    </v-col>
  </div>
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
      sortOptions: ["Popular", "New"],
      sort: "Popular",
      loading: false,
    };
  },
  methods: {
    loadMore: async function () {
      this.loading = true;
    },
    changeSort: async function (val) {
      this.$router.push({ name: "Home", query: { sort: val.toLowerCase() } });
    },
  },
  beforeRouteEnter(to, from, next) {
    try {
      let sort = to.query.sort ? to.query.sort : "popular";
      ds.getDesigns(sort).then((res) => {
        next((vm) => {
          vm.designs = res.data.designs;
        });
      });
    } catch (error) {
      console.log(error);
    }
  },
  beforeRouteUpdate(to, from, next) {
    try {
      let sort = to.query.sort ? to.query.sort : "popular";
      ds.getDesigns(sort).then((res) => {
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