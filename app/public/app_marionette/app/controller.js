define( function( require ) {
	"use strict";

	var app       = require( 'app-base/app' );
	var questions = require( 'lib/questions.js' );

	// vendor
	var Backbone = require( 'backbone' );

	// views
	var StartLayout = require( 'views/start-layout' );

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
	};

	return controller;
});