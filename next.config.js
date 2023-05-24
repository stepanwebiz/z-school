const { i18n } = require("./next-i18next.config.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    host: process.env.NODE_ENV !== "production" ? "http://localhost:3000" : "",
    WEB_APP_BASE_URL:"https://z-school.co.il/",
    WEB_APP_DASHBOARD_URL:"https://dashboard.z-school.co.il/",

  },
  reactStrictMode: true,
  i18n,
};

module.exports = nextConfig;
