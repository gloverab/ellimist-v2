<script lang='ts'>
  import smoothscroll from 'smoothscroll-polyfill';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import 'virtual:windi.css';
  import Burger from "../components/icons/Burger.svelte";
  import LogoBlack from "../components/icons/LogoBlack.svelte";
  import LogoColor from '../components/icons/LogoColor.svelte';

  let mounted = false
  let transformPx = "0px"
  let navTranslate = "300px"
  let windowWidth: number
  let windowHeight: number
  let navHeight: number
  let safeHeight: number
  let activeRoute = ''
  let showBack = false
  let showToTop = false
  let showNav = false
  let rotateBackdrop = "0deg"

  // $: if (safeHeight) {
  //   navTranslate = `${safeHeight / 2}px`
  // }

  $: if ($page.route.id === "/about") {
    showToTop = false
    rotateBackdrop = "-90deg"
    transformPx = `${windowWidth}px`
    navTranslate = `${safeHeight - navHeight}px`
    activeRoute = 'about'
    showBack = true
  } else if ($page.route.id === "/shows") {
    showToTop = false
    rotateBackdrop = "90deg"
    transformPx = `-${windowWidth}px`
    navTranslate = `${safeHeight - navHeight}px`
    activeRoute = 'shows'
    showBack = true
  } else if ($page.route.id === "/releases") {
    showToTop = true
    if (mounted) {
      window.scroll({ top: safeHeight, behavior: 'smooth' });
      showBack = true;
    }
  } else {
    showToTop = false
    rotateBackdrop = "0deg"
    transformPx = "0px"
    activeRoute = ''
    showBack = false
    if (mounted) {
      navTranslate = `${safeHeight / 2}px`
      window.scroll({ top: 0, behavior: 'smooth' });
    }
  }

  onMount(() => {
    mounted = true
    setTimeout(() => showNav = true, 100)
    if (document) {
      smoothscroll.polyfill();
    }
  })
</script>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} />

<div class='absolute z-1 top-0 left-0 h-full w-full flex justify-center items-center'>
  <div class='duration-600 ease-out' style="transform: rotate({rotateBackdrop})">
    <LogoBlack />
  </div>
</div>

<div class='w-screen overflow-x-hidden'>
  <div bind:clientHeight={navHeight} style="transform: translateY({navTranslate})" class='z-3 p-7 flex justify-between text-white text-xl uppercase italic absolute w-full top-0 left-0 max-w-150 {showNav ? "opacity-100 duration-500" : "opacity-0"}'>
    <a class:text-primary={activeRoute === 'about'} href='/about'>
      About
    </a>
    <a href='/releases'>
      Releases
    </a>
    <a class:text-primary={activeRoute === 'shows'} href='/shows'>
      Shows
    </a>
  </div>

  <a href='/' class='fixed z-3 top-5 right-5 h-10 w-10 duration-500 transform {showBack ? "opacity-100" : "opacity-0"}'>
    <LogoColor />
  </a>

  <div style="top: {safeHeight - 80}px;" class="fixed {showToTop ? "z-3" : "z-1"} w-full flex justify-center">
    <a href='/' class='duration-500 transform {showToTop ? "opacity-100" : "opacity-0"}'>
      <div class='px-5 py-2 bg-primary p-3 rounded-full bg-opacity-90'>
        <span class='font-medium'>
          Back to Top
        </span>
      </div>
    </a>
  </div>

  {#if showNav}
    <div bind:offsetHeight={safeHeight} class='wrapper relative z-2 duration-500' style="transform: translateX({transformPx}); width: {windowWidth}px;">
      <div class='wrapper flex justify-center items-center absolute top-0 left-0 pt-8' style="transform: translateX(-{windowWidth}px); width: {windowWidth}px">
        <div class='absolute top-6 left-6'>
          <h1 class='font-display text-primary text-4xl uppercase mb-4 leading-5'>organic</h1>
          <h1 class='font-display text-primary text-4xl uppercase mb-4 leading-5'>electronic</h1>
          <h1 class='font-display text-primary text-4xl uppercase mb-4 leading-5'>music</h1>
        </div>
        <div class='h-100 overflow-y-scroll'>
          <p class='px-6 text-white font-sans italic'>
            Ellimist is the Boston-based multifaceted artist focused on creating organic electronic music that moves the body and mind. Known for his guitar playing with Pi Wrecks, instrumental prowess with post-rock duo It Was a Good Dream, and unique organic electronic production style with violinist Josh Knowles, Alex Glover founded Ellimist with the goal of creating music that stretches the boundaries of listeners from any background.
            <br>
            <br>
            Equal parts sound design, and composition, Ellimist's music transports listeners on a journey through a combination of live instrumentation, ambient melodies, and bone ratting bass that flirts with funk, house, dubstep, and everything in between.
          </p>
        </div>
      </div>
      
      <div class='wrapper relative flex justify-center items-center absolute top-0 left-0' style="width: {windowWidth}px">
        <div class='absolute top-6 right-6 w-7 h-7 z-3'>
          <Burger />
        </div>
        <div style="transform: translateY(-0.75rem)">
          <h1 class='font-display text-primary text-6xl uppercase text-center mb-4'>ellimist</h1>
        </div>
      </div>

      <div class='wrapper flex justify-center items-center absolute top-0 left-0' style="transform: translateX({windowWidth}px); width: {windowWidth}px">
        <div class='relative w-full max-w-100 p-6'>
          <h1 class='font-display text-primary text-6xl uppercase text-center mb-4'>shows page</h1>
        </div>
      </div>
    </div>
  {/if}
</div>
<img src="https://www.dropbox.com/s/dhmzuf42bwv9gn9/Gift%20of%20Conviction%20Artwork.png?raw=1" />
<img src="https://www.dropbox.com/s/ps2txc7iiueu30w/Move%20Single%20Art.png?raw=1" />

<style global>
  @font-face{
    font-family: 'Ailreons';
    src: url('/fonts/Ailerons-Typeface.woff') format('woff');
  }

  @font-face{
    font-family: 'Stratos', arial, sans-serif;
    src: url('/fonts/StratosLCWebSemiLight.ttf') format('truetype');
  }

  @font-face{
    font-family: 'Stratos', arial, sans-serif;
    font-style: italic;
    src: url('/fonts/Stratos-SemiLightItalic.otf') format('opentype');
  }

  .wrapper {
    height: -webkit-fill-available;
    /* height: 100vh; */
  }
</style>