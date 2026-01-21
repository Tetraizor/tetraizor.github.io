<template>
  <div class="sectionWrapper">
    <div class="header">
      <div class="lineLeft"></div>
      <p class="label">{{ label }}</p>
      <div class="lineRight"></div>
    </div>

    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "SectionContainer",
  props: {
    label: {
      type: String,
      default: "",
    },
  },
  components: {},
  emits: [],
};
</script>

<style lang="scss" scoped>
.sectionWrapper {
  margin-top: calc($font-p-small / 2);

  @media screen and (min-width: $tablet) {
    margin-top: calc($font-p-large / 2);
  }

  border: 2px solid $outline;
  border-top: none;

  position: relative;
}

.header {
  position: absolute;
  width: 100%;

  display: flex;
  flex-direction: row;

  .lineLeft {
    width: .4rem;

    @media screen and (min-width: $tablet) {
      width: .8rem;
    }
  }

  .lineRight {
    flex-grow: 1;
  }

  .lineLeft,
  .lineRight {
    background-color: $outline;
    height: 2px;
  }

  .label {
    margin: 0 .8rem;

    position: relative;

    top: calc($font-p-small / -2);

    @media screen and (min-width: $tablet) {
      top: calc($font-p-large / -2);
    }
  }
}

.content {
  padding: .8rem 1rem;
  padding-top: 1rem;

  @media screen and (min-width: $tablet) {
    padding: 1.2rem 1.4rem;
    padding-top: 1.4rem;
  }
}
</style>