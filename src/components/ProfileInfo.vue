<template>
  <div class="info" v-if="userExistsData">
    <ProfileDataVisualization :username="usernameGitHub"></ProfileDataVisualization>
    <div class="info__cards">
      <CardGithub :usernameGitHub="usernameGitHub" :user="user"/>
      <CardGenerate :username-git-hub="usernameGitHub"/>
    </div>
  </div>
</template>

<script>
import { octokit } from '@/services/api/octokit'
import ProfileDataVisualization from '@/components/ProfileDataVisualization.vue'
import CardGithub from '@/components/CardGithub.vue'
import CardGenerate from '@/components/CardGenerate.vue'

export default {
  name: 'ProfileInfo',
  components: { CardGenerate, CardGithub, ProfileDataVisualization },
  props: {
    usernameGitHub: { type: String, required: true },
  },
  emits: ['userExists'],
  data: () => {
    return {
      user: null,
      userExistsData: true,
    }
  },
  created () {
    const profileCache = localStorage.getItem(this.usernameGitHub + '_info')
    if (profileCache)
      this.loadCache(profileCache)

    else
      this.retrieveUserInfo()
  },
  methods: {
    async retrieveUserInfo () {
      let response

      try {
        response = await octokit.request('GET /users/{username}', {
          username: this.usernameGitHub,
        })
      } catch (error) {
        this.$emit('userExists', { data: false })
        this.userExistsData = false
        return
      }

      localStorage.setItem(this.usernameGitHub + '_info', JSON.stringify(response.data))
      this.$emit('userExists', { data: true })
      this.user = await response.data
    },
    async loadCache (profileCache) {
      this.user = JSON.parse(profileCache)
      this.$emit('userExists', { data: true })
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/variables.scss';

.info {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: $spacing;
  margin-top: 10px;

  &__data {
    background: white;
    border-radius: $cardBorderRadius;
    width: 100%;
    display: flex;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    box-shadow: $shadowDefault;
  }

  &__cards {
    display: flex;
    flex-direction: column;
  }
}

</style>