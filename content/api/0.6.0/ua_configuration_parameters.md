---
title: SIP.UA Configuration Parameters | SIP.js
description: A list of configuration parameters for SIP user agents in SIP.js.

---
# SIP.UA Configuration Parameters

* TOC
{:toc}

# Parameters

## uri

`String` - SIP URI associated to the User Agent. This is a SIP address given to you by your provider.  By default, URI is set to `anonymous.X@anonymous.invalid`, where X is a random token generated for each UA.

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

## authorizationUser
Username (`String`) to use when generating authentication credentials. If not defined the value in uri parameter is used.

~~~ javascript
authorizationUser: "alice123"
~~~

## autostart
If set to true, the user agent calls the `.start()` method upon being created.  Default value is true.

~~~ javascript
autostart: true
~~~

## connectionRecoveryMaxInterval
Maximum interval (`Number`) in seconds between WebSocket reconnection attempts. Default value is 30.

~~~ javascript
connectionRecoveryMaxInterval: 60
~~~

## connectionRecoveryMinInterval
Minimum interval (`Number`) in seconds between WebSocket reconnection attempts. Default value is 2.

~~~ javascript
connectionRecoveryMinInterval: 4
~~~

## displayName
Descriptive name (`String`) to be shown to the called party when calling or sending IM messages. It must NOT be enclosed between double quotes even if the given name contains multi-byte symbols (SIPjs will always enclose the `display_name` value between double quotes).

~~~ javascript
displayName: "Alice ¶€ĸøĸø"
~~~

## hackIpInContact
Set a random IP address as the host value in the Contact header field and Via sent-by parameter. Useful for SIP registrars not allowing domain names in the Contact URI. Valid values are `true` and `false` (`Boolean`). Default value is `false`.

~~~ javascript
hackIpInContact: true
~~~

## hackViaTcp
Set Via transport parameter in outgoing SIP requests to “TCP”. Useful when traversing SIP nodes that are not ready to parse Via headers with “WS” or “WSS” value in a Via header. Valid values are `true` and `false` (`Boolean`). Default value is `false`.

~~~ javascript
hackViaTcp: true
~~~

## instanceId
`String` indicating the UUID URI to be used as instance ID to identify the UA instance when using GRUU.

~~~ javascript
instanceId: "uuid:8f1fa16a-1165-4a96-8341-785b1ef24f12"
~~~

~~~ javascript
instanceId: "8f1fa16a-1165-4a96-8341-785b1ef24f12"
~~~

## log
`Object` providing the desired log behavior.

### -   builtinEnabled

`Boolean` indicating whether SIPjs should write log messages in the browser console. Default value is `true`.

### -   level

`Number` or `String` indicating the verbose level of the SIPjs log. Valid values are `3`, `2`, `1`, `0` or `"debug"`, `"log"`, `"warn"`, `"error"` respectively. Default value is `2` (or `log`).

### -   connector

User defined `Function` which will be called everytime a log is generated, according to the `enabled` and `level` options.

The function is called with the following semantics:

~~~javascript
/* 
  level: String representing the level of the log message 
('debug', 'log', 'warn', 'error')

  category: String representing the SIPjs instance class firing 
the log. ie: 'sipjs.ua'

  label: String indicating the 'identifier' of the class instance
 when the log level is '3' (debug). ie: transaction.id

  content: String representing the log message
*/
connector(level, category, label, content);
~~~

## mediaHandlerFactory
A function(session, options) that returns an object that acts like a SIP.MediaHandler. See SIP.WebRTC.MediaHandler.defaultFactory for an example.

## noAnswerTimeout
Time (in seconds) (`Number`) after which an incoming call is rejected if not answered. Default value is `30`.

~~~ javascript
noAnswerTimeout: 120
~~~

## password
SIP Authentication password (`String`).   Default value is `null`.

~~~ javascript
password: "1234"
~~~

## register
Indicate if a SIP User Agent should register automatically when starting. Valid values are `true` and `false` (`Boolean`). Default value is `true`.

~~~ javascript
register: false
~~~

## registerExpires
Registration expiry time (in seconds) (`Number`). Default value is `600`.

~~~ javascript
registerExpires: 300
~~~

## registrarServer
Set the SIP registrar URI. Valid value is a SIP URI without username. Default value is `null` which means that the registrar URI is taken from the uri parameter (by removing the username).

~~~ javascript
registrarServer: 'sip:registrar.mydomain.com'
~~~

## rel100
`String` representing whether the UA should do 100rel. Accepts `none`, `supported`, and `required`. Default value is `none`.

~~~ javascript
rel100: "supported"
~~~

## stunServers
`String` or `Array` of `Strings` indicating the STUN server(s) to use for IP address discovery. Values must include “stun:” or “stuns:” schema. Default value is [`"stun:stun.l.google.com:19302"`].

~~~ javascript
stunServers: "stun:example.org"
~~~

~~~ javascript
stunServers: ["stun:example.org", "stuns:example.org"]
~~~

~~~ javascript
stunServers: ["stun:example.org:8000"]
~~~

## traceSip
Indicate whether incoming and outgoing SIP request/responses must be logged in the browser console (`Boolean`). Default value is `false`.

~~~ javascript
traceSip: true
~~~

## turnServers
`Object` or `Array` of `Objects` indicating the TURN server(s) and corresponding username and password to be used for media relay. ‘url’ values can include “turn:” or “turns” schema. No TURN server is set by default.

~~~ javascript
turnServers: {
  urls:"turn:exam.org",
  username:"alice",
  password:"racecar"
}
~~~

~~~ javascript
turnServers: {
  urls:["turn:exam.org",
  "turn:exam.org"],
  username:"Al",
  password:"yo"
}
~~~

~~~ javascript
turnServers: [{
  urls:"turn:exam.org",
  username:"alice",
  password:"racecar"
}]
~~~

~~~ javascript
turnServers: [
  {
    urls:"turn:exam.org",
    username:"alice",
    password:"racecar"
  },
  {
    urls:"turn:exam.org?transport=udp",
    username:"bob",
    password:"dog"
  }
]
~~~

## usePreloadedRoute
If set to true every SIP initial request sent by SIPjs includes a Route header with the SIP URI associated to the WebSocket server as value. Some SIP Outbound Proxies require such a header. Valid values are `true` and `false` (`Boolean`). Default value is `false`.

~~~ javascript
wsServers: "ws://example.org/sip-ws"
usePreloadedRoute: true
~~~

The Route header will look like Route: `<sip:example.org;lr;transport=ws>`

~~~ javascript
wsServers: "wss://example.org:8443"
usePreloadedRoute: true
~~~

The Route header will look like Route: `<sip:example.org:8443;lr;transport=ws>`

## userAgentString
If this is set then the User-Agent header will have this string appended after name and version.

~~~ javascript
userAgentString: "myAwesomeApp"
~~~

The User-Agent header will look like User-Agent: SIP.js/0.5.0-devel myAwesomeApp