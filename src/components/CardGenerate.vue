<template>
  <router-link class="info__cards-generate" :to="{
    name: 'card',
    params: { usernameGitHub: usernameGitHub }
  }">Generate GitHub Card
  </router-link>
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
