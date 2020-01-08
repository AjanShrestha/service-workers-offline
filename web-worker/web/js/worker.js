'use strict';

var curFib = 0;

self.postMessage('Hello from the web worker');

self.onmessage = onMessage;

// **********************************

function onMessage(event) {
  console.log(`Received in web worker: ${event.data}`);
}

function fib(n) {
  if (n < 2) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}
