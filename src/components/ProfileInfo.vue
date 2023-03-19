<template>
  <div class="info">
    <ProfileDataVisualization :username="usernameGitHub"></ProfileDataVisualization>
    <div class="info__cards">
      <!-- ToDo: In component -->
      <div class="info__cards-github">

        <div class="top">
          <img :src="user?.avatar_url" alt="">
          <div>
            <h2>{{ usernameGitHub }}</h2>
            <p>{{ user?.name }}</p>
            <p>Web: <a :href="user?.blog">{{ user?.blog }}</a></p>
          </div>
        </div>

        <div class="bottom">
          <p>{{ user?.bio }}</p>
          <p>GitHub: <a :href="user?.html_url">{{ user?.html_url }}</a></p>
          <p>{{ user?.followers }} followers · {{ user?.following }} following</p>
        </div>
      </div>

      <!-- ToDo: In component -->
      <a class="info__cards-generate" :href="usernameGitHub + '/card'">Generate GitHub Card</a>
    </div>
  </div>
</template>

<script>
import { octokit } from '@/services/api/octokit'
import ProfileDataVisualization from "@/components/ProfileDataVisualization.vue";

export default {
  name: 'ProfileInfo',
  components: {ProfileDataVisualization},
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

    &-github {
      a {
        color: black;
        text-decoration: underline;
      }

      background: white;
      overflow: hidden;
      border-radius: $cardBorderRadius;
      box-shadow: $shadowDefault;

      .top {
        height: 100px;
        display: flex;
        background: #D9D9D9;

        > div {
          padding: 15px 15px 15px 25px;
        }
      }

      .bottom {
        padding: 30px;
        line-height: 30px;
      }
    }

    &-generate {
      background: #C0C0C0;
      border-radius: $cardBorderRadius;
      box-shadow: $shadowDefault;
      color: black;

      font-weight: bold;
      text-align: center;
      padding: 20px;
      margin-top: $spacing;
    }
  }
}

</style>