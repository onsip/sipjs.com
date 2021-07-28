---
title: Simple | SIP.js
description: How to use SIP.js Simple API to make and receive a call
---

# Disclaimer

SIP.js Simple is considered deprecated and we will no longer support it. You should consider upgrading to the [Simple User](/guides/simple-user.md) on the latest SIP.js Version.

# SIP.js Simple Guide

## Overview

This guide will walk you through getting up and running with SIP.js Simple. This is the quickest and easiest way to get up and running with SIP.js, but only has the most basic call features supported. If you want to do anything more complex with SIP.js you will need to use the full API.

### Differences between SIPjs Simple and SIPjs

 TODO

## HTML

Create an HTML file. In the file you could include the [SIP.js library](https://github.com/onsip/SIP.js/releases), as well as any other javascript that will be used. We will assume SIP.js is imported as a node module for this demo.

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

## Javascript

### Creating a Simple Instance

In order to make calls and send messages, create a SIP Simple instance.  Calling the `SIP.Web.Simple()` method, with options will create a new Simple object. Simple differs from the full SIP.js in that it will handle attaching media onto the page.

~~~javascript
var options = {
      media: {
        local: {
          video: document.getElementById('localVideo')
        },
        remote: {
          video: document.getElementById('remoteVideo'),
          // This is necessary to do an audio/video call as opposed to just a video call
          audio: document.getElementById('remoteVideo')
        }
      },
      ua: {}
    };
var simple = new SIP.Web.Simple(options);
~~~

### Starting a call

After the Simple interface has connected to the SIP server, a new call can be made by calling the `.call(target)` method.

~~~javascript
simple.call('bob@example.com');
~~~

After the call method is invoked, the browser will ask for permission to access the camera and microphone.  Permission must be allowed to make the call.  The person being called has the choice of accepting or rejecting the call.

An `endCall` button is added to terminate the session using the `.hangup()` method.

<iframe
  style="width: 100%; height: 410px"
  src="https://jsfiddle.net/OnSIP/W93H6/embedded/js,html,css,result/">
</iframe>

### Answering a Call

To accept a call that is being received, catch the `ringing` event, then call `simple.answer();`

~~~javascript
simple.on('ringing', function() {
  simple.answer();
});
~~~

<iframe
  style="width: 100%; height: 600px"
  src="https://jsfiddle.net/OnSIP/vW7Lw/embedded/js,html,css,result/">
</iframe>

### Ending a Call

To end a call `simple.hangup();`. You can call hangup even when the call is ringing to reject it.

~~~javascript
simple.hangup();
~~~
