define( function( require ) {
	"use strict";

	var app = require( 'app-base/app' );

	// VENDOR
	var Marionette = require( 'marionette' );

	// TEMPLATES
	var templateName = require( 'tmpl!templates/start-tmpl.html' );

	return Marionette.Layout.extend({
		template: templateName
		, className: 'comm-app-start'
		, regions: {}
		, events: {
			'click #questions': 'loadQuestions'
		}
		, loadQuestions: function() {
			app.router.navigate( '/quiz/', { trigger: true });
		}
	});
});
