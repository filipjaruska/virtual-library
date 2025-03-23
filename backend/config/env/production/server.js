module.exports = ({ env }) => ({
  proxy: true,
  url: env("STRAPI_DEPLOYMENT_URL"),
  app: {
    keys: env.array("APP_KEYS"),
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
});
