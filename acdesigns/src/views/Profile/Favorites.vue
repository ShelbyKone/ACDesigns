<template>
  <div>
    <v-col>
      <v-row class="mx-auto mb-2" justify="center">
         <DesignCard
            v-for="design in designs"
            v-bind:key="design._id"
            :design="design"
            class="ma-3"
          />
      </v-row>
    </v-col>
  </div>
</template>

<script>
import DesignCard from "@/components/DesignCard";
import * as fs from "../../services/FavoritesService";

export default {
  name: "Favorites",
  data: function () {
    return {
      designs: [],
    };
  },
  beforeRouteEnter(to, from, next) {
    try {
      fs.getFavorites(to.params.id).then((res) => {
        next((vm) => {
          vm.designs = res.data.user.favorites;
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