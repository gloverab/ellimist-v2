<script lang='ts'>
  import smoothscroll from 'smoothscroll-polyfill';
  import { BANDSINTOWN_API_KEY } from "../util/Env";
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import 'virtual:windi.css';
  import Burger from "../components/icons/Burger.svelte";
  import LogoBlack from "../components/icons/LogoBlack.svelte";
  import LogoColor from '../components/icons/LogoColor.svelte';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';

  let loadingShows = true
  let showsResults

  let mounted = false
  let transformPx = "0px"
  let navTranslate = "300px"
  let windowWidth: number
  let windowHeight: number
  let navHeight: number
  let safeHeight: number
  let activeRoute = 'home'
  let showColorLogo = false
  let showToTop = false
  let showNav = false
  let rotateBackdrop = "0deg"
  let mostRecentScrolls = [0]
  let disableScrollLogic = false

  let padding8Height: number

  let homeScreenElementWrapper: any
  let ellimistName
  let ellimistNameHeight: number
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
    showToTop = true
    if (mounted) {
      window.scroll({ top: safeHeight, left: 0, behavior: 'smooth' });
      showColorLogo = false;
    }

    homeXY = [windowWidth - (homeNavW + 16), 16]
    aboutXY = [windowWidth - (aboutNavW + 16), aboutNavH + 24]
    releasesXY = [windowWidth - (releasesNavW + 16), (aboutNavH * 2) + 32]
    showsXY = [windowWidth - (showsNavW + 16), (aboutNavH * 3) + 40]
  }

  $: if ($page.route.id === "/about") {
    // ABOUT
    showToTop = false
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
    showToTop = false
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
    
  } else if ($page.route.id === '/') {
    showToTop = false
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

  const handleScroll = (e) => {
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
      } else if ($page.route.id !== "/releases" && window.scrollY > 300 && isScrollDownForSure) {
        goto('/releases', { replaceState: true })
      }
    }
  }

  const handleHomeClick = () => {
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
    setTimeout(() => showNav = true, 100)
    if (browser) {
      console.log(browser)
      smoothscroll.polyfill();
    }
  })
</script>

<svelte:window on:scroll={handleScroll} bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} />

<div class='absolute z-1 top-0 left-0 h-full w-full flex justify-center items-center p-2'>
  <div class='duration-600 ease-out w-full duration-2000 {showNav ? 'opacity-100' : 'opacity-0'}' style="transform: rotate({rotateBackdrop})">
    <LogoBlack />
  </div>
</div>

<div bind:clientHeight={padding8Height} class='absolute h-8' />

<div class='w-screen fixed top-0 left-0 z-4'>
  <a
    bind:this={aboutNav}
    bind:clientHeight={aboutNavH}
    bind:clientWidth={aboutNavW}
    on:click={handleHomeClick}
    style="transform: translate3d({aboutXY[0]}px, {aboutXY[1]}px, 0);"
    class='nav-item top-0 left-0 z-4 duration-500'
    class:text-primary={activeRoute === 'about'}
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
    class:text-primary={activeRoute === ''}
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
    class:text-primary={activeRoute === 'releases'}
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
    class:text-primary={activeRoute === 'shows'}
    href='/shows'
  >
    Shows
  </a>
</div>

<div class='w-screen overflow-x-hidden'>

  <a href='/' class='fixed z-3 top-5 right-5 h-10 w-10 duration-500 transform {showColorLogo ? "opacity-100" : "opacity-0"}'>
    <LogoColor />
  </a>

  <!-- <div style="top: {safeHeight - 80}px;" class="fixed {showToTop ? "z-3" : "z-1"} w-full flex justify-center">
    <a href='/' class='duration-500 transform {showToTop ? "opacity-100" : "opacity-0"}'>
      <div class='px-5 py-2 bg-primary p-3 rounded-full bg-opacity-90'>
        <span class='font-medium'>
          Back to Top
        </span>
      </div>
    </a>
  </div> -->

  {#if showNav}
    <div bind:offsetHeight={safeHeight} class='wrapper relative z-2 duration-500' style="transform: translateX({transformPx}); width: {windowWidth}px;">
      <div class='wrapper flex justify-center items-center absolute top-0 left-0 pt-8' style="transform: translateX(-{windowWidth}px); width: {windowWidth}px">
        <div bind:clientHeight={aboutHeaderHeight} class='absolute top-6 left-6'>
          <h1 class='font-display text-primary text-4xl uppercase mb-4 leading-5'>organic</h1>
          <h1 class='font-display text-primary text-4xl uppercase mb-4 leading-5'>electronic</h1>
          <h1 class='font-display text-primary text-4xl uppercase mb-4 leading-5'>music</h1>
        </div>
        <div bind:clientHeight={aboutTextHeight} class='h-100 pb-8 overflow-y-scroll'>
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
        <div bind:this={homeScreenElementWrapper} class='w-full'>
          <h1 bind:this={ellimistName} bind:clientHeight={ellimistNameHeight} class='font-display text-primary text-6xl uppercase text-center'>ellimist</h1>
          <div class='z-0 px-7 relative flex justify-between text-white text-lg uppercase italic w-full max-w-150 opacity-0'>
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

            <div class='absolute px-7 top-0 left-0 w-full flex justify-between'>
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

  .nav-item {
    @apply text-white text-lg uppercase italic absolute;
  }
</style>