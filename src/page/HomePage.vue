<template>
  <div class="homepage">
    <h1 v-text="'<myDevStats>'"></h1>
    <div class="homepage__searchbar">
      <input type="text" placeholder="Enter a GitHub name...">
      <span></span>
    </div>
    <GitHubLogin style="width: 400px"></GitHubLogin>
  </div>
</template>


<script>
import GitHubLogin from '@/components/GitHubLogin.vue'

export default {
  name: 'HomePage',
  components: { GitHubLogin },
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

  &__searchbar {
    display: flex;
    justify-content: space-between;
    width: 400px;
    margin-bottom: 15px;
    margin-top: 15px;

    input {
      border: 0;
      border-radius: 10px;
      outline: none;
      font-style: italic;
      padding: 10px;
      width: 80%;
    }

    span {
      display: block;
      background-color: #74A3FF;
      border-radius: 10px;
      width: 10%;
    }
  }
}

h1 {
  margin: 0;
}
</style>