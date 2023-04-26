<template>
  <div>
    <p><span>{{ usernameGitHub }}</span> user not found, please try again</p>
    <SearchBar></SearchBar>
  </div>
</template>

<script>
import SearchBar from '@/components/ProfileSearchBar.vue'

export default {
  name: 'InvalidUserComponent',
  components: { SearchBar },
  props: {
    usernameGitHub: { type: String, required: true },
  },
}
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
}

p {
  font-weight: bold;
}

span {
  font-style: italic;
}
</style>