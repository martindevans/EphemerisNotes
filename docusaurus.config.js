// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Ephemeris Notes',
  tagline: 'Space Combat Simulator',
  url: 'https://martindevans.github.io',
  baseUrl: '/EphemerisNotes/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/rocket_64.png',
  trailingSlash: true,

  // GitHub pages deployment config.
  organizationName: 'martindevans',
  projectName: 'EphemerisNotes',
  deploymentBranch: 'gh-pages',

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X',
      crossorigin: 'anonymous',
    },
  ],

  plugins: [
    [
      // https://github.com/cmfcmf/docusaurus-search-local#usage
      require.resolve("@cmfcmf/docusaurus-search-local"),
      {
        indexDocSidebarParentCategories: 4,
        maxSearchResults: 16,
        indexBlog: false,
      },
    ],
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/martindevans/EphemerisNotes/tree/master/',
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Ephemeris',
        logo: {
          alt: 'Ephemeris Logo',
          src: 'img/rocket_512.png',
        },
        items: [
          // {
          //   type: 'doc',
          //   docId: 'index',
          //   position: 'left',
          //   label: 'Tutorial',
          // },
        ],
      },
      footer: {
        style: 'dark',
        //copyright: `Copyright © ${new Date().getFullYear()} Martin Evans`,
        logo: {
          alt: 'Github Status',
          src: 'https://github.com/martindevans/EphemerisNotes/actions/workflows/deploy.yml/badge.svg',
          href: 'https://github.com/martindevans/EphemerisNotes/actions/workflows/deploy.yml/badge.svg',
          width: 208,
          height: 20,
        },
        links: [
          {
            title: 'Social',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/c7VTX5C4tq',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/martindevans',
              },
            ],
          },
          {
            title: 'Contribute',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/martindevans/EphemerisNotes',
              }
            ],
          },
        ]
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        respectPrefersColorScheme: true,
      }
    }),
};

module.exports = config;
