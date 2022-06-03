<script lang="ts" setup>
import pageConfig from "./Translation.config.json";
import { useRouter } from "vue-router";
import countries from "../components/countries.json";
import iso3Languages from "../iso3-languages.json";
import { ref } from "vue";

const countryISO3 = useRouter().currentRoute.value.query.country;
const countryConfig = countries.find((countryConfig) => {
  return countryConfig.iso3 === countryISO3;
});

const targetLanguages = useRouter().currentRoute.value.query.lang || ["fra"];
let selectedLanguage = ref(
  Array.isArray(targetLanguages) ? targetLanguages[0] : targetLanguages
);
</script>

<template>
  <div class="section">
    <h1 class="title is-1">
      <span class="is-size-1 mr-2 flag-icon flag-icon-fr"></span>
      <font-awesome-icon icon="long-arrow-alt-right" />
      <span
        :class="
          'is-size-1 ml-2 flag-icon flag-icon-' +
          countryConfig.iso2.toLowerCase()
        "
      ></span>
    </h1>

    <div
      class="change-language mx-auto mb-6 field is-horizontal"
      v-if="countryConfig && countryConfig.languages.length > 1"
    >
      <div class="field-label is-normal field-label-size">
        <label class="label">Change language:</label>
      </div>
      <div class="select">
        <select v-model="selectedLanguage">
          <option
            v-for="lang of countryConfig.languages"
            :key="lang"
            :value="lang"
          >
            {{ iso3Languages[lang] }}
          </option>
        </select>
      </div>
    </div>

    <div className="columns">
      <div className="column is-2 has-text-left">
        <aside class="menu">
          <ul class="menu-list">
            <li v-for="section of pageConfig" :key="section.title">
              <a :href="'#' + section.title" class="is-align-items-center">
                <img
                  :src="'/' + section.icon"
                  :alt="$t(section.title)"
                  width="35"
                  height="35"
                />
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
                v-t="{ path: phrase, locale: selectedLanguage }"
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
  float: left;
  flex-wrap: wrap;
  align-content: center; /* used this for multiple child */
  align-items: center; /* if an only child */
  margin-top: 0%;
  position: relative;
  width:200px;
  
}

.menu-element-multiline {
  width:150px;
  position: fixed;
  font-size: 18px;
  margin-left:40px;
}

.menu-list {
  position: fixed;
  overflow: auto;
}

.field-label-size {
  max-width: 200px;
}

.change-language {
  max-width: 500px;
}
.box columns m-2 py-2 is-clickable change-background-on-hover:hover {
  background-color: #fac3f2;
}
.menu {
  background-color: #6699cc;
  overflow: auto;
}
</style>
