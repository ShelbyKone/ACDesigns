<template>
  <div>
    <div>
      <v-container class="my-6">
        <v-row class="mb-n6">
          <v-col>
            <v-row justify="center">
              <v-select
                class="shrink"
                :items="sort"
                :value="sort[0]"
                filled
                rounded
                dense
              ></v-select>
              <v-select
                class="ml-3 shrink"
                :items="filter"
                :value="filter[0]"
                filled
                rounded
                dense
              ></v-select>
            </v-row>
          </v-col>
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
          <v-btn color="dark" dark>Load More</v-btn>
        </v-row>
      </v-container>
    </div>
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
      sort: ["Popular this week", "Popular this month", "New"],
      filter: ["All", "Shirts", "Dresses", "Hats", "Paths", "Misc"],
    };
  },
  beforeRouteEnter(to, from, next) {
    try {
      ds.getDesigns().then((res) => {
        next((vm) => {
          vm.designs = res.data.designs;
        });
      });
    } catch (error) {
      console.log(error); //TODO: create a 'design does not exist' page
    }
  },
  components: {
    DesignCard,
  },
};
</script>