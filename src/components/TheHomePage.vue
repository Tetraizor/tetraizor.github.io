<script setup>

</script>

<template>
  <div class="content">
    <h1>
      *Me
    </h1>
    <p>
      University student and a part time full-stack developer.
      Love to create things. Games are my passion, especially creating them. I also love everything UI/UX related, given
      not being very good at it.
    </p>
  </div>
</template>

<style scoped lang="scss">
.content {
  width: 100%;
  max-width: 1500px;

  @media screen and (max-width: 650px) {
    padding: 32px 24px 0 24px;
  }

  @media screen and not (max-width: 650px) {
    padding: 48px 64px 0 64px;
  }

  h1 {
    font-size: 2.2rem;
    font-weight: normal;

    letter-spacing: .2rem;

    text-decoration: underline;
    text-underline-offset: 1.2rem;

    margin-bottom: 1.2rem;
  }

  p {
    font-size: 1.2rem;
    line-height: 2rem;

  }

  .line {
    height: 4px;
    width: 100%;
    background-color: #333450;
  }
}
</style>