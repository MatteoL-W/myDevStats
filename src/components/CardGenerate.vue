<template>
  <a class="info__cards-generate" href="card">Generate GitHub Card</a>
</template>

<script>
export default {
  name: 'CardGenerate',
  props: {
    usernameGitHub: { type: String, required: true },
  },
}
</script>

<style scoped lang="scss">
.info__cards-generate {
  background: #C0C0C0;
  border-radius: $cardBorderRadius;
  box-shadow: $shadowDefault;
  color: black;

  font-weight: bold;
  text-align: center;
  padding: 20px;
  margin-top: $spacing;
}
</style>
