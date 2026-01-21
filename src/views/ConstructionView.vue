<template>
  <div class="background">
    <div class="blurField">
      <div class="textWrapper">
        <h1 class="title">{{ title }}</h1>
        <h2 class="description">
          will be open, closer than you think. keep checking frequently.
        </h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ConstructionView",
  props: [],
  components: {},

  data() {
    return {
      title: "under construction",
      doesTitleHaveCursor: false,
    };
  },

  mounted() {
    setInterval(() => {
      this.doesTitleHaveCursor = !this.doesTitleHaveCursor;

      if (!this.doesTitleHaveCursor) {
        this.title = this.title.slice(0, -1);
      } else {
        this.title = this.title + "|";
      }
    }, 500);
  },
};
</script>

<style lang="scss" scoped>
.background {
  background-color: $background-primary;
  background-image: url("@/assets/patterns/pattern.svg");

  width: 100%;
  height: 100%;

  animation: slide 100s linear infinite;

  @keyframes slide {
    0% {
      background-position: 0 0;
    }

    50% {
      background-position: 750px 433px;
    }

    100% {
      background-position: 1500px 866px;
    }
  }

  .blurField {
    backdrop-filter: blur(6px);

    width: 100%;
    height: 100%;
  }
}

.textWrapper {
  @media screen and (max-width: $tablet) {
    padding: 128px 10%;
  }

  @media screen and (min-width: $tablet) {
    padding: 256px 15%;
  }
}

.title {
  @media screen and (max-width: $tablet) {
    font-size: 1.8rem;
    margin-bottom: 2rem;
    line-height: 2rem;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip;
  }

  @media screen and (min-width: $tablet) {}

  font-size: 3.5rem;
  margin-bottom: 2rem;
  line-height: 5rem;
}

.description {
  @media screen and (max-width: $tablet) {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    line-height: 1.8rem;
  }

  @media screen and (min-width: $tablet) {}

  font-size: 2rem;
  margin-bottom: 2rem;
  line-height: 3rem;
}
</style>
