---
title: Install & Configure FreeSWITCH | SIP.js
description: Easily install & configure FreeSWITCH with letsencrypt to work with SIP.js
---

# Configure FreeSWITCH

SIP.js has been tested with [FreeSWITCH 1.6.14](https://freeswitch.org/confluence/display/FREESWITCH/CentOS+7+and+RHEL+7) without any modification to the source code of SIP.js or FreeSWITCH. Later versions of FreeSWITCH will require similar configuration. Letsencrypt is required for wss.

## System Setup

FreeSWITCH and SIP.js were tested using the following setup:

* [CentOS 7.2 minimal (x86_64)](http://isoredirect.centos.org/centos/7/isos/x86_64/)
* [FreeSWITCH 1.6.14](https://freeswitch.org/confluence/display/FREESWITCH/CentOS+7+and+RHEL+7)
* A public IP address to avoid NAT scenarios on the server side.
* (Optional) A DNS address for letsencrypt certificate.

## Required Packages

Install the following dependencies:

* git
* autoconf
* automake
* libtool
* gcc-c++
* yasm
* libuuid-devel
* zlib-devel
* libjpeg-devel
* ncurses-devel
* openssl-devel
* sqlite-devel
* libcurl-devel
* speex-devel
* ldns-devel
* libedit-devel
* lua-devel
* libsndfile-devel

Using YUM, all dependencies can be installed with:

~~~ bash
yum install git autoconf automake libtool gcc-c++ yasm \
libuuid-devel zlib-devel libjpeg-devel ncurses-devel \
openssl-devel sqlite-devel libcurl-devel speex-devel \
ldns-devel libedit-devel lua-devel libsndfile-devel
~~~~

Opus needs to be downloaded and installed from FreeSWITCH. The packages are linked below along with the command to download and install the packages on CentOS.

* [opus](http://files.freeswitch.org/yum-1.6/7/x86_64/opus-1.1-1.el7.centos.x86_64.rpm)
* [opus-devel](http://files.freeswitch.org/yum-1.6/7/x86_64/opus-devel-1.1-1.el7.centos.x86_64.rpm)

~~~ bash
wget http://files.freeswitch.org/yum-1.6/7/x86_64/opus-1.1-1.el7.centos.x86_64.rpm \
http://files.freeswitch.org/yum-1.6/7/x86_64/opus-devel-1.1-1.el7.centos.x86_64.rpm \
&& yum localinstall opus*
~~~

## Install FreeSWITCH

FreeSWITCH recommends using the latest version of FreeSWITCH from the [FreeSWITCH git repo](https://freeswitch.org/stash/projects/FS/repos/freeswitch/browse). This example uses FreeSWITCH tag v1.6.14.

* `cd /usr/local/src/`
* `git clone https://freeswitch.org/stash/scm/fs/freeswitch.git`
* `cd /usr/local/src/freeswitch`
* `git checkout v1.6.14`
* `./bootstrap.sh`
* `./configure`
* `make` (This may take a few minutes.)
* `make install`

## Configure FreeSWITCH

FreeSWITCH 1.6.14 is configured to work with SIP.js by default. The default configuration location is `/usr/local/freeswitch/conf`.

Start FreeSWITCH: `/usr/local/freeswitch/bin/freeswitch`.

## Configure SIP.js

SIP.js works with FreeSWITCH without any special configuration parameters. The following UA is configured to connect to a default FreeSWITCH configuration. Replace `127.0.0.1` with the IP address of your FreeSWITCH server.

~~~ javascript
var config = {
  // Replace this IP address with your FreeSWITCH IP address
  uri: '1000@127.0.0.1',

  // Replace this IP address with your FreeSWITCH IP address
  // and replace the port with your FreeSWITCH ws port
  ws_servers: 'ws://127.0.0.1:5066',

  // FreeSWITCH Default Username
  authorizationUser: '1000',

  // FreeSWITCH Default Password
  password: '1234'
};

var ua = new SIP.UA(config);
~~~

## Troubleshooting

It is known that SIP.js and FreeSWITCH might not interop well if you have the following option enabled on FreeSWITCH:

~~~ xml
<variable name="sip-force-contact" value="NDLB-connectile-dysfunction"/>
~~~

FreeSWITCH has a confluence article on [WebRTC support](https://freeswitch.org/confluence/display/FREESWITCH/WebRTC).

# Configure Web Socket Secure (WSS) with Letsencrypt

Browsers are more forcibly requiring secure connections to enable WebRTC features. To enable WSS to work with most modern browsers you will need a real SSL certificate, whcih can be obtained from [letsencrypt](https://letsencrypt.org/) for free. This guide covers the initial acquisition of the certificate for testing. Renewing the certificate or other issues are outside the scope of this guide.

## Install Certbot

Cloning from source is the easiest way to get certbot running on Centos 7.

* `cd /usr/local/src`
* `git clone https://github.com/certbot/certbot.git`
* `cd certbot`
* `git checkout v0.10.2`

## Run Certbot

To run certbot replace the `example@sipjs.com` email address with your email address, and the `sipjs.com` domin with your domain name that is pointing at this server. 

Letsencrypt does not issue certificates for IP addresses, but you can use [http://xip.io/](http://xip.io/) to turn your IP address into a domain address.

Note: if your domain name changes you will need to obtain a new certificate.

* `./certbot-auto certonly --standalone --email example@sipjs.com -d sipjs.com`

## Install the Certificate into FreeSWITCH

Replace `sipjs.com` with the domain name that you used to generate the certificate.

* `cd /etc/letsencrypt/live/sipjs.com`
* `echo '' >> /usr/local/freeswitch/certs/wss.pem && cat cert.pem >> /usr/local/freeswitch/certs/wss.pem && cat privkey.pem >> /usr/local/freeswitch/certs/wss.pem && cat chain.pem >> /usr/local/freeswitch/certs/wss.pem`
* Restart FreeSWITCH

## Configure SIP.js to use a Secure Connection

SIP.js works with secure connections out of the box.

~~~ javascript
var config = {
  // Replace this IP address with your FreeSWITCH IP address
  uri: '1000@127.0.0.1',

  // Replace sipjs.com with your domain name
  // and replace the port with your FreeSWITCH wss port
  ws_servers: 'wss://sipjs.com:7443',

  // FreeSWITCH Default Username
  authorizationUser: '1000',

  // FreeSWITCH Default Password
  password: '1234'
};

var ua = new SIP.UA(config);
~~~

## Troubleshooting

If the browser is silently failing to connect to FreeSWITCH securely it is most likely a bad certificate. Browsers will silently fail on this and SIP.js has no control over this.

FreeSWITCH has a confluence article on [WebRTC support](https://freeswitch.org/confluence/display/FREESWITCH/WebRTC)
