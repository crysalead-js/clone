var useBuffer = typeof Buffer !== "undefined";

/**
 * Clones (copies) an Object using deep copying.
 *
 * This function supports circular references by default, but if you are certain
 * there are no circular references in your object, you can save some CPU time
 * by calling clone(obj, { circular: false }).
 *
 * Caution: if `circular` is false and `parent` contains circular references,
 * your program may enter an infinite loop and crash.
 *
 * @param mixed  parent  The object to be cloned
 * @param Object options The clone options. Possible values are:
 *                       -`'circular'`  Boolean: set to true if the object to be cloned may
 *                                               contain circular references. (default: `true`)
 *                       -`'depth'`     Integer: clone depth limit. (default: `Infinity`)
 *                       -`'prototype'` String : sets the prototype to be used when cloning an object.
 *                                               (default: parent prototype).
 */
function clone(parent, opts) {
  var depth, prototype, filter, allParents = [], allChildren = [], options = {};

  opts = opts || {};
  options.depth = opts.depth !== undefined ? opts.depth : Infinity;
  options.circular = opts.circular !== undefined ? opts.circular : true;

  function _clone(parent, depth) {

    if (parent === null) {
      return null;
    }

    if (depth === 0 || typeof parent !== "object") {
      return parent;
    }

    var i, child, proto, attrs, index;

    if (Array.isArray(parent)) {
      child = [];
    } else if (toString.call(parent) === "[object RegExp]") {
      child = new RegExp(parent.source, _getRegExpFlags(parent));
      if (parent.lastIndex) {
        child.lastIndex = parent.lastIndex;
      }
    } else if (toString.call(parent) === "[object Date]") {
      return new Date(parent.getTime());
    } else if (useBuffer && Buffer.isBuffer(parent)) {
      child = new Buffer(parent.length);
      parent.copy(child);
      return child;
    } else if (!!(parent && parent.constructor && parent.constructor.BYTES_PER_ELEMENT > 0)) {
      return new parent.constructor(parent);
    } else {
      if (typeof options.prototype === "undefined") {
        proto = Object.getPrototypeOf(parent);
        child = Object.create(proto);
      } else {
        child = Object.create(prototype);
        proto = prototype;
      }
    }

    if (options.circular) {
      index = allParents.indexOf(parent);

      if (index !== -1) {
        return allChildren[index];
      }
      allParents.push(parent);
      allChildren.push(child);
    }

    for (i in parent) {
      if (proto) {
        attrs = Object.getOwnPropertyDescriptor(proto, i);
      }

      if (attrs && attrs.set === null) {
        continue;
      }
      child[i] = _clone(parent[i], depth - 1);
    }

    return child;
  }

  return _clone(parent, options.depth);
}

function _getRegExpFlags(re) {
  var flags = '';
  if (re.global) flags += 'g';
  if (re.ignoreCase) flags += 'i';
  if (re.multiline) flags += 'm';
  return flags;
};

module.exports = clone;
