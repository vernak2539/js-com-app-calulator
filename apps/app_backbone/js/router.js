define([
		'backbone'
		, 'views/start'
	], function(
		Backbone
		, MainView
	) {
		"use strict";

		return Backbone.Router.extend({
			// main routes
			routes: {
				'': 'renderMain'
			}
			, initialize: function() {}
			, renderMain: function() {
				new MainView();
			}
		});
	}
);