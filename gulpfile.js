var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();

var rename = require("gulp-rename");
var minify = require("gulp-csso");
// var uglify = require("gulp-uglify");
// var pump = require('pump');

var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp"); // only for chromium browsers
var svgstore = require("gulp-svgstore");

var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");

var run = require("run-sequence"); // для запуска задач последовательно (не параллельно)
var del = require("del");

/*============================================================*/
gulp.task("style", function () {
    gulp.src("less/style.less")
        .pipe(plumber())
        .pipe(less())
        .pipe(postcss([
            autoprefixer()
//     autoprefixer({browsers: [
//       "last 1 version",
//       "last 2 Chrome versions",
//       "last 2 Firefox versions",
//       "last 2 Opera versions",
//       "last 2 Edge versions"
//     ]})
//     ,
//     mqpacker({
//       sort: true
//     })
        ]))
        .pipe(gulp.dest("css"))
        .pipe(minify())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("css"))


        // .pipe(server.reload({stream: true})) // перезагружает стр.
        .pipe(server.stream());  // для css перерисовывает стили без фактической перезагрузки
});

// gulp.task('uglify', function (done) {
//     pump([
//             gulp.src('js/script.js'),
//             uglify(),
//             rename("script.min.js"),
//             gulp.dest('js')
//         ],
//         done
//     );
// });

/*============================================================*/
gulp.task("images", function () {
    return gulp.src("img/**/*.{png,jpg,svg}")
        .pipe(imagemin([
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.jpegtran({progressive: true}),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest("img"));
});

gulp.task("webp", function () {
    return gulp.src("img/**/*.{png,jpg}")
        .pipe(webp({quality: 90}))
        .pipe(gulp.dest("img/webp"));
});

/*============================================================*/
gulp.task("sprite", function () {
    return gulp.src("img/icon-*.svg") // работа с файлами начинающимися с icon
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename("sprite.svg"))
        .pipe(gulp.dest("build/img"));
});
/* for html
 <div style="display: none">
 <include src="build/img/sprite.svg"></include>
 </div>
 */

/*============================================================*/
gulp.task("html", function () {
    return gulp.src("*.html")
        .pipe(posthtml([
            include()
        ]))
        .pipe(gulp.dest("build"));
});

/*============================================================*/
gulp.task("start", ["style"], function () {
    server.init({
        server: "."
    });

    gulp.watch("less/**/*.less", ["style"]);
    gulp.watch("*.html")
        .on("change", server.reload);
    gulp.watch("js/**/*.js")
        .on("change", server.reload);
});

/*============================================================*/
gulp.task("build", function (done) {
    run(
        "clean",
        "copy",
        "style",
        "sprite",
        "html",
        done
    );
});

/*============================================================*/
gulp.task("copy", function () {
    return gulp.src([
        "./fonts/**/*.{woff,woff2}",
        "./img/**",
        "./js/**"
    ], {
        base: "."
    })
        .pipe(gulp.dest("build"));
});

/*============================================================*/
gulp.task("clean", function () {
    return del("build")
});