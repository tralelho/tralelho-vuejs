<template>
  <div
    v-for="continent in countriesByContinent"
    :key="continent"
    class="section"
    :id="continent.name"
  >
    <h2 class="title is-2 is-capitalized">
      {{ continent.name }}
    </h2>

    <div class="tile is-ancestor is-flex-wrap-wrap mx-4">
      <div
        class="tile is-vertical"
        v-for="country in continent.countries"
        :key="country.iso2"
      >
        <p class="mb-1">
          <router-link
            class="m-1"
            :to="{
              name: 'translation',
              params: { locale },
              query: { lang: country.languages[0].toLowerCase() },
            }"
          >
            <span
              :class="
                'flag-font-size flag-icon flag-icon-' + country.iso2.toLowerCase()
              "
            ></span>
          </router-link>
        </p>
        <p>{{ country.namefr }}</p>
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
.flag-font-size {
  font-size: 6rem;
}
</style>
