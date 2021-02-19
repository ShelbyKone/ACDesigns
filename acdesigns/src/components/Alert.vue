<template>
  <div>
    <v-alert
      v-model="alert"
      color="dark"
      class="rounded-0 text-center"
      transition="slide-y-transition"
      dense
      text
      dismissible
      app
    >
      Want to post designs and save your favorites? Register
      <router-link to="/register">here</router-link>!
    </v-alert>
  </div>
</template>

<script>
export default {
  name: "Alert",
  data: function () {
    return {
      alert: true,
    };
  },
};
</script>