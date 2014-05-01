---
title: Install & Configure The OnSIP Network | SIP.js
description: Easily install & configure the OnSIP Network to work with SIP.js
---

# Configure the OnSIP Network

SIP.js is tested and will work with the [OnSIP Network](https://confluence.freeswitch.org/display/FREESWITCH/Linux+Quick+Install+Guide#LinuxQuickInstallGuide-Download) without any modification to the source code of SIP.js.

## System Setup

No system setup is required.

## Sign up for the OnSIP Network

The OnSIP Network is a free hosted SIP signaling platform. The OnSIP Network allows you to write your apps and not worry about the signaling. [Get started with the OnSIP Network for FREE](https://signup.onsip.com/network)!

## Configure SIP.js

SIP.js works with the OnSIP Network without any special configuration parameters.

~~~javascript
// Replace 'any_username' with any username and 'your_subdomain' with your OnSIP Network subdomain
var ua = new SIP.UA('any_username@your_subdomain.onsip.com');
~~~

## Troubleshooting

Please see the [OnSIP Developer Documentation](http://developer.onsip.com/).
