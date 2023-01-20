<script>
  import Burger from "../components/icons/Burger.svelte";
  import LogoBlack from "../components/icons/LogoBlack.svelte";

</script>

<div class='wrapper relative flex justify-center items-center'>
  <div class='absolute top-6 right-6 w-7 h-7 z-3'>
    <Burger />
  </div>
  <div class='absolute z-1 top-0 left-0 h-full w-full flex justify-center items-center'>
    <LogoBlack />
  </div>
  <div class='relative z-2 w-full max-w-100 p-6'>
    <h1 class='font-display text-primary text-6xl uppercase text-center mb-4'>ellimist</h1>
    <div class='flex justify-between text-white text-xl uppercase italic'>
      <a href='/about'>
        About
      </a>
      <a href='/releases'>
        Releases
      </a>
      <a href='/shows'>
        Shows
      </a>
    </div>
  </div>
</div>
<h1 class='text-white'>hello</h1>

<style>
  .wrapper {
    height: -webkit-fill-available;
    height: 100vh;
  }
</style>
