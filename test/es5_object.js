/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/

require(['jquery', 'objects/es5_object'], function($, Calculator) {

	"use strict";

	test("object is initialized without 'new' keyword", function() {
		var calc = Calculator();
		strictEqual(typeof calc, "object", "object created from factory function");
	});

	test("object should only have getGroupScore(), getPRCA(), and loadData() available", function() {
		var calc = Calculator();
		strictEqual( Object.keys(calc).length, 3, "three functions present" );
		equal( !!calc.getGroupScore(), true, 'getGroupScore present');
		equal( !isNaN(parseInt(calc.getPRCA())), true, 'getPRCA present');
		equal( !!calc.loadData(), true, 'loadData present');
	});

});