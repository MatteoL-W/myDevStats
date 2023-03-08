<template>
  <p>Commits nb {{ commitsNumber }}</p>
</template>

<script>
import {countCommits} from '@/utils/github'

export default {
  name: 'ProfileStats',
  props: {
    username: {type: String, required: true},
  },
  data() {
    return {
      commitsNumber: null,
    }
  },
  async mounted() {
    this.commitsNumber = await this.retrieveCommitsNumber()
  },
  methods: {
    async retrieveCommitsNumber() {
      this.commitsNumber = countCommits(this.username, 'arkulib', 'master')
    },
  },
}
</script>

<style scoped>

</style>