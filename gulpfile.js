'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug'); // Припроцесор HTML
const browserSync = require('browser-sync');// Серсер для обновлення і синхронізації сторінки
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');// плагін для побудови карт в scss і js
const uglify = require('gulp-uglifyjs');
// const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const del = require('del');  // для видалення попок файлів
// const imagemin = require('gulp-imagemin');
// const pngquant = require('imagemin-pngquant');
const sass = require('gulp-sass');
const cache = require('gulp-cache');
// const spritesmith = require("gulp.spritesmith");
const plumber = require("gulp-plumber"); // щоб ловити помилки в потоці
const notify = require("gulp-notify");
// const newer = require("gulp-newer");
const autoprefixer = require('gulp-autoprefixer');// плагін для css добаляє префікси до різних браузерів

var way = {
    "root": "./public",
    "theme": "frontend/pug/pages/*.pug",
    "style": "frontend/style/main.scss",
    "image": "frontend/image/**/*.*",
    "script": "frontend/js/**/*.*"
};

//бібліотеки які нам потрібні і всі js файли
var js = [
    'frontend/js/libs/jquery-3.1.1.min.js'
];

// Стилі
gulp.task('scss', function () {
    return gulp.src([
            way.style
        ])
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
                return {
                    title: "Style",
                    message: "Message to the notifier: " + err.message
                }
            })
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer(['last 2 version']))
        .pipe(rename({suffix: ".min"}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(way.root + "/style"));
    /*.pipe(browsersync.reload({
     stream: true
     }))*/
    ;
});

// Работа с Pug
gulp.task('pug', function () {
    return gulp.src(way.theme)
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .on("error", notify.onError(function (error) {
            return "Message to the notifier: " + error.message;
        }))
        .pipe(gulp.dest(way.root));
});

// JS
gulp.task('scripts', function () {
    return gulp.src(way.script)
        //.pipe(concat('libs.min.js'))
        //.pipe(uglify())
        .pipe(gulp.dest(way.root + '/js'));
        // .pipe(browsersync.reload({
        //   stream: true
        // }));
});

//image
gulp.task('image',function (){
    return gulp.src(way.image)
        .pipe(gulp.dest(way.root + '/image'));
})
//icon
gulp.task('icon-little',function (){
    return gulp.src('frontend/style/icon/**/*.*')
        .pipe(gulp.dest(way.root + '/style/icon'));
})


gulp.task("server", function () {
    browserSync.init({
        server: way.root
    });

    browserSync.watch(way.root + "/**/*.*").on("change", browserSync.reload);
});

// Видалення кешу
gulp.task('clearCache', function () {
    return cache.clearAll();
});

// Видалення папик
gulp.task("clear", function () {
    return del(way.root);
});

gulp.task("watch", function () {
    gulp.watch("frontend/style/**/*.scss", gulp.series("scss"));
    gulp.watch("frontend/js/**/*.js", gulp.series("scripts"));
    gulp.watch("frontend/pug/**/*.pug", gulp.series("pug"));
    gulp.watch("frontend/image/**/*.*", gulp.series("image"));
    gulp.watch("frontend/style/icon/**/*.*", gulp.series("icon-little"));
});

gulp.task("build", gulp.series("pug", "scss", "scripts","image","icon-little"));

gulp.task("default", gulp.series("clear", "build", gulp.parallel("watch", "server")));