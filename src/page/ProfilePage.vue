<template>
  <HeaderComponent></HeaderComponent>
  <ProfileInfo :username-git-hub="usernameGitHub"></ProfileInfo>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import ProfileInfo from "@/components/ProfileInfo.vue";

export default {
  name: 'ProfilePage',
  components: {ProfileInfo, HeaderComponent},
  props: {
    usernameGitHub: {type: String, required: true},
  },
}
</script>

<style scoped>

</style>