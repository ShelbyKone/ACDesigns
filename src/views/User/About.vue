<template>
  <v-card width="100%">
    <v-card-text>
      <v-row>
        <v-col>
          <h3>Resident Name</h3>
          <p>{{ $props.user.islandRep ? $props.user.islandRep : '-' }}</p>
        </v-col>
        <v-col>
          <h3>Island Name</h3>
          <p>{{ $props.user.islandName ? $props.user.islandName : '-' }}</p>
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
</template>

<script>
export default {
  name: "About",
  props: ["user"],
};
</script>