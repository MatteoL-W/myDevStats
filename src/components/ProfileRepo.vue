<template>
  <div class="repo">
    <div class="repo__top">
      <h2>Last pushed repositories</h2>
      <div class="repo__top-searchbar">
        <input type="text" placeholder="Find a repo...">
        <span></span>
      </div>
    </div>
    <RepoList :repositories="repositories"></RepoList>
    <LoadingIcon v-if="moreReposLoading"></LoadingIcon>
    <a href="#" v-on:click.prevent="retrieveUserRepos">Show more</a>
  </div>
</template>

<script>
import RepoList from '@/components/RepoList.vue'
import { retrieveUserRepos } from '@/utils/github'
import LoadingIcon from '@/components/LoadingIcon.vue'

export default {
  name: 'ProfileRepo',
  components: { LoadingIcon, RepoList },
  props: {
    usernameGitHub: { type: String, required: true },
  },
  data: () => {
    return {
      repositories: [],
      pageLoaded: 0,
      moreReposLoading: false,
    }
  },
  created () {
    this.retrieveUserRepos()
  },
  methods: {
    async retrieveUserRepos () {
      this.moreReposLoading = true
      this.pageLoaded++
      const response = await retrieveUserRepos(this.usernameGitHub, this.pageLoaded)
      this.repositories.push(...response)
      this.moreReposLoading = false
    },
  },
}

</script>

<style scoped lang="scss">

@import '@/assets/scss/variables.scss';

.repo {
  margin-top: $spacing;
  background: white;
  border-radius: $inputBorderRadius;
  padding: 10px 20px 10px 20px;
  box-shadow: $shadowDefault;

  a {
    display: block;
    width: 100%;
    color: black;
    text-align: center;
    text-decoration: underline;
  }

}

.repo__top {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-searchbar {
    display: flex;
    justify-content: space-between;
    width: 400px;
    margin-bottom: 15px;
    margin-top: 15px;

    input {
      border: 1px solid black;
      box-shadow: $shadowInput;
      border-radius: $inputBorderRadius;
      outline: none;
      font-style: italic;
      padding: 10px;
      width: 85%;
    }

    span {
      border: 1px solid black;
      box-shadow: $shadowInput;
      display: block;
      background-color: #74A3FF;
      border-radius: $inputBorderRadius;
      width: 10%;
    }
  }
}

</style>