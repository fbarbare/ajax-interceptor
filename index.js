'use strict';

const XMLHttpRequestSend = XMLHttpRequest.prototype.send;

var reqCallbacks = [];
var resCallbacks = [];
var wired = false;

export function isWired() {
  return wired;
};

export function addRequestCallback(callback) {
  reqCallbacks.push(callback);
};
export function addResponseCallback(callback) {
  resCallbacks.push(callback);
};
export function removeRequestCallback(callback) {
  reqCallbacks = reqCallbacks.filter(item => item !== callback);
};
export function removeResponseCallback(callback) {
  resCallbacks = resCallbacks.filter(item => item !== callback);
};

export function wire() {
  if (wired) { throw new Error('Ajax interceptor already wired'); }

  XMLHttpRequest.prototype.send = function() {
    var reqCallbacksRes = reqCallbacks.map(callback => callback(this, arguments));
    var onreadystatechange = this.onreadystatechange;

    this.onreadystatechange = () => {
      resCallbacks.forEach(callback => {callback(this)});
      onreadystatechange(this);
    };

    if (reqCallbacksRes.indexOf(false) === -1) {
      XMLHttpRequestSend.apply(this, arguments);
    }
  };

  wired = true;
};


export function unwire() {
  if (!wired) { throw new Error('Ajax interceptor not currently wired'); }

  XMLHttpRequest.prototype.send = XMLHttpRequestSend;
  wired = false;
};
