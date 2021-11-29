<template>
  <nav
    class="navbar is-fixed-top is-primary"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <router-link
        :to="{ name: 'home', params: { locale } }"
        class="navbar-item"
      >
        <img src="/favicon.png" />
      </router-link>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="mainNavbar"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="mainNavbar" class="navbar-menu">
      <div class="navbar-start">
        <router-link
          :to="{ name: 'home', params: { locale } }"
          class="navbar-item"
        >
          Home
        </router-link>

        <router-link
          :to="{ name: 'translation', params: { locale } }"
          class="navbar-item"
        >
          Translation
        </router-link>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"> Samu </a>

          <div class="navbar-dropdown">
            <router-link
              :to="{
                name: 'samu',
                params: { locale },
                query: { lang: 'eng' },
              }"
              class="navbar-item"
              v-t="{ path: 685, locale: 'fra' }"
            ></router-link>

            <router-link
                :to="{
                name: 'samu',
                params: { locale },
                query: { lang: 'deu' },
              }"
                class="navbar-item"
                v-t="{ path: 681, locale: 'fra' }"
            ></router-link>

            <router-link
                :to="{
                name: 'samu',
                params: { locale },
                query: { lang: 'spa' },
              }"
                class="navbar-item"
                v-t="{ path: 744, locale: 'fra' }"
            ></router-link>

            <router-link
                :to="{
                name: 'samu',
                params: { locale },
                query: { lang: 'por' },
              }"
                class="navbar-item"
                v-t="{ path: 730, locale: 'fra' }"
            ></router-link>

            <router-link
                :to="{
                name: 'samu',
                params: { locale },
                query: { lang: 'ita' },
              }"
                class="navbar-item"
                v-t="{ path: 700, locale: 'fra' }"
            ></router-link>
          </div>
        </div>

        <router-link
          :to="{ name: 'about', params: { locale } }"
          class="navbar-item"
        >
          About
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <span class="is-size-1 flag-icon flag-icon-fr"></span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { useI18n } from "vue-i18n";

export default {
  data() {
    const { locale } = useI18n({ useScope: "global" });
    return {
      locale,
    };
  },
};
</script>
