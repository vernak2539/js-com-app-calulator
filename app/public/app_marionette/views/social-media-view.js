define( function( require ) {
	"use strict";

	// VENDOR
	var Marionette = require( 'marionette' );

	// templates
	var socialMediaTmpl = require( 'tmpl!templates/social-media-tmpl.html' );

	return Marionette.ItemView.extend({
		template: socialMediaTmpl
		, viewName: 'social-media'
		, className: 'social-media'
	});
});
