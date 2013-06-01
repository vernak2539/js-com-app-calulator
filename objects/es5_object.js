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
			var score = 18 - reduce( [ results[questionTypes[name] + '1'], results[questionTypes[name] + '2'], results[questionTypes[name] + '3'] ] ) + reduce( [ results[questionTypes[name] + '3'], results[questionTypes[name] + '4'], results[questionTypes[name] + '5'] ] );

			// caching score
			scores[ name ] = score;

			// returning socre
			return score;

		} else {

			// no supposed to be here
			return "You did something wrong. Try again.";

		}
	}

	// function that reduces all scores to final score and returns it
	function getPRCA() {
		return reduce( [ getGroupScore( 'group' ), getGroupScore( 'meeting' ), getGroupScore( 'interpersonal' ), getGroupScore( 'public_speaking' ) ] );
	}

	// function to load data and remove cache
	function loadNewData( data ) {
		results = data;
		scores  = {};
	}

	function reduce( array ) {

	}

	// returning object
	return {
		getGroupScore: getGroupScore
		, getPRCA: getPRCA
		, loadData: loadNewData
	};
});

return Calculator;