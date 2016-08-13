'use strict';
const stack = require('../../index.js');
const resource = require('../resources/index.js');

describe("horizontal:", function() {
  it("nested properties", function() {
    expect(stack.horizontal(resource.nested)).toEqual(resource.nestedHorizontal);
  });
});
