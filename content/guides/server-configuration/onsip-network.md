---
title: Install & Configure The OnSIP Network | SIP.js
description: Easily install & configure the OnSIP Network to work with SIP.js
---

# Configure the OnSIP Network

SIP.js is tested and will work with the [OnSIP Network](https://confluence.freeswitch.org/display/FREESWITCH/Linux+Quick+Install+Guide#LinuxQuickInstallGuide-Download) without any modification to the source code of SIP.js.

## System Setup

No system setup is required.

## Sign up for the OnSIP Network

You will need an [OnSIP Developer account](https://signup.onsip.com/network).

## Configure SIP.js

SIP.js works with the OnSIP Network without any special configuration parameters.

~~~javascript
// Replace 'any_username' with any username and 'your_subdomain' with your OnSIP Network subdomain
var ua = new SIP.UA('any_username@your_subdomain.onsip.com');
~~~

## Troubleshooting

Please see the [OnSIP Developer Documentation](http://developer.onsip.com/).
