define(function() {
  "use strict";
  return function(data) {
    var getCachedScores, getGroupScore, getPRCA, loadNewData, questionTypes, results, scores, sum;
    results = data;
    questionTypes = {
      "group": "g",
      "meeting": "m",
      "interpersonal": "i",
      "public_speaking": "p"
    };
    scores = {};
    getGroupScore = function(name) {
      var score;
      if (!results) {
        return "No Data";
      }
      score = getCachedScores(name);
      if (!!score) {
        return score;
      }
      if (!score && !!questionTypes[name]) {
        score = 18 - sum([results[questionTypes[name] + '1'], results[questionTypes[name] + '2'], results[questionTypes[name] + '3']]) + sum([results[questionTypes[name] + '4'], results[questionTypes[name] + '5'], results[questionTypes[name] + '6']]);
        scores[name] = score;
      } else {
        score = "You did something wrong. Try again.";
      }
      return score;
    };
    getPRCA = function() {
      return sum([getGroupScore('group'), getGroupScore('meeting'), getGroupScore('interpersonal'), getGroupScore('public_speaking')]);
    };
    loadNewData = function(data) {
      results = data;
      scores = {};
      return true;
    };
    getCachedScores = function(name) {
      return scores[name] || false;
    };
    sum = function(array) {
      var i, sumOfArray;
      sumOfArray = 0;
      if (array.length === 1) {
        sumOfArray = parseInt(array, 10);
      } else if (array.length > 1) {
        i = 0;
        while (i < array.length) {
          sumOfArray = sumOfArray + (parseInt(array[i], 10) || 0);
          i++;
        }
      } else {
        sumOfArray = false;
      }
      return sumOfArray;
    };
    return {
      getGroupScore: getGroupScore,
      getPRCA: getPRCA,
      loadData: loadNewData
    };
  };
});
