define( function( require ) {
	"use strict";

	// my badass calculator
	var app          = require( 'app-base/app' );
	var comApprCalc = require( 'lib/es5_object_amd' );

	// VENDOR
	var Marionette = require( 'marionette' );

	// templates
	var resultsTmpl = require( 'tmpl!templates/results-tmpl.html' );

	return Marionette.ItemView.extend({
		template: resultsTmpl
		, className: 'results'
		, templateHelpers: function() {
			var results = comApprCalc( app.model.get('answers') );
			// below is just for testing purposes
			// var results = comApprCalc( {"g1": 2,"g2": 4,"g3": 1,"g4": 1,"g5": 3,"g6": 5,"i1": 3,"i2": 4,"i3": 2,"i4": 2,"i5": 5,"i6": 1,"m1": 4,"m2": 1,"m3": 2,"m4": 3,"m5": 5,"m6": 3,"p1": 4,"p2": 1,"p3": 3,"p4": 5,"p5": 2,"p6": 4 });
			return {
				PRCA: results.getPRCA()
				, group: results.getGroupScore( "group" )
				, meeting: results.getGroupScore( "meeting" )
				, interpersonal: results.getGroupScore( "interpersonal" )
				, public_speaking: results.getGroupScore( "public_speaking" )
			};
		}
	});
});
