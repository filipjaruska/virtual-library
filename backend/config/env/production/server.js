module.exports = ({ env }) => ({
  proxy: true,
  url: env("RAILWAY_PUBLIC_DOMAIN"),
  app: {
    keys: env.array("APP_KEYS"),
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
});
