<template>
  <div class="repo">
    <div class="repo__top">
      <h2>Last pushed repositories</h2>
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
    this.moreReposLoading = true

    const repositoriesCache = sessionStorage.getItem(this.usernameGitHub + '_repositories')
    if (repositoriesCache)
      this.loadCache(repositoriesCache)

    else
      this.retrieveUserRepos()

    this.moreReposLoading = false
  },
  methods: {
    async loadCache (repositoriesCache) {
      this.repositories = JSON.parse(repositoriesCache)
      this.pageLoaded = sessionStorage.getItem(this.usernameGitHub + '_page')
    },
    async retrieveUserRepos () {
      this.pageLoaded++
      sessionStorage.setItem(this.usernameGitHub + '_page', this.pageLoaded)

      const response = await retrieveUserRepos(this.usernameGitHub, this.pageLoaded)
      this.repositories.push(...response)
      sessionStorage.setItem(this.usernameGitHub + '_repositories', JSON.stringify(this.repositories))
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
}

</style>