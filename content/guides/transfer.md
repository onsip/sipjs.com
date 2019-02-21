---
title: Transfer | SIP.js
description: How to enable your WebRTC application to transfer a voice or video call.
---

# Transfer



## Setup

This guide assumes that you have a SIP.UA set up and working. This guide is for the full SIP.js API and is not compatible with Simple.

## Making the Call
As before, we will create a user agent using `SIP.UA()` and create a call using `userAgent.invite('test@example.onsip.com')`

~~~ javascript
  // Create a user agent using the default settings of SIP.js
  var userAgent = new UA();

  // Make a call to 'test@example.onsip.com`
  session = userAgent.invite('test@example.onsip.com');
~~~

## Making a Blind Transfer
SIP.js supports making blind and attended transfers.  A blind transfer occurs when A causes B to create a session with C.

Use the `session.refer(target)` method to make a blind transfer between the current user agent on the `session` call and the user agent at the `target` address.

~~~ javascript
  //target address
  var target = `test2@example.onsip.com`;

  //refers the call to `test2@example.onsip.com`
  session.refer(target);
~~~

## Handling a Blind Transfer
When receiving a refer, if you do not have a handler on the `referRequested` event, SIP.js will automatically follow the refer.

If you have a handle the `referRequested` event, you can simply accept or reject the refer, by calling `.accept()` or `.reject()` on the referServerContext passed to the event handler.

~~~ javascript
  session.on('referRequested', function(referServerContext) {
    if (shouldAcceptRefer(referServerContext)) {
      referServerContext.accept();
    } else {
      referServerContext.reject();
    }
  });
~~~
