---
title: Install & Configure The OnSIP Network | SIP.js
description: Easily install & configure the OnSIP Network to work with SIP.js
---

# Configure the OnSIP Network

SIP.js works with the [OnSIP Network](https://www.onsip.com/webrtc-sip-network) without any modification.

## System Setup

No system setup is required.

## Sign up for the OnSIP Network

The OnSIP Network is a hosted SIP signaling platform. Sign up for free via [the OnSIP web site](https://signup.onsip.com/sipjs).

## Configure SIP.js

If no Web Socket server is specified, SIP.js attempts to connect to the OnSIP Network. Creating and registering user agents with the OnSIP Network is as simple as specifying a SIP address to use:

~~~javascript
// Replace 'any_username' with any username and 'your_subdomain'
// with your OnSIP Network subdomain.
var ua = new SIP.UA('any_username@your_subdomain.onsip.com');
~~~

## Troubleshooting

Please see the [OnSIP Network Developer Documentation](http://developer.onsip.com/).
