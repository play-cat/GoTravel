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
    .pipe(gulp.dest('docs/'));
});

gulp.task('copyCssToDocs', function () {
  return gulp
    .src('src/css/**/*', { encoding: false })
    .pipe(gulp.dest('docs/css'));
});

gulp.task('scripts', function () {
  return gulp
    .src('src/js/**/*.js', { encoding: false })
    .pipe(gulp.dest('docs/js'));
});

gulp.task('fonts', function () {
  return gulp
    .src('src/fonts/**/*', { encoding: false })
    .pipe(gulp.dest('docs/fonts'));
});

gulp.task('icons', function () {
  return gulp
    .src('src/icons/**/*', { encoding: false })
    .pipe(gulp.dest('docs/icons'));
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
    .pipe(gulp.dest('docs/img'));
});

gulp.task('phpmailer', function () {
  return gulp
    .src('src/phpmailer/**/*', { encoding: false })
    .pipe(gulp.dest('docs/phpmailer'));
});

gulp.task('cleanDocs', function () {
  return del(['docs/**', '!docs']);
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
    'cleanDocs',
    gulp.parallel(
      'copyCssToDocs',
      'minifyHtml',
      'scripts',
      // 'fonts',
      'icons',
      'images'
      // 'phpmailer'
    )
  )
);
