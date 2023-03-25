<template>
  <div>
    <p><span>{{usernameGitHub}}</span> user not found, please try again</p>
    <SearchBar></SearchBar>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";

export default {
  name: "ErrorComponent",
  components: {SearchBar},
  props: {
    usernameGitHub: {type: String, required: true},
  },
}
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
}

p {
  font-weight: bold;
}

span {
  font-style: italic;
}
</style>