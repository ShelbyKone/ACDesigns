<template>
  <div align="center">
    <v-col class="col-lg-10 col-xl-9">
      <v-row class="mt-2 mb-n8" justify="center">
        <v-select
          class="shrink"
          color="dark"
          :items="sortOptions"
          :value="sort"
          :loading="loading"
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
        <v-btn v-if="more" @click="loadMore" :loading="loading"
          >Load More</v-btn
        >
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
      sortOptions: ["popular", "new"],
      sort: "popular",
      page: 0,
      loading: false,
      more: true,
    };
  },
  methods: {
    loadMore: async function () {
      this.loading = true;
      this.page++;
      try {
        ds.getDesigns(this.sort, this.page).then((res) => {
          this.loading = false;
          if (res.data.designs.length < 12) this.more = false;
          this.designs = this.designs.concat(res.data.designs);
        });
      } catch (error) {
        console.log(error);
      }
    },
    changeSort: async function (val) {
      this.loading = true;
      this.$router.replace({
        name: "Home",
        query: { sort: val },
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    try {
      let sort = to.query.sort ? to.query.sort : "popular";
      ds.getDesigns(sort, 0).then((res) => {
        next((vm) => {
          vm.designs = res.data.designs;
          vm.sort = sort;
        });
      });
    } catch (error) {
      console.log(error);
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.page = 0;
    let sort = to.query.sort ? to.query.sort : "popular";
    try {
      ds.getDesigns(sort, 0).then((res) => {
        this.loading = false;
        this.designs = res.data.designs;
        next();
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