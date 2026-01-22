<template>
  <div
    class="md-body"
    v-html="compiledMarkdown"
    :style="styleOverride"
  ></div>
</template>

<script>
import MarkdownIt from "markdown-it";

export default {
  name: "Markdown",
  props: {
    source: {
      type: String,
      required: true,
    },
    styleOverride: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      md: new MarkdownIt(),
    };
  },
  computed: {
    compiledMarkdown() {
      return this.md.render(this.source);
    },
  },
};
</script>

<style lang="scss">
@use "/styles/_defaults.scss" as *;

.md-body {
  font-family: sans-serif !important;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  p {
    margin-top: 2rem;
    margin-bottom: 2rem;

    font-family: "Arimo", sans-serif;
  }

  h1 {
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 0.4rem;

    @include respond-to(mobile) {
      font-size: 1.5rem;
    }
  }

  h3 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.4rem;

    @include respond-to(mobile) {
      font-size: 1.2rem;
    }
  }

  p,
  li {
    font-size: $font-p-large;
    line-height: $font-p-large * 1.8;

    @include respond-to(mobile) {
      font-size: $font-p-small;
      line-height: $font-p-small * 1.8;
    }
  }

  ul {
    margin-left: 2rem;

    li {
      color: $text-primary;
    }
  }

  blockquote {
    border-left: 2px solid $accent;
    padding-left: 2rem;
    font-style: italic;
  }
}
</style>
