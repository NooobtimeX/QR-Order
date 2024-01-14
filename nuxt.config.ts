export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "th",
      },
      script: [
        {
          hid: "gtm-script",
          innerHTML: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })( window,document,'script','dataLayer','GTM-MFDKPGZ2');
          `,
          type: "text/javascript",
          charset: "utf-8",
          async: true,
        },
      ],
    },
  },
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    "@nuxt/content",
    "@nuxtseo/module",
    "nuxt-simple-robots",
    "nuxt-schema-org",
    "nuxt-simple-sitemap",
  ],
  site: {
    url: "http://www.rs-award.com",
  },
  robots: {
    UserAgent: "*",
    Allow: [],
  },
  sitemap: {
    defaults: {},
  },
});
