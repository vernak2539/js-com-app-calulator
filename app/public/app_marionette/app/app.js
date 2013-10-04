define( function( require ) {
	"use strict";

	// vendor
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );
	var Handlebars = require( 'handlebars' );
	var $          = require( 'jquery' );

	// setting rendering engine to mustache
	Backbone.Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate) {
		return Handlebars.compile(rawTemplate);
	};

	Backbone.Marionette.Renderer.renderDefault = Backbone.Marionette.Renderer.render;
	Backbone.Marionette.Renderer.render = function( template, data ) {
		var fullData = _.extend( {}, data /*, i18nFallbacks, { CONSTS: CONSTS }*/ );
		return Backbone.Marionette.Renderer.renderDefault( template, fullData );
	};

	var app = new Marionette.Application();

	app.addRegions({
		mainContent: '#content'
		, socialMedia: '#social-media'
	});

	app.addInitializer(function() {
		this.showContent = function( Region, View, ViewName ) {
			if( !!Region.currentView ) {
				if( !Region.currentView.viewName || Region.currentView.viewName !== ViewName ) {
					Region.show( new View() );
				}
			} else {
				Region.show( new View() );
			}
		};
	});

	app.on( 'initialize:after', function() {
		$(function() {
			Backbone.history.start({
				pushState: true
				, hashChange: false
			});
		});
	});

	return app;
});