var clone = require('..');

describe('.clone()', function () {

  it('clones primitives', function () {

    expect(clone(0)).toBe(0);
    expect(clone("hello world")).toBe("hello world");

  });

  it('clones a arrays', function () {

    expect(clone(['alpha', 'beta', 'gamma'])).toEqual(['alpha', 'beta', 'gamma']);
    expect([1, 2, 3]).toEqual([1, 2, 3]);

  });

  it('clones empty array', function() {

    var copy = clone([]);
    expect(copy).toEqual([]);

  });

  it('assures cloned arrays are identical but different arrays', function () {

    var expected = ['a', 'b'];
    var actual = clone(expected);
    expect(actual).toEqual(expected);
    expect(actual).not.toBe(expected);

  });

  it('clones objects', function () {

    expect(clone({ a: 1, b: 2, c: 3 })).toEqual({ a: 1, b: 2, c: 3 });

  });

  it('clones an array with mixed keys', function () {

    var val = [0, 'a', {}, [{}], [function() {}], function() {}];
    expect(clone(val)).toEqual(val);

  });

  it('assures cloned objects are identical but different objects', function () {

    var expected = [{ 'a': 0 }, { 'b': 1 }];
    var actual = clone(expected);
    expect(actual).toEqual(expected);
    expect(actual).not.toBe(expected);

  });

  it("preserves prototype chaining", function() {

    var GrandParentProto = {};
    var ParentProto = Object.create(GrandParentProto);
    var obj = Object.create(ParentProto);
    expect(ParentProto.isPrototypeOf(clone(obj))).toBe(true);
    expect(GrandParentProto.isPrototypeOf(clone(obj))).toBe(true);
    var Foo = function() {};
    expect(clone(new Foo()) instanceof Foo).toBe(true);

  });

  it("clones Date", function() {

    var date = new Date(123);
    expect(clone(date) instanceof Date).toBeTruthy();
    expect(clone(date).getTime()).toEqual(123);
    expect(clone(date) === date).toBeFalsy();

  });

  it("clones RegExp", function() {

    var re = new RegExp(".*");
    expect(clone(re) instanceof RegExp).toBeTruthy();
    expect(clone(re).source).toBe(".*");
    expect(clone(re) === re).toBe(false);

  });

  it("clones literal RegExp", function() {

    var re = /.*/;
    expect(clone(re) instanceof RegExp).toBeTruthy();
    expect(clone(re).source).toEqual(".*");
    expect(clone(re) === re).toBeFalsy();

  });

  it("clones RegExp with flags", function() {

    var re = new RegExp('.*', 'gim');
    expect(clone(re).global).toBe(true);
    expect(clone(re).ignoreCase).toBe(true);
    expect(clone(re).multiline).toBe(true);

  });

  it("clones RegExp with lastIndex", function() {

    var re = /a+b+/g;
    var str = 'ab aabb';
    expect(re.exec(str)[0]).toEqual('ab');
    expect(clone(re).exec(str)[0]).toEqual('aabb');

  });

  it("deeply clones literal RegExp", function() {

    var objWithRegExp = {
      re: /.*/
    };
    expect(clone(objWithRegExp).re instanceof RegExp).toBeTruthy();
    expect(clone(objWithRegExp).re.source).toEqual(".*");
    expect(clone(objWithRegExp.re) === objWithRegExp.re).toBeFalsy();

  });

  it("clones a Uint8Array with no destination", function() {

    if (typeof Uint8Array !== 'undefined') {
      var src = new Uint8Array(2);
      src[1] = 1;
      var dst = clone(src);
      expect(clone(src) instanceof Uint8Array).toBeTruthy();
      expect(dst).toEqual(src);
      expect(dst).not.toBe(src);
    }

  });

  it("clones a Uint8ClampedArray with no destination", function() {

    if (typeof Uint8ClampedArray !== 'undefined') {
      var src = new Uint8ClampedArray(2);
      src[1] = 1;
      var dst = clone(src);
      expect(clone(src) instanceof Uint8ClampedArray).toBeTruthy();
      expect(dst).toEqual(src);
      expect(dst).not.toBe(src);
    }

  });

  it("clones a Uint16Array with no destination", function() {

    if (typeof Uint16Array !== 'undefined') {
      var src = new Uint16Array(2);
      src[1] = 1;
      var dst = clone(src);
      expect(clone(src) instanceof Uint16Array).toBeTruthy();
      expect(dst).toEqual(src);
      expect(dst).not.toBe(src);
    }

  });

  it("clones a Uint32Array with no destination", function() {

    if (typeof Uint32Array !== 'undefined') {
      var src = new Uint32Array(2);
      src[1] = 1;
      var dst = clone(src);
      expect(clone(src) instanceof Uint32Array).toBeTruthy();
      expect(dst).toEqual(src);
      expect(dst).not.toBe(src);
    }

  });

  it("clones a Int8Array with no destination", function() {

    if (typeof Int8Array !== 'undefined') {
      var src = new Int8Array(2);
      src[1] = 1;
      var dst = clone(src);
      expect(clone(src) instanceof Int8Array).toBeTruthy();
      expect(dst).toEqual(src);
      expect(dst).not.toBe(src);
    }

  });

  it("clones a Int16Array with no destination", function() {

    if (typeof Int16Array !== 'undefined') {
      var src = new Int16Array(2);
      src[1] = 1;
      var dst = clone(src);
      expect(clone(src) instanceof Int16Array).toBeTruthy();
      expect(dst).toEqual(src);
      expect(dst).not.toBe(src);
    }

  });

  it("clones a Int32Array with no destination", function() {

    if (typeof Int32Array !== 'undefined') {
      var src = new Int32Array(2);
      src[1] = 1;
      var dst = clone(src);
      expect(clone(src) instanceof Int32Array).toBeTruthy();
      expect(dst).toEqual(src);
      expect(dst).not.toBe(src);
    }

  });

  it("clones a Float32Array with no destination", function() {

    if (typeof Float32Array !== 'undefined') {
      var src = new Float32Array(2);
      src[1] = 1;
      var dst = clone(src);
      expect(clone(src) instanceof Float32Array).toBeTruthy();
      expect(dst).toEqual(src);
      expect(dst).not.toBe(src);
    }

  });

  it("clones a Float64Array with no destination", function() {

    if (typeof Float64Array !== 'undefined') {
      var src = new Float64Array(2);
      src[1] = 1;
      var dst = clone(src);
      expect(clone(src) instanceof Float64Array).toBeTruthy();
      expect(dst).toEqual(src);
      expect(dst).not.toBe(src);
    }

  });

  it("deeply clones an array into a new array", function() {

    var src = [1, {name:"value"}];
    var dst = clone(src);
    expect(src).toEqual([1, {name:"value"}]);
    expect(dst).toEqual(src);
    expect(dst).not.toBe(src);
    expect(dst[1]).not.toBe(src[1]);

  });

  it("deeply clones an object into a non-existing object", function() {

    var src = {a:{name:"value"}};
    var dst = clone(src, undefined);
    expect(src).toEqual({a:{name:"value"}});
    expect(dst).toEqual(src);
    expect(dst).not.toBe(src);
    expect(dst.a).toEqual(src.a);
    expect(dst.a).not.toBe(src.a);

  });

  it("clones primitives", function() {

    expect(clone(null)).toEqual(null);
    expect(clone('')).toBe('');
    expect(clone('lala')).toBe('lala');
    expect(clone(123)).toEqual(123);
    expect(clone([{key:null}])).toEqual([{key:null}]);

  });

  it('handles circular references by default', function() {
    var a = {b: {a: null}, self: null, selfs: [null, null, [null]]};
    a.b.a = a;
    a.self = a;
    a.selfs = [a, a.b, [a]];

    var aCopy = clone(a);
    expect(aCopy).toEqual(a);

    expect(aCopy).not.toBe(a);
    expect(aCopy).toBe(aCopy.self);
    expect(aCopy.selfs[2]).not.toBe(a.selfs[2]);
  });

});