<template>
  <div>
    <div>
      <v-container class="my-3">
        <v-row class="mx-auto" justify="center">
          <DesignCard
            v-for="n in 10"
            v-bind:key="n"
            :title="title"
            :imageURL="imageURL"
            :designId="designId"
            :tags="tags"
            class="ma-3"
          />
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import DesignCard from "@/components/DesignCard";

export default {
  name: "Home",
  data: function () {
    return {
      title: "Serenity Dress",
      imageURL:
        "https://i.pinimg.com/originals/bf/61/74/bf61742604dafed27f29956362eb7bc7.jpg",
      designId: "1234",
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
    };
  },
  components: {
    DesignCard,
  },
};
</script>