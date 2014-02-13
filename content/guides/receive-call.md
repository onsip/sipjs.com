---
title: Receive a Call | SIP.js
---

# Receive a Call

* TOC
{:toc}


## Overview

### Setup

We will start with the code that we produced at the end of the [make a call](/guides/make-call/) example.


### Register A SIP User Agent

In order to receive calls we need to create a registered SIP user agent, instead of an anonymous user agent.  Instead of calling the `SIP.UA()` method without any parameters, we need to give it a `uri`, a `ws_servers`, a `password`, and set `register` equal to `true`.

We will also remove the session invite, so that our app stops making calls.


<iframe
  style="width: 100%; height: 600px"
  src="http://jsfiddle.net/5aqm7/4/embedded/js,html,css,result/">
</iframe>

### Accept a Call Button

Finally, we need a way to accept a call that we are receiving.  We can do this by catching the `invite` event.  Then, we take the session that the invite event returns and we call the `.accept()` method on it.

<iframe
  style="width: 100%; height: 600px"
  src="http://jsfiddle.net/tEGgn/4/embedded/js,html,css,result/">
</iframe>

