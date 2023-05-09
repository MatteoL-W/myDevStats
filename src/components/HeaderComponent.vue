<template>
  <div class="header">
    <SearchBar></SearchBar>
    <router-link to="/">
      <h1 v-text="'<myDevStats>'"></h1>
    </router-link>
  </div>
</template>

<script>
import SearchBar from '@/components/ProfileSearchBar.vue'

export default {
  name: 'HeaderComponent',
  components: { SearchBar },
}
</script>

<style scoped lang="scss">
a {
  color: black;
}

.header {
  width: 100%;

  display: flex;
  flex-direction: column-reverse;
  align-items: center;

  @media all and (min-width: 800px) {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>