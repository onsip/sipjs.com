---
title: Send a Message | SIP.js
description: How to send a SIP message from your WebRTC application with SIP.js.
---

# Send a Message

This guide uses the full [SIP.js API](https://github.com/onsip/SIP.js/blob/master/docs/api/sip.js.md). The [Simple User](./simple) is intended to help get beginners up and running quickly. This guide is adopted from the [SIP.js Github API documentation](https://github.com/onsip/SIP.js/blob/master/docs/api.md).

## Prerequisites

See the [User Agent](./user-agent) guide on how to create a user agent. This guide requires a registered user agent.

## Construct The Messager

A [`Messager`](https://github.com/onsip/SIP.js/blob/master/docs/api/sip.js.messager.md) is required to send the message. This will send a message to a targeted URI. This will be an out of dialog sip message. Please see the [API Documentation](https://github.com/onsip/SIP.js/blob/master/docs/api.md) to determine how to send an in dialog message. The `Messager` constructor requires that the User Agent, target URI, and message content be passed into it.

~~~javascript
const content = 'Hello World';
const target = UserAgent.makeURI("sip:bob@example.com");
const messager = new Messager(userAgent, target, content);
~~~

### Sending the Message

Once the messager is constructed call `messager.message()` to send the message.

~~~javascript
messager.message();
~~~
