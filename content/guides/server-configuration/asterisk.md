---
title: Asterisk Installation & Configuration | SIP.js
description: Easily install & configure Asterisk to work with SIP.js
---

<section class="callout">
<h3>Tired of fighting with configs?</h3>
<p>Try <a href="/">SIP.js</a> and <a href="http://developer.onsip.com/">OnSIP</a> &mdash; a perfect pairing for WebRTC!</p>
</section>

# Configure Asterisk

SIP.js has been tested with [Asterisk 11.11.0](http://downloads.asterisk.org/pub/telephony/asterisk/releases/asterisk-11.11.0.tar.gz) without any modification to the source code of SIP.js or Asterisk. Similar configuration should also work for Asterisk 12.

## System Setup

Asterisk and SIP.js were tested using the following setup:

* [CentOS 6.5 minimal (x86_64)](http://isoredirect.centos.org/centos/6/isos/x86_64/).
* [Asterisk 11.11.0](http://downloads.asterisk.org/pub/telephony/asterisk/releases/asterisk-11.11.0.tar.gz).
* OpenSSL 1.0.1e-fips 11 Feb 2013 or later.
* A public IP address to avoid NAT scenarios on the server side.

## Required Packages

Install the following dependencies:

* wget
* gcc
* gcc-c++
* ncurses-devel
* libxml2-devel
* sqlite-devel
* libsrtp-devel
* libuuid-devel
* openssl-devel

Using YUM, all dependencies can be installed with:

`yum install wget gcc gcc-c++ ncurses-devel libxml2-devel sqlite-devel libuuid-devel openssl-devel`.

## Install libsrtp

First try installing libsrtp from the repo.

`yum install libsrtp-devel`

If libsrtp is not available in the repo install it from source.

1. `cd /usr/local/src/`
2. `wget http://srtp.sourceforge.net/srtp-1.4.2.tgz`
3. `tar zxvf srtp-1.4.2.tgz`
4. `cd /usr/local/src/srtp`
5. `./configure CFLAGS=-fPIC`
6. `make && make install`

## Install Asterisk

1. `cd /usr/local/src/`.
2. Download Asterisk with `wget http://downloads.asterisk.org/pub/telephony/asterisk/releases/asterisk-11.11.0.tar.gz`.
3. Extract Asterisk: `tar zxvf asterisk*`.
4. Enter the Asterisk directory: `cd /usr/local/src/asterisk*`.
5. Run the Asterisk configure script: `./configure --libdir=/usr/lib64`.
6. Run the Asterisk menuselect tool: `make menuselect`.
7. In the menuselect, go to the resources option and ensure that res_srtp is enabled. If there are 3 x's next to res_srtp, there is a problem with the srtp library and you must reinstall it. Save the configuration (press x).
8. Compile and install Asterisk: `make && make install`.
9. If you need the sample configs you can run `make samples` to install the sample configs. If you need to install the Asterisk startup script you can run `make config`.

## Setup DTLS Certificates

1. `mkdir /etc/asterisk/keys`
2. Enter the Asterisk scripts directory: `cd /usr/local/src/asterisk*/contrib/scripts`.
3. Create the DTLS certificates (replace pbx.mycompany.com with your ip address or dns name, replace My Super Company with your company name): `./ast_tls_cert -C pbx.mycompany.com -O "My Super Company" -d /etc/asterisk/keys`.

## Configure Asterisk For WebRTC

For WebRTC, a lot of the settings that are needed MUST be in the **peer settings**. The global settings do not flow down into the peer settings very well.
By default, Asterisk config files are located in `/etc/asterisk/`.
Start by editing `http.conf` and make sure that the following lines are uncommented:

~~~ text
;http.conf
[general]
enabled=yes
bindaddr=127.0.0.1 ; Replace this with your IP address
bindport=8088 ; Replace this with the port you want to listen on
~~~

Change the IP address and port to the IP address of your server and the port that you would like Asterisk to listen for web socket connections on.

Next, edit `sip.conf`. Here you will set up two peers, one for a WebRTC client and one for a non-WebRTC SIP client. The WebRTC peer requires encryption, avpf, and icesupport to be enabled. In most cases, directmedia should be disabled. Also under the WebRTC client, the transport needs to be listed as 'ws' to allow websocket connections. All of these config lines should be under the peer itself; setting these config lines globally might not work.

~~~ text
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
force_avp=yes ; Force Asterisk to use avp. Introduced in Asterisk 11.11
dtlsenable=yes ; Tell Asterisk to enable DTLS for this peer
dtlsverify=no ; Tell Asterisk to not verify your DTLS certs
dtlscertfile=/etc/asterisk/keys/asterisk.pem ; Tell Asterisk where your DTLS cert file is
dtlsprivatekey=/etc/asterisk/keys/asterisk.pem ; Tell Asterisk where your DTLS private key is
dtlssetup=actpass ; Tell Asterisk to use actpass SDP parameter when setting up DTLS

[1061] ; This will be the legacy SIP client
type=friend
username=1061
host=dynamic
secret=password
context=default
~~~

Lastly, set up `extensions.conf` to allow the two peers to call each other.

~~~ text
;extensions.conf
[default]
exten => 1060,1,Dial(SIP/1060) ; Dialing 1060 will call the SIP client registered to 1060
exten => 1061,1,Dial(SIP/1061) ; Dialing 1061 will call the SIP client registered to 1061
~~~

Restart Asterisk using `service asterisk restart` to ensure that the new settings take effect.

## Configure SIP.js

Asterisk does not accept Contact headers with the `.invalid` domain. When creating a UA, add the configuration parameter [hackIpInContact](http://sipjs.com/api/0.6.0/ua_configuration_parameters/#hackipincontact). If you are missing this property you will be able to make calls from WebRTC, but not receive calls through Asterisk will fail.

Additionally this guide will only work with audio calls, Asterisk will reject video calls.

The following configuration example creates a UA for the Asterisk configuration above. Replace the values with the values from your config.

~~~ javascript
var config = {
  // Replace this IP address with your Asterisk IP address
  uri: '1060@127.0.0.1',

  // Replace this IP address with your Asterisk IP address,
  // and replace the port with your Asterisk port from the http.conf file
  ws_servers: 'ws://127.0.0.1:8088/ws',

  // Replace this with the username from your sip.conf file
  authorizationUser: '1060',

  // Replace this with the password from your sip.conf file
  password: 'password',

  // HackIpInContact for Asterisk
  hackIpInContact: true,

};

var ua = new SIP.UA(config);

// Invite with audio only
ua.invite('1061',{
  media: {
    constraints: {
      audio: true,
      video: false
    }
  }
});
~~~

* Update 10/24/2014 - If you are still having trouble with Asterisk and are using a WebSocket Secure (WSS), you can try using the `hackWssInTransport: true` parameter in your UA's configuration. This is new as of [commit 32bffbe](https://github.com/onsip/SIP.js/commit/32bffbea37d91d185851c46e930be8f663e52d13) on the [SIP.js Master branch](https://github.com/onsip/SIP.js).

## Troubleshooting

Firefox 34+ requires [SIP.js 0.6.4 or later](/download/) to interop with FreeSWITCH or Asterisk.

This [forum post](http://forums.digium.com/viewtopic.php?f=1&t=90167&sid=66fdf8cc4be5d955ba584e989a23442f) on troubleshooting WebRTC issues is a great guide for trouble shooting problems with Asterisk.

[Asterisk Secure Calling Guide](https://wiki.asterisk.org/wiki/display/AST/Secure+Calling+Tutorial) can help you setup dtls certificates.
