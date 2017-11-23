const gulp = require('gulp');
const merge = require('merge-stream');
const minify = require('gulp-htmlmin');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const twig = require('gulp-twig');

const OUTPUT_DIRECTORY = 'public';

gulp.task('default', ['css', 'medias', 'html']);

gulp.task('css', () => {
  const css = gulp
    .src([
      './assets/scss/**/*.scss',
      './assets/css/**/*.css',
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(`./${OUTPUT_DIRECTORY}/css`));
  const fonts = gulp
    .src('./assets/fonts/**/*')
    .pipe(gulp.dest(`./${OUTPUT_DIRECTORY}/fonts`));

  return merge(css, fonts);
});

gulp.task('medias', () => {
  return gulp
    .src('./medias/**/*')
    .pipe(gulp.dest(`./${OUTPUT_DIRECTORY}/medias`));
});

gulp.task('html', () => {
  return gulp.src('./templates/index.twig')
    .pipe(plumber())
    .pipe(twig({
      base: 'templates',
    }))
    .pipe(minify({ collapseWhitespace: true }))
    .pipe(gulp.dest(OUTPUT_DIRECTORY));
});
