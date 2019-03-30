var gulp= require('gulp'),
browserSync=require('browser-sync').create();
var watch=require('./styles');

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
    gulp.watch('./docs/index.html',function(cb){
      browserSync.reload();
      cb();
    });
    // gulp.watch('./docs/assets/styles/**/*.css',gulp.series(styles,cssInject));
    cb();
}
module.exports=watch;