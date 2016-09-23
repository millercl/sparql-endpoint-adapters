var gulp = require( 'gulp' )
var jscs = require( 'gulp-jscs' )
var jshint = require( 'gulp-jshint' )
var stylish_jshint = require( 'jshint-stylish' )
var stylish_jscs = require( 'gulp-jscs-stylish' )

var paths = {
    src: [ '*.js' ]
  }

gulp.task( 'default', [ 'src' ] )

gulp.task( 'src'
, function () {
  return gulp.src( paths.src )
    .pipe( jshint() )
    .pipe( jshint.reporter( 'jshint-stylish' ) )
    .pipe( jscs( { fix: true } ) )
    .pipe( stylish_jscs() )
    .pipe( gulp.dest( './' ) )
} )
