'use strict';
const stack = require('../../index.js');
const resource = require('../resources/index.js');

describe("horizontal:", function() {
  it("nested properties", function() {
    expect(stack.horizontal(resource.nested)).toEqual(resource.nestedHorizontal);
  });

  it("nested properties with array", function() {
    expect(stack.horizontal(resource.nestedWithArray)).toEqual(resource.nestedWithArrayHorizontal);
  });
});

describe("vertical:", function() {
  it("core", function() {
    expect(stack.vertical(resource.coreVertical.input)).toEqual(resource.coreVertical.output);
  });

  it("core nested", function() {
    expect(stack.vertical(resource.coreVerticalNested.input)).toEqual(resource.coreVerticalNested.output);
  });
});
