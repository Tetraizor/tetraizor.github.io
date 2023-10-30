<template>
  <div class="header">
    <div class="content">
      <h2>Hi, I'm</h2>
      <h1>Umuthan Özel*</h1>
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

  background-color: #d6d8dd;
  background-image: url("../img/pattern.png");
  background-size: 700px;
  background-position: 0px 0px;

  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;

  animation-name: pan-background;
  animation-duration: 200s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  .dashed-line {
    position: absolute;

    border: none;
    border-top: 4px dashed #333450;

    height: 4px;
    width: 100%;
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

      color: #5d5e7c;
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

      color: #333450;
    }

    .line {
      height: 4px;
      width: 100%;
      background-color: #333450;
    }
  }
}
</style>