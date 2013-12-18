---
title: Getting Started | SIP.js
---

# Getting Started

* TOC
{:toc}

Let's walk through core API concepts as we tackle some everyday use cases.

## Overview

Download our library here:

### Setup

In order to make and receive calls and messages you much create a new SIP user agent.  You do so by doing this.

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

~~~ javascript
// phone.js

remoteVideo = document.getElementById('remoteVideo');
localVideo = document.getElementById('localVideo');

var configuration = {
  'ws_servers':         'ws://sip-ws.example.com',
  'uri':                'sip:alice@example.com',
  'password':           'superpassword'
};

//Creates the user agent so that you can make calls
var userAgent = new SIP.UA(configuration);


//Sets up the options so that the call is a video and audio call
var options = {
  mediaConstraints: {
    audio: true,
    video: true
  } 
}

//makes the call
var session = userAgent.invite('sip:bob@example.com', options);

//attached the recieved video stream to the remoteVideo Element
remoteVideo.srcObject= session.getRemoteStreams()[0];


//plays the remoteVideo Element
remoteVideo.play();
localVideo.play();


~~~
