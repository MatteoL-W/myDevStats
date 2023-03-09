<template>
  <div class="homepage">
    <h1 v-text="'<myDevStats>'"></h1>
    <SearchBar></SearchBar>
    <GitHubLogin style="width: 400px"></GitHubLogin>
  </div>
</template>


<script>
import GitHubLogin from '@/components/GitHubLogin.vue'
import SearchBar from "@/components/SearchBar.vue";

export default {
  name: 'HomePage',
  components: {SearchBar, GitHubLogin },
}
</script>

<style scoped lang="scss">
.homepage {
  width: 100vw;
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