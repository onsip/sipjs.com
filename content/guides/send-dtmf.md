---
title: Send DTMF | SIP.js
description: How to create a dial pad in your WebRTC app and send DTMF tones with SIP.js
---

# Send DTMF

This guide uses the full [SIP.js API](https://github.com/onsip/SIP.js/blob/master/docs/api/sip.js.md). The [Simple User](./simple) is intended to help get beginners up and running quickly. This guide is adopted from the [SIP.js Github API documentation](https://github.com/onsip/SIP.js/blob/master/docs/api.md).

## Prerequisites

See the [User Agent](./user-agent) guide on how to create a user agent. This guide requires a registered user agent.

See the [Make a Call](./make-call) guide on how to make a call.

See the [Receive a Call](./receive-call) guide on how to receive a call.

## Construct The Infoer

To send a DTMF INFO packet a `new Infoer(session)` is required. This will send the INFO SIP request.

~~~javascript
const infoer = new Infoer(session);
~~~

## DTMF INFO Body

A DTMF tone can be a SIP INFO packet with a specific body to be interpreted by another SIP endpoint. You will need to create the body of the packet to send. The fields needed to send a DTMF INFO are the `contentDisposition`, `contentType`, `content`.

The `contentDisposition` field should be set to `render`. This tells the endpoint to render the content to the user.

The `contentType` field should be set to `application/dtmf-relay`. This tells the endpoint that message is a DTMF message.

The `content` field needs to contain the `Signal=<DTMF_SIGNAL>` and `Duration=<DTMF_DURATION>` each on it's own line. This tells the application the signal to send and how long it was sent for.

~~~javascript
const body = {
  contentDisposition: "render",
  contentType: "application/dtmf-relay",
  content: "Signal=1\r\nDuration=1000"
};
~~~

## Send The Message

Once the body is constructed the message can be sent by calling the `.info(body)` function.

~~~javascript
infoer.info(body);
~~~
