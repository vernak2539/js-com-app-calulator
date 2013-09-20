define( function( require ) {
	"use strict";

	var app       = require( 'app-base/app' );
	var questions = require( 'lib/questions' );

	// vendor
	var Backbone = require( 'backbone' );

	// views
	var StartLayout = require( 'views/start-layout' );
	var QuizLayout  = require( 'views/quiz-layout' );

	// initializers for anything
	app.addInitializer( function() {

		// setting up model for tracking everything later down the road
		this.model = new Backbone.Model();
		this.model.set( 'answers', {} );

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

			app.model.set( 'questionId', id );

			/*if( !app.model.get('questionId') ) {

				//start them at the beginning
				app.model.set( 'questionId', 0 );
				app.router.navigate( '/quiz/0', { trigger: true } );

			} else if( !!id && !!app.model.get('questionId') && ( id !== app.model.get( 'questionId' ) )  ) {

				// go to the question they have stored because they are not allowed to go back
				app.router.navigate( '/quiz/' + app.model.get('questionId'), { trigger: true } );

			} else if ( !!app.model.get('questionId') && app.model.get( 'questionId' ) >= app.model.get('questions').length ) {

				// go to results because they completed all the questions
				app.router.navigate( '/results', { trigger: true } );

			}*/
			if( !!app.mainContent.currentView ) {
				if( app.mainContent.currentView.viewName !== "quiz-layout" ) {
					app.mainContent.show( new QuizLayout() );
				}
			} else {
				app.mainContent.show( new QuizLayout() );
			}
		}
	};

	return controller;
});