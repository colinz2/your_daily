import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import {getYearList} from '../../script/readfile'

export default defineUserConfig<DefaultThemeOptions>({
  // 站点配置
  base: '/',
  lang: 'zh-CN',
  title: '我的日志',
  description: '每日记录',

  // 主题和它的配置
  theme: '@vuepress/theme-default',
  themeConfig: {
    logo: '/logo.jpg',
    sidebarDepth: 3,
    darkMode: true,

    // 导航栏
    navbar: [
        { 
          text: '首页',
          link: '/' 
        }, { 
          text: '关于', 
          link: '/about.md'
        }, { 
          text: '2022年', 
          link: '/2022/' 
        },
    ],

    // 左边栏
    sidebar : {
      '/2022/': getYearList("2022"),
    }
  },

  plugins: [
    [
      '@vuepress/plugin-search',
      {
        locales: {
          '/': {
            placeholder: 'Search',
          },
          '/zh/': {
            placeholder: '搜索',
          },
        },
        // 允许搜索 Frontmatter 中的 `tags`
        getExtraFields: (page) => page.frontmatter.tags ?? [],
        isSearchable: (page) => page.path !== '/',
        maxSuggestions: 10,
      },
    ],
  ],

})