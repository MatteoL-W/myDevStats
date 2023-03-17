<template>
  <div class="repo__list">
    <table>
      <tr>
        <th>Name</th>
        <th>Commits Number</th>
        <th>Stars Number</th>
        <th>Language</th>
        <th>Updated at</th>
        <th>Created at</th>
      </tr>

      <tr v-for="repo in repositories" :key="repo.id">
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

export default {
  name: 'RepoList',
  props: ['repositories'],
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