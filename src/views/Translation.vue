<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: "global" });
</script>

<template>
  <h1>Translation Page lang: {{ locale }}</h1>

  <p>{{ t("others.presentation", locale) }}</p>
</template>
