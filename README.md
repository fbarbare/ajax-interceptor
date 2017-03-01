xhr-intercept
-------------


Install
-------

```
npm i -S xhr-intercept
```


API
---

```javascript
import XhrIntercept from 'xhr-intercept';

function onRequest(xhr, args) {
  console.debug('request', xhr);

  // Return false to cancel the request
  return false;
}

function onResponse(xhr) {
  console.debug('request', xhr);
}

// Add a callback on request or response
XhrIntercept.addRequestCallback(onRequest);
XhrIntercept.addResponseCallback(onResponse);

// Starting intercepting requests
XhrIntercept.wire();

// Remove a callback on request or response
XhrIntercept.removeRequestCallback(onRequest);
XhrIntercept.removeResponseCallback(onResponse);

// Stopping intercepting requests
XhrIntercept.unwire();
```
