<script setup>

</script>

<template>
  <div class="home-page">
    <div class="content">
      <article>
        <h1>
          *Me
        </h1>
        <p>
          Love to <b>create</b> things. Games are my passion, especially making them. I also love everything UI/UX
          related,
          given still only learning it. Huge fan of designing and studying modular and scalable systems in software. <a
            href="https://www.instagram.com/tetraizor"
          >Draw
            things</a> from time to time.
        </p>
      </article>
      <article>
        <h1>
          *Past...
        </h1>
        <p>
          > Created a modular persistent system and manager package for Unity.<br>
          > Got the 2nd place in Pura Game Jam in 2020.<br>
          > Got the 1st place in Pura Game Jam in 2022.<br>
          > Joined Pura Game Jam in 2023, no wins this year.<br>
        </p>
      </article>
      <article>
        <h1>
          *Present
        </h1>
        <p>
          > Trying to make this site a cool portfolio.<br>
          > Studying Computer Sciences in Hacettepe University.<br>
          > Working part time as a Full-stack Developer.<br>
          > Working on a very basic Mobile Game, just to learn the ropes on mobile publishing.<br>
          > Learning Godot.<br>
        </p>
      </article>
      <article>
        <h1>
          *Future!
        </h1>
        <p>
          > Learn Networking in general, while also trying to learn Unity NGO more in depth.<br>
          > Learn C++ more in depth, will try to create a very basic game engine in order to learn what goes behind,
          and also for fun.<br>
          > Learn Shader programming and optimizations.<br>
        </p>
      </article>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-page {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
}

.content {
  width: 100%;
  max-width: 1500px;

  @media screen and (max-width: 650px) {

    article {
      padding: 32px 24px 0 24px;
    }
  }

  @media screen and not (max-width: 650px) {

    article {
      padding: 48px 64px 0 64px;
    }
  }

  h1 {
    font-size: 2.2rem;
    font-weight: normal;

    letter-spacing: .2rem;

    text-decoration: underline;
    text-underline-offset: 1.2rem;

    margin-bottom: 1.2rem;

    color: $text-primary
  }

  p {
    font-size: 1.2rem;
    line-height: 2rem;

    color: $text-primary
  }

  .line {
    height: 4px;
    width: 100%;
    background-color: $text-primary;
  }
}
</style>