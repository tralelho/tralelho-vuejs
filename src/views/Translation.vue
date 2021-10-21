<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { locale } = useI18n({ useScope: "global" });
</script>

<template>
  <h1>Translation Page locale: {{ locale }}</h1>

  <p>Dest language : {{ $route.query.lang }}</p>

  <p v-for="index of 857" :key="index">
    <span v-t="{ path: index }"></span> |
    <span v-t="{ path: index, locale: $route.query.lang }"></span>
  </p>
</template>
