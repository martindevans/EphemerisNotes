// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

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
          // todo: Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/martindevans/EphemerisNotes/tree/master/',
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
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/c7VTX5C4tq',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/martindevans',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/martindevans/EphemerisNotes',
              }
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Martin Evans`,
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
