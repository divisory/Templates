/*--------------------------- variables --------------------------*/

var PATH = '',
		OPTIONS = {
			serverHost: 'localhost',
			serverPort: 1111,
			serverLivereload: true,
			coffeeWraping: true,
			notices: true
		};

/*---------------------------- modules ----------------------------*/

var fs 						= require('fs'),
		gulp 					= require('gulp'),
		connect 			= require('gulp-connect'),
		coffee 				= require('gulp-coffee'),
		sass 					= require('gulp-sass'),
		clean 				= require('gulp-clean'),
		colors 				= require('colors'),
		fileinclude 	= require('gulp-include'),
		cssmin 				= require('gulp-cssmin'),
		rename 				= require('gulp-rename'),
		plumber 			= require('gulp-plumber'),
		autoprefixer 	= require('gulp-autoprefixer'),
		jsmin 				= require('gulp-minify'),
		concat 				= require('gulp-concat'),
		zip 					= require('gulp-zip'),

		// notifications
		exec = require("child_process").exec;

/*---------------------------- helpers ----------------------------*/

// notifications function
var execute = function(command, callback){
	exec(command, function(error, stdout, stderr){
		if (callback){
			callback(stdout);
		}
	});
};

// console log for SASS task
var logSASS = function(err) {
	var mess = err.message.replace(/(\n|\r|Current dir:)/gim, '');
	if (OPTIONS.notices === true) {
		execute("notify-send 'SASS' '" + mess + "' -i dialog-no", function() {});
	}
	return console.log("\n\r"+
		colors.grey("[ ")+(colors.red('ERROR!'))+colors.grey(" ]")+" SASS\r\n"+
		(colors.red(mess))+"\r\n"
	);
};

// console log for CoffeeScript task
var logCoffeeScript = function(err) {
	var mess = err.message.replace(/(\n|\r|Current dir:)/gim, '');
	if (OPTIONS.notices === true) {
		execute("notify-send 'Coffeescript' '" + err.message + "\r\n → " + (err.stack.substr(0, err.stack.indexOf('error:'))) + "'  -i dialog-no", function() {});
	}
	return console.log("\n\r"+
		colors.grey("[ ")+(colors.red('ERROR!'))+colors.grey(" ]")+" CoffeeScript\r\n"+
		colors.red(mess)+colors.red(err.stack)+"\n\r"
	);
};

/*----------------------------- tasks ----------------------------*/

// console log for SASS task
gulp.task('connect', function(){
	connect.server({
		host: OPTIONS.serverHost,
		port: OPTIONS.serverPort,
		livereload: {
			port: 2233
		},
		root: [PATH+'dist',PATH+'dev-tools',PATH+'scss',PATH+'server']
	});
});

// SASS compilation
gulp.task('SASS', function(){
	gulp.src([
			PATH+'scss/variables.scss',
			PATH+'scss/skin.scss',
			PATH+'scss/components/*.scss',
			PATH+'scss/media/*.scss',
			'!'+PATH+'scss/bundle.scss'
		])
		.pipe(plumber({
			errorHandler: function(err){
				logSASS(err);
			}
		}))
		.pipe(concat('bundle.scss'))
		.pipe(sass())
		.pipe(autoprefixer({
			cascade: false,
			browsers: [
				'Chrome > 50', 'Firefox > 40', 'iOS > 7', 'Opera > 20',
				'Explorer > 10', 'Edge > 10']
		}))
		.pipe(gulp.dest(PATH+'dist/css'))
});

// CSS concat / reload
gulp.task('CSS', function(){
	return gulp.src([
			PATH+'dist/css/*.css',
			'!'+PATH+'dist/css/bundle.min.css'
		])
		.pipe(concat('bundle.min.css'))
		.pipe(cssmin())
		.pipe(gulp.dest(PATH+'dist/css/'))
		.pipe(connect.reload());
});


