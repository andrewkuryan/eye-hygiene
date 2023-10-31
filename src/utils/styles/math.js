const nodes = require('stylus/lib/nodes');

const math = function () {
  return function (style) {
    style.define('sqrt', function (value) {
      return new nodes.Unit(Math.sqrt(value.val), value.type);
    });
    style.define('pow', function (value, pow) {
      return new nodes.Unit(Math.pow(value.val, pow.val), value.type);
    });
  };
};
module.exports = math;
