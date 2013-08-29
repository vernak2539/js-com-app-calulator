"use strict";

var config = require( 'config' );
var _      = require( 'underscore' );

function getIndex( req, res ) {
	var options = _.extend({}, {
		config: JSON.stringify( config )
		, staticBase: config.endpoints.defaultStaticBase
		, appBase: config.endpoints.apps.marionette
		, title: "TEST TITLE"
	});
	res.render( 'index', options );
}

module.exports = {
	index: getIndex
};