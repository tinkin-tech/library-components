const path = require('path');

module.exports = {
  stories: ['../stories/**/*.stories.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-controls'],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
};
