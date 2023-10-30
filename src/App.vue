<script setup>
import TheHeader from "./components/TheHeader.vue"
import TheHomePage from "./components/TheHomePage.vue"

</script>

<template>
  <TheHeader />

  <!-- TODO: Perhaps here could be a way to change pages. -->
  <TheHomePage />
</template>

<style lang="scss">
* {
  box-sizing: border-box;
  font-family: 'Noto Sans';
  padding: 0;
  margin: 0;
  border: none;
}

@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
    background-color: $background-primary;
  }
}

a,
a:link {
  color: $text-primary;
  font-weight: 600;
  transform: scale(1);
  display: inline-block;
  transition: 0.1s;
}

a:hover {
  display: inline-block;
  color: $text-primary-hover;
  transform: scale(1.02);
  transition: 0.1s;
}
</style>