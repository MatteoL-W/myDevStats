<template>
  <h1>{{ usernameGitHub }}</h1>
  <p>{{ user?.bio }}</p>
  <a :href="user?.blog">{{ user?.blog }}</a>
  <a :href="user?.html_url">GitHub Profile</a>
  <a :href="user?.repos_url">Repos</a>
  <img :src="user?.avatar_url" alt="">
  <p>Followers : {{ user?.followers }}</p>
  <p>Following : {{ user?.following }}</p>
</template>

<script>
import { octokit } from '@/services/api/octokit'

export default {
  name: 'ProfilePage',
  props: {
    usernameGitHub: { type: String, required: true },
  },
  data: () => {
    return {
      user: null,
    }
  },
  created () {
    this.retrieveUserInfo()
  },
  methods: {
    async retrieveUserInfo () {
      const request = await octokit.request('GET /users/{username}', {
        username: this.usernameGitHub,
      })
      this.user = await request.data
      console.log(this.user)
    },
  },
}
</script>

<style scoped>

</style>