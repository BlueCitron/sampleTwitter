<template>
  <v-layout justify-center align-center>
    <v-flex md3 class="login-form">
      <v-card>
        <v-card-title class="text-md-center">
          <h2>
            LOGIN
          </h2>
        </v-card-title>
        <v-card-text class="px-3">
          <v-text-field
          v-model="email"
          label="Username"
          placeholder="Username"
          ></v-text-field>
          <v-text-field
          v-model="password"
          type="password"
          label="Password"
          placeholder="Password"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
          color="indigo"
          outline
          large
          style="width: 100%;"
          @click="login()"
          >login</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data () {
    return {
      email: '',
      password: '',
    }
  },

  methods: {
    login () {
      const { email, password } = this
      const { dispatch, commit } = this.$store
      dispatch('LOGIN', { email, password })
        .then(({ data }) => {
          const { success } = data
          if (success) {
            const { id, email, nick, accessToken } = data
            commit ('SET_USER', { id, email, nick })
            commit ('SET_ACCESS_TOKEN', accessToken)
            this.$router.push('/')
          }
          this.$router.push('/login')
        })
    },
  },
}
</script>
<style scoped>
.login-form {
  opacity: 1;
}
</style>
