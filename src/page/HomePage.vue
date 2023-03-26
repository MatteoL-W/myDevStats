<template>
  <div class="homepage">
    <h1 v-text="'<myDevStats>'"></h1>
    <SearchBar></SearchBar>
  </div>
</template>


<script>
import SearchBar from '@/components/ProfileSearchBar.vue'

export default {
  name: 'HomePage',
  components: { SearchBar},
}
</script>

<style scoped lang="scss">
.homepage {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  margin: 0;
}
</style>