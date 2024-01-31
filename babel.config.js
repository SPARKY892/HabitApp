module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "import-graphql",
      [
        "module-resolver",
        {
          alias: {
            "@library": "./src/library",
            "@context": "./src/context",
            "@features": "./src/features",
            "@navigation": "./src/navigation",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
