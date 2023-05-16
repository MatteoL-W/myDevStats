<template>
  <div class="repo__list">
    <RepoSearchBar @searchValue="updateSearchValue"/>
    <table>
      <tr>
        <th v-for="(column, index) in columns" :key="index" @click="sortByProperty(column)"
            :class="{ desc: column.key === activeColumn && sortOrder === 'desc', asc: column.key === activeColumn && sortOrder === 'asc' }">
          {{ column.label }}
        </th>
      </tr>
      <tr v-for="repository in sortedRepositories" :key="repository.id" @click="selectRepo(repository)">
        <td v-for="(column, index) in columns" :key="index">
          {{ getValue(repository, column) }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { eventBus } from '@/utils/event-bus-profile.js'
import RepoSearchBar from '@/components/RepoSearchBar.vue'

export default {
  name: 'RepoList',
  components: { RepoSearchBar },
  props: ['repositories'],
  data: () => ({
    search: '',
    activeColumn: 'updated_at',
    sortOrder: 'desc',
  }),

  computed: {
    columns () {
      let columns = [
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'commitsNumber', label: 'Commits Number', type: 'int' },
        { key: 'stargazers_count', label: 'Stars Number', type: 'int' },
        { key: 'language', label: 'Language', type: 'text' },
        { key: 'pushed_at', label: 'Updated at', type: 'date' },
        { key: 'created_at', label: 'Created at', type: 'date' },
      ]

      if (window.innerWidth < 500) {
        columns.pop() // -created_at
        columns.splice(3, 1) // -language
        columns.splice(2, 1) // -stargazers_count
      } else if (window.innerWidth < 700) {
        columns.pop() // -created_at
      }

      return columns
    },
    sortedRepositories () {
      const sortFn = this.sortOrder === 'desc' ? this.descSort : this.ascSort
      const sorted = [...this.repositories].sort((a, b) =>
          sortFn(
              this.getValue(a, this.selectedColumn, true),
              this.getValue(b, this.selectedColumn, true),
          ),
      )

      return this.search
          ? sorted.filter(repository => repository.name.toLowerCase().
              includes(this.search.toLowerCase()))
          : sorted
    },
    selectedColumn () {
      return this.columns.find(column => column.key === this.activeColumn)
          || this.columns.find(column => column.key === 'pushed_at')
    },
  },

  created () {
    this.activeColumn = this.selectedColumn.key
  },

  methods: {
    updateSearchValue (newValue) { this.search = newValue.data },
    ascSort (a, b) { return a > b ? 1 : -1 },
    descSort (a, b) { return a > b ? -1 : 1 },

    selectRepo (repository) { eventBus.emit('repo-selected', repository) },

    sortByProperty (selectedColumn) {
      if (selectedColumn.key === this.activeColumn) {
        this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc'
      } else {
        this.activeColumn = selectedColumn.key ?? 'updated_at'
        this.sortOrder = 'desc'
      }
    },

    // Sometimes, we want the value to display it or to compare it.
    // We don't want the same value depending on these two.
    getValue (repository, column, toCompare = false) {
      switch (column.type) {
        case 'date':
          return toCompare ? new Date(repository[column.key]) : new Date(repository[column.key]).toLocaleString()

        case 'text':
          return toCompare ? repository[column.key]?.toUpperCase() : repository[column.key]

        case 'int':
          return parseInt(repository[column.key] ?? 0)

        default:
          return repository[column.key]
      }
    },
  },
}
</script>

<style scoped lang="scss">
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