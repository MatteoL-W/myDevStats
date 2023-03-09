<template>
  <div class="container">
    <ProfilePage username-git-hub="MatteoL-W"></ProfilePage>
  </div>
</template>

<script>
import ProfilePage from "@/page/ProfilePage.vue";

export default {
  name: 'App',
  components: {ProfilePage},
  // ToDo: username-git-hub from routes!
}
</script>

<style>
body {
  background-image: url("@/assets/triangles_pattern.png");
  font-family: 'Inter', sans-serif;
}

.container {
  width: 80%;
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
