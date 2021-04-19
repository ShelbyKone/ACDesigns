<template>
  <div align="center">
    <v-col class="col-lg-10 col-xl-9">
      <v-row class="mt-2 mb-n8" justify="center">
        <v-select
          class="shrink"
          color="dark"
          :items="filterOptions"
          :value="filter"
          :loading="loading"
          @change="changeFilter"
          width="5"
          filled
          rounded
          dense
        ></v-select>
      </v-row>
      <v-row justify="center">
        <h4 class="subtle--text mt-3 mb-1 font-weight-light">
          showing search results for "{{ this.$route.query.term }}"
        </h4>
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
  name: "Search",
  data: function () {
    return {
      designs: [],
      term: "",
      page: 0,
      filterOptions: [
        "all",
        "artwork",
        "cushion",
        "dress",
        "face cutout",
        "face decor",
        "flag",
        "floor decor",
        "food",
        "hat",
        "other",
        "path",
        "phone case",
        "shirt",
        "sign",
        "simple panel",
        "stall",
        "uchiwa fan",
        "umbrella",
      ],
      filter: "all",
      loading: false,
      more: true,
    };
  },
  methods: {
    loadMore: async function () {
      this.loading = true;
      this.page++;
      try {
        ds.searchDesigns(this.term, this.filter, this.page).then((res) => {
          this.loading = false;
          if (res.data.designs.length < 12) this.more = false;
          this.designs = this.designs.concat(res.data.designs);
        });
      } catch (error) {
        console.log(error);
      }
    },
    changeFilter: function (val) {
      this.loading = true;
      this.$router.replace({
        name: "Search",
        query: { term: this.term, filter: val },
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    try {
      let term = to.query.term ? to.query.term : "";
      let filter = to.query.filter ? to.query.filter : "all";
      ds.searchDesigns(term, filter, 0).then((res) => {
        next((vm) => {
          vm.more = res.data.designs.length < 12 ? false : true;
          vm.designs = res.data.designs;
          vm.term = term;
          vm.filter = filter;
        });
      });
    } catch (error) {
      console.log(error);
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.page = 0;
    let term = to.query.term ? to.query.term : "";
    let filter = to.query.filter ? to.query.filter : "all";
    try {
      ds.searchDesigns(term, filter, 0).then((res) => {
        this.more = res.data.designs.length < 12 ? false : true;
        this.loading = false;
        this.term = term;
        this.filter = filter;
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