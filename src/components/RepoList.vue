<template>
  <div class="repo__list">
    <table>
      <tr>
        <th @click="sort('name')">Name</th>
        <th @click="sort('commitsNumber')">Commits Number</th>
        <th @click="sort('stargazers_count')">Stars Number</th>
        <th @click="sort('language')">Language</th>
        <th @click="sort('updated_at')">Updated at</th>
        <th @click="sort('created_at')">Created at</th>
      </tr>

      <tr v-for="repo in sortedRepositories" :key="repo.id" @click="selectRepo(repo)">
        <td>{{ repo.name }}</td>
        <td>{{ repo.commitsNumber }}</td>
        <td>{{ repo.stargazers_count }}</td>
        <td>{{ repo.language }}</td>
        <td>{{ new Date(repo.updated_at).toLocaleString() }}</td>
        <td>{{ new Date(repo.created_at).toLocaleString() }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { eventBus } from '@/utils/event-bus-profile.js'

export default {
  name: 'RepoList',
  props: ['repositories'],
  data: () => {
    return {
      sortedRepositories: [],
      currentSort: 'created_at',
    }
  },
  methods: {
    selectRepo (repo) {
      eventBus.emit('repo-selected', repo)
    },
    sort (newSort) {
      this.currentSort = newSort
      this.sortedRepositories = [...this.repositories].sort((a, b) => {
        return (a[newSort] > b[newSort]) ? -1 : 1
      })
    },
  },
  watch: {
    repositories: {
      // eslint-disable-next-line no-unused-vars
      handler (newVal, oldVal) {
        this.sort(this.currentSort)
      },
      deep: true,
    },
  },
}
</script>

<style scoped lang="scss">
table {
  border-spacing: 10px;
  width: 100%;
  margin-bottom: 10px;

  tr, td {
    text-align: left;
  }
}
</style>