const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: 
              { 
                '@primary-color': '#EF8354', // orange
                '@mobile-width' : '767px'
              }, 
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};