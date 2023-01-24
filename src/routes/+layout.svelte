<script lang='ts'>
  import * as animateScroll from "svelte-scrollto";
  import { BANDSINTOWN_API_KEY } from "../util/Env";
  import { navigating, page } from '$app/stores';
  import { onMount } from 'svelte';
  import 'virtual:windi.css';
  import Burger from "../components/icons/Burger.svelte";
  import LogoBlack from "../components/icons/LogoBlack.svelte";
  import LogoColor from '../components/icons/LogoColor.svelte';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  import Releases from "../components/Releases.svelte";
  import SocialIcons from "../components/SocialIcons.svelte";
  import { fade } from "svelte/transition";

  let loadingShows = true
  let showsResults

  let showAuxPages = false
  let showNav = false

  let rotateLetter1 = false
  let rotateLetter2 = false
  let rotateLetter3 = false
  let rotateLetter4 = false
  let rotateLetter5 = false
  let rotateLetter6 = false
  let rotateLetter7 = false
  let rotateLetter8 = false

  let mounted = false
  let transformPx = "0px"
  let windowWidth: number
  let windowHeight: number
  let activeRoute = 'home'
  let showColorLogo = false
  let showBlackLogo = false
  let rotateBackdrop = "90deg"
  let mostRecentScrolls = [0]
  let disableScrollLogic = false

  let padding8Height: number

  let homeScreenElementWrapper: any
  let ellimistNameHeight = 0
  let aboutNavShowAllDummy: any
  let homeNavShowAllDummy: any
  let releasesNavShowAllDummy: any
  let showsNavShowAllDummy: any

  let aboutNavNoHomeDummy: any
  let releasesNavNoHomeDummy: any
  let showsNavNoHomeDummy: any

  let aboutXY = [aboutNavShowAllDummy?.offsetLeft, homeScreenElementWrapper?.offsetTop + ellimistNameHeight]
  let homeXY = [releasesNavNoHomeDummy?.offsetLeft, homeScreenElementWrapper?.offsetTop + ellimistNameHeight]
  let releasesXY = [releasesNavNoHomeDummy?.offsetLeft, homeScreenElementWrapper?.offsetTop + ellimistNameHeight]
  let showsXY = [showsNavShowAllDummy?.offsetLeft, homeScreenElementWrapper?.offsetTop + ellimistNameHeight]

  let aboutHeaderHeight: number
  let aboutTextHeight: number

  let aboutNav
  let aboutNavH: number
  let aboutNavW: number
  let homeNav
  let homeNavW: number
  let releasesNav
  let releasesNavW: number
  let showsNav
  let showsNavW: number

  const handleReleasesNav = () => {
    disableScrollLogic = true
    setTimeout(() => disableScrollLogic = false, 500)
    activeRoute = 'releases'
    animateScroll.scrollTo({ element: '#releases-wrapper' })
    // releasesEl.scrollIntoView()
    // window.scrollTo(1000,1000);
    showColorLogo = false;
    if (mounted) {
    }

    homeXY = [windowWidth - (homeNavW + 16), 16]
    aboutXY = [windowWidth - (aboutNavW + 16), aboutNavH + 24]
    releasesXY = [windowWidth - (releasesNavW + 16), (aboutNavH * 2) + 32]
    showsXY = [windowWidth - (showsNavW + 16), (aboutNavH * 3) + 40]
  }

  $: if ($page.route.id === "/about") {
    // ABOUT
    rotateBackdrop = "-90deg"
    transformPx = `${windowWidth}px`
    activeRoute = 'about'
    showColorLogo = true

    const navY = aboutHeaderHeight + aboutTextHeight + padding8Height * 2

    aboutXY = [aboutNavShowAllDummy?.offsetLeft, navY]
    homeXY = [homeNavShowAllDummy?.offsetLeft, navY]
    releasesXY = [releasesNavShowAllDummy?.offsetLeft, navY]
    showsXY = [showsNavShowAllDummy?.offsetLeft, navY]

    if (mounted) {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }
  } else if ($page.route.id === "/shows") {
    // SHOWS
    rotateBackdrop = "90deg"
    transformPx = `-${windowWidth}px`
    activeRoute = 'shows'
    showColorLogo = true

    aboutXY = [aboutNavShowAllDummy?.offsetLeft, homeScreenElementWrapper?.offsetTop + ellimistNameHeight]
    homeXY = [homeNavShowAllDummy?.offsetLeft, homeScreenElementWrapper?.offsetTop + ellimistNameHeight]
    releasesXY = [releasesNavShowAllDummy?.offsetLeft, homeScreenElementWrapper?.offsetTop + ellimistNameHeight]
    showsXY = [showsNavShowAllDummy?.offsetLeft, homeScreenElementWrapper?.offsetTop + ellimistNameHeight]

    if (mounted) {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }
  } else if ($page.route.id === "/releases") {
    // RELEASES
    if (browser) {
      handleReleasesNav()
    }
  } else if ($page.route.id === '/') {
    rotateBackdrop = "0deg"
    transformPx = "0px"
    activeRoute = 'home'
    showColorLogo = false

    aboutXY = [aboutNavNoHomeDummy?.offsetLeft, homeScreenElementWrapper?.offsetTop + ellimistNameHeight]
    homeXY = [releasesNavNoHomeDummy?.offsetLeft, homeScreenElementWrapper?.offsetTop + ellimistNameHeight]
    releasesXY = [releasesNavNoHomeDummy?.offsetLeft, homeScreenElementWrapper?.offsetTop + ellimistNameHeight]
    showsXY = [showsNavNoHomeDummy?.offsetLeft, homeScreenElementWrapper?.offsetTop + ellimistNameHeight]
    if (mounted) {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }
  }

  const handleScroll = () => {
    if (!disableScrollLogic) {
      let newMostRecentScrolls = [...mostRecentScrolls]
      newMostRecentScrolls.unshift(window.scrollY)
      newMostRecentScrolls.splice(10, 1)
      mostRecentScrolls = newMostRecentScrolls
  
      let isScrollingUp = window.scrollY < mostRecentScrolls[1]
      let isScrollingDown = window.scrollY > mostRecentScrolls[1]
      let isScrollUpForSure = isScrollingUp
      let isScrollDownForSure = isScrollingDown
      if (mostRecentScrolls.length > 3 && isScrollingUp && mostRecentScrolls[1] < mostRecentScrolls[2]) {
        isScrollUpForSure = true
      } else if (mostRecentScrolls.length > 3 && isScrollingDown && mostRecentScrolls[1] > mostRecentScrolls[2]) {
        isScrollDownForSure = true
      }
      
      if ($page.route.id === "/releases" && window.scrollY < 300 && isScrollUpForSure) {
        goto('/', { replaceState: true });
        handleHomeClick()
      } else if ($page.route.id !== "/releases" && window.scrollY > 300 && isScrollDownForSure) {
        handleReleasesNav()
        goto('/releases', { replaceState: true })
      }
    }
  }

  const handleHomeClick = () => {
    animateScroll.scrollToTop()
    disableScrollLogic = true
    setTimeout(() => disableScrollLogic = false, 500)
  }

  const getUpcomingEvents = async () => {
    try {
      const resp = await fetch(`https://rest.bandsintown.com/artists/id_15464365/events/?app_id=${BANDSINTOWN_API_KEY}&date=upcoming`)
      const data = await resp.json()
      showsResults = data
    } catch (err) {
      throw err
    } finally {
      loadingShows = false
    }
  }

  onMount(() => {
    mounted = true
    getUpcomingEvents()
    setTimeout(() => showBlackLogo = true, 0)
    setTimeout(() => showAuxPages = true, 100)
    setTimeout(() => showNav = true, 400)

    setTimeout(() => rotateLetter1 = true, 100)
    setTimeout(() => rotateLetter2 = true, 200)
    setTimeout(() => rotateLetter3 = true, 300)
    setTimeout(() => rotateLetter4 = true, 400)
    setTimeout(() => rotateLetter5 = true, 500)
    setTimeout(() => rotateLetter6 = true, 600)
    setTimeout(() => rotateLetter7 = true, 700)
    setTimeout(() => rotateLetter8 = true, 800)
  })
