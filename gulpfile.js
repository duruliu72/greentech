var gulp= require('gulp'),
postcss=require('gulp-postcss'),
autoprefixer=require('autoprefixer'),
cssvars=require('postcss-simple-vars'),
nested=require('postcss-nested'),
cssImport=require('postcss-import'),
mixins=require('postcss-mixins'),
browserSync=require('browser-sync').create();

function styles(){
  return gulp.src('./docs/assets/styles/styles.css')
    .pipe(postcss([cssImport,mixins,cssvars,nested,autoprefixer]))
    .on('error',function(errorInfo){
      console.log(errorInfo.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('./docs/temp/styles'));
}

function cssInject(){
  return gulp.src('./docs/temp/styles/styles.css')
    .pipe(browserSync.stream());
}
function watch(cb){
    browserSync.init({
      notify:false,
      server: {
            baseDir: "docs"
        }
    });
    gulp.watch('./docs/**/*.html',function(cb){
      browserSync.reload();
      cb();
    });
    gulp.watch('./docs/assets/styles/**/*.css',gulp.series(styles,cssInject));
    cb();
}
exports.watch=watch;