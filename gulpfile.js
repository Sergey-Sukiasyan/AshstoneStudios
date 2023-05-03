const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso');
const include = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const sync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');

const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

const img = (cb) => {
    return src('src/images/**/*.{png,jpg,jpeg,gif,svg}')
        .pipe(imagemin())
        .pipe(dest('build/images'))
        .on('end', cb);
}

const html = (cb) => {
    src('src/**.html')
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(dest('build'))
        .on('end', cb);
}

const scss = (cb) => {
    return src('src/scss/**.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions']
        }))
        .pipe(csso())
        .pipe(concat('index.css'))
        .pipe(dest('build/css'))
        .on('end', cb);
}

const clear = () => {
    return del('build');
}

const typescript = (cb) => {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(dest('build/js'))
        .on('end', cb);
}

const dev = () => {
    sync.init({
        server: 'build',
    })

    watch(['src/**.html', 'src/partials/**.html'], series(html)).on('change', sync.reload)
    watch('src/scss/**.scss', series(scss)).on('change', sync.reload)
    watch('src/typescript/**.ts', series(typescript)).on('change', sync.reload)
}

exports.build = series(clear, scss, img, html, typescript);
exports.dev = series(clear, scss, img, html, typescript, dev);