</script>

<svelte:window on:scroll={handleScroll} bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} />

<div class='absolute z-1 top-0 left-0 h-full w-full flex justify-center items-center p-2'>
  <div class='duration-600 ease-out w-full duration-2000 {showBlackLogo ? 'opacity-100' : 'opacity-0'}' style="transform: rotate({rotateBackdrop})">
    <LogoBlack />
  </div>
</div>

<div bind:clientHeight={padding8Height} class='absolute h-8' />

<div class='w-screen fixed top-0 left-0 z-5 duration-500' class:opacity-100={showNav} class:opacity-0={!showNav}>
  <a
    bind:this={aboutNav}
    bind:clientHeight={aboutNavH}
    bind:clientWidth={aboutNavW}
    on:click={handleHomeClick}
    style="transform: translate3d({aboutXY[0]}px, {aboutXY[1]}px, 0);"
    class='nav-item top-0 left-0 z-4 duration-500'
    class:active-nav={activeRoute === 'about'}
    href='/about'
  >
    About
  </a>
  <a
    bind:this={homeNav}
    bind:clientWidth={homeNavW}
    on:click={handleHomeClick}
    style="transform: translate3d({homeXY[0]}px, {homeXY[1]}px, 0);"
    class='nav-item top-0 left-0 z-4 duration-500'
    class:opacity-0={activeRoute === 'home'}
    class:opacity-100={activeRoute === 'about' || activeRoute === 'shows'}
    class:active-nav={activeRoute === ''}
    href='/'
  >
    Home
  </a>
  <a
    bind:this={releasesNav}
    bind:clientWidth={releasesNavW}
    on:click={handleReleasesNav}
    style="transform: translate3d({releasesXY[0]}px, {releasesXY[1]}px, 0);"
    class='nav-item top-0 left-0 z-4 duration-500'
    class:active-nav={activeRoute === 'releases'}
    href='/releases'
  >
    Releases
  </a>
  <a
    bind:this={showsNav}
    bind:clientWidth={showsNavW}
    on:click={handleHomeClick}
    style="transform: translate3d({showsXY[0]}px, {showsXY[1]}px, 0);"
    class='nav-item top-0 left-0 z-4 duration-500'
    class:active-nav={activeRoute === 'shows'}
    href='/shows'
  >
    Shows
  </a>
