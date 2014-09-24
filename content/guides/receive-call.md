---
title: Receive a Call | SIP.js
description: How to enable your WebRTC application to accept calls from peers and third parties by registering a SIP user agent. 
---

# Receive a Call

* TOC
{:toc}

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

    <script src="sip-0.6.2-min.js"></script> 
    <script src="my-javascript.js"></script> 
  </body>
</html>
~~~

### Javascript

### Creating a User Agent

In order to make calls and send messages, create a SIP user agent.  Calling the `SIP.UA()` method, with a uri a user agent. You will typically need to also provide an authorization user and password as well. Replace the information below with your own information.

~~~javascript
var userAgent = new SIP.UA({
	uri: 'test@example.com',
	authorizationUser: 'test',
	password: 'password'
});
~~~


### Accept a Call

Finally, To accept a call that is being received, catch the `invite` event.  This event is emitted with a session that the `.accept()` method must be called on. The accept method will take an options object that can define where to render the video streams. This is similar to the options object used to make a call.

<iframe
  style="width: 100%; height: 600px"
  src="http://jsfiddle.net/OnSIP/vW7Lw/embedded/js,html,css,result/">
</iframe>

