const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const del = require('del');

// Static server
gulp.task('server', function () {
  browserSync.init({
    server: {
      baseDir: 'src',
    },
  });
});

// Scss compiler
gulp.task('makeStyles', function () {
  return gulp
    .src('src/sass/**/*.+(scss|sass)')
    .pipe(
      sass({
        outputStyle: 'compressed',
      }).on('error', sass.logError)
    )
    .pipe(rename({ prefix: '', suffix: '.min' }))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

gulp.task('watcher', function () {
  gulp.watch('src/sass/**/*.+(scss|sass|css)', gulp.parallel('makeStyles'));
  gulp.watch('src/*.html').on('change', browserSync.reload);
  // gulp.watch('src/*.html').on('change', gulp.parallel('minifyHtml'));
});

gulp.task('minifyHtml', function () {
  return gulp
    .src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('copyCssToDist', function () {
  return gulp
    .src('src/css/**/*', { encoding: false })
    .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function () {
  return gulp
    .src('src/js/**/*.js', { encoding: false })
    .pipe(gulp.dest('dist/js'));
});

gulp.task('fonts', function () {
  return gulp
    .src('src/fonts/**/*', { encoding: false })
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('icons', function () {
  return gulp
    .src('src/icons/**/*', { encoding: false })
    .pipe(gulp.dest('dist/icons'));
});

gulp.task('images', function () {
  return gulp
    .src('src/img/**/*', { encoding: false }) // Запобігає зміні кодування файлів
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(gulp.dest('dist/img'));
});

gulp.task('phpmailer', function () {
  return gulp
    .src('src/phpmailer/**/*', { encoding: false })
    .pipe(gulp.dest('dist/phpmailer'));
});

gulp.task('cleanDist', function () {
  return del(['dist/**', '!dist']);
});

//  Default task
gulp.task(
  'default',
  gulp.series('makeStyles', gulp.parallel('server', 'watcher'))
);

// Build task
gulp.task(
  'build',
  gulp.series(
    'cleanDist',
    gulp.parallel(
      'copyCssToDist',
      'minifyHtml',
      'scripts',
      // 'fonts',
      'icons',
      'images'
      // 'phpmailer'
    )
  )
);
