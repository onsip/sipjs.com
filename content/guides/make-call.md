---
title: Make a call | SIP.js
description: How to enable your WebRTC application to make voice and video calls and render the video via HTML5 video elements.
---

# Make a Call

## Overview

This guide uses the full [SIP.js API](../../api/0.14.0). The [SIP.js Simple API](../../api/0.14.0/simple) is intended to help get beginners up and running quickly.

### HTML

Create an HTML file. You could include the [SIP.js library](/download/), as well as any other javascript that will be used. We are assuming SIP.js is imported as a node module for this demo.

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

#### Creating a UA

In order to send messages, create a SIP user agent.  Calling `SIP.UA()` method, with no parameters, creates an anonymous user agent.

~~~javascript
import { UA } from "sip.js";
/* could also be 
var SIP = require("sip.js");
var UA = SIP.UA;
*/

var userAgent = new UA();
~~~

After the user agent has connected to the SIP server, an invite can be sent to make a call and thereby create a SIP session.

#### Sending an Invite

To send an invite you will need the target user's SIP address and any extra options to define the session. Then you can call the [invite method](/api/0.14.0/ua/#invitetarget-options-modifiers) on the user agent. The invite function returns a session object that will be used for the current session.

~~~javascript
var session = userAgent.invite('bob@example.com');
~~~

After the invite method is invoked, the browser will ask for permission to access the camera and microphone.  Permission must be allowed to make the call.  The person being called has the choice of accepting or rejecting the call.

#### Attaching Media

Please see the [attach media guide](../attach-media).

#### Ending a Session

To end a session, simply call the [terminate method](/api/0.14.0/session/#terminateoptions) on the session to send a bye.

~~~javascript
session.terminate();
~~~
