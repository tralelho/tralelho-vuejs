<template>
  <nav
    class="navbar is-fixed-top is-info"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <router-link
        :to="{ name: 'home', params: { locale } }"
        class="navbar-item"
      >
        <img src="/favicon.png" alt="Tralelho" class="mx-2" />
        <h1 class="title has-text-white">Tralelho</h1>
      </router-link>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="mainNavbar"
        @click="showNav = !showNav"
        :class="{ 'is-active': showNav }"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="mainNavbar" class="navbar-menu" :class="{ 'is-active': showNav }">
      <div class="navbar-start">
        <div
          class="navbar-item has-dropdown is-hoverable"
          v-if="!$route.query.lang"
        >
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
              @click="showNav = !showNav"
            ></router-link>

            <router-link
              :to="{
                name: 'samu',
                params: { locale },
                query: { lang: 'deu' },
              }"
              class="navbar-item"
              v-t="{ path: 681, locale: 'fra' }"
              @click="showNav = !showNav"
            ></router-link>

            <router-link
              :to="{
                name: 'samu',
                params: { locale },
                query: { lang: 'spa' },
              }"
              class="navbar-item"
              v-t="{ path: 744, locale: 'fra' }"
              @click="showNav = !showNav"
            ></router-link>

            <router-link
              :to="{
                name: 'samu',
                params: { locale },
                query: { lang: 'por' },
              }"
              class="navbar-item"
              v-t="{ path: 730, locale: 'fra' }"
              @click="showNav = !showNav"
            ></router-link>

            <router-link
              :to="{
                name: 'samu',
                params: { locale },
                query: { lang: 'ita' },
              }"
              class="navbar-item"
              v-t="{ path: 700, locale: 'fra' }"
              @click="showNav = !showNav"
            ></router-link>
          </div>
        </div>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"> Imprimer </a>

          <div class="navbar-dropdown">
            <a
              class="navbar-item"
              @click="
                createPdf(PdfDocumentList.PATIENT, messages, $route.query.lang)
              "
            >
              Fiche patient
            </a>
            <a
              class="navbar-item"
              @click="
                createPdf(PdfDocumentList.SCANNER, messages, $route.query.lang)
              "
              >Scanner</a
            >
            <a
              class="navbar-item"
              @click="
                createPdf(PdfDocumentList.IRM, messages, $route.query.lang)
              "
              >IRM</a
            >
            <a
              class="navbar-item"
              @click="
                createPdf(PdfDocumentList.BLOC, messages, $route.query.lang)
              "
            >
              Bloc Opératoire
            </a>
            <a
              class="navbar-item"
              @click="
                createPdf(
                  PdfDocumentList.SECRETARIAT,
                  messages,
                  $route.query.lang
                )
              "
              >Secrétariat</a
            >
          </div>
        </div>

        <router-link
          :to="{ name: 'about', params: { locale } }"
          class="navbar-item"
          @click="showNav = !showNav"
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
<style scoped lang="scss">
.navbar is-fixed-top is-primary {
  background-color: #406d99;
}

.navbar-item {
  background-color: #406d99;
  color: #ffffff;
}
.navbar-item:hover {
  background-color: #6897c4;
}

.navbar-menu {
  background-color: #406d99;
}
</style>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import { createPdf, PdfDocumentList } from "./pdf-creation/PDF-creator";

const { locale, messages } = useI18n({
  useScope: "global",
});

const showNav = ref(false);
</script>
