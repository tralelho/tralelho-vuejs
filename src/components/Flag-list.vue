<template>
  <div
    v-for="continent in countriesByContinent"
    :key="continent"
    class="card mb-4"
    :id="continent.name"
  >
    <div class="card-header">
      <h2 class="card-header-title is-capitalized">
        {{ continent.name }}
      </h2>
    </div>
    <div class="card-content">
      <div class="content line-height">
        <router-link
          v-for="country in continent.countries"
          :key="country.iso2"
          class="block m-2"
          :to="{
            name: 'translation',
            params: { locale },
            query: { lang: country.languages[0].toLowerCase() },
          }"
        >
          <span
            :class="
              'is-size-1 flag-icon flag-icon-' + country.iso2.toLowerCase()
            "
          ></span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import countries from "./countries.json";
const continents = ["africa", "america", "asia", "europe", "oceania"];

const countriesByContinent = continents.map((continent) => {
  const countriesOfContinent = countries.filter(
    (country) => country.continent === continent
  );
  return { name: continent, countries: countriesOfContinent };
});

import { useI18n } from "vue-i18n";
export default {
  data: function () {
    const { locale } = useI18n({ useScope: "global" });
    return {
      countries,
      locale,
      countriesByContinent,
    };
  },
};
</script>

<style scoped lang="scss">
.line-height {
  line-height: 40px;
}
</style>
