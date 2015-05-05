# copy-clone

[![Build Status](https://travis-ci.org/crysalead-js/copy-clone.svg?branch=master)](https://travis-ci.org/crysalead-js/copy-clone)

Recursively clone JavaScript native types, like Object, Array, RegExp, Date as well as primitives.

## API

List of methods:

### clone(value, options)

Where `options` can be the following:

 * `'circular'`  Boolean: set to true if the object to be cloned may contain circular references. (default: `true`)
 * `'depth'`     Integer: clone depth limit. (default: `Infinity`)
 * `'prototype'` String : sets the prototype to be used when cloning an object. (default: parent prototype).

## Acknowledgement

Sorry don't remember from where I copy pasted this code from. Don't hesitate to let me know.
