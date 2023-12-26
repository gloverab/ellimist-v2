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

  let safeAreaHeight: number
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

  const metaPages = [
    {
      route: '/',
      title: 'Ellimist Music | Official Website for Electronic Producer Ellimist',
      description: 'Ellimist is an electronic music producer and DJ located in Boston, MA.'
    },
    {
      route: '/about',
      title: 'Ellimist Music | About',
      description: 'Ellimist is an electronic music producer, sound designer, and DJ located in Boston, MA.'
    },
    {
      route: '/shows',
      title: 'Ellimist Music | Shows - See Ellimist Live',
      description: 'Ellimist is an electronic music producer, sound designer, and DJ who performs throughout New England and the northeast.'
    },
    {
      route: '/releases',
      title: 'Ellimist Music | Releases - Singles, Remixes, Albums, and More',
      description: 'Singles, Remixes, Albums, and Compilations that Ellimist has created or been a part of.'
    },
  ]

  $: activePage = metaPages.find(p => p.route === $page.route.id) || metaPages[0]
  $: console.log($page.route.id)

  const releasePostions = () => {
    homeXY = [windowWidth - (homeNavW + 16), 16]
    aboutXY = [windowWidth - (aboutNavW + 16), aboutNavH + 24]
    releasesXY = [windowWidth - (releasesNavW + 16), (aboutNavH * 2) + 32]
    showsXY = [windowWidth - (showsNavW + 16), (aboutNavH * 3) + 40]
  }

  const homePositions = () => {
    aboutXY = [aboutNavNoHomeDummy?.offsetLeft, homeScreenElementWrapper?.offsetTop + ellimistNameHeight]
    homeXY = [releasesNavNoHomeDummy?.offsetLeft, homeScreenElementWrapper?.offsetTop + ellimistNameHeight]
    releasesXY = [releasesNavNoHomeDummy?.offsetLeft, homeScreenElementWrapper?.offsetTop + ellimistNameHeight]
    showsXY = [showsNavNoHomeDummy?.offsetLeft, homeScreenElementWrapper?.offsetTop + ellimistNameHeight]
  }

  const scrollToReleases = () => {
    disableScrollLogic = true
    setTimeout(() => disableScrollLogic = false, 500)
    animateScroll.scrollTo({ element: '#releases-wrapper' })
  }

  const handleReleasesNav = () => {
    scrollToReleases()
    releasePostions()
  }

  $: if ($page.route.id === "/about") {
    // ABOUT
    rotateBackdrop = "-90deg"
    transformPx = `${windowWidth}px`
    showColorLogo = true

    const navY = aboutHeaderHeight + aboutTextHeight + aboutNavH + (padding8Height / 2)

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
    if (mounted) {
      releasePostions()
      scrollToReleases()
    }
  } else if ($page.route.id === '/') {
    rotateBackdrop = "0deg"
    transformPx = "0px"
    showColorLogo = false

    homePositions()
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
      
      if ($page.route.id === "/releases" && window.scrollY < 199 && isScrollUpForSure) {
        homePositions()
        disableScrollLogic = true
        setTimeout(() => disableScrollLogic = false, 500)
        goto('/', { replaceState: true, noScroll: true });
      } else if ($page.route.id !== "/releases" && window.scrollY > 200 && isScrollDownForSure) {
        releasePostions()
        disableScrollLogic = true
        setTimeout(() => disableScrollLogic = false, 500)
        goto('/releases', { replaceState: true, noScroll: true })
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

<nav class='w-screen fixed top-0 left-0 z-5 duration-500' class:opacity-100={showNav} class:opacity-0={!showNav}>
  <a
    bind:this={aboutNav}
    bind:clientHeight={aboutNavH}
    bind:clientWidth={aboutNavW}
    on:click={handleHomeClick}
    style="transform: translate3d({aboutXY[0]}px, {aboutXY[1]}px, 0);"
    class='nav-item top-0 left-0 z-4 duration-500'
    class:active-nav={$page.route.id === "/about"}
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
    class:opacity-0={$page.route.id === "/"}
    class:opacity-100={$page.route.id === "/about" || $page.route.id === "/shows"}
    class:active-nav={$page.route.id === "/"}
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
    class:active-nav={$page.route.id === "/releases"}
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
    class:active-nav={$page.route.id === "/shows"}
    href='/shows'
  >
    Shows
  </a>
</nav>

<div class='{$page.route.id === "/" || $page.route.id === "/about" ? 'z-10' : 'z-0'} fixed top-6 right-6'>
  <SocialIcons />
</div>

<div class='w-screen overflow-x-hidden'>
  <div bind:clientHeight={safeAreaHeight} class='wrapper relative z-2 duration-500' style="transform: translateX({transformPx}); width: {windowWidth}px;">
    {#if showAuxPages}
      <div class='wrapper flex flex-col items-start absolute top-0 left-0 pt-8' style="transform: translateX(-{windowWidth}px); width: {windowWidth}px">
        <div bind:clientHeight={aboutHeaderHeight} class='left-6 sm:left-18 md:left-28 pb-6'>
          <h1 class='font-display text-primary text-4xl uppercase leading-11'>Ellimist creates <br />organic <br />electronic <br />music</h1>
        </div>
        <div style="max-height: {safeAreaHeight - aboutHeaderHeight - aboutNavH - (padding8Height * 2)}px;" bind:clientHeight={aboutTextHeight} class='pb-8 px-6 sm:px-18 md:px-28 sm:flex overflow-y-scroll overflow-x-hidden sm:space-x-4'>
          <p class='text-white font-sans italic md:flex-1'>
            Ellimist is the Boston-based multifaceted electronic artist focused on creating organic music that moves the body and mind. Known for his guitar playing in Pi Wrecks and Weird Phishes, multi-instrumental prowess with post-rock duo It Was A Good Dream, and unique production style with violinist Josh Knowles, Alex Glover founded Ellimist with the goal of creating music that stretches the boundaries of listeners from any background.
            <br>
            <br>
            Equal parts sound design, and composition, Ellimist's music whisks listeners away on a journey through a combination of live instrumentation, ambient melodies, and bone ratting bass that flirts with funk, house, dubstep, and everything in between.
          </p>
          <div class='hidden md:inline-grid md:flex-1 grid md:grid-cols-2 md:row-auto gap-2'>
            <div class='row-auto'>
              <img src='https://www.dropbox.com/s/dhmzuf42bwv9gn9/Gift%20of%20Conviction%20Artwork.png?raw=1' />
            </div>
            <div>
              <img src='https://www.dropbox.com/s/kqhtynt09z7rruz/Ellimist%20Florish%20Single%20Artwork%203000x3000.png?raw=1' />
            </div>
            <div>
              <img src='https://www.dropbox.com/s/vsj9asxpe1mlkov/creatures-from-the-deep.jpeg?raw=1' />
            </div>
            <div>
              <img src='https://www.dropbox.com/s/9msyhh66kkosr81/throne-stone-sm.png?raw=1' />
            </div>
          </div>
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
        <div class='relative w-full md:max-w-120 p-6 mb-24'>
          
          <h1 class='font-display text-primary text-6xl uppercase text-center mb-4'>shows</h1>
          <p class='text-white text-center'>There are no shows at this time. Please check back soon.</p>
        </div>
      </div>
    {/if}
  </div>
</div>

{#if $page.route.id === "/releases"}
  <div in:fade out:fade class='fixed z-4 top-0 right-0 w-full h-90 bg-gradient-to-tr from-transparent via-transparent to-black' />
{/if}

<Releases />

<svelte:head>
  <title>{activePage.title}</title>
  <meta name="description" content="{activePage.description}" />
  <link rel="canonical" href="https://ellimistmusic.com{activePage.route}" />
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
    height: -webkit-fill-available;
    height: 100vh;
    /* height: 100vh; */
  }

  .nav-item {
    @apply text-white text-lg uppercase italic absolute;
  }

  .nav-item.active-nav {
    @apply text-primary;
  }
</style>