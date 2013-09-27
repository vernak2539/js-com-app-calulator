define( function( require ) {
	"use strict";

	var app = require( 'app-base/app' );

	// VENDOR
	var Marionette = require( 'marionette' );

	// templates
	var progressTmpl = require( 'tmpl!templates/progress-view-tmpl.html' );

	return Marionette.ItemView.extend({
		template: progressTmpl
		, className: 'progress-display'
		, ui: {
			current: '#current-question'
		}
		, initialize: function() {
			this.listenTo( app.model, 'change:questionId', this.updateCurrentQuestion );
		}
		, templateHelpers: function() {
			return {
				currentQuestion: parseInt( app.model.get('questionId'), 10 ) 
				, totalQuestions: app.model.get('questions').length
			};
		}
		, updateCurrentQuestion: function() {
			this.ui.current.html( parseInt( app.model.get('questionId'), 10 ) );
		}
	});
});
