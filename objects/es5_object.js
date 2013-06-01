exports = (function ComAppCalc(data) {
	"use strict";
	this.results = data;
	this.questionTypes = {
			'group': 'g'
			, 'meeting': 'm'
			, 'interpersonal': 'i'
			, 'public_speaking': 'p'
	};
	this.scores = {};

	// function that calculates the individual group scores based on question
	this.getGroupScore = function( name, getCached ) {

		if( !this.results ) {
			return "No Data";
		}

		// will always try to get cached scores
		getCached || ( getCached = true );

		// deciding what to return
		if( !!getCached && !!this.scores[ name ] ) {

			// returned cached score if there already, just so it doesn't have to calculate it everytime
			return this.scores[ name ];

		} else if( !!this.questionTypes[ name ] ) {

			// calculating score if needed
			var score = 18 - this.reduce( [ this.results[this.questionTypes[name] + '1'], this.results[this.questionTypes[name] + '2'], this.results[this.questionTypes[name] + '3'] ] ) + this.reduce( [ this.results[this.questionTypes[name] + '3'], this.results[this.questionTypes[name] + '4'], this.results[this.questionTypes[name] + '5'] ] );

			// caching score
			this.scores[ name ] = score;

			// returning socre
			return score;

		} else {

			// no supposed to be here
			return "You did something wrong. Try again.";

		}
	}

	// function that reduces all scores to final score and returns it
	this.getPRCA = function() {
		return this.reduce( [ this.getGroupScore( 'group' ), this.getGroupScore( 'meeting' ), this.getGroupScore( 'interpersonal' ), this.getGroupScore( 'public_speaking' ) ] );
	}

	// function to load data and remove cache
	this.loadNewData = function( data ) {
		this.results = data;
		this.scores  = {};
	}

	this.reduce = function( array ) {

	}
});

