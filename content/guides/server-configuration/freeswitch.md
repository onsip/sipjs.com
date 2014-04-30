---
title: Install & Configure Freeswitch | SIP.js
description: Easily install & configure Freeswitch to work with SIP.js
---

# Configure Freeswitch

SIP.js is tested and will work with [Freeswitch 1.5.11](https://confluence.freeswitch.org/display/FREESWITCH/Linux+Quick+Install+Guide#LinuxQuickInstallGuide-Download) without any modification to the source code of SIP.js or Freeswitch.

## System Setup

This is the sample system that we used to test Asterisk.

* [CentOS 6.5 minimal (x86_64)](http://isoredirect.centos.org/centos/6/isos/x86_64/)
* [Freeswitch 1.5.11](https://confluence.freeswitch.org/display/FREESWITCH/Linux+Quick+Install+Guide#LinuxQuickInstallGuide-Download)
* Hardware connected directly to the internet to avoid NAT scenarios on the server side.

## CentOS

Install CentOS minimal with all of the default settings, running all commands as the root user unless specified otherwise.
Once the install was complete, run `yum update`, then install the dependencies with `yum install git autoconf automake libtool gcc-c++ libuuid-devel zlib-devel libjpeg-devel ncurses-devel openssl-devel`.

## Install Freeswitch

Freeswitch recommends using the latest version of Freeswitch from the [Freesiwtch git](http://git.freeswitch.org/git/freeswitch/). SIP.js is tested and works with Freeswitch tag v1.5.11, which is what will be used for this example.
In the `/usr/local/src/` folder git clone Asterisk with `git clone git://git.freeswitch.org/freeswitch.git`.
Enter the Freeswitch directory: `cd /usr/local/src/freeswitch`.
Checkout Freeswitch tag v1.5.11 `git checkout v1.5.11`.
Run the Freeswitch bootstrap script: `./bootstrap.sh`.
Run the Freeswitch configure script: `./configure`.
Compile Freeswitch (this might take a few minutes): `make`.
Install Freeswitch: `make install`.

## Configure Freeswitch

The default configuration files for Freeswitch are located in `/usr/local/freeswitch/conf`.

Start by editing the internal SIP profile `sip_profiles/internal.conf`. Uncomment the line `<param name="ws-binding"  value=":5066"/>`. This will allow web sockets to talk to Freeswitch. No other configuration changes are necissary to make Freeswitch work with WebRTC.

~~~
<!--internal.xml-->
<param name="ws-binding"  value=":5066"/>
~~~

Start Freeswitch `/usr/local/freeswitch/bin/freeswitch`.

## Configure SIP.js

SIP.js works with Freeswitch without any special configuration parameters. The following UA is configured to connect to a default Freeswitch configuration. Replace 127.0.0.1 with the IP address of your Freeswitch server.

~~~javascript
var config = {
  uri: '1000@127.0.0.1', // Replace this IP address with your Freeswitch IP address
  ws_servers: ['ws://127.0.0.1:5066'], // Replace this IP address with your Freeswitch IP address and the port with your Freeswitch port from the sip_profiles/internal.xml file
  authorizationUser: '1000' // Freeswitch Default Username
  password: '1234' // Freeswitch Default Password
};

var ua = new SIP.UA(config);
~~~

## Troubleshooting

Freeswitch has a wiki article on [WebRTC support](https://wiki.freeswitch.org/wiki/Webrtc).
