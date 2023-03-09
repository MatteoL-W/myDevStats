<template>
  <div class="header">
    <SearchBar></SearchBar>
    <h1 v-text="'<myDevStats>'"></h1>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";

export default {
  name: "HeaderComponent",
  components: {SearchBar}
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
</style>