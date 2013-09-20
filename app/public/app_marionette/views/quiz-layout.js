define( function( require ) {
	"use strict";

	var app = require( 'app-base/app' );

	// VENDOR
	var Marionette = require( 'marionette' );

	// TEMPLATES
	var templateName = require( 'tmpl!templates/quiz-tmpl.html' );

	return Marionette.Layout.extend({
		template: templateName
		, className: 'comm-quiz'
		, regions: {}
		, ui: {
			'click #questions': 'loadQuestions'
		}
		, loadQuestions: function() {
			app.router.navigate( '/questions/1', { trigger: true });
		}
	});
});
