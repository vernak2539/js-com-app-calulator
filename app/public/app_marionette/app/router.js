define( function( require ) {
	"use strict";

	var app = require( 'app-base/app' );

	// vendor
	var Marionette = require( 'marionette' );
	var controller = require( 'app-base/controller' );

	var Router = Marionette.AppRouter.extend({
		controller: controller
		, appRoutes: {
			'': 'start'
		}
	});

	app.router = new Router();
	app.start({
		router: app.router
	});
});