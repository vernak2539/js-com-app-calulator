/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/

require(['jquery', 'objects/es5_object'], function($, Calculator) {

	test("object is initialized without 'new' keyword", function() {
		var calc = Calculator();
		equal(typeof calc, "object", "object created from factory function");
	});

});