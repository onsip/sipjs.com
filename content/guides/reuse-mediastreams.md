---
title: Reuse MediaStreams | SIP.js
description: How to reuse MediaStreams between calls with SIP.js.
---

# Reuse MediaStreams

* TOC
{:toc}

In order to provide a more streamlined user experience, applications built with SIP.js may wish to minimize the number of times the user is prompted to allow access to their microphone/camera. This is especially useful when the user makes multiple calls, since only Chrome and Opera on https:// pages will remember media allowances.

When making or receiving a call, SIP.js allows applications to specify the desired `MediaStream` as the `media` key of the `options` argument to **(TODO improve these docs -->)** [`UA.invite`](../../api/0.5.0/ua/#invitetarget-options) and [`Session.accept`](../../api/0.5.0/session/#acceptoptions), respectively.

SIP.js applications can get a reference to a `MediaStream` using **(TODO sipjs.com docs?)** `SIP.WebRTC.getUserMedia`:

## Setup

Note: the following code blocks assume you already have a `SIP.UA` named `ua`. Please see the [User Agent Construction guide](../user-agent-construction/) for instructions.

~~~ javascript
  var mediaStream;

  var mediaConstraints = {
    audio: true,
    video: true
  };

  function getUserMediaSuccess (stream) {
    console.log('getUserMedia succeeded', stream)
    mediaStream = stream;
  }

  function getUserMediaFailure (e) {
    console.error('getUserMedia failed:', e);
  }

  SIP.WebRTC.getUserMedia(mediaConstraints, getUserMediaSuccess, getUserMediaFailure);
~~~

Once the stream is available, it can be used to make or receive calls.

## Making a call

~~~ javascript
  var target = 'someone@domain.tld';
  var options = {
    media: mediaStream
  };
  ua.invite(target, options);
~~~

## Receiving a call

~~~ javascript
  ua.on('invite', function (session) {
    var options = {
      media: mediaStream
    };
    session.accept(options);
  });
~~~

## Live Example

**TODO**
