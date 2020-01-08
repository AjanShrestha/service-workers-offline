'use strict';

const version = 1;

self.addEventListener('install', onInstall);
self.addEventListener('activate', onActivate);

main().catch(console.error);

// ******************************************

async function main() {
  console.log(`[Service Worker] (${version}) is starting...`);
}

async function onInstall(event) {
  console.log(`[Service Worker] (${version}) installed.`);
  self.skipWaiting();
}

async function onActivate(event) {
  console.log(`[Service Worker] (${version}) activated.`);
}
