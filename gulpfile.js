const gulp = require('gulp'),
      pug = require('gulp-pug'),
    neat = require('node-neat').includePaths,
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    typescript = require('gulp-tsc');

const paths = {
  sass: './src/sass/*.sass'
};

gulp.task('styles', () =>
  gulp.src(paths.sass)
    .pipe(sass({
      includePaths: ['styles'].concat(neat),
    })).on('error', sass.logError)
    .pipe(gulp.dest('./public/css'))
);

gulp.task('views',  () => {
  return gulp.src('src/*.pug')
    .pipe(pug({
    pretty: true
  }))
    .pipe(gulp.dest('./public'));
});

gulp.task('compile', ()=>
 		gulp.src('src/*.ts')
		  .pipe(typescript() )
		 .pipe(gulp.dest('./public/'))
		 );

gulp.task('scripts', () =>
         gulp.src('./src/*.js')
         .pipe(concat('index.js'))
         .pipe(gulp.dest('./public'))
);

gulp.task('imagemin',  () =>
  gulp.src('./src/imgs/*')
  .pipe(imagemin())
  .pipe(gulp.dest('./public/imgs'))
);

gulp.task('watch', (event) =>
          gulp.watch(['src/sass/**/*.sass', 'src/*.js', 'src/*.ts', 'src/*.pug'],  ['styles', 'scripts', 'compile', 'views' ])
);

gulp.task('default', ['styles', 'imagemin', 'compile', 'scripts', 'views']);
