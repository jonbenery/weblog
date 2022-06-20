// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const homePage = 'https://github.com/trefoils';

const pagePlugins = ['about', 'book', 'utils']

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'JonBen',
  tagline: '你来过一阵子，我却怀念一辈子',
  url: homePage,
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Jonben', // Usually your GitHub org/user name.
  projectName: 'weblog', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  plugins: [
    ...pagePlugins.map(page => {
      return [
        '@docusaurus/plugin-content-docs',
        {
          id: page,
          path: `./packages/${page}`,
          routeBasePath: page,
          sidebarPath: require.resolve(`./packages/${page}/sidebars.js`),
          editUrl: homePage,
          showLastUpdateAuthor: true,
          showLastUpdateTime: true
        }
      ]
    })
  ],
  presets: [
    [
      'classic',
      ({
        docs: {
          path: './packages/docs',
          sidebarPath: require.resolve('./packages/docs/sidebars.js'),
          editUrl: homePage,
        },
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
        title: '零下6℃',
        logo: {
          alt: 'no pains no gains',
          src: 'img/favicon.ico',
        },
        items: [
          {
            to: 'docs',
            position: 'left',
            label: '知识库',
          },
          {
            to: 'book',
            position: 'left',
            label: '阅读',
          },
          {
            to: 'utils',
            position: 'left',
            label: '工具类',
          },
          {
            href: homePage,
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '快速导航',
            items: [
              {
                label: '设计模式',
                href: homePage
              },
            ],
          },
          {
            title: '收藏',
            items: [
              {
                label: '程序员的数学',
                href: homePage,
              },
              {
                label: '设计模式',
                href: homePage,
              }
            ],
          },
          {
            title: '联系方式',
            items: [
              {
                to: 'about',
                label: '邮箱 ｜ 联系我'
              }
            ]
          }
        ],
        copyright: `AGPL-3.0 Licensed | Copyright © ${new Date().getFullYear()} weblog, Inc. Built with Jonben.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      }
    }),
};

module.exports = config;
