---
title: Receive a Call | SIP.js
description: How to enable your WebRTC application to accept calls from peers and third parties by registering a SIP user agent.
---

# Receive a Call

This guide uses the full [SIP.js API](https://github.com/onsip/SIP.js/blob/master/docs/api/sip.js.md). The [Simple User](./simple) is intended to help get beginners up and running quickly. This guide is adopted from the [SIP.js Github API documentation](https://github.com/onsip/SIP.js/blob/master/docs/api.md).

## Prerequisites

See the [User Agent](./user-agent) guide on how to create a user agent. This guide requires a registered user agent.

## User Agent Delegate

When SIP.js receives a SIP INVITE from another endpoint, it is processeed by the `UserAgent`. A `delegate` can be attached to the user agent to receive the invitation. A [`UserAgentDelegate`](https://github.com/onsip/SIP.js/blob/master/docs/api/sip.js.useragentdelegate.md) is used as the handle to get information out of the user agent.

~~~javascript
function onInvite(invitation) {
  // do something
}

const userAgentOptions: UserAgentOptions = {
  authorizationPassword: 'secretPassword',
  authorizationUsername: 'authorizationUsername',
  delegate: {
    onInvite
  }
  transportOptions,
  uri
};
const userAgent = new UserAgent(userAgentOptions);
~~~

## onInvite()

When an INVITE is received the user agent will call the delegate's [`onInvite(invitation)`](https://github.com/onsip/SIP.js/blob/master/docs/api/sip.js.useragentdelegate.oninvite.md) function. An [`invitation`](https://github.com/onsip/SIP.js/blob/master/docs/api/sip.js.invitation.md) will be passed to the function so that the application can interact with the INVITE.

### Accept

To accept the INVITE use the [`accept()`](https://github.com/onsip/SIP.js/blob/master/docs/api/sip.js.invitation.accept.md) function on the invitation.

~~~javascript
function onInvite(invitation) {
  invitation.accept();
}
~~~

### Reject

To reject the INVITE use the [`reject()`](https://github.com/onsip/SIP.js/blob/master/docs/api/sip.js.invitation.reject.md) function on the invitation.

~~~javascript
function onInvite(invitation) {
  invitation.reject();
}
~~~
