<template>
  <v-flex md4 class="mx-5">
    <v-card height="220" class="profile-card">

      <v-card-title>
        <h3 class="font-weight-bold">{{ this.$store.state.user.nick }}님 안녕하세요</h3>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <v-layout justify-around>
          <v-flex class="text-md-center font-weight-bold">
            <div class="font-weight-bold subheading">트윗</div>
            <div> 124 </div>
          </v-flex>
          <v-flex class="text-md-center font-weight-bold">
            <div class="font-weight-bold subheading">팔로워</div>
            <div> 1,243,102 </div>
          </v-flex>
          <v-flex class="text-md-center font-weight-bold">
            <div class="font-weight-bold subheading">팔로워</div>
            <div> 38 </div>
          </v-flex>
        </v-layout>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- <v-btn outline color="success" nuxt to="/new">새로운 트윗</v-btn> -->
        <v-layout row justify-center>
          <v-dialog v-model="dialog" persistent max-width="600">
            <v-btn slot="activator" outline color="indigo lighter-1">새로운 트윗</v-btn>
            <v-card>
              <v-card-title class="subheading">트윗 날리기</v-card-title>
              <v-card-text>
                <v-textarea
                v-model="newTwit"
                box
                :label="newTwitLabel"
                ></v-textarea>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="indigo lighter-1" flat @click="post_twit()">트윗!</v-btn>
                <v-btn color="red darken-1" flat @click="dialog = false">취소</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
        <v-btn outline color="secondary" @click="logout()">로그아웃</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>
<script>
export default {
  data () {
    return {
      dialog: false,
      newTwit: '',
    }
  },

  props: {
    sendNewTwit: Function
  },

  computed: {
    newTwitLabel () {
      return `${this.newTwit.length}/140`
    }
  },

  methods: {
    post_twit () {
      this.$store.dispatch('POST_TWIT', { content: this.newTwit })
    },
    logout () {
      const { dispatch, commit } = this.$store
      dispatch('LOGOUT')
        .then(response => {
          const { data } = response
          if (data.success) {
            commit ('SET_USER', {})
            this.$router.push('/login')
          }
        })
    }
  }
}
</script>
<style scoped>
.profile-card {
  position: fixed;
  width: 350px;
}
</style>
