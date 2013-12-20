---
title: Receive a Call | SIP.js
---

# Receive a Call

* TOC
{:toc}

Let's walk through core API concepts as we tackle some everyday use cases.

## Overview

### Setup

The video element adds a standard way for browsers to display video over the internet without additional plugins. This makes video elements perfect for WebRTC. The local video stream should always be muted to prevent feedback.


~~~ html

<video id="localVideo"></video> 
<video id="remoteVideo"></video> 
<button type="button" id="answerButton">Answer</button> 
<button type="button" id="endButton">End</button>

~~~
JavaScript Setup:

Setup variables for the User Agent and Session
Add references to the DOM elements

~~~ javascript
var userAgent;
var session;
var localVideoElement = document.getElementById('localVideo');
var remoteVideoElement = document.getElementById('remoteVideo');
var answerButton = document.getElementById('answerButton');
var endButton = document.getElementById('endButton');

~~~
User Agent Setup:

"Register" must be called to receive calls
Create an event handler for a new RTC Session

More Information:

It is recommended that the register function is called when the page is loaded. The user agent is responsible for everything from authenticating the user to handling calls. Since this user agent is registering with a valid user it will be able to make and receive calls. In this example we will only setup receiving calls.

~~~javascript
function register() {
  userAgent = new JsSIP.UA({
    ws_servers: ['wss://edge.sip.onsip.com'],
    register: true,
    uri: 'your_sip_address@getonsip.com',
    /* Ensure that you use your auth user and not your web user */
    authorization_user: 'your_sip_auth_user',
    /* Ensure that you use your sip password and not your web password */
    password: 'your_sip_password'
  });
  /* UA is setup. Now start it. */
  userAgent.start();
  /* Registered! Do Stuff! */
  userAgent.on('newRTCSession', newRTCSessionHandler);
}

~~~

Session Event Handler Setup:

Add a check to see if there is an incoming call
Add an event handler for the session started event
Add an event handler for the session ended event
Add an event handler for the session failed event

~~~ javascript
function newRTCSessionHandler (e) {
  if (e.data.originator === 'remote') {
    /* This is an incoming call and we should alert the user that the phone is ringing */
    alert('Ringing!');
  }
  session = e.data.session;
  /* started is called when a call is placed or received */
  session.on('started', sessionStartedHandler);
  /* ended is called what a call is ended normally */
  session.on('ended', sessionEndedHandler);
  /* failed is called when a call has failed */
  session.on('failed', sessionEndedHandler);
}

function sessionStartedHandler() {
  localVideoElement.src = window.URL.createObjectURL(session.getLocalStreams()[0]);
  localVideoElement.play();
  remoteVideoElement.src = window.URL.createObjectURL(session.getRemoteStreams()[0]);
  remoteVideoElement.play();
}

function sessionEndedHandler() {
  localVideoElement.src = '';
  remoteVideoElement.src = '';
}
~~~

Call Control Setup:

Create an event handler for the answer button
Create an event handler for the end button

~~~javascript
$('#answerButton').addEventListener('click',function () {
  session.answer();
});

$('#endButton').addEventListener('click',function () {
  session.terminate();
})
~~~