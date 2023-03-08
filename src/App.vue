<template>
  <HomePage></HomePage>
</template>

<script>
import HomePage from '@/page/HomePage.vue'

export default {
  name: 'App',
  components: { HomePage },
}
</script>

<style>
body {
  background-image: url("@/assets/triangles_pattern.png");
  font-family: 'Inter', sans-serif;
}

html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
