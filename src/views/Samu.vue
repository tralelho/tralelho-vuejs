<script setup lang="ts">
import pageConfig from "./Samu.config.json";
</script>

<template>
  <div class="section">
    <h1 class="title is-1">Traductions pour les SAMU et SDIS</h1>

    <textarea
      id="textarea"
      placeholder="Ecrivez ici votre texte avant de le copier/coller sur votre logiciel ..."
      rows="8"
      cols="50"
      position="fixed"
      border="1px solid black"
      float="right"
    >
    </textarea>


    <div className="columns">
      <div className="column is-2 has-text-left" style="margin-left: 40px">
        <aside class="menu">
          
<ul class="menu-list">
            <li v-for="section of pageConfig" :key="section.title2">
              <a :href="'#' + section.title2" class="is-align-items-center">
                <img
                  :src="'/' + section.icon"
                  :alt="$t(section.title2)"
                  width="50"
                  height="50"
                />&nbsp;
                <span class="menu-element-multiline">
                  {{ $t(section.title2) }}
                </span>
              </a>
            </li>
</ul>
          
          <ul class="menu-list">
            <li v-for="section of pageConfig" :key="section.title">
              <a :href="'#' + section.title" class="is-align-items-center">
                <img
                  :src="'/' + section.icon"
                  :alt="$t(section.title)"
                  width="50"
                  height="50"
                />&nbsp;
                <span class="menu-element-multiline">
                  {{ $t(section.title) }}
                </span>
              </a>
            </li>
          </ul>
          
        </aside>
      </div>

      <div className="column">
        <div
          class="container mb-6"
          v-for="section of pageConfig"
          :key="section.title"
        >
          <h2
            :id="section.title"
            class="title is-2 has-text-left"
            v-t="{ path: section.title }"
            style="margin-top: 10px"
          ></h2>

          <div
            v-for="phrase of section.list"
            :key="phrase"
            class="box columns m-2 py-2 is-clickable change-background-on-hover"
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
  top: 10px;
  width: 100px;
  background-color: #a7eba9;
}

.column {
  background-color: #a7eba9;
}

.columns {
  background-color: #a7eba9;
}

.menu-element-multiline {
  background-color: #a7eba9;
  position: relative;
  top: 10px;
  width: 100px;
}
</style>
