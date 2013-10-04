"use strict";

// Application Dependencies
var config      = require( 'config' );
var hbs         = require( 'hbs' );
var http        = require( 'http' );
var express     = require( 'express' );

// Routes/REST handlers
var routes = require( './routes' );

// Express Setup
var app = module.exports = express();

app.configure(function() {
	//config.staticBase = config.endpoints.uiDirectory + config.endpoints.apps.marionette;

	// Webfonts need mime types, too!
	express.static.mime.define({'application/x-font-woff': ['woff']});
	express.static.mime.define({'application/x-font-ttf': ['ttf']});
	express.static.mime.define({'application/vnd.ms-fontobject':['eot']});
	express.static.mime.define({'font/opentype': ['otf']});
	express.static.mime.define({'image/svg+xml': ['svg']});

	// wanting to log stuff
	//app.use( express.logger() );

	// gzippin like a boss
	app.use( express.compress() );

	// setting port to vcap services or 5000
	app.set( 'port', process.env.VCAP_APP_PORT || 5000 );

	// assigning hbs to consolidate.hbs rendering engine
	app.engine( 'hbs', hbs.__express );

	// setting .hbs as default
	app.set( 'view engine', 'hbs' );

	// setting directory for node views
	app.set( 'views', __dirname + '/views/' );

	// Allow Express to behave like a RESTful app
	app.use( express.methodOverride() );

	// Using the router middleware for stuff
	app.use( app.router );

	// Serve thing from static place
	app.use( express.static( __dirname + config.endpoints.uiDirectory ) );

	// Comment Error pages
	// Handle 404
	app.use( function( req, res ) {
		res.status( 404 );
		res.render( '404', {title: '404: File Not Found', error: 'The file you are seeking is not here'} );
	});

	// Handle 400
	app.use( function( err, req, res, next ) {
		res.status( 400 );
		res.render( '400', {title: '400: Invalid Request', error: JSON.stringify( err ) } );
	});

	// Handle 500 errors
	app.use( function( err, req, res, next ) {
		res.status( 500 );
		// console.log( typeof err, err, JSON.stringify( err ) );
		res.render( '500', {title: '500: Internal Server Error', error: JSON.stringify( err ) } );
	});
});

// Express should do this stuff in development environment
app.configure('development', function() {
	app.use( express.errorHandler({ dumpException: true, showStack: true }));
});

// Express should do this stuff in production environment
app.configure('production', function() {
	console.log( 'Node in production mode' );
});

// router for node app
app.get( '/quiz', routes.index );
app.get( '/quiz/*', routes.index );
app.get( '/results', routes.index );
app.all('/', routes.index );

http.createServer( app ).listen( app.get( 'port' ) );
console.log( 'Express server listening on port %d in %s mode', app.get('port'), process.env.NODE_ENV );