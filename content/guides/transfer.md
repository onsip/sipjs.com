---
title: Transfer | SIP.js
description: How to enable your WebRTC application to transfer a voice or video call.
---

# Transfer

This guide uses the full [SIP.js API](https://github.com/onsip/SIP.js/blob/master/docs/api/sip.js.md). The [Simple User](./simple) is intended to help get beginners up and running quickly. This guide is adopted from the [SIP.js Github API documentation](https://github.com/onsip/SIP.js/blob/master/docs/api.md).

## Make a Blind Transfer

In SIP to make a transfer you must send a `REFER` message to the endpoint that you have a session with. To do this in SIP.js you must call `sesion.refer(target, options)`. The target can be either a valid URI or a SIP.js session. To make a blind transfer you should provide a SIP URI. We will use the `UserAgent.makeUri()` helper to make the URI of the transfer target.

~~~javascript
const target = UserAgent.makeUri('sip:bob@example.com');
session.refer(target);
~~~

## Make an Attended Transfer

The process to make an attended transfer is very similar to that of a Blind Transfer. Instead of providing a `URI` as the target you must provide a SIP.js `session`.

~~~javascript
const replacementSession = newInviter(userAgent, UserAgent.makeURI("sip:bob@example.com"));
session.refer(replacementSession);
~~~

## Handle an Incoming REFER

When an incoming `REFER` is received SIP.js by default will automatically follow it. If you would like more control over handling the incoming `REFER` you can create a callback function on the session delegate called `onRefer(referral)`. This will get called with the `referral` when a `REFER` is received by SIP.js. If a callback is provided in the delegate SIP.js will no longer automaticall follow the `REFER` and the delegate is responsible for handling the message. If the referral is accepted, you will also need to write the code to follow it. There is a helper function on the referral called `makeInviter()` that can be used to make a new `Inviter` and follow the `REFER`.

~~~ javascript
const delegate = {
  onRefer: (referral) => {
    // Determine if you should accept or reject the referral
    if (shouldAcceptReferral(referral)) {
      referral.accept().then(() => {
        referral.makeInviter().invite();
      });
    } else {
      referral.reject();
    }
  }
}
~~~
