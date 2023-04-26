<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style lang="scss">
body {
  background-image: url("@/assets/img/triangles_pattern.png");
  font-family: 'Inter', sans-serif;
}

.container {
  width: 96%;

  @media all and (min-width: 1000px) {
    width: 80%;
  }

  margin: 0 auto;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
}
</style>
