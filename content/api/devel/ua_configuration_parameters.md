---
title: SIP.ua_configuration_parameters | SIP.js
---
# SIP.UA Configuration Parameters

* TOC
{:toc}

## uri

`String` - SIP URI associated to the User Agent. This is a SIP address given to you by your provider.  By default, URI is set to `anonymous.X@anonymous.invalid`, where X is a random token generated for each UA.

## ws_servers

Set of WebSocket URIs to connect to. If not specified, port 80 will be used for WS URIs and port 443 will be used for WSS URIs. This parameter can be expressed in multiple ways:

* `String` to define a single WebSocket URI.
* `Array` of `Strings` to define multiple WebSocket URIs.
* `Array` of `Object` to define multiple WebSocket URIs with weight. URIs with higher weights are attempted before those with lower weights.

~~~ javascript
ws_servers: "ws://sip-ws.example.com"
~~~

~~~ javascript
ws_servers: "ws://sip-ws.example.com:8443/sip?KEY=1234"
~~~

~~~ javascript
ws_servers: [
  "ws://sip-ws-1.example.com",
  "ws://sip-ws-2.example.com"
]
~~~

~~~ javascript
ws_servers: [
  {ws_uri: "ws://sip-ws-1.example.com", weight: 10}, // First connection attempt
  {ws_uri: "ws://sip-ws-2.example.com", weight: 1}
]
~~~

