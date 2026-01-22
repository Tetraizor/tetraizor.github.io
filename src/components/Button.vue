<template>
  <div class="buttonWrapper">
    <button class="button">
      <slot></slot>
    </button>
  </div>
</template>

<script lang="ts">
export default {
  name: "Button",
  props: {},
  components: {},
  emits: [],

  data() {
    return {};
  },

  methods: {},
};
</script>