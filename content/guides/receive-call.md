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

    <script src="sip-0.9.0-min.js"></script>
    <script src="my-javascript.js"></script>
  </body>
</html>
~~~

### Javascript

### Creating a User Agent

#### Creating a Simple Instance

In order to make calls and send messages, create a SIP Simple instance.  Calling the `SIP.WebRTC.Simple()` method, with options will create a new Simple object.

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
var simple = new SIP.WebRTC.Simple(options);
~~~

*Note:  The `media` option syntax has changed between [0.7.x](/api/0.7.0/) and [0.9.x](/api/0.9.0). The sample here uses the correct syntax.*


### Accept a Call

Finally, To accept a call that is being received, catch the `ringing` event, then call `simple.answer();`

~~~javascript
simple.on('ringing', function() {
  simple.answer();
})
~~~

<iframe
  style="width: 100%; height: 600px"
  src="https://jsfiddle.net/OnSIP/vW7Lw/embedded/js,html,css,result/">
</iframe>
