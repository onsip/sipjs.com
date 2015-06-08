---
title: Make a call | SIP.js
description: How to enable your WebRTC application to make voice and video calls and render the video via HTML5 video elements.
---

# Make a Call

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

    <script src="sip-0.7.0.min.js"></script>
    <script src="my-javascript.js"></script>
  </body>
</html>
~~~

### Javascript

#### Creating a User Agent

In order to make calls and send messages, create a SIP user agent.  Calling the `SIP.UA()` method, with no parameters, creates an anonymous user agent.

~~~javascript
var userAgent = new SIP.UA();
~~~

#### Sending an Invite


After the user agent has connected to the SIP server, an invite can be sent to make a call and thereby create a SIP session.

To send an invite you will need the target user's SIP address and some options to define the session.

Create an options object to define your session.

~~~javascript
var options = {
        media: {
            constraints: {
                audio: true,
                video: true
            },
            render: {
                remote: document.getElementById('remoteVideo'),
                local: document.getElementById('localVideo')
            }
        }
    };
~~~

*Note:  The `render` option syntax has changed between [0.6.x](/api/0.6.0/) and [0.7.x](/api/0.7.0). The sample here uses the correct syntax.*

Then call the `.invite()` method with the target SIP address and the `options` object containing session information.

After invite is called, the browser will ask for permission to access the camera and microphone.  Permission must be allowed to make the call.  The person being called has the choice of accepting or rejecting the call.

An `endCall` button is added to terminate the session using the `.bye()` method.

<iframe
  style="width: 100%; height: 410px"
  src="http://jsfiddle.net/OnSIP/W93H6/embedded/js,html,css,result/">
</iframe>
