---
title: Convert to SIP.js| SIP.js
---

# Converting to SIP.js

* TOC
{:toc}



## Overview

SIP.js is a hard fork of the library JsSIP.  As such, if you want to convert your JsSIP application to use the SIP.js library there are a few changes that need to be made.  Below is a checklist of things that you will need to change.

Most importantly, you need to change the loaded library from  `JsSIP-devel.js` to `sip-devel.js`.

###User Agent creation
JsSIP user agents are created using the line `MyPhone = new JSIP.UA(configuration);`.  In SIP.js this needs to be changed to `MyPhone = new SIP.UA(configuration);`.

###Methods
In SIP.js we have changed some of the method names to terms that are more SIP appropriate.  `sendMessage()` is now `message()`

The method `call()` is now `invite()`.  `invite()` now also returns the `session`.


###Events
The event `newMessage` has been changed to `message`

A larger change was made to the `newRTCSession` event.  This event has been changed to `invite`.  Also, it previously fired when receive an invite as well as when sending an invite.  Now, the `invite` only fires upon receiving an event.  

In order to get the session from an invite that you are sending, you must get the return value from the `invite()` method.  For example, if you were previous doing `THIS`.  You must now do `THAT`.
