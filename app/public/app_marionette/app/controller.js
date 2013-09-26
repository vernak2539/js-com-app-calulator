define( function( require ) {
	"use strict";

	var app       = require( 'app-base/app' );
	var questions = require( 'lib/questions' );

	// vendor
	var Backbone = require( 'backbone' );

	// views
	var StartLayout     = require( 'views/start-layout' );
	var QuizLayout      = require( 'views/quiz-layout' );
	var ResultsView     = require( 'views/results-view' );
	var SocialMediaView = require( 'views/social-media-view' );

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

		this.utility = {};
		this.utility.objectSize = function(the_object) {
			/* function to validate the existence of each key in the object to get the number of valid keys. */
			var object_size = 0;
			for ( var key in the_object ) {
				if ( the_object.hasOwnProperty( key ) ) {
					object_size++;
				}
			}
			return object_size;
		};
	});

	var controller = {
		start: function() {
			app.showContent( app.mainContent, StartLayout, null );
			app.showContent( app.socialMedia, SocialMediaView, 'social-media' );
		}
		, quiz: function( id ) {
			// caching current question id that's stored in model
			var qID = ( !_.isNaN( parseInt( app.model.get('questionId'), 10 ) ) ) ? parseInt( app.model.get('questionId'), 10 ) : undefined;

			// I only want to continue if the id is not null/undefined and the model's question ID is not null/undefined
			if( ( !_.isUndefined( id ) && !_.isNull( id ) ) && ( !_.isUndefined( qID ) && !_.isNull( qID ) ) ) {

				// parsing the ID to an int like it should be
				id = parseInt( id, 10 );

				// if the id is not equal to the question ID set in the model, send them to that question
				if( id !== qID ) {
					app.router.navigate( '/quiz/' + qID, { trigger: true } );
				}
			} else {
				// setting what needs to be set
				app.model.set( 'questionId', 1 );

				// redirecting back to route so the above if statement condition is met
				app.router.navigate( '/quiz/' + app.model.get( 'questionId' ) );
			}

			app.showContent( app.mainContent, QuizLayout, 'quiz-layout' );
			app.showContent( app.socialMedia, SocialMediaView, 'social-media' );
		}
		, results: function() {
			if( app.utility.objectSize( app.model.get( 'answers' ) ) !== app.model.get( 'questions' ).length ) {
				app.router.navigate( '/', { trigger: true } );
			} else {
				app.showContent( app.mainContent, ResultsView, null );
			}
		}
	};

	return controller;
});