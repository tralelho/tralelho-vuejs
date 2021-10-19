<template>
  <p>
    <router-link
      v-for="country in countries"
      :key="country.iso2"
      class="block m-1"
      :to="{
        name: 'about',
        params: { locale: country.languages[0].toLowerCase() },
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
export default {
  data: function () {
    return {
      countries,
    };
  },
};
</script>
