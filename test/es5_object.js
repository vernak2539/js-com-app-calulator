/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/

require(["jquery", "objects/es5_object"], function($, Calculator) {

	"use strict";

	QUnit.start();

	var sampleData1 = {
		"g1": 2
		, "g2": 4
		, "g3": 1
		, "g4": 1
		, "g5": 3
		, "g6": 5
		, "i1": 3
		, "i2": 4
		, "i3": 2
		, "i4": 2
		, "i5": 5
		, "i6": 1
		, "m1": 4
		, "m2": 1
		, "m3": 2
		, "m4": 3
		, "m5": 5
		, "m6": 3
		, "p1": 4
		, "p2": 1
		, "p3": 3
		, "p4": 5
		, "p5": 2
		, "p6": 4
	};

	var sampleData2 = {
		"g1": 2
		, "g2": 5
		, "g3": 1
		, "g4": 4
		, "g5": 3
		, "g6": 5
		, "i1": 1
		, "i2": 4
		, "i3": 2
		, "i4": 2
		, "i5": 5
		, "i6": 5
		, "m1": 4
		, "m2": 1
		, "m3": 2
		, "m4": 3
		, "m5": 5
		, "m6": 3
		, "p1": 3
		, "p2": 1
		, "p3": 3
		, "p4": 5
		, "p5": 3
		, "p6": 4
	};

	test("ES5 Object - object is initialized without 'new' keyword", function() {
		var calc = Calculator();
		strictEqual(typeof calc, "object", "object created from factory function");
	});

	test("ES5 Object - object should only have getGroupScore(), getPRCA(), and loadData() available", function() {
		var calc = Calculator();
		strictEqual( Object.keys(calc).length, 3, "three functions present" );
		equal( $.isFunction( calc.getGroupScore ), true, "getGroupScore present");
		equal( $.isFunction( calc.getPRCA ), true, "getPRCA present");
		equal( $.isFunction( calc.loadData ), true, "loadData present");
	});

	test("ES5 Object - calculating PRCA", function() {
		var calc = Calculator( sampleData1 );
		strictEqual( calc.getPRCA(), 80, "returned correct PRCA score");
	});

	test("ES5 Object - calculating group discussion score" , function() {
		var calc = Calculator( sampleData1 );
		strictEqual( calc.getGroupScore("group"), 20, "returned correct group discussion score");
	});

	test("ES5 Object - calculating meeting score" , function() {
		var calc = Calculator( sampleData1 );
		strictEqual( calc.getGroupScore("meeting"), 22, "returned correct meetings score");
	});

	test("ES5 Object - calculating interpersonal score" , function() {
		var calc = Calculator( sampleData1 );
		strictEqual( calc.getGroupScore("interpersonal"), 17, "returned correct interpersonal score");
	});

	test("ES5 Object - calculating public speaking score" , function() {
		var calc = Calculator( sampleData1 );
		strictEqual( calc.getGroupScore("public_speaking"), 21, "returned correct public speaking score");
	});

	test("ES5 Object - loading new data and testing calculations", function() {
		var calc = Calculator( sampleData1 );
		strictEqual( calc.getPRCA(), 80, "returned correct PRCA score for sampleData1");

		calc.loadData( sampleData2 );
		strictEqual( calc.getPRCA(), 90, "loaded data correctly and returned correct PRCA score for sampleData2");
		strictEqual( calc.getGroupScore("group"), 22, "returned correct group discussion score for sampleData2");
		strictEqual( calc.getGroupScore("meeting"), 22, "returned correct meetings score for sampleData2");
		strictEqual( calc.getGroupScore("interpersonal"), 23, "returned correct interpersonal score for sampleData2");
		strictEqual( calc.getGroupScore("public_speaking"), 23, "returned correct public speaking score for sampleData2");
	});

});






