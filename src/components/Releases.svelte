<script lang='ts'>

  const emptyRelease = {
    name: '',
    image: '',
    type: '',
    releaseDate: '',
    description: '',
    links: [
      {
        name: 'spotify',
        link: ''
      },
      {
        name: 'soundcloud',
        link: ''
      },
      {
        name: 'apple',
        link: ''
      },
      {
        name: 'bandcamp',
        link: ''
      }
    ],
    press: [
      {
        name: '',
        quote: '',
        link: ''
      }
    ]
  }

  const releases = [
    {
      name: 'Gift of Conviction (Ellimist Remix)',
      additionalArtists: 'Closed Loop',
      image: 'https://www.dropbox.com/s/dhmzuf42bwv9gn9/Gift%20of%20Conviction%20Artwork.png?raw=1',
      type: 'single',
      releaseDate: '2022-07-29',
      description: `A ground-up rework of Closed Loop's introspective song "Gift of Conviction," made up of trippy growls, space-jazz guitar, and otherworldly beats`,
      links: [
        {
          name: 'spotify',
          link: 'https://open.spotify.com/track/79bYTmFh3vU4swhyQ7eCEv?si=17ef35321bd64c68'
        },
        {
          name: 'soundcloud',
          link: 'https://soundcloud.com/ellimistmusic/gift-of-conviction-ellimist-remix'
        },
        {
          name: 'apple',
          link: 'https://music.apple.com/us/album/gift-of-conviction-ellimist-remix/1634257493?i=1634257494'
        },
        {
          name: 'bandcamp',
          link: 'https://ellimistmusic.bandcamp.com/track/gift-of-conviction-ellimist-remix'
        }
      ],
      press: [
        {
          name: '',
          quote: '',
          link: ''
        }
      ]
    },
    {
      name: 'Karafan',
      image: 'https://www.dropbox.com/s/vsj9asxpe1mlkov/creatures-from-the-deep.jpeg?raw=1',
      type: 'single',
      parent: 'ISR Compilation 001 - Creatures From the Deep',
      releaseDate: '2023-01-11',
      description: '',
      links: [
        {
          name: 'spotify',
          link: 'https://open.spotify.com/track/3q3xD2403QQnDeDc4M8wpV?si=be969460833d4b80'
        },
        {
          name: 'soundcloud',
          link: 'https://soundcloud.com/interstellarrabbithole/7-ellimist-karafan-v3?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing'
        },
        {
          name: 'apple',
          link: 'https://music.apple.com/us/album/karafan/1665362192?i=1665362193'
        },
        {
          name: 'bandcamp',
          link: 'https://isrcollective.bandcamp.com/track/ellimist-karafan'
        }
      ],
      press: [
        {
          name: '',
          quote: '',
          link: ''
        }
      ]
    },
    {
      name: 'Thrown Stone (Ellimist Remix)',
      additionalArtists: 'Josh Knowles',
      image: 'https://www.dropbox.com/s/9msyhh66kkosr81/throne-stone-sm.png?raw=1',
      type: 'single',
      releaseDate: '2021-12-10',
      description: `A bass/house remix of Josh Knowles' incredible song, "Thrown Stone," featuring vocals, violin, and precise, thoughtful production.`,
      links: [
        {
          name: 'spotify',
          link: 'https://soundcloud.com/ellimistmusic/josh-knowles-ellimist-thrown-stone-ellimist-remix'
        },
        {
          name: 'soundcloud',
          link: 'https://soundcloud.com/ellimistmusic/josh-knowles-ellimist-thrown-stone-ellimist-remix'
        },
        {
          name: 'apple',
          link: 'https://music.apple.com/us/album/thrown-stone-ellimist-remix/1597635127?i=1597635128'
        },
        {
          name: 'bandcamp',
          link: 'https://ellimistmusic.bandcamp.com/track/thrown-stone-ellimist-remix'
        }
      ],
      press: [
        {
          name: '',
          quote: '',
          link: ''
        }
      ]
    },
    {
      name: 'Move',
      image: 'https://www.dropbox.com/s/ps2txc7iiueu30w/Move%20Single%20Art.png?raw=1',
      type: 'single',
      releaseDate: '2021-09-21',
      description: 'An original banger, with some of the heaviest drops yet.',
      links: [
        {
          name: 'spotify',
          link: 'https://open.spotify.com/track/0SyUSbunQ1Ef7FKufcwbLA?si=765f5991486c4163'
        },
        {
          name: 'soundcloud',
          link: 'https://soundcloud.com/ellimistmusic/move'
        },
        {
          name: 'apple',
          link: 'https://music.apple.com/us/album/move/1579363921?i=1579363922'
        },
        {
          name: 'bandcamp',
          link: 'https://ellimistmusic.bandcamp.com/track/move'
        }
      ],
      press: [
        {
          name: '',
          quote: '',
          link: ''
        }
      ]
    },
    {
      name: 'Florish',
      image: 'https://www.dropbox.com/s/kqhtynt09z7rruz/Ellimist%20Florish%20Single%20Artwork%203000x3000.png?raw=1',
      type: 'single',
      releaseDate: '2021-06-21',
      description: `Debut single from Ellimist. A mysterious, organic track that flirts with bass music, house, and dubstep in odd-time. Composed entirely of manipulated samples from Floret Loret's sample pack.`,
      links: [
        {
          name: 'spotify',
          link: 'https://open.spotify.com/track/6jR5RIfjtUUNWHkxfpFwgK?si=b17a2aa7f1484de4'
        },
        {
          name: 'soundcloud',
          link: 'https://soundcloud.com/ellimistmusic/florish?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing'
        },
        {
          name: 'apple',
          link: 'https://music.apple.com/us/album/florish/1570869937?i=1570869938'
        },
        {
          name: 'bandcamp',
          link: 'https://ellimistmusic.bandcamp.com/track/florish'
        }
      ],
      press: [
        {
          name: '',
          quote: '',
          link: ''
        }
      ]
    }
  ]
</script>

<div id='releases-wrapper' class='min-h-screen relative z-3'>
  {#each releases as release}
    <div>
      <img alt={`Ellimist - ${release.name}`} src="{release.image}" />
    </div>
  {/each}
</div>