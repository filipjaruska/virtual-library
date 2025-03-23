module.exports = ({ env }) => ({
  proxy: true,
  url: env(
    "RAILWAY_STATIC_URL",
    "https://virtual-library-production.up.railway.app"
  ),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
});
