define( function( require ) {
	"use strict";

	var app       = require( 'app-base/app' );
	var questions = require( 'lib/questions.js' );

	// vendor
	var Backbone = require( 'backbone' );

	// views
	var StartLayout = require( 'views/start-layout' );
	var QuizLayout  = require( 'views/quiz-layout' );

	// initializers for anything
	app.addInitializer( function() {

		// setting up model for tracking everything later down the road
		this.model = new Backbone.Model();

		// setting up questions collection
		var QuestionsCollection = new Backbone.Collection({ model: new Backbone.Model() });

		this.model.set({
			questions: QuestionsCollection.reset( questions )
		});
	});

	var controller = {
		start: function() {
			app.mainContent.show( new StartLayout() );
		}
		, questions: function( id ) {
			if( !app.model.get('questionId') ) {
				id = 1;
			} else if( !!id && !!app.model.get('questionId') && ( id !== app.model.get( 'questionId' ) )  ) {
				app.router.navigate( '/quiz/' + app.model.get('questionId'), { trigger: true } );
			}
			app.model.set( 'questionId', id );
			app.mainContent.show( new QuizLayout() );
		}
	};

	return controller;
});