<script setup lang="ts">
import FlagList from "../components/Flag-list.vue";
import { ref } from "vue";

let visibleContinent = ref("");

const scrollTo = ($event: KeyboardEvent, continent: string): void => {
  $event.preventDefault();
  location.hash = `#${continent}`;
  const element = document.getElementById(continent);
  if (element) {
    element.scrollIntoView(false);
  }
  visibleContinent.value = continent;
};

const changeContinent = (continent: string) => {
  if (visibleContinent.value === continent) {
    visibleContinent.value = "";
  } else {
    visibleContinent.value = continent;
  }
};
</script>

<template>
  <section class="section">
    <div class="container mb-6 is-hidden-touch">
      <figure>
        <img
          id="map"
          src="../assets/monde.png"
          alt="Cliquez sur la zone de votre pays"
          width="1000"
          height="680"
          usemap="#world-map"
        />
        <map name="world-map">
          <area
            target="_blank"
            alt="Amérique du nord"
            title="Amérique du nord"
            href="#amerique"
            coords="18,99,388,428"
            shape="rect"
            @click="scrollTo($event, 'amerique')"
          />
          <area
            target="_blank"
            alt="Amérique du sud"
            title="Amérique du sud"
            href="#amerique"
            coords="148,434,400,650"
            shape="rect"
            @click="scrollTo($event, 'amerique')"
          />
          <area
            target="_blank"
            alt="Europe"
            title="Europe"
            href="#europe"
            coords="421,195,603,370"
            shape="rect"
            @click="scrollTo($event, 'europe')"
          />
          <area
            target="_blank"
            alt="Afrique"
            title="Afrique"
            href="#afrique"
            coords="421,376,603,582"
            shape="rect"
            @click="scrollTo($event, 'afrique')"
          />
          <area
            target="_blank"
            alt="Asie"
            title="Asie"
            href="#asie"
            coords="610,128,983,450"
            shape="rect"
            @click="scrollTo($event, 'asie')"
          />
          <area
            target="_blank"
            alt="Oceanie"
            title="Océanie"
            href="#oceanie"
            coords="713,457,983,618"
            shape="rect"
            @click="scrollTo($event, 'oceanie')"
          />
        </map>
      </figure>
    </div>
    <div class="container mb-6 is-hidden-desktop">
      <figure>
        <img
          src="../assets/monde.png"
          alt="Carte du monde"
          width="1000"
          height="680"
        />
      </figure>
    </div>
    <div class="container">
      <FlagList
        :visible-continent="visibleContinent"
        @change-continent="changeContinent"
      ></FlagList>
    </div>
  </section>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
section {
  background-color: #a2c0de;
}

container {
  background-color: #a2c0de;
}

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
  color: #a2c0de;
}

#map {
  height: 680px;
  width: auto;
  max-width: 1000px;
}
</style>
