<template>
  <div>
    <v-col>
      <v-row class="mx-auto mb-2" justify="center">
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
    </v-col>
  </div>
</template>

<script>
import DesignCard from "@/components/DesignCard";

export default {
  name: "Designs",
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