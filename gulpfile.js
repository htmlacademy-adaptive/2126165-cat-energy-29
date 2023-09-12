import gulp from "gulp";
import plumber from "gulp-plumber";
import sass from "gulp-dart-sass";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import csso from "postcss-csso";
import rename from "gulp-rename";
import terser from "gulp-terser";
import squoosh from "gulp-libsquoosh";
import svgo from "gulp-svgmin";
import { stacksvg } from "gulp-stacksvg";
import { deleteAsync } from "del";
import browser from "browser-sync";
import htmlmin from "gulp-htmlmin";

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss", { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css", { sourcemaps: "." }))
    .pipe(browser.stream());
}

// HTML

const html = () => {
  return gulp.src("source/*.html")
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest("build"));
}

// Scripts

const scripts = () => {
  return gulp.src("source/js/*.js")
  .pipe(terser())
  .pipe(gulp.dest("build/js"))
  .pipe(browser.stream());
}

//Images

const optimizeImages = () => {
  return gulp.src(["source/img/**/*.{png,jpg}", "!source/img/great-img/*.*", "!source/img/favicons/*.*"])
  .pipe(squoosh())
  .pipe(gulp.dest("build/img"))
}

const copyGreatImages = () => {
  return gulp.src("source/img/great-img/*.*")
  .pipe(gulp.dest("build/img"))
}

const copyImages = () => {
  return gulp.src("source/img/**/*.{png,jpg}")
  .pipe(gulp.dest("build/img"))
}

//WebP

const createWebp = () => {
  return gulp.src(["source/img/**/*.{png,jpg}", "!source/img/favicons/*.*"])
  .pipe(squoosh({
    webp: {}
  }))
  .pipe(gulp.dest("build/img"))
}

// SVG

const optimizeSvg = () =>
  gulp.src(["source/img/**/*.svg", "!source/img/sprite/*.svg", "!source/img/favicons/*.svg"])
  .pipe(svgo())
  .pipe(gulp.dest("build/img"));

const sprite = () => {
  return gulp.src("source/img/sprite/*.svg")
  .pipe(svgo())
  .pipe(stacksvg({ output: "sprite" }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img"));
}

//Copy

const copy = (done) => {
  gulp.src([
    "source/fonts/**/*.{woff2,woff}",
    "source/*.ico",
    "source/*.webmanifest",
    "source/img/favicons/*.*"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"))
  done();
}

//Clean

const clean = () => {
  return deleteAsync("build");
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

//Reload

const reload = (done) => {
  browser.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(styles));
  gulp.watch("source/js/*.js", gulp.series(scripts));
  gulp.watch("source/*.html", gulp.series(html, reload));
}

//Build

export const build = gulp.series(
  clean,
  copy,
  copyGreatImages,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    optimizeSvg,
    sprite,
    createWebp
  ),
);

//Default

export default gulp.series(
  clean,
  copy,
  copyGreatImages,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    optimizeSvg,
    sprite,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  )
);
