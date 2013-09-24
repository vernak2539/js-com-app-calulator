define( function( require ) {
	"use strict";

	var app = require( 'app-base/app' );

	// VENDOR
	var Marionette = require( 'marionette' );

	// templates
	var questionTmpl = require( 'tmpl!templates/question-view-tmpl.html' );

	return Marionette.ItemView.extend({
		template: questionTmpl
		, initialize: function() {
			this.listenTo( app.model, 'change:questionId', this.render );
		}
		, templateHelpers: function() {
			if( !!app.model.get('questionId') ) {
				var questionId = parseInt( app.model.get('questionId'), 10 );

				return {
					question: app.model.get('questions').models[questionId].get( 'question' )
					, key: app.model.get('questions').models[questionId].get( 'key' )
				};
			}
		}
	});
});
