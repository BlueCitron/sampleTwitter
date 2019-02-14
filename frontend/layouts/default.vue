<template>
  <!-- <nuxt/> -->
  <v-app id="inspire">
    <v-toolbar color="indigo" dark fixed app dense>
      <v-toolbar-title>CITRON TWITTER</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <nuxt/>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import Profile from '../components/Profile.vue'
import TwitWindow from '../components/TwitWindow.vue'

export default {
  components: {
    Profile,
    TwitWindow,
  },

  data: () => ({

  }),

}
</script>
<style>
main {
  background: url('~assets/bg.jpg');
  background-size: cover;
  opacity: 0.85;
}
</style>
