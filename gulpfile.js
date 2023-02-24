const {
	src,
	dest,
	watch,
	parallel,
	series
} = require('gulp');



const scss = require('gulp-sass')(require('sass')); 
const concat = require('gulp-concat'); 
const browserSync = require('browser-sync').create(); 
const uglify = require('gulp-uglify'); 
const autoprefixer = require('gulp-autoprefixer'); 
const imagemin = require('gulp-imagemin'); 
const del = require('del'); 



function styles() { 
	return src('app/scss/style.scss') 
		.pipe(scss()) 
		.pipe(concat('style.min.css')) 
		.pipe(autoprefixer({ 
			overrideBrowserslist: ['last 10 version'],
			grid: true
		}))
		.pipe(dest('app/css')) 
		.pipe(browserSync.stream()) 
}


function scripts() {
	return src([ 
			'node_modules/jquery/dist/jquery.js', 
			'node_modules/slick-carousel/slick/slick.js', 
			'app/js/main.js' 
		])
		.pipe(concat('main.min.js')) 
		.pipe(uglify()) 
		.pipe(dest('app/js')) 
		.pipe(browserSync.stream())
}


function watching() {
	watch(['app/scss/**/*.scss'], styles); 
	watch(['app/js/main.js', '!app/js/main.min.js'], scripts); 
	watch(['app/*.html']).on('change', browserSync.reload); 

}


function browsersync() {
	browserSync.init({ 
		server: { 
			baseDir: 'app/' 
		},
		notify: false, 
	})
}

function images() {
	return src('app/images/**/*.*') 
		.pipe(imagemin([ 
			imagemin.gifsicle({ 
				interlaced: true
			}),
			imagemin.mozjpeg({ 
				quality: 75,
				progressive: true
			}),
			imagemin.optipng({ 
				optimizationLevel: 5
			}),
			imagemin.svgo({ 
				plugins: [{
						removeViewBox: true
					},
					{
						cleanupIDs: false
					}
				]
			})
		]))
		.pipe(dest('dist/images')) 
}


function cleanDist() {
	return del('dist') 
}




function build() {
	return src([ 
			'app/*.html',
			'app/css/style.min.css',
			'app/js/main.min.js',
			'app/fonts/**/*',

		], {
			base: 'app' 
		})
		.pipe(dest('dist')) 
}


exports.styles = styles
exports.scripts = scripts;
exports.watching = watching
exports.browsersync = browsersync
exports.images = images
exports.cleanDist = cleanDist


exports.build = series(cleanDist, styles, scripts, images, build, );
exports.default = parallel(styles, scripts, browsersync, watching);