<template>
  <div class="info__cards-github">
    <div class="top">
      <img :src="user?.avatar_url" alt="{{usernameGitHub}}">
      <div>
        <h2>{{ usernameGitHub }}</h2>
        <p v-show="user?.name !== null">{{ user?.name }}</p>
        <p v-show="user?.blog !== ''">Web: <a :href="'https://' +  user?.blog">{{ user?.blog }}</a></p>
      </div>
    </div>

    <div class="bottom">
      <p v-show="user?.bio !== null">{{ user?.bio }}</p>
      <p>GitHub: <a :href="user?.html_url">{{ user?.html_url }}</a></p>
      <p>{{ user?.followers }} followers · {{ user?.following }} following</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardGithub',
  props: {
    usernameGitHub: { type: String, required: true },
    user: { required: true },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/variables.scss';

.info__cards-github {
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

    h2 {
      display: inline-block;
    }

    > div {
      padding: 15px 15px 15px 25px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  .bottom {
    padding: 30px;
    line-height: 30px;
  }
}
</style>