<script setup lang="ts">
import { useI18n } from "vue-i18n";
import pageConfig from "./Translation.config.json";
const { locale } = useI18n({ useScope: "global" });
</script>

<template>
  <div class="section">
    <h1>Translation Page locale: {{ locale }}</h1>

    <div class="container mb-6" v-for="section of pageConfig" :key="section.title">
      <h2 class="title is-2 has-text-left" v-t="{ path: section.title }"></h2>

      <div
        v-for="phrase of section.list"
        :key="phrase"
        class="box columns m-2 is-clickable change-background-on-hover"
      >
        <div class="column is-half">
          <p v-t="{ path: phrase }" class="bd-notification is-primary"></p>
        </div>
        <div class="column is-half">
          <p
            v-t="{ path: phrase, locale: $route.query.lang }"
            class="bd-notification is-primary"
          ></p>
        </div>
      </div>
    </div>
  </div>
</template>
