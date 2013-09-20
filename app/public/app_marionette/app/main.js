requirejs.config({
	baseUrl: '/vendor',
	paths: {
		// APP FILES
		'app-base'   : '../app_marionette/app',
		'lib': '../lib',
		'views': '../app_marionette/views',
		'templates': '../app_marionette/templates',

		// VENDOR FILES
		marionette : 'backbone.marionette.custom'
	},
	deps: ['../app_marionette/app/router'],
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