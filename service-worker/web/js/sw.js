'use strict';

const version = 2;
var isOnline = true;
var isLoggedIn = false;

self.addEventListener('install', onInstall);
self.addEventListener('activate', onActivate);
self.addEventListener('message', onMessage);

main().catch(console.error);

// ******************************************

async function main() {
  await sendMessage({requestStatusUpdate: true});
}

async function onInstall(event) {
  console.log(`[Service Worker] (${version}) installed.`);
  self.skipWaiting();
}

async function sendMessage(msg) {
  var allClients = await clients.matchAll({includeUncontrolled: true});
  return Promise.all(
    allClients.map(function clientMsg(client) {
      // message channel for each client
      var chan = new MessageChannel();
      chan.port1.onmessage = onMessage;
      return client.postMessage(msg, [chan.port2]);
    })
  );
}

function onMessage({data}) {
  if (data.statusUpdate) {
    ({isOnline, isLoggedIn} = data.statusUpdate);
    console.log(
      `[Service Worker] (v${version}) status update, isOnline:${isOnline}, isLoggedIn:${isLoggedIn}`
    );
  }
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
