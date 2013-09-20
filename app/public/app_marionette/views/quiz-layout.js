define( function( require ) {
	"use strict";

	var app = require( 'app-base/app' );

	// VENDOR
	var Marionette = require( 'marionette' );

	// views
	var AnswersView = require( 'views/answers-view' );
	var QuestionView = require( 'views/question-view' );

	// TEMPLATES
	var templateName = require( 'tmpl!templates/quiz-layout-tmpl.html' );

	return Marionette.Layout.extend({
		template: templateName
		, viewName: 'quiz-layout'
		, className: 'comm-quiz'
		, regions: {
			question: '#question'
			, answer: '#answer'
		}
		, onRender: function() {
			this.answer.show( new AnswersView() );
			this.question.show( new QuestionView() );
		}
	});
});
