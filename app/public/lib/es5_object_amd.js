// Uses AMD or browser globals to create a module.

// If you want something that will also work in Node, see returnExports.js
// If you want to support other stricter CommonJS environments,
// or if you need to create a circular dependency, see commonJsStrict.js

// Defines a module "amdWeb" that depends another module called "b".
// Note that the name of the module is implied by the file name. It is best
// if the file name and the exported global have matching names.

// If the 'b' module also uses this type of boilerplate, then
// in the browser, it will create a global .b that is used below.

// If you do not want to support the browser global path, then you
// can remove the `root` use and the passing `this` as the first arg to
// the top function.

(function ( root, factory ) {
	"use strict";

	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define([], factory);
	} else {
		// Browser globals
		root.amdWeb = factory();
	}
} ( this, function () {
	"use strict";

	return function ComAppCalc(data) {
		var results = data;
		var questionTypes = {
				'group': 'g'
				, 'meeting': 'm'
				, 'interpersonal': 'i'
				, 'public_speaking': 'p'
		};
		var scores = {};

		// function that calculates the individual group scores based on question
		function getGroupScore( name ) {

			if( !results ) {
				return "No Data";
			}

			var score = getCachedScores( name );

			if( !!score ) {
				return score;
			}

			if( !score && !!questionTypes[ name ] ) {
				// calculating score if needed
				score = 18 - sum( [ results[questionTypes[name] + '1'], results[questionTypes[name] + '2'], results[questionTypes[name] + '3'] ] ) + sum( [ results[questionTypes[name] + '4'], results[questionTypes[name] + '5'], results[questionTypes[name] + '6'] ] );

				// caching score
				scores[ name ] = score;
			} else {
				// no supposed to be here
				score = "You did something wrong. Try again.";
			}

			return score;
		}

		// function that sums all scores to final score and returns it
		function getPRCA() {
			return sum( [ getGroupScore( 'group' ), getGroupScore( 'meeting' ), getGroupScore( 'interpersonal' ), getGroupScore( 'public_speaking' ) ] );
		}

		// function to load data and remove cache
		function loadNewData( data ) {
			results = data;
			scores  = {};
			return true;
		}

		function getCachedScores( name ) {
			return scores[ name ] || false;
		}

		function sum( array ) {
			var sumOfArray = 0;
			if( array.length === 1 ) {

				// return lone array item as a int (will not be dealing with floats as we shouldn't be getting them anyway)
				sumOfArray = parseInt(array, 10);

			} else if( array.length > 1 ) {

				// do the sum
				for( var i = 0; i < array.length; i++ ) {
					sumOfArray = sumOfArray + ( parseInt( array[ i ], 10 ) || 0 );
				}

			} else {

				// doesn't meet requirements
				sumOfArray = false;

			}

			return sumOfArray;
		}

		// returning object
		return {
			getGroupScore: getGroupScore
			, getPRCA: getPRCA
			, loadData: loadNewData
		};
	};
}));