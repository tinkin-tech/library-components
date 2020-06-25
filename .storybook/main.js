const path = require('path');

module.exports = {
  stories: ['../stories/**/*.stories.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: async config => {
    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          {
            test: [/\.(tsx|ts)$/],
            exclude: [path.resolve(__dirname, 'node_modules')],
            use: [{loader: 'ts-loader'}]
          },
          {
            test: /\.scss$/,
            use: [
                {
                  loader: 'style-loader'
                },
                {
                  loader: 'css-loader'
                },
                {
                  loader: 'sass-loader',
                  options: {
                    implementation: require('node-sass')
                  }
                }
            ],
            exclude: [path.resolve(__dirname, 'node_modules')],
          }
        ]
      },
      resolve: {
        ...config.resolve,
        modules: [
          ...(config.resolve.modules || []),
          path.resolve('../')
        ],
        extensions: [...config.resolve.extensions, '.tsx', '.ts']
      }
    };
  }
};
