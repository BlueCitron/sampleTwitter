<template>
  <v-flex class="mr-5">
    <v-flex xs8 md8 :class="{ 'mx-5': true, 'my-3': index != 0 }" v-for="(twit, index) in this.$store.state.twits">
      <v-card>
        <v-card-title>
          <h3> {{ twit.user.nick }} </h3>
          <h6 class="mx-4"> {{ $timeago.ago(twit.createdAt) }}</h6>
          <!-- 팔로우 버튼 -->
          <v-btn
          v-if="twit.user.id != $store.state.user.id"
          small
          outline
          color="indigo"
          @click="unfollow(twit)"
          >UnFollow</v-btn>
        </v-card-title>
        <v-card-text>
          <div>
            {{ twit.content }}
          </div>

          <h5 class="mt-4">{{ hashtags(twit.hashtags) }}</h5>
        </v-card-text>
        <v-card-actions>
          <v-btn flat icon color="pink" @click="like(twit)">
            <v-icon>{{ isLike(twit) }}</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-flex>
</template>
<script>
export default {
  methods: {
    hashtags (hashtags) {
      const result = hashtags.reduce((str, hashtag) => str += `${hashtag.content} `, '')
      return result
    },
    isLike (twit) {
      const { LikeFrom } = twit
      const findResult = LikeFrom.find(user => user.id == this.$store.state.user.id)
      return findResult ? 'favorite' : 'favorite_border'
    },
    like (twit) {
      const status = this.isLike(twit) === 'favorite' ? true :false

      if (status) {
        // 좋아요 취소 // Like -> Unlike
        // 요청 보냄
        // LikeFrom에서 삭제
        this.$store.dispatch('UNLIKE_TWIT', { twit_id: twit.id })
      } else {
        // 좋아요 // Unlike -> Like
        // 요청보냄
        // LikeFrom에 FakeData 추가
        this.$store.dispatch('LIKE_TWIT', { twit_id: twit.id })
      }
    },
    async unfollow (twit) {
      await this.$store.dispatch('UNFOLLOW', { user_id: twit.user.id })
      await this.$store.dispatch('FETCH_TWITS')
    },
  }
}
</script>
