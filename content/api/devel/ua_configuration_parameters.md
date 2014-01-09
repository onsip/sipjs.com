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

# Optional Parameters

## authorization_user
Username `String` to use when generating authentication credentials. If not defined the value in uri parameter is used.

~~~ javascript
authorization_user: "alice123"
~~~

## connection_recovery_max_interval
Maximum interval `Number` in seconds between WebSocket reconnection attemps. Default value is 30.

## connection_recovery_min_interval
Minimum interval `Number` in seconds between WebSocket reconnection attempts. Default value is 2.

~~~ javascript
connection_recovery_min_interval: 4
~~~

## display_name
Descriptive name `String` to be shown to the called party when calling or sending IM messages. It must NOT be enclosed between double quotes even if the given name contains multi-byte symbols (SIPjs will always enclose the `display_name` value between double quotes).

~~~ javascript
display_name: "Alice ¶€ĸøĸø"
~~~

## hack_ip_in_contact
Set a random IP address as the host value in the Contact header field and Via sent-by parameter. Useful for SIP registrars not allowing domain names in the Contact URI. Valid values are `true` and `false` (`Boolean`). Default value is a `false`.

~~~ javascript
hack_ip_in_contact: true
~~~

## hack_via_tcp
Set Via transport parameter in outgoing SIP requests to “TCP”. Useful when traversing SIP nodes that are not ready to parse Via headers with “WS” or “WSS” value in a Via header. Valid values are `true` and `false` (`Boolean`). Default value is `false`.

~~~ javascript
hack_via_tcp: true
~~~

## instance_id
`String` indicating the UUID URI to be used as instance ID to identify the UA instance when using GRUU.

~~~ javascript
instance_id: "uuid:8f1fa16a-1165-4a96-8341-785b1ef24f12"
~~~

~~~ javascript
instance_id: "8f1fa16a-1165-4a96-8341-785b1ef24f12"
~~~

## log

## no_answer_timeout
Time (in seconds) (`Integer`) after which an incoming call is rejected if not answered. Default value is `60`.

~~~ javascript
no_answer_timeout: 120
~~~

## password
SIP Authentication password (`String`).

~~~ javascript
password: "1234"
~~~

## register
Indicate if JsSIP User Agent should register automatically when starting. Valid values are `true` and `false` (`Boolean`). Default value is `true`.

~~~ javascript
register: false
~~~

## register_expires
Registration expiry time (in seconds) (`Integer`). Default value is `600`.

~~~ javascript
register_expires: 300
~~~

## registrar_server
Set the SIP registrar URI. Valid value is a SIP URI without username. Default value is `null` which means that the registrar URI is taken from the uri parameter (by removing the username).

~~~ javascript
registrar_server: 'sip:registrar.mydomain.com'
~~~

## stun_servers
`String` or `Array` of `Strings` indicating the STUN server(s) to use for IP address discovery. Values must include “stun:” or “stuns:” schema. Default value is [`"stun:stun.l.google.com:19302"`].

~~~ javascript
stun_servers: "stun:example.org"
~~~

~~~ javascript
stun_servers: ["stun:example.org", "stuns:example.org"]
~~~

~~~ javascript
stun_servers: ["stun:example.org:8000"]
~~~

## trace_sip
Indicate whether incoming and outgoing SIP request/responses must be logged in the browser console (`Boolean`). Default value is `false`.

~~~ javascript
trace_sip: true
~~~

## turn_servers
`Object` or `Array` of `Objects` indicating the TURN server(s) and corresponding username and password to be used for media relay. ‘url’ values can include “turn:” or “turns” schema. No TURN server is set by default.

~~~ javascript
turn_servers: { urls:"turn:example.org", username:"turnuser", password:"turnpassword"}
~~~

~~~ javascript
turn_servers: { urls:["turn:example.org","turn:example2.org"], username:"turnuser", password:"turnpassword"}
~~~

~~~ javascript
turn_servers: [{ urls:"turn:example.org", username:"turnuser", password:"turnpassword"}]
~~~

~~~ javascript
turn_servers: [
  { urls:"turn:example.org", username:"turnuser", password:"turnpassword" },
  { urls:"turn:example.org?transport=udp", username:"turnuser2", password:"turnpassword2"}
]
~~~

## use_preloaded_route
If set to true every SIP initial request sent by SIPjs includes a Route header with the SIP URI associated to the WebSocket server as value. Some SIP Outbound Proxies require such a header. Valid values are `true` and `false` (`Boolean`). Default value is `false`.

~~~ javascript
ws_servers: "ws://example.org/sip-ws"
use_preloaded_route: true
~~~

The Route header will look like Route: `<sip:example.org;lr;transport=ws>`

~~~ javascript
ws_servers: "wss://example.org:8443"
use_preloaded_route: true
~~~

The Route header will look like Route: `<sip:example.org:8443;lr;transport=ws>`