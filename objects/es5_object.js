define(function() {
	"use strict";
	return function ComAppCalc(data) {
		var
			results = data
			, questionTypes = {
					'group': 'g'
					, 'meeting': 'm'
					, 'interpersonal': 'i'
					, 'public_speaking': 'p'
			}
			, scores = {}
		;

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
			return array.reduce( function( prev, current ) {
				return parseInt( prev, 10 ) + parseInt( current, 10 );
			});
		}

		// returning object
		return {
			getGroupScore: getGroupScore
			, getPRCA: getPRCA
			, loadData: loadNewData
		};
	};
});