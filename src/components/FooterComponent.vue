<template>
  <footer>
    <b>myDevStats</b>
    <p>Developed by Matteo Leclercq (<a href="https://matteo-leclercq.fr">matteo-leclercq.fr</a>)<br>
      IMAC engineering training project</p>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent"
}
</script>

<style scoped>
footer {
  margin-top: 20px;
  text-align: center;
}

b {
  font-weight: 800;
}

a {
  text-decoration: underline;
  color: black;
}
</style>