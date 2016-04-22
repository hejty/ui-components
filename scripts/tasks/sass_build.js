module.exports = function(gulp, plugins, config) {
  return function(done) {
    gulp.src(plugins.path.join(config.componentsPath, '**', '*.scss'))
      .pipe(plugins.if(!config.isProductionBuild, plugins.sourcemaps.init()))
      .pipe(plugins.sass({
        outputStyle: 'compressed',
        includePaths: ['node_modules/']
      })
      .on('error', done))
      .pipe(plugins.autoprefixer({
        browsers: ['last 2 versions', 'OperaMini >= 5', 'Android >= 4', 'Chrome >= 28', 'Safari >= 7'],
        cascade: false
      }))
      .pipe(plugins.if(!config.isProductionBuild, plugins.sourcemaps.write('.')))
      .pipe(plugins.rename(function(path) {
        path.dirname = plugins.path.join(path.dirname, config.cssDistRelativePath);
      }))
      .pipe(gulp.dest(config.componentsPath))
      .pipe(plugins.livereload())
      .on('error', done)
      .on('end', done);
  };
};
