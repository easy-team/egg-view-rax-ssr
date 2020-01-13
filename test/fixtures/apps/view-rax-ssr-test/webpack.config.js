'use strict';
// https://yuque.com/easy-team/egg-react
module.exports = {
  egg: true,
  framework: 'react',
  entry: {
    test: 'app/web/page/test/index.jsx',
  },
  resolve: {
    alias: {
      react: 'rax/lib/compat',
      'react-dom': 'rax-dom',
      'react-redux': 'rax-redux',
    },
  },
  plugins: [
    {
      imagemini: false,
    },
  ],
};
