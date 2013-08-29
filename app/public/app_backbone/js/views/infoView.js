define( function( require ) {

		'use strict';

		var Backbone   = require('backbone');
		var Handlebars = require('handlebars');
		var infoTmpl   = require('text!templates/info.html');

		return Backbone.View.extend({
			initialize: function() {
				this.render();
			}
			, render: function() {
				var template = Handlebars.compile( infoTmpl );
				$(this.el).html( template() );
			}
		});
	}
);