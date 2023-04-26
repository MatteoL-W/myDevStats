<template>
  <a href="#">Log-in with GitHub</a>
</template>

<script>
export default {
  name: 'GitHubLogin',
}
</script>

<style scoped lang="scss">
a {
  overflow: hidden;
  position: relative;
  display: block;
  width: 100%;
  padding: 15px 0 15px 0;
  text-align: center;

  background: #74A3FF;
  color: black;
  font-weight: bold;

  border-radius: $inputBorderRadius;
}

a::before {
  content: "";
  position: absolute;
  top: -10%;
  left: 10%;

  background-image: url('@/assets/img/github-mark.svg');
  background-repeat: no-repeat;
  width: 60px;
  height: 60px;
  background-size: cover;
}
</style>