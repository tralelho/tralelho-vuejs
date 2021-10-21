<template>
  <p>
    <router-link
      v-for="country in countries"
      :key="country.iso2"
      class="block m-1"
      :to="{
        name: 'translation',
        params: { locale },
        query: { lang: country.languages[0].toLowerCase() },
      }"
    >
      <span
        :class="'is-size-1 flag-icon flag-icon-' + country.iso2.toLowerCase()"
      ></span>
    </router-link>
  </p>
</template>

<script lang="ts">
import countries from "./countries.json";
import { useI18n } from "vue-i18n";
export default {
  data: function () {
    const { locale } = useI18n({ useScope: "global" });
    return {
      countries,
      locale,
    };
  },
};
</script>
