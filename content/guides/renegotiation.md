---
title: Renegotiation | SIP.js
description: How to renegotiation with SIP.js.
---

# Renegotiation

As of SIP.js 0.8.0 renegotiation is supported through the [`reinvite()`](../../api/0.13.0/session/#reinvite) and [`hold()`](../../api/0.13.0/session/#hold) functions. Renegotiation allows you to do things such as add video in the middle of a call, put a call on hold, or change codecs that you are using. This guide will go over starting an audio only call and then adding video to it. This is not an extensive guide as to what can be accomplished with renegotition, but merely a starting point.

* SIP.js 0.9.1 adds support for receiving a re-invite without SDP

As of SIP.js 0.9.1, you can now be the target of Music On Hold [RFC 7088](https://tools.ietf.org/html/rfc7088). There is still no support for sending re-invites without SDP or putting someone on Music On Hold. This will be added in a later release. SIP.js will automatically accept and process re-invites without SDP in the same manner as a re-invite with SDP.


## Setup

This guide will cover the user that is initiating the renegotiation. Once a session is established, if the other endpoint can renegotiate it should automatically accept the reinvite. SIP.js will automatically accept reinvites.

First, a user agent and call will need to be set up to do audio only.

~~~ javascript
  // Create a user agent using the default settings of SIP.js
  var userAgent = new UA();

  // Make a call to 'test@example.onsip.com' with audio only
  session = userAgent.invite('test@example.onsip.com', {
    sessionDescriptionHandlerOptions: {
      constraints: {
        audio: true,
        video: false
      }
    }
  });
~~~

## Sending a Reinvite

Once the session is established a reinvite can be sent to enable video. A target is not used for reinvite because the messages are sent in an already established session.

~~~ javascript
  session.reinvite({
    sessionDescriptionHandlerOptions: {
      constraints: {
        audio: true,
        video: true
      }
    }
  });
~~~

## Handling a Reinvite

SIP.js will automatically handle a reinvite if it can. There is no user action required.
