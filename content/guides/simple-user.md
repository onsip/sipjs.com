---
title: Simple User | SIP.js
description: How to use SIP.js Simple User to make and receive a call
---

# SIP.js Simple User Guide

## Overview

This guide will walk you through getting up and running with SIP.js Simple User. This is the quickest and easiest way to get up and running with SIP.js, but only has the most basic call features supported. If you want to do anything more complex with SIP.js you will need to use the full API.

This guide uses [typescript](https://www.typescriptlang.org/).

## Limitations

The Simple User is intended to be a simple interface to get users up and running quickly. Therefore we have intentionally designed it with several limitations to keep the API simple. If you need functionality outside of these limits you should use the full SIP.js API.

* Minimal media control
* One simultaneous call at a time
* No call transfers
* Simplified DTMF controls

## HTML

Create an HTML file.

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
  </body>
</html>
~~~

## Typescript

This guide uses Typescript which you will need to transpile into Javascript.

### Import SIP.js

SIP.js is built as a standard module and can be imported into your application. You should only import the individual components that you need for your application. For these demo's we will be using the `SimpleUser` and `SimpleUserOptions` components.

~~~ javascript
import { SimpleUser, SimpleUserOptions } from "sip.js/lib/platform/web";
~~~

### Creating a Simple User

In order to make calls and send messages, create a Simple User.  Calling `new SimpleUser(server, options)` constructor, with a websocket server and options will create a new Simple User. A Simple User can handle attaching meda elements for you.

~~~javascript
  const simpleUser: SimpleUser;

  // SIP over WebSocket Server URL
  // The URL of a SIP over WebSocket server which will complete the call.
  // FreeSwitch is an example of a server which supports SIP over WebSocket.
  // SIP over WebSocket is an internet standard the details of which are
  // outside the scope of this documentation, but there are many resources
  // available. See: https://tools.ietf.org/html/rfc7118 for the specification.
  const server = "wss://sip.example.com";

  // SIP Address of Record (AOR)
  // This is the user's SIP address. It's "Where people can reach you."
  // SIP is an internet standard the details of which are outside the
  // scope of this documentation, but there are many resources available.
  // See: https://tools.ietf.org/html/rfc3261 for the specification.
  const aor = "sip:alice@example.com";

  // Configuration Options
  // These are configuration options for the `SimpleUser` instance.
  // Here we are setting the HTML audio element we want to use to
  // play the audio received from the remote end of the call.
  // An audio element is needed to play the audio received from the
  // remote end of the call. Once the call is established, a `MediaStream`
  // is attached to the provided audio element's `src` attribute.
  const options: SimpleUserOptions = {
    aor,
    media: {
      local: {
        video: (document.getElementById('localVideo') as HTMLVideoElement)
      }
      remote: {
        video: (document.getElementById('remoteVideo') as HTMLVideoElement)
      }
    }
  };

  // Construct a SimpleUser instance
  simpleUser = new SimpleUser(server, options);
~~~

### Starting the Simple User

Once the Simple User is created. We then need to connect it to our server. See our Server Guide's for information on setting up a SIP server. To connect our Simple User we need to call the `connect()` function. This function returns a promise that resolves when the Simple User is connected. Once we are connected we will then need to register.

~~~javascript
  // Connect to server
  await simpleUser.connect();

  // Register to receive inbound calls
  await simpleUser.register();
~~~

### Starting a Call

After the Simple User has connected to the SIP server, a new call can be made by calling the `.call(destination)` method.

~~~javascript
simple.call('bob@example.com');
~~~

After the call method is invoked, the browser will ask for permission to access the camera and microphone.  Permission must be allowed to make the call.  The person being called has the choice of accepting or rejecting the call.

An `hangup` button is added to terminate the session using the `.hangup()` method.

### Answering a Call

To know if you are getting call you need to register a Simple User Delegate that has callback methods for the Simple User to call when an event happens. The delegate is passed in the `SimpleUserOptions` To know when a call is received you need an `onCallReceived()` function.

~~~javascript
  const simpleUser: SimpleUser;

  const delegate: SimpleUserDelegate = {
    onCallReceived: async () => {
      console.log('Incoming Call!');
      await simpleUser.answer();
    }
  };

  const options: SimpleUserOptions = {
    aor,
    delegate: delegate,
    media: {
      local: {
        video: (document.getElementById('localVideo') as HTMLVideoElement)
      }
      remote: {
        video: (document.getElementById('remoteVideo') as HTMLVideoElement)
      }
    }
  };

  simpleUser = new SimpleUser(server, options);

  // Connect to server
  await simpleUser.connect();

  // Register to receive inbound calls
  await simpleUser.register();
~~~

### Placing a Call on Hold

To place a call on hold you can call the `hold()` function. Similarly to take a call off hold you can call `unhold()`.

~~~javascript
simpleUser.hold();

simpleUser.unhold();
~~~

To detect if you have been placed on hold, you can add the `to your dele

### Sending DTMF

To send DTMF tones you can call the `sendDTMF(tone: string)` function. This is a helper function that sends DTMF via INFO packets.

~~~javascript
simpleUser.sendDTMF('1');
~~~

### Ending a Call

To end a call `hangup();`.

~~~javascript
simpleUser.hangup();
~~~
