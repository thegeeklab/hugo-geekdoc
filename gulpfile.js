const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const iconfont = require('gulp-iconfont');

const realFavicon = require('gulp-real-favicon');
const fs = require('fs');

const svgSprite = require('gulp-svg-sprite');

var CSSDEST = 'static/'
var FAVICON_DATA_FILE = 'src/favicon/faviconData.json';
var TIMESTAMP = Math.round(Date.now() / 1000);

gulp.task('sass', function () {
    return gulp.src('src/sass/main.scss')
        .pipe(sass({ errLogToConsole: true }))
        .pipe(cleanCSS({ format: 'beautify' }))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest(CSSDEST))
        .pipe(cleanCSS())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(CSSDEST))
});

gulp.task('favicon-generate', function (done) {
    realFavicon.generateFavicon({
        masterPicture: 'src/favicon/favicon-master.svg',
        dest: 'static/favicon',
        iconsPath: '/',
        design: {
            ios: {
                pictureAspect: 'backgroundAndMargin',
                backgroundColor: '#ffffff',
                margin: '14%',
                assets: {
                    ios6AndPriorIcons: false,
                    ios7AndLaterIcons: false,
                    precomposedIcons: false,
                    declareOnlyDefaultIcon: true
                }
            },
            desktopBrowser: {},
            windows: {
                pictureAspect: 'whiteSilhouette',
                backgroundColor: '#2b5797',
                onConflict: 'override',
                assets: {
                    windows80Ie10Tile: false,
                    windows10Ie11EdgeTiles: {
                        small: false,
                        medium: true,
                        big: false,
                        rectangle: false
                    }
                }
            },
            androidChrome: {
                pictureAspect: 'shadow',
                themeColor: '#ffffff',
                manifest: {
                    display: 'standalone',
                    orientation: 'notSet',
                    onConflict: 'override',
                    declared: true
                },
                assets: {
                    legacyIcon: false,
                    lowResolutionIcons: false
                }
            },
            safariPinnedTab: {
                pictureAspect: 'blackAndWhite',
                threshold: 74.21875,
                themeColor: '#5bbad5'
            }
        },
        settings: {
            scalingAlgorithm: 'Mitchell',
            errorOnImageTooSmall: false,
            readmeFile: false,
            htmlCodeFile: false,
            usePathAsIs: false
        },
        markupFile: FAVICON_DATA_FILE
    }, function () {
        done();
    });
});

gulp.task('favicon-check-update', function (done) {
    var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
    realFavicon.checkForUpdates(currentVersion, function (err) {
        if (err) {
            throw err;
        }
    });
    done();
});

gulp.task('svg-sprite', function () {
    config = {
        svg: {
            xmlDeclaration: false,
            rootAttributes: {
                style: "position: absolute; width: 0; height: 0; overflow: hidden;"
            }
        },
        mode: {
            inline: true,
            symbol: {
                dest: './',
                sprite: 'svg-icon-symbols.html',
                bust: false,
            }
        }
    };

    return gulp.src('src/icons/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('layouts/partials/'));
});

gulp.task('iconfont', function () {
    return gulp.src(['assets/icons/*.svg'])
        .pipe(iconfont({
            fontName: 'myfont', // required
            prependUnicode: true, // recommended option
            formats: ['ttf', 'eot', 'woff'], // default, 'woff2' and 'svg' are available
            timestamp: TIMESTAMP, // recommended to get consistent builds when watching files
        }))
        .on('glyphs', function (glyphs, options) {
            // CSS templating, e.g.
            console.log(glyphs, options);
        })
        .pipe(gulp.dest('www/fonts/'));
});

gulp.task('default', gulp.series(
    'sass',
    'svg-sprite',
    'favicon-check-update',
    'favicon-generate'
));

gulp.task('devel', function () {
    gulp.watch('src/sass/**/*.*css', gulp.series('sass'));
});
