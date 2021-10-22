<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { locale } = useI18n({ useScope: "global" });
</script>

<template>
  <div class="section">
    <h1>Translation Page locale: {{ locale }}</h1>

    <div v-for="index of 857" :key="index" class="box columns m-2 is-clickable change-background-on-hover">
      <div class="column is-half">
        <p v-t="{ path: index }" class="bd-notification is-primary"></p>
      </div>
      <div class="column is-half">
        <p
          v-t="{ path: index, locale: $route.query.lang }"
          class="bd-notification is-primary"
        ></p>
      </div>
    </div>
  </div>
</template>
