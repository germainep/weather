const gulp = require('gulp'), 
    neat = require('node-neat').includePaths,
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    typescript = require('gulp-ts')
      ;

gulp.task('styles', () =>
  gulp.src('./dev/sass/index.sass')
    .pipe(sass({
      includePaths: ['./dev/sass'].concat(neat)
    , }))
    .pipe(gulp.dest('./public'))
);

gulp.task('scripts', () =>
         gulp.src('./dev/*.js')
         .pipe(concat('index.js'))
         .pipe(gulp.dest('./public'))
);

gulp.task('imagemin',  () =>
  gulp.src('./dev/imgs/*')
  .pipe(imagemin())
  .pipe(gulp.dest('public/imgs'))
);

gulp.task('watch', (event) =>
          gulp.watch(['dev/sass/**/*.sass', 'dev/*.js'],  ['styles', 'scripts'])
);

gulp.task('default', ['styles', 'imagemin', 'scripts']);