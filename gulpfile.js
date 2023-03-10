const del = require('del');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const mincss = require('gulp-cssmin');
const autoprefixer = require('gulp-autoprefixer');
const { src, dest, series } = require('gulp');

// 复制完成
function finishedCopied(file, dist) {
  return new Promise(resolve => {
    src(file)
      .pipe(dest(dist))
      .on('end', () => resolve('ok'));
  });
}

// 编译scss
async function transferSCSS() {
  await src('./src/assets/theme/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(mincss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('./src/assets/theme/temp'));
}

// 合并CSS
async function concatCSS() {
  await src(['./node_modules/element-ui/packages/theme-chalk/lib/icon.css', './src/assets/theme/temp/*.css'])
    .pipe(mincss())
    .pipe(concat('element.min.css'))
    .pipe(dest('./public/static/theme/'));
}

// 复制当前项目文件
async function fontCopied() {
  await finishedCopied('./node_modules/element-ui/packages/theme-chalk/src/fonts/*', './public/static/theme/fonts/');
}

async function removeTemp() {
  await del('./src/assets/theme/temp');
}

exports.build = series(transferSCSS, concatCSS, fontCopied, series(removeTemp));
