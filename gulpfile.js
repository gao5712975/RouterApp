var gulp = require('gulp');
var watchify = require('watchify');//加速browserify编译
var babelify = require('babelify'); 
var browserify = require('browserify'); 
var source = require('vinyl-source-stream');
var pretty = require('prettysize'); //文字格式化
var del = require('del'); //文件删除
var assign = require('lodash.merge'); //lodash.merge 对象继承
var runSequence = require('run-sequence'); //异步任务
var gulpWatch = require('gulp-watch'); //监听插件

function onError(err){
    console.error(err.toString());
}

function onLog(log){
    console.log((log = log.split(' '), log[0] = pretty(log[0]), log.join(' ')));
}

/**
 * js文件编译
 * @param options 修改默认配置
 * @returns {*}
 */
function buildBrowserify(options) {
    var defaultOptions = {
        watch:false
    };
    options = assign(defaultOptions,options);
    
    var b = browserify({
        entries: ['app/app.js'],
        debug: false
    }).transform(babelify, {presets: ["es2015"]});

    if(options.watch){
        b = watchify(b);
        b.on('update',bundle);
        b.on('log',onLog);
    }
    return bundle();
    function bundle() {
        return b.bundle()  // 多个文件打包成一个文件
            .on('error', onError)
            .pipe(source('app.bundle.js'))
            .pipe(gulp.dest('www/build/js'));
    }
}

/**
 * 任务监听
 */
gulp.task('default',['clean'],function (done) {
    runSequence(['font','html','css','js'],function () {
        gulpWatch('app/**/*.html',function () {
            gulp.start('html')
        });
        gulpWatch('app/**/*.css',function () {
            gulp.start('css')
        });
        buildBrowserify({watch:true}).on('end', done);
    })
});

/**
 * 手动编译
 */
gulp.task('build',['clean'],function (done) {
    runSequence(['font','html','css','js'],function () {
        buildBrowserify({watch:false}).on('end', done);
    })
});

/**
 * 清除编译文件
 */
gulp.task('clean', function(){
    return del('www/build');
});

/**
 * 拷贝字体文件
 */
gulp.task('font',function () {
    return gulp.src(['static/fonts/**'])
        .pipe(gulp.dest('www/build/fonts'));
});

/**
 * 拷贝html文件
 */
gulp.task('html',function () {
    return gulp.src(['app/**/*.html'])
        .pipe(gulp.dest('www/build'));
});

/**
 * 拷贝css文件
 */
gulp.task('css',function () {
    return gulp.src(['app/**/*.css','static/theme/app.md.css'])
        .pipe(gulp.dest('www/build/css'));
});

/**
 * 拷贝js文件
 */
gulp.task('js',function () {
    return gulp.src(['static/lib/**'])
        .pipe(gulp.dest('www/build/js'));
});