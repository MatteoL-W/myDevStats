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

  computed: {
    repositoriesCacheKey () {
      return `${this.usernameGitHub}_repositories`
    },
    pageCacheKey () {
      return `${this.usernameGitHub}_page`
    },
  },

  created () {
    this.loadRepos()
  },

  methods: {
    loadRepos () {
      const repositoriesCache = sessionStorage.getItem(this.repositoriesCacheKey)
      if (repositoriesCache)
        this.loadCache(repositoriesCache)

      else
        this.retrieveUserRepos()
    },

    async loadCache (repositoriesCache) {
      this.moreReposLoading = true
      this.repositories = JSON.parse(repositoriesCache)
      this.pageLoaded = sessionStorage.getItem(this.pageCacheKey)
      this.moreReposLoading = false
    },

    async retrieveUserRepos () {
      this.moreReposLoading = true
      this.pageLoaded++
      sessionStorage.setItem(this.pageCacheKey, this.pageLoaded)

      const response = await retrieveUserRepos(this.usernameGitHub, this.pageLoaded)
      this.repositories.push(...response)
      sessionStorage.setItem(this.repositoriesCacheKey, JSON.stringify(this.repositories))
      this.moreReposLoading = false
    },
  },
}

</script>

<style scoped lang="scss">
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