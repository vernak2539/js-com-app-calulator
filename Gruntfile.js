/*global module:false*/
module.exports = function(grunt) {
	"use strict";

	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('package.json')
		, jshint: {
			all: [
				'./objects/es5_object.js'
				, './objects/coffee_calculator.js'
				, './apps/**/*.js'
				, '!./apps/app_backbone/js/text.js'
			]
			, options: {
				jshintrc: '.jshintrc'
			}
			, gruntfile: {
				src: 'Gruntfile.js'
			}
		}
		, qunit: {
			files: ['test/**/*.html']
		}
		, connect: {
			apps: {
				options: {
					port: 5000,
					base: './'
				}
			}
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
					halstead: 25, // no recommendation
					maintainability: 95 // recommendation 65
				}
			}
		} // end complexity
		, coffee: {
			genCalculator: {
				options: {
					bare: true
				}
				, files: {
					'./objects/coffee_calculator.js': './objects/calculator.coffee'
				}
			}
		}
		, traceur: {
			es6: {
				files:{
					'./objects/es6_compiled.js': ['./objects/es6_object.js']
				}
			}
		}
		, watch: {
			coffee: {
				files: [ './objects/calculator.coffee' ]
				, tasks: [ 'coffee:calc' ]
			}
			, less: {
				files: [ './apps/less/*.less']
				, tasks: [ 'recess:compile' ]
			}
			, all: {
				files: [ './apps/less/*.less', './apps/app_backbone/js/**/*.js' ]
				, tasks: [ 'coffee:genCalculator', 'jshint', 'qunit', 'complexity', 'recess:compile' ]
			}
		}
		, recess: {
			compile: {
				files: {
					'./apps/css/main.css': ['./apps/less/main.less']
				},
				options: {
					compile: true
				}
			}
		}
	});

	// Default task.
	grunt.registerTask( 'default', ['coffee:genCalculator', 'jshint', 'qunit', 'complexity'] );

	grunt.registerTask( 'dev', ['default', 'connect:apps', 'watch:all'] );

};
