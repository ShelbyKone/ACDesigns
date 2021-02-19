<template>
  <v-app>
    <Navbar />
    <v-main>
      <Alert />
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<style>
#app {
  background: #f8f3e7
}
</style>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Alert from "@/components/Alert"

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
    Alert,
  },
};
</script>
