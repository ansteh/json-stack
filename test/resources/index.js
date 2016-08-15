module.exports.nested = {
  a: {
    b: 1,
    c: 2
  }
};

module.exports.nestedHorizontal = {
  'a.b': 1,
  'a.c': 2
}

module.exports.nestedWithArray = {
  a: {
    b: 1,
    c: 2,
    d: [1, 2, 'test'],
    e: {
      f: ['123', 1]
    }
  }
};

module.exports.nestedWithArrayHorizontal = {
  'a.b': 1,
  'a.c': 2,
  'a.d.0': 1,
  'a.d.1': 2,
  'a.d.2': 'test',
  'a.e.f.0': '123',
  'a.e.f.1': 1
};

module.exports.coreVertical = {
  input: {
    b: [1, 2],
  },
  output: [{
    'b': 1
  }, {
    'b': 2
  }]
};

module.exports.coreVerticalNested = {
  input: {
    a: {
      b: [1, 2]
    }
  },
  output: [{
    'a.b': 1
  }, {
    'a.b': 2
  }]
};
