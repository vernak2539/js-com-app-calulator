define( function( require ) {
	"use strict";

	// VENDOR
	var Marionette = require( 'marionette' );

	// TEMPLATES
	var templateName = require( 'tmpl!templates/start-tmpl.html' );

	return Marionette.Layout.extend({
		template: templateName
		, className: 'comm-app-start'
		, regions: {}
	});
});
