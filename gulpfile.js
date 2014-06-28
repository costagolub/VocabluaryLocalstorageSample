// define gulp plugins 
var gulp = require('gulp'),
	gutil = require('gulp-util'),
	uglify = require('gulp-uglify'),
	compass = require('gulp-compass'),
	watch = require('gulp-watch'),
	lr = require('tiny-lr'),
	server = lr(),
	connect = require('gulp-connect'),
	minifyCSS = require('gulp-minify-css'),
	livereload = require('gulp-livereload');


function startExpress() {
	var express = require('express');
	var app = express();
	app.use(require('connect-livereload')());
	app.use(express.static(__dirname));
	app.listen(4000);
}


// tasks 
gulp.task('compass', function() {
	gulp.src('./components/sass/styles.scss')
		.pipe(compass({
			config_file: './config.rb',
			css: './assets/css',
			sass: './components/sass'
		}))
		.on('error', gutil.log)
		.on('error', gutil.beep)
		.pipe(gulp.dest('./assets/css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('./assets/css'))
		.pipe(livereload(server));
});

gulp.task('server', function() {
	startExpress();
});

gulp.task('markup', function() {
	gulp.src('./*.html')
		.on('error', gutil.log)
		.on('error', gutil.beep)
		.pipe(connect.reload())
		.pipe(livereload(server));
});

gulp.task('js', function() {
	gulp.src('./components/js/*.js')
		.pipe(uglify())
		.on('error', gutil.log)
		.on('error', gutil.beep)
		.pipe(gulp.dest('./assets/js'))
		.pipe(livereload(server));
});

gulp.task('watch', function() {
	server.listen(35729, function(err) {
		if (err) return console.log(err);

		gulp.watch('./components/sass/*.scss', ['compass']);
		gulp.watch('./components/js/*.js', ['js']);
		gulp.watch('./*.html', ['markup']);
	});
});


// default 
gulp.task('default', ['server','compass', 'markup', 'js', 'watch']);


