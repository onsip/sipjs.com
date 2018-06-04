---
title: WebSocket Transport Configuration Parameters | SIP.js
description: A list of configuration parameters for the WebSocket implementation of SIP.Transport

---
# WebSocket Transport Configuration Parameters

* TOC
{:toc}

# Parameters

## wsServers

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
    ws_uri: "ws://sip-ws-1.example.com",
    weight: 10
  },
  {
    ws_uri: "ws://sip-ws-2.example.com",
    weight: 1
  }
]
~~~

## connectionTimeout
Maximum time (`Number`) in seconds for WebSocket initial connection. Default value is 5.

~~~ javascript
connectionTimeout: 5
~~~

## maxReconnectionAttempts
`Number` of times to attempt to reconnect to a WebSocket when the connection drops. The default value is 3.

~~~ javascript
maxReconnectionAttempts: 3
~~~

## reconnectionTimeout
The time (`Number`) in seconds to wait between WebSocket reconnection attempts. The default timeout is 4 seconds.

~~~ javascript
reconnectionTimeout: 4
~~~

## keepAliveInterval
The time (`Number`) in seconds to wait in between CLRF keepAlive sequences are sent. The default is 0.

~~~ javascript
keepAliveInterval: 0
~~~

## keepAliveDebounce
The time (`Number`) in seconds to debounce sending CLRF keepAlive sequences by. The default is 10.

~~~ javascript
keepAliveInterval: 10
~~~

## traceSip
Indicate whether incoming and outgoing SIP request/responses must be logged in the browser console (`Boolean`). Default value is `false`.

~~~ javascript
traceSip: true
~~~
