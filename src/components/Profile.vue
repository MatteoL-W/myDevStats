<template>
  <h1>Yo</h1>
</template>

<script>
import { octokit } from '@/services/api/octokit'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Profile',
  props: ['username'],
}

octokit.request('GET /repos/{username}/{repo}/commits?sha={branch}&per_page=1&page=1', {
  username: 'MatteoL-W',
  repo: 'arkulib',
  branch: 'master',
}).
    then((data) => data.headers.link).
    then((result) => { return result.split(',')[1].match(/.*page=(?<page_num>\d+)/).groups.page_num}).
    then((result) => {console.log(result)})

</script>

<style scoped>

</style>