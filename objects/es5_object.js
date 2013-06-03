var Calculator = (function ComAppCalc(data) {
	"use strict";
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
	function getGroupScore( name, getCached ) {

		if( !results ) {
			return "No Data";
		}

		// will always try to get cached scores
		getCached || ( getCached = true );

		// deciding what to return
		if( !!getCached && !!scores[ name ] ) {

			// returned cached score if there already, just so it doesn't have to calculate it everytime
			return scores[ name ];

		} else if( !!questionTypes[ name ] ) {

			// calculating score if needed
			var score = 18 - sum( [ results[questionTypes[name] + '1'], results[questionTypes[name] + '2'], results[questionTypes[name] + '3'] ] ) + sum( [ results[questionTypes[name] + '3'], results[questionTypes[name] + '4'], results[questionTypes[name] + '5'] ] );

			// caching score
			scores[ name ] = score;

			// returning socre
			return score;

		} else {

			// no supposed to be here
			return "You did something wrong. Try again.";

		}
	}

	// function that sums all scores to final score and returns it
	function getPRCA() {
		return sum( [ getGroupScore( 'group' ), getGroupScore( 'meeting' ), getGroupScore( 'interpersonal' ), getGroupScore( 'public_speaking' ) ] );
	}

	// function to load data and remove cache
	function loadNewData( data ) {
		results = data;
		scores  = {};
	}

	function sum( array ) {
		var sum = 0;
		if( array.length === 1 ) {

			// return lone array item as a int (will not be dealing with floats as we shouldn't be getting them anyway)
			sum = parseInt(array);

		} else if( array.length > 1 ) {

			// do the sum
			for( var i = 0; i < array.length; i++ ) {
				sum = sum + ( parseInt( array[ i ] ) || 0 );
			}

		} else {

			// doesn't meet requirements
			sum = false;

		}

		return sum;
	}

	// returning object
	return {
		getGroupScore: getGroupScore
		, getPRCA: getPRCA
		, loadData: loadNewData
	};
});

return Calculator;