<template>
  <div class="repo__list">
    <input type="text" placeholder="Search a repository" v-model="search" @keyup="sortBySearch(repositories)">
    <table>
      <tr>
        <th v-for="(col, index) in columns" :key="index" @click="sortByProperty(col)"
            :class="{ desc: col.key === activeColumn && sortOrder === 'desc', asc: col.key === activeColumn && sortOrder === 'asc' }">
          {{ col.label }}
        </th>
      </tr>
      <tr v-for="repo in sortedRepositories" :key="repo.id" @click="selectRepo(repo)">
        <td v-for="(col, index) in columns" :key="index">
          {{ getValue(repo, col) }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { eventBus } from '@/utils/event-bus-profile.js'

export default {
  name: 'RepoList',
  props: ['repositories'],
  data: () => ({
    search: '',
    sortedRepositories: [],
    activeColumn: 'updated_at',
    sortOrder: 'asc',
    columns: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'commitsNumber', label: 'Commits Number', type: 'int' },
      { key: 'stargazers_count', label: 'Stars Number', type: 'int' },
      { key: 'language', label: 'Language', type: 'text' },
      { key: 'updated_at', label: 'Updated at', type: 'date' },
      { key: 'created_at', label: 'Created at', type: 'date' },
    ],
  }),
  created () {
    this.sortByProperty(this.columns[4])
  },
  methods: {
    selectRepo (repo) {
      eventBus.emit('repo-selected', repo)
    },
    sortBySearch (array) {
      this.sortedRepositories = array.filter((repo) =>
          repo.name.toLowerCase().
              includes(this.search.toLowerCase()),
      )
    },
    sortByProperty (selectedColumn) {
      this.updateSortType(selectedColumn)

      const sortFn = this.sortOrder === 'desc' ? this.descSort : this.ascSort
      this.sortedRepositories = [...this.repositories].sort((a, b) =>
          sortFn(this.getValue(a, selectedColumn, true), this.getValue(b, selectedColumn, true)),
      )

      this.sortBySearch(this.sortedRepositories)
    },
    updateSortType (selectedColumn) {
      if (selectedColumn.key === this.activeColumn) {
        this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc'
      } else {
        this.activeColumn = selectedColumn.key ?? 'updated_at'
        this.sortOrder = 'desc'
      }
    },
    getValue (repo, column, toCompare = false) {
      switch (column.type) {
        case 'date':
          return toCompare ? new Date(repo[column.key]) : new Date(repo[column.key]).toLocaleString()

        case 'text':
          return toCompare ? repo[column.key]?.toUpperCase() : repo[column.key]

        case 'int':
          return parseInt(repo[column.key] ?? 0)

        default:
          return repo[column.key]
      }
    },
    ascSort (a, b) {
      return a > b ? 1 : -1
    },
    descSort (a, b) {
      return a > b ? -1 : 1
    },
  },
  watch: {
    repositories: {
      handler () {
        this.sortByProperty(this.activeColumn)
      },
      deep: true,
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/variables.scss';


input {
  border: 0;
  outline: 0;
  background: #EFEFEF;
  border-radius: $inputBorderRadius;
  outline: none;
  font-style: italic;
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 10px;
  width: 100%;
}

table {
  border-spacing: 10px;
  width: 100%;
  margin-bottom: 10px;

  tr, td, th {
    text-align: left;
    cursor: pointer;
  }

  th {
    position: relative;

    &.desc::after {
      position: absolute;
      right: 20px;
      content: "▼";
    }

    &.asc::before {
      position: absolute;
      right: 20px;
      content: "▲";
    }
  }
}
</style>