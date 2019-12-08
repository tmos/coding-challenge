// Gulp imports
import {
  src,
  dest,
  watch,
  series,
  parallel
} from 'gulp';

// Gulp plugins
import postcss from 'gulp-postcss';
import postcss_autoprefixer from 'autoprefixer';
import postcss_cssnano from 'cssnano';
import postcss_preset_env from 'postcss-preset-env';
import browserSync from 'browser-sync';
import postcss_import from 'postcss-import';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';

// Paths
import PATHS from './paths';

/**
 * HTML processing
 */
function html() {
  return src(PATHS.src.html.files)
    .pipe(dest(PATHS.public.html.folder));
}

/**
 * Pictures optimisation
 *  - jpeg progressive loadin   \w imagemin(jpegtran)
 */
function img() {
  return src(PATHS.src.img.files)
    .pipe(imagemin([imagemin.jpegtran({
      progressive: true
    })]))
    .pipe(dest(PATHS.public.img.folder));
}

/**
 * CSS post processing:
 *  - browser prefixing     w\ autoprefixer
 *  - minification          w\ cssnano
 *  - next W3C css syntax   w\ postcss-present-env
 */
function css() {
  return src(PATHS.src.css.main, {
      sourcemaps: true
    })
    .pipe(postcss([
      postcss_import(),
      postcss_preset_env(),
      postcss_autoprefixer(),
      postcss_cssnano(),
    ]))
    .pipe(dest(PATHS.public.css.folder))
    .pipe(browserSync.stream());
}

/**
 * JS processing
 *  - ES2015        \w babel
 *  - minification  \w uglify
 */
function js() {
  return src(PATHS.src.js.files, {
      sourcemaps: true
    })
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(uglify())
    .pipe(dest(PATHS.public.js.folder))
}

/**
 * Live reload
 */
function dev() {
  // Setup BS
  browserSync({
    proxy: {
      target: "http://127.0.0.1:5000/"
    }
  });

  //HTML
  watch(PATHS.src.html.files, {
    ignoreInitial: false
  }, html).on('change', browserSync.reload);

  // IMG
  watch(PATHS.src.img.files, {
    ignoreInitial: false
  }, img).on('change', browserSync.reload);

  // CSS
  watch(PATHS.src.css.files, {
    ignoreInitial: false
  }, css).on('change', browserSync.reload);

  // JS
  watch(PATHS.src.js.files, {
    ignoreInitial: false
  }, js).on('change', browserSync.reload);
}

exports.html = html;
exports.js = js;
exports.css = css;
exports.img = img;
exports.default = dev;