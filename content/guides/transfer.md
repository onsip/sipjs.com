---
title: Transfer | SIP.js
description: How to enable your WebRTC application to transfer a voice or video call.
---

# Transfer

* TOC
{:toc}



### Setup

First let's start with the code that we created in the [make a call](/guides/make-call/) example.  This will provide the functionality to make and display a call.

### Making the Call
As before, we will create a user agent using `SIP.UA()` and create a call using `userAgent.invite('test@example.onsip.com')`

~~~ javascript
  // Create a user agent using the default settings of SIP.js
  var userAgent = new SIP.UA();

  // Make a call to 'test@example.onsip.com`
  session = userAgent.invite('test@example.onsip.com');
~~~

### Making a Blind Transfer
SIP.js supports making blind transfers only.  A blind transfer occurs when A causes B to create a session with C.  

Use the `session.refer(target)` method to make a blind transfer between the current user agent on the `session` call and the user agent at the `target` address.

~~~ javascript
  //target address
  var target = `test2@example.onsip.com`;

  //refers the call to `test2@example.onsip.com`
  session.refer(target);
~~~

### Handling a Blind Transfer
When receiving a refer, you need to handle the request and attach the new media stream to the video element.  This is done by catching the `referred` event and passing it to a function using `session.on('referred', onReferred)`.  This function gets passed in the reffered request as well as the new session.  Then we must display the new session using the `attachMediaStream()` function like in previous examples.

~~~ javascript
  //calls the onReffered function when the referred event happens
  session.on('referred', onReferred);

  function onReferred(request, newSession)
  {
    //attached the received video stream to the Video Elements
    attachMediaStream(remoteVideo, newSession.mediaHandler.getRemoteStreams()[0]);
  }
~~~





