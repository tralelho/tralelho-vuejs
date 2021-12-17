<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import pageConfig from "./Translation.config.json";
import { useRouter } from "vue-router";
import countries from "../components/countries.json";
import { ref } from "vue";

const { locale } = useI18n({ useScope: "global" });

const country = useRouter().currentRoute.value.query.country;
const countryConfig = countries.find((countryConfig) => {
  return countryConfig.iso3 === country;
});

const targetLanguages = useRouter().currentRoute.value.query.lang || ["fra"];
let selectedLanguage = ref(targetLanguages[0]);
</script>

<template>
  <div class="section">
    <h1 class="title is-1">Translation Page locale: {{ locale }}</h1>

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
            {{ lang }}
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
  flex-wrap: wrap;
  align-content: center; /* used this for multiple child */
  align-items: center; /* if an only child */
}

.menu-element-multiline {
  width: 100px;
}

.field-label-size {
  max-width: 200px;
}

.change-language {
  max-width: 500px;
}
</style>
