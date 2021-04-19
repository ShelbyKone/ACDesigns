<template>
  <v-footer dark padless>
    <v-row justify="center" no-gutters class="dark">
      <v-card flat tile class="dark text-center" max-width="1000">
        <v-card-text class="pt-3">
          <v-btn class="mx-4" icon>
            <v-icon size="24px"> mdi-linkedin </v-icon>
          </v-btn>
          <v-btn class="mx-4" icon>
            <v-icon size="24px"> mdi-reddit </v-icon>
          </v-btn>
          <v-btn class="mx-4" icon>
            <v-icon size="24px"> mdi-twitter </v-icon>
          </v-btn>
        </v-card-text>
        <v-card-text class="hidden-xs-only pt-0 pb-3 mt-n3">
          ACDesigns was created as my senior capstone project for my bachelors
          degree. I love the Animal Crossing games, so when I had no ideas for
          my project I figured I might as well do something fun! ACDesigns is my
          personal project and is no way affiliated with Nintendo.
        </v-card-text>
      </v-card>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>