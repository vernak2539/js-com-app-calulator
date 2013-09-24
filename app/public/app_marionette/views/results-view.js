define( function( require ) {
	"use strict";

	// my badass calculator
	var app          = require( 'app-base/app' );
	var CommApprCalc = require( 'lib/es5_object_amd' );

	// VENDOR
	var Marionette = require( 'marionette' );

	// templates
	var resultsTmpl = require( 'tmpl!templates/results-tmpl.html' );

	return Marionette.ItemView.extend({
		template: resultsTmpl
		, templateHelpers: function() {
			var CommCalc = CommApprCalc( app.model.get('answers') );
			return {
				PRCA: CommCalc.getPRCA()
				, group: CommCalc.getGroupScore( "group" )
				, meeting: CommCalc.getGroupScore( "meeting" )
				, interpersonal: CommCalc.getGroupScore( "interpersonal" )
				, public_speaking: CommCalc.getGroupScore( "public_speaking" )
			};
		}
	});
});
