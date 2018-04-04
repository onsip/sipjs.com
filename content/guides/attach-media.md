---
title: Attach media | SIP.js
description: How to attach media from your WebRTC application with SIP.js.
---

# Attach Media

## Overview

This guide is intended to show how to attach media to your website using SIP.js in a web environment with the default [WebRTC Session Description Handler](/api/0.9.0/sessionDescriptionHandler/).

SIP.js is not intended to handle media for you. If you are having difficulty with handling the media aspects of your application look at [SIP.js Simple](/api/0.9.0/simple/) which is intended to help you get up and running.

If you are attempting to use SIP.js outside of a standard web browser, you will need to create your own Session Description Handler.

### HTML

Create an HTML file. In the file include the [SIP.js library](/download/), as well as any other javascript that will be used.

A `<video>` element is need to display the video stream.  The `<video>` element adds a standard way for browsers to display video over the internet without additional plugins. This makes `<video>` elements perfect for WebRTC.

Within the `<body>` tags, there is a `remoteVideo` `<video>` element, to display the video of the person being called.  There is also a `localVideo` `<video>` element, to display the video stream that is being sent to the person being called.  The local video stream should always be muted to prevent feedback.

~~~html
<html>
  <head>
    <link rel="stylesheet" href="my-styles.css">
  </head>
  <body>
    <video id="remoteVideo"></video>
    <video id="localVideo" muted="muted"></video>

    <script src="sip-0.9.2.min.js"></script>
    <script src="my-javascript.js"></script>
  </body>
</html>
~~~

### Javascript

This guide assumes that you are already familiar with starting a session.

#### Playing Local Media

You can display the local video from the peer connection.

~~~javascript
var localVideo = document.getElementById('localVideo');

session.on('SessionDescriptionHandler-created', function(sessionDescriptionHandler) {
  
});
~~~

#### Attaching Media

The easiest way to attach media is to add a listener onto the Peer Connection and listen for either the `ontrack` or `onaddstream` events. To get a handle on the Peer Connection we need to first get a handle on the Session Description Handler. The Session Description Handler is created when SIP.js determines that a media description is needed for the session.

~~~javascript
var remoteVideo = document.getElementById('remoteVideo');

session.on('SessionDescriptionHandler-created', function(sessionDescriptionHandler) {
  var pc = sessionDescriptionHandler.peerConnection;
  if ('ontrack' in pc) {
    var stream = new MediaStream();
    pc.addEventListener('track', function(e) {
      remoteVideo.srcObject = e.streams[0];
      remoteVideo.play();
    });
  } else {
    pc.addEventListener('onaddstream', function(stream) {
      remoteVideo.srcObject = stream;
      remoteVideo.play();
    });
  }
});
~~~
