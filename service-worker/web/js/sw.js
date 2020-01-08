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

function onActivate(event) {
  event.waitUntil(handleActivation());
}

async function handleActivation() {
  // Trigger Controller change event
  // Claim all the clients to the latest service worker
  await clients.claim();
  console.log(`[Service Worker] (${version}) activated.`);
}
