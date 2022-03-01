---
title: End a Call | SIP.js
description: How to end a SIP.js call
---

# End a Call

This guide uses the full [SIP.js API](https://github.com/onsip/SIP.js/blob/master/docs/api/sip.js.md). The [Simple User](./simple) is intended to help get beginners up and running quickly. This guide is adopted from the [SIP.js Github API documentation](https://github.com/onsip/SIP.js/blob/master/docs/api.md).

## Prerequisites

See the [User Agent](./user-agent) guide on how to create a user agent. This guide requires a registered user agent.

See the [Make a Call](./make-call) guide on how to make a call.

See the [Receive a Call](./receive-call) guide on how to receive a call.

## End Call

In SIP there are several ways to end a session depending on what state you are in. With SIP.js the application needs to be aware of the state of the session and call the proper method to end the session.

If it is an incoming SIP session that has not been established, you need to `reject` the session.

If it is an outgoing SIP session that has not been established, you need to `cancel` the session.

Lastly, on any established SIP session, you need to `bye` the session.

~~~javascript
const session = ...

function endCall() {
  switch(session.state) {
    case SessionState.Initial:
    case SessionState.Establishing:
      if (session instanceof Inviter) {
        // An unestablished outgoing session
        session.cancel();
      } else {
        // An unestablished incoming session
        session.reject();
      }
      break;
    case SessionState.Established:
      // An established session
      session.bye();
      break;
    case SessionState.Terminating:
    case SessionState.Terminated:
      // Cannot terminate a session that is already terminated
      break;
  }
}
~~~
