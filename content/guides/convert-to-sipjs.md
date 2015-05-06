---
title: Convert to SIP.js| SIP.js
description: Easily convert your JsSIP application to use the SIP.js library. Here's how.
---

# Converting to SIP.js

* TOC
{:toc}



SIP.js is a hard fork of the library [JsSIP](http://www.jssip.net/).  As such, if you want to convert your JsSIP application to use the SIP.js library there are a few changes that need to be made.  Below is a checklist of things that you will need to change.

Most importantly, you need to change the loaded library from  `JsSIP-devel.js` to [`sip-devel.js`](/download/).

###User Agent creation
JsSIP user agents are created using the line `MyPhone = new JSSIP.UA(configuration);`.  In SIP.js this needs to be changed to `MyPhone = new SIP.UA(configuration);`.

###Methods
In SIP.js we have changed some of the method names to terms that are more SIP appropriate.  `sendMessage()` is now `message()`.

The method `call()` is now `invite()`.  `invite()` now also returns the `session`.


###Events
The event `.on("newMessage", funct)` has been changed to `.on("message", funct)`.

The `.on("started", funct)` event has been changed to `.on("accepted", funct)`.

The `.on("newDtmf", funct)` event has been changed to `.on("dtmf", funct)`.

There are also a few new session events, such as `referred`, `cancel`, and `failed`.

A larger change was made to the `newRTCSession` event.  This event has been changed to `invite`.  Also, it previously fired when receiving an invite as well as when sending an invite.  Now, the `invite` only fires upon receiving an event.

When you call `invite`, the return value of that function call will be the session.  For example, if you were previously doing this:

~~~ javascript
function call(userAgent) {
  userAgent.call("test@example.com");
}

MyPhone.on('newRTCSession', function(e) {
  display_session(e.session);
});

function display_session(session) {
  //display phone session in video element
}
~~~

You must now do this:

~~~ javascript
function call(userAgent) {
  var session = userAgent.invite("test@example.com");
  display_session(session);
}

MyPhone.on('invite', function(session) {
  display_session(session);
});

function display_session(session) {
  //display phone session in video element
}
~~~

### Session Attributes
A `session` has various attributes.  A few names of the attributes have been changed.

The `remote_identity` attribute is now named `remoteIdentity`.

The `local_identity` attribute is now named `localIdentity`.
