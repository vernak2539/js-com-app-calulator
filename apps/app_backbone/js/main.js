require.config({
	baseUrl: 'js'
	, paths: {
		backbone: '../../../components/backbone/backbone'
		, lodash: '../../../components/lodash/lodash'
		, jquery: '../../../components/jquery/jquery'
		, templates: '../templates'
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
	}
});

require(['jquery', 'lodash', 'backbone', 'router'], function($, _, Backbone, Router) {
	var router = new Router();
	Backbone.history.start();
});