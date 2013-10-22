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
      return array.reduce(function(x, y) {
        return parseInt(x, 10) + parseInt(y, 10);
      });
    };
    return {
      getGroupScore: getGroupScore,
      getPRCA: getPRCA,
      loadData: loadNewData
    };
  };
});
