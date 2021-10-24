<script setup lang="ts">
import FlagList from "../components/Flag-list.vue";
</script>

<template>
  <section class="section">
    <div class="container mb-6">
      <figure>
        <img src="../assets/monde.png" alt="Cliquez sur la zone de votre pays" width="1000" height="680" usemap="#world-map"/>
        <map name="world-map">
          <area target="_blank" alt="Amérique du nord" title="Amérique du nord" href="#north-america" coords="18,99,388,428" shape="rect">
          <area target="_blank" alt="Amérique du sud" title="Amérique du sud" href="#south-america" coords="148,434,400,650" shape="rect">
          <area target="_blank" alt="Europe" title="Europe" href="#europe" coords="421,195,603,370" shape="rect">
          <area target="_blank" alt="Afrique" title="Afrique" href="#africa" coords="421,376,603,582" shape="rect">
          <area target="_blank" alt="Asie" title="Asie" href="#asia" coords="610,128,983,450" shape="rect">
          <area target="_blank" alt="Australie" title="Australie" href="#autralia" coords="713,457,983,618" shape="rect">
        </map>
      </figure>
    </div>
    <div class="container">
      <FlagList></FlagList>
    </div>
  </section>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
