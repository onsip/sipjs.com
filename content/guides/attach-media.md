---
title: Attach media | SIP.js
description: How to attach media from your WebRTC application with SIP.js.
---

# Attach Media

## Overview

This guide is intended to show how to attach media to your website using SIP.js in a web environment with the default [WebRTC Session Description Handler](/api/0.15.0/sessionDescriptionHandler/).

SIP.js is not intended to handle media for you. If you are having difficulty with handling the media aspects of your application look at [SIP.js Simple](/api/0.15.0/simple/) which is intended to help you get up and running.

If you are attempting to use SIP.js outside of a standard web browser, you will need to create your own Session Description Handler.

### HTML

Create an HTML file. In the file you could include the [SIP.js library](/download/), as well as any other javascript that will be used. We'll be assuming SIP.js us imported as a node module here.

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

    <script src="my-javascript.js"></script>
  </body>
</html>
~~~

### Javascript

This guide assumes that you are already familiar with starting a session.

#### Attaching Media

The easiest way to attach media is to listen for the `trackAdded` event on the `session`. Then you can get a handle on your Session Description Handler, Peer Connection, and tracks. The `trackAdded` event is simply a helper, and does not pass any information.

~~~javascript
var remoteVideo = document.getElementById('remoteVideo');
var localVideo = document.getElementById('localVideo');

session.on('trackAdded', function() {
  // We need to check the peer connection to determine which track was added

  var pc = session.sessionDescriptionHandler.peerConnection;

  // Gets remote tracks
  var remoteStream = new MediaStream();
  pc.getReceivers().forEach(function(receiver) {
    remoteStream.addTrack(receiver.track);
  });
  remoteVideo.srcObject = remoteStream;
  remoteVideo.play();

  // Gets local tracks
  var localStream = new MediaStream();
  pc.getSenders().forEach(function(sender) {
    localStream.addTrack(sender.track);
  });
  localVideo.srcObject = localStream;
  localVideo.play();
});
~~~
