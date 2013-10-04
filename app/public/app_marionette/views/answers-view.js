define( function( require ) {
	"use strict";

	var app = require( 'app-base/app' );

	// VENDOR
	var Marionette = require( 'marionette' );
	var $          = require( 'jquery' );

	// templates
	var answersTmpl = require( 'tmpl!templates/answers-tmpl.html' );

	return Marionette.ItemView.extend({
		template: answersTmpl
		, className: 'row'
		, events: {
			'click .answer-btn': 'storeAnswer'
		}
		, storeAnswer: function( event ) {
			var allAnswers = app.model.get('answers');
			allAnswers[ $('#questionKey').val() ] = parseInt( $(event.currentTarget).val(), 10 );
			app.model.set('answers', allAnswers);
			this.changeQuestion();
		}
		, changeQuestion: function() {
			var qID = app.model.get( 'questionId' );
			if( qID < app.model.get('questions').length ) {
				var newQuestionId = ++qID;
				app.model.set( 'questionId', newQuestionId );
				app.router.navigate( '/quiz/' + newQuestionId, { trigger: true } );
			} else {
				app.router.navigate( '/results', { trigger: true } );
			}
		}
	});
});
