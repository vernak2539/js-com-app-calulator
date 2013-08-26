require.config({
	baseUrl: 'js'
	, paths: {
		backbone: '../../../components/backbone/backbone'
		, lodash: '../../../components/lodash/lodash'
		, jquery: '../../../components/jquery/jquery'
		, handlebars: '../../../components/handlebars/handlebars'
		, templates: '../templates'
		, text: './text'
		, data: '../data'
		, router: 'router'
	}
	, shim: {
		backbone: {
			deps: ['jquery', 'lodash']
			, exports: 'Backbone'
		}
		, jquery: {
			exports: '$'
		}
		, lodash: {
			exports: '_'
		}
		, handlebars: {
			exports: "Handlebars"
		}
	}
});

require(['jquery', 'lodash', 'backbone', 'router'], function($, _, Backbone, Router) {

	"use strict";

	new Router();
	Backbone.history.start();

});