// clean html
gulp.task('html-clean', function(){
	return gulp.src(PATH+"dist/*.html")
			.pipe(clean({read: false}));
});

// HTML includer
gulp.task('HTML-include', ['html-clean'], function(){
	return gulp.src(PATH+'html/*.html')
		.pipe(plumber())
		.pipe(fileinclude())
		.pipe(gulp.dest(PATH+'dist/'))
});

// HTML reload
gulp.task('HTML', ['HTML-include'], function(){
	return gulp.src(PATH+'dist/*html')
		.pipe(connect.reload())
});

// CoffeeScript compiler
gulp.task('CoffeeScript', function(){
	return gulp.src([PATH+'coffee/*coffee', PATH+'coffee/*/*coffee'])
		.pipe(plumber())
		.pipe(fileinclude())
		.pipe(plumber({
			errorHandler: function(err){
				logCoffeeScript(err);
			}
		}))
		.pipe(coffee({bare: true}))
		.pipe(gulp.dest(PATH+'dist/js'))
});

// Javascript concat / reload
gulp.task('Javascript', ['CoffeeScript'], function(){
	return gulp.src([
			PATH+'dist/js/lib/*.js',
			PATH+'dist/js/plugins/*.js',
			PATH+'dist/js/init/*.js',
			PATH+'dist/js/*.js',
			'!'+PATH+'dist/js/bundle.js'
		])
		.pipe(concat('bundle.js', {newLine: ';'}))
		.pipe(gulp.dest(PATH+'dist/js'))
		.pipe(connect.reload());
});

// Javascript concat / reload
gulp.task('Javascript-min', ['CoffeeScript'], function(){
	return gulp.src([
			PATH+'dist/js/lib/*.js',
			PATH+'dist/js/plugins/*.js',
			PATH+'dist/js/init/*.js',
			PATH+'dist/js/*.js',
			'!'+PATH+'dist/js/bundle.js'
		])
		.pipe(concat('bundle.js', {newLine: ';'}))
		.pipe(jsmin())
		.pipe(gulp.dest(PATH+'dist/js'));
});


gulp.task('ugly', ['Javascript-min'], function(){
	var content = fs.readFileSync(PATH+'dist/js/bundle-min.js', 'utf8');
	fs.writeFile(PATH+'dist/js/bundle.js', content);
	fs.unlink(PATH+'dist/js/bundle-min.js');
});

// arcive
gulp.task('create-zip', [
		'CoffeeScript',
		'HTML-include',
		'SASS',
		'Javascript-min',
		'HTML',
		'CSS',
		'ugly'
	], function(){
	gulp.src([PATH+'dist/**/*', '!'+PATH+'dist/**/dist.zip'])
		.pipe(zip('dist.zip'))
		.pipe(gulp.dest('dist'))
});

// watch task
gulp.task('Watch-dev', function(){
	gulp.watch(PATH+'coffee/**/*coffee', 				['Javascript']);
	gulp.watch(PATH+'scss/**/*.scss', 					['SASS']);
	gulp.watch([
		PATH+'dist/css/*.css',
		'!'+PATH+'dist/css/bundle.min.css'
	], 																					['CSS']);
	gulp.watch(PATH+'html/**/*html', 						['HTML-include', 'HTML']);
});



/*
	Production
	`gulp production`
	`npm run prod`
*/
gulp.task('production', [
	'html-clean',
	'CoffeeScript',
	'HTML-include',
	'SASS',
	'Javascript',
	'HTML',
	'CSS',
	'create-zip'
], function(){
	execute("notify-send 'Gulp.js' 'Production mode' -i dialog-apply");
});

/*
	Development
	`gulp`
	`npm run dev`
*/
gulp.task('default', [
	'html-clean',
	'CoffeeScript',
	'Watch-dev',
	'SASS',
	'CSS',
	'HTML-include',
	'Javascript',
	'HTML',
	'connect'
], function(){
	execute("notify-send 'Gulp.js' 'Development mode' -i dialog-apply");
});