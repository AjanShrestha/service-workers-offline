'use strict';

var curFib = 0;

self.postMessage('Hello from the web worker');

// TODO

// **********************************

function fib(n) {
  if (n < 2) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}
