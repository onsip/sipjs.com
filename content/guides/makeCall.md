---
title: Make a call | SIP.js
---

# Make a Call

* TOC
{:toc}

Let's walk through core API concepts as we tackle some everyday use cases.

## Overview

### Setup

The video element adds a standard way for browsers to display video over the internet without additional plugins. This makes video elements perfect for WebRTC. The local video stream should always be muted to prevent feedback.


~~~ html
<!DOCTYPE html>
  <head>
    <script src="sip.js"></script> 
  </head>

  <body>
    <video id="remoteVideo"></video>
    <video id="localVideo" muted="muted"></video>  

    <script src="phone.js"></script>
  </body>
</html>

~~~

In order to make and receive calls and messages you much create a new SIP user agent.  You do so by doing this.

~~~ javascript
// phone.js

remoteVideo = document.getElementById('remoteVideo');
localVideo = document.getElementById('localVideo');

var configuration = {
  'ws_servers':         'ws://sip-ws.example.com',
  'register':           false,
  'uri':                'sip:alice@example.com',
  'display_name':       'Alice'
};

//Creates the user agent so that you can make calls
var userAgent = new SIP.UA(configuration);
userAgent.start();

//Sets up the options so that the call is a video and audio call
var options = {
  mediaConstraints: {
    audio: true,
    video: true
  } 
}

//makes the call
var session = userAgent.invite('sip:bob@example.com', options);

//attached the received video stream to the Video Elements
remoteVideo.srcObject= session.getRemoteStreams()[0];
localVideo.srcObject= session.getLocalStreams()[0];

//plays the Video Elements
remoteVideo.play();
localVideo.play();

~~~


