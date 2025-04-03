// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/icon'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: "What's That Tech - Technology Stack Detector",
      titleTemplate: "%s | What's That Tech",
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        // Primary meta tags
        { 
          name: 'description', 
          content: 'Gotta catch \'em all! Discover what technologies power any website. Open-source, community-driven tech stack detection tool.' 
        },
        { name: 'theme-color', content: '#ef4444' },
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://whats-that-tech-demo.fly.dev/' },
        { property: 'og:title', content: "What's That Tech - Technology Stack Detector" },
        { 
          property: 'og:description', 
          content: 'Gotta catch \'em all! Discover what technologies power any website. Open-source, community-driven tech stack detection tool.' 
        },
        { 
          property: 'og:image', 
          content: '/og-image.jpg' 
        },
        // Twitter
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:url', content: 'https://whats-that-tech-demo.fly.dev/' },
        { property: 'twitter:title', content: "What's That Tech - Technology Stack Detector" },
        { 
          property: 'twitter:description', 
          content: 'Gotta catch \'em all! Discover what technologies power any website. Open-source, community-driven tech stack detection tool.' 
        },
        { 
          property: 'twitter:image', 
          content: 'https://raw.githubusercontent.com/tzi-labs/whats-that-tech-demo/main/public/og-image.png' 
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
    }
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  }
})