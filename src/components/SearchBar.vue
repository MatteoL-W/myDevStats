<template>
  <div>
    <input type="text" placeholder="Enter a GitHub name...">
    <span></span>
  </div>
</template>

<script>
export default {
  name: "SearchBar"
}
</script>

<style scoped lang="scss">
div {
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
</style>