---
title: Asterisk Installation & Configuration | SIP.js
description: Easily install & configure Asterisk to work with SIP.js
---

<section class="callout">
<h3>Tired of fighting with configs?</h3>
<p>Try <a href="/">SIP.js</a> and <a href="http://developer.onsip.com/">OnSIP</a> &mdash; a perfect pairing for WebRTC!</p>
</section>

# Configure Asterisk

SIP.js has been tested with [Asterisk 16.9.0](https://downloads.asterisk.org/pub/telephony/asterisk/asterisk-16.9.0.tar.gz) without any modification to the source code of SIP.js or Asterisk. Similar configuration should also work for other versions of Asterisk. If you have questions about WebRTC compatibility with a particular version of Asterisk, please direct those questions to appropriate Asterisk support forums.

## System Setup

Asterisk and SIP.js were tested using the following setup:

* [CentOS 7.2 minimal (x86_64)](http://isoredirect.centos.org/centos/7/isos/x86_64/).
[Asterisk 16.9.0](https://downloads.asterisk.org/pub/telephony/asterisk/asterisk-16.9.0.tar.gz).
* OpenSSL 1.0.1e-fips 11 Feb 2013 or later.
* A public IP address to avoid NAT scenarios on the server side.

## Disable SELinux

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

`yum install wget gcc gcc-c++ ncurses-devel libuuid-devel jansson-devel libxml2-devel sqlite-devel libsrtp-devel openssl-devel

## Install Asterisk

1. `cd /usr/local/src/`.
2. Download Asterisk with `wget https://downloads.asterisk.org/pub/telephony/asterisk/asterisk-16.9.0.tar.gz`.
3. Extract Asterisk: `tar zxvf asterisk*`.
4. Enter the Asterisk directory: `cd /usr/local/src/asterisk*`.
5. Run the Asterisk configure script: `./configure --with-jansson-bundled`.
6. Run the Asterisk menuselect tool: `make menuselect`.
7. In the menuselect, go to the resources option and ensure that res_srtp and pjproject is enabled. If there are 3 x's next to res_srtp, there is a problem with the srtp library and you must reinstall it. Save the configuration (press x).
8. Compile and install Asterisk: `make && make install`.
9. If you need the sample configs you can run `make samples` to install the sample configs. If you need to install the Asterisk startup script you can run `make config`.

## Setup DTLS Certificates

A self signed SSL certificate is acceptable for development, but it will not work in a production environment. [Let's Encrypt](https://letsencrypt.org/) is a great way to get a free certificate.

### Self Signed Certificate

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
tlsenable=yes
tlsbindaddr=127.0.0.1:8089 ; Replace this with your IP address
tlscertfile=/etc/asterisk/keys/asterisk.pem
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
transport=udp,ws,wss ; Asterisk will allow this peer to register on UDP or WebSockets
force_avp=yes ; Force Asterisk to use avp. Introduced in Asterisk 11.11
dtlsenable=yes ; Tell Asterisk to enable DTLS for this peer
dtlsverify=fingerprint ; Tell Asterisk to verify DTLS fingerprint
dtlscertfile=/etc/asterisk/keys/asterisk.pem ; Tell Asterisk where your DTLS cert file is
dtlssetup=actpass ; Tell Asterisk to use actpass SDP parameter when setting up DTLS
rtcp_mux=yes ; Tell Asterisk to do RTCP mux

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

If you used a self signed certificate in the earlier steps, you will need to navigate to `https://<your_ip_address>:8089/ws` and add the certificate exception.

This guide will only work with audio calls, Asterisk will reject video calls.

The following configuration example creates a Simple User for the Asterisk configuration above. Replace the values with the values from your config.

~~~ html
<audio id="remoteAudio" controls>
  <p>Your browser doesn't support HTML5 audio.</p>
</audio>
~~~

~~~ javascript
import { SimpleUser, SimpleUserOptions } from "sip.js/lib/platform/web";

// Helper function to get an HTML audio element
function getAudioElement(id: string): HTMLAudioElement {
  const el = document.getElementById(id);
  if (!(el instanceof HTMLAudioElement)) {
    throw new Error(`Element "${id}" not found or not an audio element.`);
  }
  return el;
}

// Helper function to wait
async function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Main function
async function main(): Promise<void> {

  // SIP over WebSocket Server URL
  // The URL of a SIP over WebSocket server which will complete the call.
  // FreeSwitch is an example of a server which supports SIP over WebSocket.
  // SIP over WebSocket is an internet standard the details of which are
  // outside the scope of this documentation, but there are many resources
  // available. See: https://tools.ietf.org/html/rfc7118 for the specification.
  const server = "wss://127.0.0.1:5066";

  // SIP Request URI
  // The SIP Request URI of the destination. It's "Who you wanna call?"
  // SIP is an internet standard the details of which are outside the
  // scope of this documentation, but there are many resources available.
  // See: https://tools.ietf.org/html/rfc3261 for the specification.
  const destination = "sip:1061@127.0.0.1";

  // SIP Address of Record (AOR)
  // This is the user's SIP address. It's "Where people can reach you."
  // SIP is an internet standard the details of which are outside the
  // scope of this documentation, but there are many resources available.
  // See: https://tools.ietf.org/html/rfc3261 for the specification.
  const aor = "sip:1060@127.0.0.1";

  // SIP Authorization Username
  // This is the user's authorization username used for authorizing requests.
  // SIP is an internet standard the details of which are outside the
  // scope of this documentation, but there are many resources available.
  // See: https://tools.ietf.org/html/rfc3261 for the specification.
  const authorizationUsername = '1060';

  // SIP Authorization Password
  // This is the user's authorization password used for authorizing requests.
  // SIP is an internet standard the details of which are outside the
  // scope of this documentation, but there are many resources available.
  // See: https://tools.ietf.org/html/rfc3261 for the specification.
  const authorizationPassword = '1234';

  // Configuration Options
  // These are configuration options for the `SimpleUser` instance.
  // Here we are setting the HTML audio element we want to use to
  // play the audio received from the remote end of the call.
  // An audio element is needed to play the audio received from the
  // remote end of the call. Once the call is established, a `MediaStream`
  // is attached to the provided audio element's `src` attribute.
  const options: SimpleUserOptions = {
    aor,
    media: {
      remote: {
        audio: getAudioElement("remoteAudio")
      }
    },
    userAgentOptions: {
      authorizationPassword,
      authorizationUsername,
    }
  };

  // Construct a SimpleUser instance
  const simpleUser = new SimpleUser(server, options);

  // Supply delegate to handle inbound calls (optional)
  simpleUser.delegate = {
    onCallReceived: async () => {
      await simpleUser.answer();
    }
  };

  // Connect to server
  await simpleUser.connect();

  // Register to receive inbound calls (optional)
  await simpleUser.register();

  // Place call to the destination
  await simpleUser.call(destination);

  // Wait some number of milliseconds
  await wait(5000);

  // Hangup call
  await simpleUser.hangup();
}

// Run it
main()
  .then(() => console.log(`Success`))
  .catch((error: Error) => console.error(`Failure`, error));
~~~

## Troubleshooting

This [forum post](http://forums.digium.com/viewtopic.php?f=1&t=90167&sid=66fdf8cc4be5d955ba584e989a23442f) on troubleshooting WebRTC issues is a great guide for trouble shooting problems with Asterisk.

[Asterisk Secure Calling Guide](https://wiki.asterisk.org/wiki/display/AST/Secure+Calling+Tutorial) can help you setup dtls certificates.

[Asterisk WebRTC tutorial](https://wiki.asterisk.org/wiki/display/AST/WebRTC+tutorial+using+SIPML5)