</div>

<div class='{activeRoute === 'home' || activeRoute === 'about' ? 'z-10' : 'z-0'} fixed top-6 right-6'>
  <SocialIcons />
</div>

<div class='w-screen overflow-hidden'>
  <div class='wrapper relative z-2 duration-500' style="transform: translateX({transformPx}); width: {windowWidth}px;">
    {#if showAuxPages}
      <div class='wrapper flex justify-center items-center absolute top-0 left-0 pt-8' style="transform: translateX(-{windowWidth}px); width: {windowWidth}px">
        <!-- <a href='/' class='fixed z-3 top-5 right-6 sm:right-18 md:right-28 h-10 w-10 duration-500 transform {showColorLogo ? "opacity-100" : "opacity-0"}'>
          <LogoColor />
        </a> -->
        <div bind:clientHeight={aboutHeaderHeight} class='absolute top-6 left-6 sm:left-18 md:left-28'>
          <h1 class='font-display text-primary text-4xl uppercase mb-4 leading-5'>organic</h1>
          <h1 class='font-display text-primary text-4xl uppercase mb-4 leading-5'>electronic</h1>
          <h1 class='font-display text-primary text-4xl uppercase mb-4 leading-5'>music</h1>
        </div>
        <div bind:clientHeight={aboutTextHeight} class='h-100 pb-8 overflow-y-scroll'>
          <p class='px-6 sm:px-18 md:px-28 text-white font-sans italic'>
            Ellimist is the Boston-based multifaceted artist focused on creating organic electronic music that moves the body and mind. Known for his guitar playing with Pi Wrecks, instrumental prowess with post-rock duo It Was a Good Dream, and unique organic electronic production style with violinist Josh Knowles, Alex Glover founded Ellimist with the goal of creating music that stretches the boundaries of listeners from any background.
            <br>
            <br>
            Equal parts sound design, and composition, Ellimist's music transports listeners on a journey through a combination of live instrumentation, ambient melodies, and bone ratting bass that flirts with funk, house, dubstep, and everything in between.
          </p>
        </div>
      </div>
    {/if}

    <div class='wrapper relative flex justify-center items-center absolute top-0 left-0' style="width: {windowWidth}px">
      <div bind:this={homeScreenElementWrapper} class='w-full'>
        <div bind:clientHeight={ellimistNameHeight} class='font-display text-primary text-7xl pb-2 uppercase text-center flex justify-center'>
          <span class='transform duration-600 {rotateLetter1 ? "rotate-y-0 opacity-100" : "-rotate-y-90 opacity-0"}'>e</span>
          <span class='transform duration-600 {rotateLetter2 ? "rotate-y-0 opacity-100" : "-rotate-y-90 opacity-0"}'>l</span>
          <span class='transform duration-600 {rotateLetter3 ? "rotate-y-0 opacity-100" : "-rotate-y-90 opacity-0"}'>l</span>
          <span class='transform duration-600 {rotateLetter4 ? "rotate-y-0 opacity-100" : "-rotate-y-90 opacity-0"}'>i</span>
          <span class='transform duration-600 {rotateLetter5 ? "rotate-y-0 opacity-100" : "-rotate-y-90 opacity-0"}'>m</span>
          <span class='transform duration-600 {rotateLetter6 ? "rotate-y-0 opacity-100" : "-rotate-y-90 opacity-0"}'>i</span>
          <span class='transform duration-600 {rotateLetter7 ? "rotate-y-0 opacity-100" : "-rotate-y-90 opacity-0"}'>s</span>
          <span class='transform duration-600 {rotateLetter8 ? "rotate-y-0 opacity-100" : "-rotate-y-90 opacity-0"}'>t</span>
        </div>
        <div class='z-0 px-7 sm:px-20 md:px-30 relative flex justify-between text-white text-lg uppercase italic w-full opacity-0'>
          <span bind:this={aboutNavShowAllDummy}>
            About
          </span>
          <span bind:this={homeNavShowAllDummy}>
            Home
          </span>
          <span bind:this={releasesNavShowAllDummy}>
            Releases
          </span>
          <span bind:this={showsNavShowAllDummy}>
            Shows
          </span>

          <div class='absolute px-7 sm:px-20 md:px-30 lg:px-70 xl:px-100 top-0 left-0 w-full flex justify-between'>
            <span bind:this={aboutNavNoHomeDummy}>
              About
            </span>
            <span bind:this={releasesNavNoHomeDummy}>
              Releases
            </span>
            <span bind:this={showsNavNoHomeDummy}>
              Shows
            </span>
          </div>
        </div>
      </div>
    </div>
    {#if showAuxPages}
      <div class='wrapper flex justify-center items-center absolute top-0 left-0' style="transform: translateX({windowWidth}px); width: {windowWidth}px">
        <div class='relative w-full max-w-100 p-6'>
          
          <h1 class='font-display text-primary text-6xl uppercase text-center mb-4'>shows</h1>
        </div>
      </div>
    {/if}
  </div>
</div>

{#if activeRoute === 'releases'}
  <div in:fade out:fade class='fixed z-4 top-0 right-0 w-full h-90 bg-gradient-to-tr from-transparent via-transparent to-black' />
{/if}

<Releases />

<svelte:head>
  <title>Ellimist | Organic Electronic Music | Official Website</title>
</svelte:head>

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
    height: 100vh;
    height: -webkit-fill-available;
    /* height: 100vh; */
  }

  .nav-item {
    @apply text-white text-lg uppercase italic absolute;
  }

  .nav-item.active-nav {
    @apply text-primary;
  }
</style>