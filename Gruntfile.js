/*global module:false*/
module.exports = function(grunt) {
	"use strict";

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('package.json')
		, jshint: {
			all: [
				'objects/*.js'
			]
			, options: { jshintrc: '.jshintrc' }
			, gruntfile: {
				src: 'Gruntfile.js'
			}
		}
		, qunit: {
			files: ['test/**/*.html']
		}
		, complexity: {
			generic: {
				src: [
					'objects/**/*.js'
				],
				options: {
					// Recommendations taken from http://jscomplexity.org/complexity
					errorsOnly: false, // show pretty file list
					cyclomatic: 10, // recommendation 10
					halstead: 12, // no recommendation
					maintainability: 85 // recommendation 65
				}
			}
		} // end complexity
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-complexity');

	// Default task.
	grunt.registerTask( 'default', ['jshint', 'qunit', 'complexity'] );

};
