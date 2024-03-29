const { mergeConfig } = require('vite');
const svgr = require('vite-plugin-svgr');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    storyStoreV7: true,
    previewMdx2: true,
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [svgr()],
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `@import "../src/scss/index.scss";`,
          },
        },
      },
    });
  },
};
