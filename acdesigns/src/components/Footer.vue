<template>
  <v-footer color="primary" padless="padless" app>
    <v-card flat tile width="100%" class="text-center" color="primary">
         <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>Shelby Kone </strong>
        <v-btn icon class="secondary--text" href="https://www.linkedin.com/in/shelbykone/" target="_blank"><i class="fab fa-linkedin fa-lg"></i></v-btn>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
    name: "Footer"
}
</script>