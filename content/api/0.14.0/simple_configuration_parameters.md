---
title: Simple Configuration Parameters | SIP.js
description: A list of configuration parameters for Simple in SIP.js.
---
#Simple Configuration Parameters

* TOC
{:toc}

# Parameters

~~~ javascript
{
  media: {
    remote: {
      audio: <DOM element>,
      video: <DOM element>
    },
    local: {
      video: <DOM element>
    }
  },
  ua: {
     <UA Configuration Options>
  }
}
~~~

## media

Media parameters for use with Simple. At a minimum one remote audio or video element is needed.

### remote

Remote media DOM elements.

#### audio

A DOM element for rendering remote audio. If no element is provided, then there will be no audio on the call. The remote audio and video element can be the same element.

#### video

A DOM element for rendering remote video. If no element is provided, then there will be no video on the call. The remote audio and video element can be the same element.

### local

Local media playback DOM elements. Only local video is supported.

#### video

A DOM element for local video. Local video will only be rendered after the call is started.

## ua

Configuration parameters to use on th UA created by Simple.

### uri

`String` - SIP URI associated to the User Agent. This is a SIP address given to you by your provider.  By default, URI is set to `anonymous.X@anonymous.invalid`, where X is a random token generated for each UA.

### wsServers

Set of WebSocket URIs to connect to. By default, the WebSocket URI is set to `wss://edge.sip.onsip.com`. If not specified, port 80 will be used for WS URIs and port 443 will be used for WSS URIs. This parameter can be expressed in multiple ways:

* `String` to define a single WebSocket URI.
* `Array` of `Strings` to define multiple WebSocket URIs.
* `Array` of `Object` to define multiple WebSocket URIs with weight. URIs with higher weights are attempted before those with lower weights.

~~~ javascript
wsServers: "ws://sip-ws.example.com"
~~~

~~~ javascript
wsServers: "ws://sip-ws.example.com:8443/sip?KEY=1234"
~~~

~~~ javascript
wsServers: [
  "ws://sip-ws-1.example.com",
  "ws://sip-ws-2.example.com"
]
~~~

~~~ javascript
wsServers: [
  { // First connection attempt
    wsUri: "ws://sip-ws-1.example.com",
    weight: 10
  },
  {
    wsUri: "ws://sip-ws-2.example.com",
    weight: 1
  }
]
~~~

### authorizationUser
Username (`String`) to use when generating authentication credentials. If not defined the value in uri parameter is used.

~~~ javascript
authorizationUser: "alice123"
~~~

### password
SIP Authentication password (`String`).   Default value is `null`.

~~~ javascript
password: "1234"
~~~

### displayName
Descriptive name (`String`) to be shown to the called party when calling or sending IM messages. It must NOT be enclosed between double quotes even if the given name contains multi-byte symbols (SIPjs will always enclose the `displayName` value between double quotes).

~~~ javascript
displayName: "Alice ¶€ĸøĸø"
~~~
