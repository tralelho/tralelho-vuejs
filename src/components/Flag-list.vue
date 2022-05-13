<template>
  <div
    class="card mb-4"
    v-for="continent in countriesByContinent"
    :key="continent"
    :id="continent.name"
  >
    <header class="card-header" @click="changeVisibility(continent.name)">
      <figure class="image is-48x48 mx-2">
        <img
          :src="'/' + continent.ico"
          :alt="continent.name"
          width="48"
          height="48"
        />
      </figure>
      <p class="card-header-title is-capitalized">{{ continent.name }}</p>
      <button class="card-header-icon" aria-label="more options">
        <span class="icon">
          <font-awesome-icon
            v-if="isVisibleContinent === continent.name"
            icon="angle-up"
          />
          <font-awesome-icon
            v-if="isVisibleContinent != continent.name"
            icon="angle-down"
          />
        </span>
      </button>
    </header>

    <div class="card-content" v-if="isVisibleContinent === continent.name">
      <div class="content">
        <div
          class="country-block"
          v-for="country in continent.countries"
          :key="country.iso2"
        >
          <p class="mb-1">
            <router-link
              class="m-1"
              :to="{
                name: 'translation',
                params: { locale },
                query: {
                  lang: country.languages,
                  country: country.iso3,
                },
              }"
            >
              <span
                :class="
                  'flag-font-size flag-icon flag-icon-' +
                  country.iso2.toLowerCase()
                "
              ></span>
            </router-link>
          </p>
          <p>{{ country.namefr }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import { useI18n } from "vue-i18n";
import countries from "./countries.json";
enum Continents {
  AFRIQUE = "continents/africa.svg",
  AMERIQUE = "continents/america.svg",
  ASIE = "continents/asia.svg",
  EUROPE = "continents/europe.svg",
  OCEANIE = "continents/oceania.svg",
}
const countriesByContinent = Object.keys(Continents).map((continent) => {
  const countriesOfContinent = countries.filter(
    (country) => country.continent === continent.toLowerCase()
  );
  return {
    name: continent.toLowerCase(),
    ico: Continents[continent],
    countries: countriesOfContinent,
  };
});

defineProps({
  isVisibleContinent: String,
});

const emit = defineEmits(["changeContinent"]);

const changeVisibility = (continent: string) => {
  emit("changeContinent", continent);
};

const { locale } = useI18n({ useScope: "global" });
</script>

<style scoped lang="scss">
.flag-font-size {
  font-size: 5rem;
}

header:hover {
  cursor: pointer;
}

.content{
  
  background-color: #9cadf89c;
}

.country-block {
  width: 8rem;
  display: inline-grid;
  background-color: #9cadf89c;
}
</style>
