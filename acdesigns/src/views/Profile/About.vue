<template>
<v-col align="center">
  <v-card max-width="1000">
    <v-card-text>
      <v-row>
        <v-col>
          <h3>Resident Name</h3>
          <p>{{ $props.user.islandRep }}</p>
        </v-col>
        <v-col>
          <h3>Island Name</h3>
          <p>{{ $props.user.islandName }}</p>
        </v-col>
        <v-col>
          <h3>Creator Code</h3>
          <p>{{ $props.user.creatorCode ? $props.user.creatorCode : '-' }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h3>About</h3>
          <p>
            {{ $props.user.about ? $props.user.about : '-' }}
          </p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</v-col>
</template>

<script>
export default {
  name: "About",
  props: ["user"],
};
</script>