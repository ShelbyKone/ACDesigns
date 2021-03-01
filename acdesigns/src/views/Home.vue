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
            v-for="n in 8"
            v-bind:key="n"
            :title="title"
            :imageURL="imageURL"
            :designId="designId"
            :tags="tags"
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

export default {
  name: "Home",
  data: function () {
    return {
      title: "Flower Dress",
      imageURL:
        "https://i.pinimg.com/originals/bf/61/74/bf61742604dafed27f29956362eb7bc7.jpg",
      designId: "1234-1234-1234",
      tags: [
        "dress",
        "beige",
        "floral",
        "flowers",
        "modern inspiration",
        "belt",
        "animal crossing",
        "tan",
        "tulips",
        "summer",
      ],
      sort: ["Popular this week", "Popular this month", "New"],
      filter: ["All", "Shirts", "Dresses", "Hats", "Paths", "Misc"],
    };
  },
  components: {
    DesignCard,
  },
};
</script>