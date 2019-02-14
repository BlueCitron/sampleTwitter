<template>
  <v-layout justify-start>
    <!-- Profile -->
    <Profile></Profile>

    <!-- Twitts -->
    <TwitWindow></TwitWindow>

  </v-layout>
</template>
<script>
import Profile from '../components/Profile.vue'
import TwitWindow from '../components/TwitWindow.vue'

export default {
  middleware: 'authenticated', // 작동안함

  components: {
    Profile,
    TwitWindow,
  },

  fetch ({ store, params }) {
    store.dispatch('FETCH_TWITS')
  },

  data: () => ({

  }),

  created () {

  }
}
</script>
