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
    d: [1, 2, 'test']
  }
};

module.exports.nestedWithArrayHorizontal = {
  'a.b': 1,
  'a.c': 2,
  'a.d.0': 1,
  'a.d.1': 2,
  'a.d.2': 'test'
};
