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
var babelES2015Preset = require('babel-preset-es2015');//解析ES6
var babelDecoratorsTransform = require('babel-plugin-transform-decorators-legacy').default; //解析ES7
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');//根据设置浏览器版本自动处理浏览器前缀

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
    }).transform(babelify, {
        presets: [babelES2015Preset],
        plugins: [babelDecoratorsTransform]
    });

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
        gulpWatch(['app/**/*.css','app/**/*.scss'],function () {
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
    return gulp.src(['node_modules/ionic-angular/fonts/**/*.+(ttf|woff|woff2)'])
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
 * 拷贝css文件 编译scss文件
 */
gulp.task('css',function () {
    var options = {
        src: 'app/theme/app.+(md|ios).scss',
        dest: 'www/build/css',
        sassOptions: {
            includePaths: [
                'node_modules/ionic-angular',
                'node_modules/ionicons/dist/scss'
            ]
        },
        onError: function(err) {
            console.error(err.message);
            this.emit('end');
        },
        autoprefixerOptions:{
            browsers: [
                'last 2 versions',
                'iOS >= 7',
                'Android >= 4',
                'Explorer >= 10',
                'ExplorerMobile >= 11'
            ],
            cascade: false
        }
    };
    return gulp.src(options.src)
        .pipe(sass(options.sassOptions))
        .on('error', options.onError)
        // .pipe(autoprefixer(options.autoprefixerOptions))
        .pipe(gulp.dest(options.dest))
});

/**
 * 拷贝js文件
 */
gulp.task('js',function () {
    return gulp.src(
        [
            'static/lib/**', 'node_modules/zone.js/dist/zone.js',
            'node_modules/reflect-metadata/Reflect.js',
            'node_modules/es6-shim/es6-shim.min.js'
        ]
    )
        .pipe(gulp.dest('www/build/js'));
});


function onError(err){
    console.error(err.toString());
}

Date.prototype.dateFormat = function (str) {
    str = str || "yyyy-MM-dd";
    var y = this.getFullYear();
    var M = this.getMonth() + 1;
    var d = this.getDate();
    var H = this.getHours();
    var m = this.getMinutes();
    var s = this.getSeconds();
    return str.replace("yyyy", y).replace("MM", M).replace("dd", d).replace("HH", H).replace("mm", m).replace("ss", s);
};

function onLog(log){
    console.log((log = log.split(' '), log[0] = pretty(log[0]), log.join(' '), log += ' ' + new Date().dateFormat("yyyy-MM-dd HH:mm:ss")));
}

