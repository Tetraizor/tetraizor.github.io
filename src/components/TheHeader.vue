<script>
export default {
  data() {
    return {
      isHoveringOver: false,
    }
  },
  methods: {
    mouseMove(event) {
      const x = event.clientX;
      const y = event.clientY;
    },
    hoverChange(state) {
      this.isHoveringOver = state;
    }
  }
}
</script>

<template>
  <div
    class="header"
    :class="{ zoomedIn: isHoveringOver, zoomedOut: !isHoveringOver }"
    @mouseover="hoverChange(true)"
    @mouseleave="hoverChange(false)"
    @mousemove="mouseMove"
  >
    <div class="content">
      <div
        class="blur-on-hover-initial"
        :class="{ blurOnHover: isHoveringOver }"
      >
        <h2>Hi, I'm</h2>
        <h1>Umuthan Özel*</h1>
      </div>
      <div class="line"></div>
    </div>
    <div class="dashed-line">
    </div>
  </div>
</template>

<style scoped lang="scss">
@keyframes pan-background {
  from {
    background-position: 0px 0px;
  }

  to {
    background-position: 700px 700px;
  }
}

.header {
  height: 26vh;
  width: 100%;

  user-select: none;

  background-color: $header-background;
  background-image: url("../img/pattern.png");
  background-position: 0px 0px;
  background-size: 700px;

  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;

  animation-name: pan-background;
  animation-duration: 200s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  transition: background-size .5s;

  .dashed-line {
    position: absolute;

    border: none;
    border-top: 4px dashed;

    height: 4px;
    width: 100%;

    border-color: $text-primary;
  }

  .content {
    width: 100%;
    max-width: 1500px;

    @media screen and (max-width: 650px) {
      padding: 0 24px 0 24px;
    }

    @media screen and not (max-width: 650px) {
      padding: 0 64px 0 64px;
    }

    h2 {
      @media screen and (max-width: 650px) {
        font-size: 1.8rem;
        letter-spacing: .1rem;
        margin-bottom: 0px;
      }

      @media screen and not (max-width: 650px) {
        font-size: 2.5rem;
        letter-spacing: .4rem;
        margin-bottom: 0px;
      }

      color: $text-secondary;
    }

    h1 {
      @media screen and (max-width: 650px) {
        font-size: 2.5rem;
        letter-spacing: .2rem;
        margin-bottom: 8px;
      }

      @media screen and not (max-width: 650px) {
        font-size: 3.4rem;
        letter-spacing: .5rem;
        margin-bottom: 32px;
      }

      color: $text-primary;
    }

    .line {
      height: 4px;
      width: 100%;
      background-color: $text-primary;
    }
  }
}

.zoomedIn {
  background-size: 750px;
}

.blur-on-hover-initial {
  transform: scale(1);
  transition: transform .5s;
}

.blurOnHover {
  transform: scale(1.04) translate(18px, -4px);
}
</style>