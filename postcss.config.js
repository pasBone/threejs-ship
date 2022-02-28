module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 3840,
      exclude: [/node_modules/]
    }
  },
};
