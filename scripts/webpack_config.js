module.exports = {
  getConfig(watch, plugins, config) {
    const glob = require('glob');
    const files = glob.sync('components/**/src/js/main.js');
    const entry = {};

    files.forEach(path => {
      const filename = plugins.path.basename(path).replace('js', 'min.js');
      const dir = plugins.path.dirname(path);

      entry[plugins.path.join(dir, config.jsDistRelativePath, filename)] = './' + path;
    });

    watch = watch || false;

    return {
      entry,
      output: {
        filename: '[name]'
      },
      devtool: config.isProductionBuild ? false : 'source-map',
      module: {
        loaders: [
          {
            test: /\.js?$/,
            include: config.componentsPath,
            loader: 'babel-loader',
            query: {
              presets: ['es2015']
            }
          }
        ]
      },
      watch,
      plugins: config.isProductionBuild ? [
        new plugins.webpack.optimize.UglifyJsPlugin({minimize: true})
      ] : []
    };
  },
  getCallback(done, plugins) {
    return function(err, stats) {
      if (err) {
        throw new plugins.util.PluginError('webpack', err);
      }
      plugins.util.log('[webpack]', stats.toString());
      if(typeof done === 'function') {
        done();
      }
    };
  }
};
