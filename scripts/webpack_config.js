function toCamelCase(str) {
  return str.replace(/(\-[a-z])/g, function($1) {
    return $1.toUpperCase().replace('-', '');
  });
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
  getConfig(watch, plugins, config) {
    const glob = require('glob');
    const files = glob.sync('components/**/src/js/main.js');
    const entry = {};
    const loaders = [];

    files.forEach(path => {
      const filename = plugins.path.basename(path).replace('js', 'min.js');
      const dir = plugins.path.dirname(path);
      const componentDirName = plugins.path.basename(plugins.path.join(dir, config.componentRelativePath));
      const componentName = capitalizeFirstLetter(toCamelCase(componentDirName));

      entry[plugins.path.join(dir, config.jsDistRelativePath, filename)] = './' + path;
      loaders.push({
        test: plugins.path.join(config.projectSrcPath, path),
        loader: 'expose?' + componentName
      });
    });

    watch = watch || false;
    return {
      entry,
      output: {
        filename: '[name]'
      },
      devtool: config.isProductionBuild ? false : 'source-map',
      module: {
        loaders: loaders.concat([
          {
            test: /\.js?$/,
            include: config.componentsPath,
            loader: 'babel-loader',
            query: {
              presets: ['es2015'],
              plugins: [
                'add-module-exports'
              ]
            }
          }
        ])
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
      if (typeof done === 'function') {
        done();
      }
    };
  }
};
