define( function( require ) {
	"use strict";

	var app = require( 'app-base/app' );

	// VENDOR
	var Marionette = require( 'marionette' );

	// templates
	var answersTmpl = require( 'tmpl!templates/answers-tmpl.html' );

	return Marionette.ItemView.extend({
		template: answersTmpl
		, className: 'btn-toolbar'
		, events: {
			'click .answer-btn': 'changeQuestion'
		}
		, changeQuestion: function() {
			var qID = app.model.get( 'questionId' );
			if( qID < app.model.get('questions').length - 1 ) {
				app.router.navigate( '/quiz/' + (++qID), { trigger: true } );
			} else {
				app.router.navigate( '/results', { trigger: true } );
			}
		}
	});
});
