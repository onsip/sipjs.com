---
title: Configure SIP.js with OnSIP | SIP.js
description: Easily install & configure SIP.js for use with OnSIP
---

# Configure SIP.js with OnSIP

SIP.js works with [OnSIP](http://developer.onsip.com) without any modification.

## System Setup

No system setup is required.

## Sign up for OnSIP

OnSIP is a hosted SIP signaling platform. Sign up for free via [the OnSIP web site](https://signup.onsip.com/network).

## Configure SIP.js

If no Web Socket server is specified, SIP.js attempts to connect to OnSIP. Creating and registering user agents with OnSIP is as simple as specifying a SIP address to use:

~~~javascript
// Replace 'any_username' with any username and 'your_subdomain'
// with your OnSIP subdomain.
var ua = new SIP.UA('any_username@your_subdomain.onsip.com');
~~~

## Troubleshooting

Please see the [OnSIP Developer Documentation](http://developer.onsip.com/).
