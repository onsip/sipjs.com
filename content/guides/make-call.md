---
title: Make a call | SIP.js
description: How to enable your WebRTC application to make voice and video calls and render the video via HTML5 video elements.
---

# Make a Call

This guide uses the full [SIP.js API](https://github.com/onsip/SIP.js/blob/master/docs/api/sip.js.md). The [Simple User](./simple) is intended to help get beginners up and running quickly. This guide is adopted from the [SIP.js Github API documentation](https://github.com/onsip/SIP.js/blob/master/docs/api.md).

## Prerequisites

See the [User Agent](./user-agent) guide on how to create a user agent. This guide requires a user agent.

## Sending an Invite

To send an ivite to a remote SIP endpoint use an [`Inviter`](https://github.com/onsip/SIP.js/blob/master/docs/api/sip.js.inviter.md). To create a new `Inviter` a valid `UserAgent` is required along with the target URI. The `UserAgent.makeURI()` helper can create a URI from a string. Once the `Inviter` is constructed, calling the `invite()` function on it will send the SIP INVITE.

~~~javascript
// userAgent defined elsewhere
userAgent.start().then(() => {
  const target = UserAgent("sip:bob@example.com");

  const inviter = new Inviter(userAgent, target);
  inviter.invite();
});
~~~
