<template>
  <v-flex class="mx-5">
    <v-flex md8 :class="{ 'mx-5': true, 'my-3': index != 0 }" v-for="(twit, index) in this.$store.state.twits">
      <v-card>
        <v-card-title>
          <h3> {{ twit.user.nick }} </h3>
          <h6 class="mx-4"> {{ $timeago.ago(twit.createdAt) }}</h6>
        </v-card-title>
        <v-card-text>
          <div>
            {{ twit.content }}
          </div>

          <h5 class="mt-4">{{ hashtags(twit.hashtags) }}</h5>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-flex>
</template>
<script>
export default {
  methods: {
    hashtags (hashtags) {
      const result = hashtags
                      //.map(hashtag => `#${hashtag.content}`)
                      .reduce((str, hashtag) => str += `${hashtag.content} `, '')
      return result
    }
  }
}
</script>
