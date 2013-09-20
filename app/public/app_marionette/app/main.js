requirejs.config({
	baseUrl: '/vendor',
	paths: {
		// APP FILES
		'app-base'   : '../app',

		// VENDOR FILES
		marionette : 'backbone.marionette',
	},
	deps: ['app-base/router'],
	shim: {
		'backbone': {
			deps: [ 'jquery', 'lodash', 'json2' ],
			exports: 'Backbone'
		},
		'jquery': {
			exports: '$'
		},
		'lodash': {
			exports: '_'
		}
	}
});