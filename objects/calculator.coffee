# will be a coffeescript file emulating es5_object.js
define ->
	"use strict"
	(data) ->
		results = data
		questionTypes =
			"group": "g"
			"meeting": "m"
			"interpersonal": "i"
			"public_speaking": "p"
		scores = {}

		getGroupScore = (name) ->
			return "No Data" unless results

			score = getCachedScores(name)

			return score unless not score

			if not score and !!questionTypes[name]
				score = 18 - sum( [ results[questionTypes[name] + '1'], results[questionTypes[name] + '2'], results[questionTypes[name] + '3'] ] ) + sum( [ results[questionTypes[name] + '4'], results[questionTypes[name] + '5'], results[questionTypes[name] + '6'] ] )
				scores[name] = score
			else
				score = "You did something wrong. Try again."
			score

		getPRCA = ->
			sum( [ getGroupScore( 'group' ), getGroupScore( 'meeting' ), getGroupScore( 'interpersonal' ), getGroupScore( 'public_speaking' ) ] )


		loadNewData = (data) ->
			results = data
			scores = {}
			true

		getCachedScores = (name) ->
			scores[name] or false

		sum = (array) ->
			sumOfArray = 0
			if array.length is 1
				sumOfArray = parseInt( array, 10 )
			else if array.length > 1
				i = 0
				while i < array.length
					sumOfArray = sumOfArray + ( parseInt( array[i], 10) or 0)
					i++
			else
				sumOfArray = false
			sumOfArray
		
		getGroupScore: getGroupScore
		getPRCA: getPRCA
		loadData: loadNewData

