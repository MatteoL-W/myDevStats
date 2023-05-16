<template>
  <input type="text" placeholder="Search a repository" v-model="search" @keyup="handleKeyUp">
</template>

<script>
export default {
  name: 'RepoSearchBar',
  data: () => ({
    search: '',
  }),
  emits: ['searchValue'],
  methods: {
    handleKeyUp () {
      this.cleanSearchInput()
      this.$emit('searchValue', { data: this.search });
    },
    cleanSearchInput () { this.search = this.search.trim() },
  },
}
</script>

<style scoped lang="scss">
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
</style>