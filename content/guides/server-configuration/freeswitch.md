---
title: Install & Configure FreeSWITCH | SIP.js
description: Easily install & configure FreeSWITCH to work with SIP.js
---

# Configure FreeSWITCH

SIP.js has been tested with [FreeSWITCH 1.5.11](https://confluence.freeswitch.org/display/FREESWITCH/Linux+Quick+Install+Guide#LinuxQuickInstallGuide-Download) without any modification to the source code of SIP.js or FreeSWITCH. Later versions of FreeSWITCH will require similar configuration.

## System Setup

FreeSWITCH and SIP.js were tested using the following setup:

* [CentOS 6.5 minimal (x86_64)](http://isoredirect.centos.org/centos/6/isos/x86_64/)
* [FreeSWITCH 1.5.11](https://confluence.freeswitch.org/display/FREESWITCH/Linux+Quick+Install+Guide#LinuxQuickInstallGuide-Download)
* A public IP address to avoid NAT scenarios on the server side.

## Required Packages

Install the following dependencies:

* git
* autoconf
* automake
* libtool
* gcc-c++
* libuuid-devel
* zlib-devel
* libjpeg-devel
* ncurses-devel
* openssl-devel

Using YUM, all dependencies can be installed with:

`yum install git autoconf automake libtool gcc-c++ libuuid-devel zlib-devel libjpeg-devel ncurses-devel openssl-devel`

## Install FreeSWITCH

FreeSWITCH recommends using the latest version of FreeSWITCH from the [FreeSWITCH git repo](http://git.freeswitch.org/git/freeswitch/). This example uses FreeSWITCH tag v1.5.11.

* `cd /usr/local/src/`
* `git clone git://git.freeswitch.org/freeswitch.git`
* `cd /usr/local/src/freeswitch`
* `git checkout v1.5.11`
* `./bootstrap.sh`
* `./configure`
* `make` (This may take a few minutes.)
* `make install`

## Configure FreeSWITCH

The default configuration files for FreeSWITCH are located in `/usr/local/freeswitch/conf`.

Start by editing the internal SIP profile `sip_profiles/internal.xml`. Uncomment the line `<param name="ws-binding"  value=":5066"/>` to allow web sockets to talk to FreeSWITCH. No other configuration changes are necessary to make FreeSWITCH work with WebRTC.

~~~ xml
<!--internal.xml-->
<!-- Uncomment the following: -->
<param name="ws-binding"  value=":5066"/>
~~~

If you'd like to enable video as well as audio, adjust FreeSWITCH's codec preferences to include VP8.

~~~ xml
<!--vars.xml-->
...
<X-PRE-PROCESS cmd="set" data="global_codec_prefs=PCMU,PCMA,VP8">
<X-PRE-PROCESS cmd="set" data="outbound_codec_prefs=PCMU,PCMA,VP8">
...
~~~

Start FreeSWITCH: `/usr/local/freeswitch/bin/freeswitch`.

## Configure SIP.js

SIP.js works with FreeSWITCH without any special configuration parameters. The following UA is configured to connect to a default FreeSWITCH configuration. Replace `127.0.0.1` with the IP address of your FreeSWITCH server.

~~~ javascript
var config = {
  // Replace this IP address with your FreeSWITCH IP address
  uri: '1000@127.0.0.1',

  // Replace this IP address with your FreeSWITCH IP address
  // and replace the port with your FreeSWITCH port
  ws_servers: 'ws://127.0.0.1:5066',

  // FreeSWITCH Default Username
  authorizationUser: '1000',

  // FreeSWITCH Default Password
  password: '1234'
};

var ua = new SIP.UA(config);
~~~

## Troubleshooting

FreeSWITCH has a wiki article on [WebRTC support](https://wiki.freeswitch.org/wiki/Webrtc).
