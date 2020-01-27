import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// Code for push notification
const publicVapidKey = 'BFCMlOq1RWyZvCMu8XAJEQCi4_gClv-U_UJpxXSB_HyRdYwVpAP_8f_-IPaLIwLdI3Ca_ZS0t3odUe-8hO6w5vE';

// check for service worker
if('serviceworker' in navigator) { // navigator = API for browser
  send().catch(err => console.error(err));
}

// Register serviceworker, register push API and send notification
async function send() {
  // Register serviceworker
  console.log('Registering service worker...');
  const register = await navigator.serviceWorker.register('/serviceWorker.js', {
    scope: '/'
  });
  console.log('Serviceworker registered');

  // Register push
  console.log('Register push...');
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  console.log('push registered');

  // Send push notification
  console.log('sending push...');
  await fetch('/subscibe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'app/json'
    }
  });
  console.log('push sent...');
}

/*
When using your VAPID key in your web app, we will need to convert
the URL safe base64 string to a Uint8Array to pass into the subscribe call
 */
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
