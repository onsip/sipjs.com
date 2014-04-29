---
title: Install & Configure Asterisk | SIP.js
description: Easily install & configure Asterisk to work with SIP.js
---

# Configure Asterisk

SIP.js is tested and will work with [Asterisk 11.9.0](http://downloads.asterisk.org/pub/telephony/asterisk/releases/asterisk-11.9.0.tar.gz) without any modification to the source code of SIP.js or Asterisk.

## System Setup

This is the sample system that we used to test Asterisk.

* [CentOS 6.5 minimal (x86_64)](http://isoredirect.centos.org/centos/6/isos/x86_64/)
* [Asterisk 11.9.0](http://downloads.asterisk.org/pub/telephony/asterisk/releases/asterisk-11.9.0.tar.gz)
* [libsrtp 1.4.2](http://srtp.sourceforge.net/srtp-1.4.2.tgz)
* Hardware connected directly to the internet to avoid NAT scenarios on the server side.

## CentOS

Install CentOS minimal with all of the default settings, running all commands as the root user unless specified otherwise.
Once the install was complete, run `yum update`, then install the dependencies with `yum install wget gcc gcc-c++ ncurses-devel libxml2-devel sqlite3-devel libsrtp-devel libuuid-devel`.

## Install libsrtp
By default, libsrtp is not included in the Asterisk yum repository. Installing it from source is not difficult.  
In the `/usr/src/` folder, download libsrtp using `wget http://srtp.sourceforge.net/srtp-1.4.2.tgz`.  
Extract libsrtp: `tar zxvf srtp-1.4.2.tgz`.  
Enter the srtp directory: `cd /usr/src/srtp*`.  
Configure srtp: `./configure CFLAGS=-fPIC`.  
Compile and install srtp: `make && make install`.  

## Install Asterisk

In the `/usr/src/` folder downlaod Asterisk with `wget http://downloads.asterisk.org/pub/telephony/asterisk/releases/asterisk-11.9.0.tar.gz`.  
Extract Asterisk: `tar zxvf asterisk*`.  
Enter the Asterisk directory: `cd /usr/src/asterisk*`.  
Run the Asterisk configure script: `./configure --libdir=/usr/lib64`.  
Run the Asterisk menuselect tool: `make menuselect`.  
In the menuselect, go to the resources option and ensure that res_srtp is enabled. If there are 3 x's next to res_srtp, there is a problem with the srtp library and you must reinstall it. Save the configuration (press x).  
Compile and install Asterisk: `make && make install`.  
If you need the sample configs you can run `make samples` to install the sample configs. If you need to install the Asterisk startup script you can run `make config`.

## Configure Asterisk

For WebRTC, a lot of the settings that are needed MUST be in the peer settings. The global settings do not flow down into the peer settings very well.
By default, Asterisk config files are located in `/etc/asterisk/`.
Start by editing `http.conf` and make sure that the following lines are uncommented:

~~~
;http.conf
[general]
enabled=yes
bindaddr=127.0.0.1 ; Replace this with your IP address
bindport=8088 ; Replace this with the port you want to listen on
~~~

Change the IP address and port to the IP address of your server and the port that you would like Asterisk to listen for web socket connections on.  

Next, edit sip.conf. Here you will setup two peers, one for the WebRTC client and one for the legacy SIP client. The WebRTC peer requires encryption, avpf, and icesupport to all be enabled. In most cases, directmedia should be disabled. Also under the WebRTC client, the transport needs to be listed as 'ws' to allow websocket connections. All of these config lines should be under the peer itself; setting these config lines globally might not work.

~~~
;sip.conf
[general]
realm=127.0.0.1 ; Replace this with your IP address
udpbindaddr=127.0.0.1 ; Replace this with your IP address
transport=udp

[1060] ; This will be WebRTC client
type=friend
username=1060 ; The Auth user for SIP.js
host=dynamic ; Allows any host to register
secret=password ; The SIP Password for SIP.js
encryption=yes ; Tell Asterisk to use encryption for this peer
avpf=yes ; Tell Asterisk to use AVPF for this peer
icesupport=yes ; Tell Asterisk to use ICE for this peer
context=default ; Tell Asterisk which context to use when this peer is dialing
directmedia=no ; Asterisk will relay media for this peer
transport=udp,ws ; Asterisk will allow this peer to register on UDP or WebSockets

[1061] ; This will be the legacy SIP client
type=friend
username=1061
host=dynamic
secret=password
context=default
~~~

Lastly, you will need to setup the extensions.conf to allow the two peers to call each other.

~~~
;extensions.conf
[default]
exten => 1060,1,Dial(SIP/1060) ; Dialing 1060 will call the SIP client registered to 1060
exten => 1061,1,Dial(SIP/1061) ; Dialing 1061 will call the SIP client registered to 1061
~~~

Restart Asterisk using `service asterisk restart` to ensure that the new settings take effect.

## Configure SIP.js

By adding a single configuration line, SIP.js will work with Asterisk. When creating a UA, you will need to add the configuration parameter [hackIpInContact](http://sipjs.com/api/0.5.0/ua_configuration_parameters/#hackipincontact). If you are missing this property you will be able to make calls from WebRTC, but not receive calls.  
The following configuration example creates a UA for the Asterisk configuration above. Replace the values with the values from your config.

~~~ javascript

var config = {
  uri: '1060@127.0.0.1', // Replace this IP address with your Asterisk IP address
  ws_servers: ['ws://127.0.0.1:8088/ws'], // Replace this IP address with your Asterisk IP address and the port with your Asterisk port from the http.conf file
  authorizationUser: '1060' // Rplace this with the username from your sip.conf file
  password: 'password', // Replace this with the password from your sip.conf file
  hackIpInContact: true // This is required to work with Asterisk
};

var ua = new SIP.UA(config);

~~~

## Troubleshooting

This [forum post](http://forums.digium.com/viewtopic.php?f=1&t=90167&sid=66fdf8cc4be5d955ba584e989a23442f) on troubleshooting WebRTC issues is a great guide for trouble shooting problems with Asterisk. 
