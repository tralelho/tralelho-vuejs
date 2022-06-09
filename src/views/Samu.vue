<script setup lang="ts">
import pageConfig from "./Samu.config.json";
</script>

<template>
  <div class="section">
    <textarea
      id="textarea"
      rows="4"
      cols="80"
      position="fixed"
      border="1px solid black"
      float="right"
    >
Écrivez ici votre texte avant de le copier/coller sur votre logiciel
    </textarea>
    <br />
  </div>

  <div className="columns main-color is-centered">
    <div
      className="column main-color is-2 has-text-left fixed-left"
      style="margin-left:15px"
    >
      <aside class="menu">
        <ul class="menu-list">
          <li v-for="section of pageConfig" :key="section.title">
            <a :href="'#' + section.title" class="is-align-items-center">
              <img
                :src="'/' + section.icon"
                :alt="$t(section.title)"
                width="25"
                height="25"
              />
              <span class="menu-element-multiline">
                {{ $t(section.title) }}
              </span>
            </a>
          </li>
        </ul>
      </aside>
    </div>

    <div className="column main-color is-7">
      <div
        class="container mb-6"
        v-for="section of pageConfig"
        :key="section.title"
      >
        <h2
          :id="section.title"
          class="title is-2 has-text-left"
          v-t="{ path: section.title }"
          style="margin-top: 20px"
        ></h2>

        <div
          v-for="phrase of section.list"
          :key="phrase"
          class="box columns main-color m-2 py-2 is-clickable change-background-on-hover"
        >
          <div class="column is-half py-1">
            <p v-t="{ path: phrase }" class="bd-notification is-primary"></p>
          </div>
          <div class="column is-half py-1">
            <p
              v-t="{ path: phrase, locale: $route.query.lang }"
              class="bd-notification is-primary"
            ></p>
          </div>
        </div>
      </div>
    </div>

    <div
      className="column is-2 has-text-right fixed-right"
      style="margin-right: 40px"
    >
      <aside class="menu">
        <ul class="menu-fixed-right">
          <li class="mb-5 box main-color">
            <span class="menu-element-multiline">
              {{ $t(796) }}
            </span>
            <br />
            <span
              class="menu-element-multiline"
              v-t="{ path: 796, locale: $route.query.lang }"
            >
            </span>
          </li>
          <li class="mb-5 box main-color">
            <span class="menu-element-multiline">
              {{ $t(797) }}
            </span>
            <br />
            <span
              class="menu-element-multiline"
              v-t="{ path: 797, locale: $route.query.lang }"
            >
            </span>
          </li>
          <li class="mb-5 box main-color">
            <span class="menu-element-multiline">
              {{ $t(795) }}
            </span>
            <br />
            <span
              class="menu-element-multiline"
              v-t="{ path: 795, locale: $route.query.lang }"
            >
            </span>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<style scoped lang="scss">
.is-align-items-center {
  display: flex;
  flex-wrap: wrap;
  align-content: center; /* used this for multiple child */
  align-items: center; /* if an only child */
  position: relative;
  top:-10px;
  background-color: #a2c0de;
  &:hover {
    background-color: whitesmoke;
  }
}
.main-color {
  background-color: #a2c0de;
}
.menu-element-multiline {
  position: relative;
  top: 11px;
  width: 100px;
}
.fixed-right {
  position: fixed;
  right: 0;
  background-color: #a2c0de;
  margin-top: -10px;
  max-height:70vh;
  overflow: auto;
}
.fixed-left {
  position: fixed;
  left: 25px;
  background-color: #87a7c7;
  top:0px;
  max-height: 79vh;
  overflow: auto;
}

.menu {
  top:40px; 
}
</style>