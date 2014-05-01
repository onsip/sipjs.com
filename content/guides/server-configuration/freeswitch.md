---
title: Install & Configure FreeSWITCH | SIP.js
description: Easily install & configure FreeSWITCH to work with SIP.js
---

# Configure FreeSWITCH

SIP.js is tested and will work with [FreeSWITCH 1.5.11](https://confluence.freeswitch.org/display/FREESWITCH/Linux+Quick+Install+Guide#LinuxQuickInstallGuide-Download) without any modification to the source code of SIP.js or FreeSWITCH.

## System Setup

This is the sample system that we used to test Asterisk.

* [CentOS 6.5 minimal (x86_64)](http://isoredirect.centos.org/centos/6/isos/x86_64/)
* [FreeSWITCH 1.5.11](https://confluence.freeswitch.org/display/FREESWITCH/Linux+Quick+Install+Guide#LinuxQuickInstallGuide-Download)
* Hardware connected directly to the internet to avoid NAT scenarios on the server side.

## CentOS

Install CentOS minimal with all of the default settings, running all commands as the root user unless specified otherwise.
Once the install was complete, run `yum update`, then install the dependencies with `yum install git autoconf automake libtool gcc-c++ libuuid-devel zlib-devel libjpeg-devel ncurses-devel openssl-devel`.

## Install FreeSWITCH

FreeSWITCH recommends using the latest version of FreeSWITCH from the [FreeSWITCH git](http://git.freeswitch.org/git/freeswitch/). SIP.js is tested and works with FreeSWITCH tag v1.5.11, which is what will be used for this example.
In the `/usr/local/src/` folder, git clone FreeSWITCH with `git clone git://git.freeswitch.org/freeswitch.git`.
Enter the FreeSWITCH directory: `cd /usr/local/src/freeswitch`.
Checkout FreeSWITCH tag v1.5.11: `git checkout v1.5.11`.
Run the FreeSWITCH bootstrap script: `./bootstrap.sh`.
Run the FreeSWITCH configure script: `./configure`.
Compile FreeSWITCH (this might take a few minutes): `make`.
Install FreeSWITCH: `make install`.

## Configure FreeSWITCH

The default configuration files for FreeSWITCH are located in `/usr/local/freeswitch/conf`.

Start by editing the internal SIP profile `sip_profiles/internal.conf`. Uncomment the line `<param name="ws-binding"  value=":5066"/>` to allow web sockets to talk to FreeSWITCH. No other configuration changes are necessary to make FreeSWITCH work with WebRTC.

~~~ xml
<!--internal.xml-->
<param name="ws-binding"  value=":5066"/>
~~~

Start FreeSWITCH: `/usr/local/freeswitch/bin/freeswitch`.

## Configure SIP.js

SIP.js works with FreeSWITCH without any special configuration parameters. The following UA is configured to connect to a default FreeSWITCH configuration. Replace 127.0.0.1 with the IP address of your FreeSWITCH server.

~~~ javascript
var config = {
  // Replace this IP address with your FreeSWITCH IP address
  uri: '1000@127.0.0.1',
  
  // Replace this IP address with your FreeSWITCH IP address
  // and replace the port with your FreeSWITCH port
  ws_servers: 'ws://127.0.0.1:5066',
  
  // FreeSWITCH Default Username
  authorizationUser: '1000'
  
  // FreeSWITCH Default Password
  password: '1234'
};

var ua = new SIP.UA(config);
~~~

## Troubleshooting

FreeSWITCH has a wiki article on [WebRTC support](https://wiki.freeswitch.org/wiki/Webrtc).
