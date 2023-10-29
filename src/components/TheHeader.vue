<template>
  <div class="header">
    <div class="content">
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

    transform: translate(-30px -30px);
  }

  .content {
    width: 100%;
    max-width: 1400px;
    padding: 0 64px 0 64px;

    h1 {
      font-size: 3.4rem;
      letter-spacing: .5rem;
      color: #333450;
      margin-bottom: 32px;
    }

    .line {
      height: 4px;
      width: 100%;
      background-color: #333450;
    }
  }
}
</style>