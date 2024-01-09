module.exports = {
  src: "./app",
  language: "typescript",
  schema: "../api/schema/schema.graphql",
  artifactDirectory: './app/__generated__',
  featureFlags: {
    enable_relay_resolver_transform: true,
  }
}
