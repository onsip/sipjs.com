---
title: Receive a Call | SIP.js
description: How to enable your WebRTC application to accept calls from peers and third parties by registering a SIP user agent.
---

# Receive a Call

## Overview

This guide uses the full [SIP.js API](../../api/0.10.0). The [SIP.js Simple API](../../api/0.10.0/simple) is intended to help get beginners up and running quickly.

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

    <script src="sip-0.10.0-min.js"></script>
    <script src="my-javascript.js"></script>
  </body>
</html>
~~~

### Javascript

### Creating a User Agent

In order to receive messages, create a SIP user agent. You will need a registered user agent to receive an initial request. Replace the information below with your own information.

~~~javascript
var userAgent = new SIP.UA({
       uri: 'test@example.com',
       authorizationUser: 'test',
       password: 'password'
});
~~~

### Accept a Call

Finally, To accept a call that is being received, catch the `invite` event.  This event is emitted with a session that the `.accept()` method must be called on.

~~~javascript
userAgent.on('invite', function(session) {
  session.accept();
});
~~~

#### Attaching Media

Please see the [attach media guide](../attach-media).

#### Ending a Session

To end a session, simply call the [terminate method](/api/0.10.0/session/#terminateoptions) on the session to send a bye.

~~~javascript
session.terminate();
~~~
