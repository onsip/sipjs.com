---
title: Install & Configure FreeSWITCH | SIP.js
description: Easily install & configure FreeSWITCH with letsencrypt to work with SIP.js
---

# Configure FreeSWITCH

SIP.js has been tested with [FreeSWITCH 1.6.14](https://freeswitch.org/confluence/display/FREESWITCH/CentOS+7+and+RHEL+7) without any modification to the source code of SIP.js or FreeSWITCH. Later versions of FreeSWITCH will require similar configuration. Letsencrypt is required for wss.

## System Setup

FreeSWITCH and SIP.js were tested using the following setup:

* [CentOS 7.2 minimal (x86_64)](http://isoredirect.centos.org/centos/7/isos/x86_64/)
* [FreeSWITCH 1.10.2](https://freeswitch.org/confluence/display/FREESWITCH/CentOS+7+and+RHEL+7#CentOS7andRHEL7-CentOS7andRHEL7-Stable)
* A public IP address to avoid NAT scenarios on the server side.
* (Optional) A DNS address for letsencrypt certificate.

## Install FreeSWITCH

Installation insutructions are for FreeSWITCH 1.10.2 and adopted from [FreeSWITCH's CENTOS documentation](https://freeswitch.org/confluence/display/FREESWITCH/CentOS+7+and+RHEL+7#CentOS7andRHEL7-CentOS7andRHEL7-Stable).

~~~ bash
yum install -y https://files.freeswitch.org/repo/yum/centos-release/freeswitch-release-repo-0-1.noarch.rpm epel-release
yum install -y freeswitch-config-vanilla freeswitch-lang-* freeswitch-sounds-*
systemctl enable freeswitch
systemctl start freeswitch
~~~

## Setup DTLS Certificates

A self signed SSL certificate is acceptable for development and is included with FreeSWITCH, but it will not work in a production environment. [Let's Encrypt](https://letsencrypt.org/) is a great way to get a free certificate.

## Configure FreeSWITCH

FreeSWITCH 1.10.2 is configured to work with SIP.js by default. The default configuration location is `/usr/local/freeswitch/conf`. It is recommended that you use FreeSWITCH with a publicly accessible IP adress. This guide does not cover how to interop SIP.js with FreeSWITCH through a Firewall or NAT.

## Configure SIP.js

SIP.js works with FreeSWITCH without any special configuration parameters. The following Simple User is configured to connect to a default FreeSWITCH configuration. See the full [API reference](https://github.com/onsip/SIP.js/blob/master/docs/api/sip.js.md) for using the full API.

Replace `127.0.0.1` with the IP address of your FreeSWITCH server. If you have changed the FreeSWITCH configuration you may need to update the user details below. The example provided will register to FreeSWITCH as user `1000` and will place a call to user `1001`.

You may need a valid SSL Certificate for FreeSWITCH to function properly with WebRTC.

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
  const destination = "sip:1001@127.0.0.1";

  // SIP Address of Record (AOR)
  // This is the user's SIP address. It's "Where people can reach you."
  // SIP is an internet standard the details of which are outside the
  // scope of this documentation, but there are many resources available.
  // See: https://tools.ietf.org/html/rfc3261 for the specification.
  const aor = "sip:1000@127.0.0.1";

  // SIP Authorization Username
  // This is the user's authorization username used for authorizing requests.
  // SIP is an internet standard the details of which are outside the
  // scope of this documentation, but there are many resources available.
  // See: https://tools.ietf.org/html/rfc3261 for the specification.
  const authorizationUsername = '1000';

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

It is known that SIP.js and FreeSWITCH might not interop well if you have the following option enabled on FreeSWITCH:

~~~ xml
<variable name="sip-force-contact" value="NDLB-connectile-dysfunction"/>
~~~

FreeSWITCH has a confluence article on [WebRTC support](https://freeswitch.org/confluence/display/FREESWITCH/WebRTC).

# Configure Web Socket Secure (WSS) with Letsencrypt

Browsers are more forcibly requiring secure connections to enable WebRTC features. To enable WSS to work with most modern browsers you will need a real SSL certificate, which can be obtained from [letsencrypt](https://letsencrypt.org/) for free. This guide covers the initial acquisition of the certificate for testing. Renewing the certificate or other issues are outside the scope of this guide.


## Troubleshooting

If the browser is silently failing to connect to FreeSWITCH securely it is most likely a bad certificate. Browsers will silently fail on this and SIP.js has no control over this.

FreeSWITCH has a confluence article on [WebRTC support](https://freeswitch.org/confluence/display/FREESWITCH/WebRTC)
