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
      <button type="button" id="callButton">Call</button>
      <button type="button" id="endButton">End</button>
	
      <script src="phone.js"></script>
    </body>
  </html>
~~~

In order to make calls and send messages you must create a new anonymous SIP user agent.  We then must start the user agent, which 

~~~ javascript
  // phone.js

  //Creates the anonymous user agent so that you can make calls
  var userAgent = new SIP.UA();
  userAgent.start();

  userAgent.on('connected', newSessionHandler);
~~~

After we start the user agent, we can make a call to SIP address.  We do so by sending a SIP invite.

~~~ javascript
  function newSessionHandler() {
    //here you determine whether the call has video and audio

    var options = {
      mediaConstraints: {
        audio: true,
        video: true
      } 
    }
    //makes the call
    var session = userAgent.invite('sip:bob@example.com', options);
    session.on('accepted', onAccept)
  }
~~~

When the invitee accepts the call, we catch the "accepted" event and start playing the video elements in our browser.

~~~ javascript
  function onAccept () {
    //gets the video elements
    var remoteVideo = document.getElementById('remoteVideo');
    var localVideo = document.getElementById('localVideo');

    //attached the received video stream to the Video Elements
    attachMediaStream(remoteVideo, session.getRemoteStreams()[0]);
    attachMediaStream(localVideo, session.getLocalStreams()[0]);

    //plays the Video Elements
    remoteVideo.play();
    localVideo.play();
}
~~~

This function attaches the media stream to the video element.

~~~ javascript
  function attachMediaStream(element, stream) {
    if (typeof element.srcObject !== 'undefined') {
      element.srcObject = stream;
    } else if (typeof element.mozSrcObject !== 'undefined') {
      element.mozSrcObject = stream;
    } else if (typeof element.src !== 'undefined') {
      element.src = URL.createObjectURL(stream);
    } else {
      console.log('Error attaching stream to element.');
    }
  }
~~~
