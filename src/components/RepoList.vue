<template>
  <div class="repo__list">
    <table>
      <tr>
        <th v-for="(col, index) in columns" :key="index" @click="sort(col)"
            :class="{ active: col.key === activeColumn }">
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
import {eventBus} from "@/utils/event-bus-profile.js";

export default {
  name: "RepoList",
  props: ["repositories"],
  data: () => ({
    sortedRepositories: [],
    activeColumn: "updated_at",
    sortOrder: "desc",
    columns: [
      {key: "name", label: "Name", type: "text"},
      {key: "commitsNumber", label: "Commits Number", type: "int"},
      {key: "stargazers_count", label: "Stars Number", type: "int"},
      {key: "language", label: "Language", type: "text"},
      {key: "updated_at", label: "Updated at", type: "date"},
      {key: "created_at", label: "Created at", type: "date"}
    ]
  }),
  methods: {
    selectRepo(repo) {
      eventBus.emit("repo-selected", repo);
    },
    sort(selectedColumn) {
      if (selectedColumn.key === this.activeColumn) {
        this.sortOrder = this.sortOrder === "desc" ? "asc" : "desc";
      } else {
        this.activeColumn = selectedColumn.key;
        this.sortOrder = "desc";
      }

      const sortFn = this.sortOrder === "desc" ? this.descSort : this.ascSort;
      this.sortedRepositories = [...this.repositories].sort((a, b) =>
          sortFn(this.getValue(a, selectedColumn), this.getValue(b, selectedColumn))
      );
    },
    getValue(repo, column) {
      switch (column.type) {
        case "date":
          return new Date(repo[column.key]).toLocaleString();

        case "int":
          return parseInt(repo[column.key]);

        default:
          return repo[column.key];
      }
    },
    ascSort(a, b) {
      return a > b ? 1 : -1;
    },
    descSort(a, b) {
      return a > b ? -1 : 1;
    },
  },
  watch: {
    repositories: {
      handler() {
        this.sort(this.activeColumn);
      },
      deep: true
    }
  }
};
</script>
<style scoped lang="scss">
table {
  border-spacing: 10px;
  width: 100%;
  margin-bottom: 10px;

  tr,
  td {
    text-align: left;
  }

  th {
    text-align: left;
    cursor: pointer;

    &.active {
      color: red;
    }
  }
}
</style>