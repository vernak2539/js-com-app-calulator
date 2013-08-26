define( function( require ) {

		"use strict";

		var Backbone = require('backbone');
		var InfoView = require('views/infoView');

		return Backbone.Router.extend({
			// main routes
			routes: {
				'': 'renderInfo'
			}
			, initialize: function() {}
			, renderInfo: function() {
				new InfoView({
					el: '#content'
				});
			}
		});
	}
);