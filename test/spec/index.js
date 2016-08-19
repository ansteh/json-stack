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
  it("simple", function() {
    expect(stack.vertical({
      a: {
        x: 2,
        y: {
          z: 1
        }
      }
    })).toEqual({
      'a.x': 2,
      'a.y.z': 1
    });
  });

  it("core", function() {
    expect(stack.vertical(resource.coreVertical.input)).toEqual(resource.coreVertical.output);
  });

  it("core nested", function() {
    expect(stack.vertical(resource.coreVerticalNested.input)).toEqual(resource.coreVerticalNested.output);
  });

  it("nested json", function() {
    expect(stack.vertical(resource.jsonVerticalNested.input)).toEqual(resource.jsonVerticalNested.output);
  });

  it("deep nested json array", function() {
    console.log(JSON.stringify(stack.vertical(resource.deepJsonVerticalNested.input), null, 2));
    expect(stack.vertical(resource.deepJsonVerticalNested.input)).toEqual(resource.deepJsonVerticalNested.output);
  });

});
