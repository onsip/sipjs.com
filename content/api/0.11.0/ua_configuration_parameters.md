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

## transportConstructor
`SIP.Transport` - The constructor for an object to be used as the transport layer for the UA. For more information about creating your own transport see [`SIP.Transport`](../transport). The default is WebSocket transport, which you can read more about [here](../wstransport).

## transportOptions
`Object` - An object to be passed into the `SIP.Transport` when instantiated. See [WebSocket Transport Configuration Parameters](../ws_transport_configuration_parameters) for the full list of options for the default transport.

## allowLegacyNotifications
If set to true, the user agent will allow NOTIFYs received without subscriptions to be emitted to a `notify` event listener on the UA.  Default value is false.

~~~ javascript
allowLegacyNotifications: true
~~~

## allowOutOfDialogRefers

#### SECURITY WARNING!
{: style="font-weight: bold; color: red;""}

If enabled a malicious endpoint could take control of your client. This option should only be enabled if you have a listener on [`outOfDialogReferRequested`](../ua/#outofdialogreferrequested) event. If there is no listener, the default behavior of SIP.js is to follow the `REFER`. Default value is false.

~~~ javascript
allowOutOfDialogRefers: flase
~~~

## authenticationFactory
Similar to `sessionDescriptionHandlerFactory`, this parameter allows the application to use a custom authentication model with SIP.js.
The factory is passed the UA and should return credentials.  Modifying this is very advanced; please refer to the source code for examples.

By default, Digest Authentication is used.

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

## displayName
Descriptive name (`String`) to be shown to the called party when calling or sending IM messages. It must NOT be enclosed between double quotes even if the given name contains multi-byte symbols (SIPjs will always enclose the `display_name` value between double quotes).

~~~ javascript
displayName: "Alice ¶€ĸøĸø"
~~~

## dtmfType

#### Beta Feature
{: style="font-weight: bold; color: red;""}

The type of DTMF that SIP.js should do, either INFO packets or in-band DTMF. In-band DTMF requires support from the Session Description Handler. Valid values are `SIP.C.dtmfType.INFO` and `SIP.C.dtmfType.RTP`. If you choose to send in-band DTMF and it fails on the Session Description Handler, then SIP.js will automatically try to send the DTMF via INFO packet. Default value is `SIP.C.dtmfType.INFO`. The default will change in a future release of SIP.js.

~~~ javascript
dtmfType: SIP.C.dtmfType.INFO
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

## hackWssInTransport
Set the transport parameter to `wss` when used in SIP URIs.  This replaces `ws`, which is the default and required by RFC 7118, but some SIP servers do not like that.

~~~ javascript
hackWssInTransport: true
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

## noAnswerTimeout
Time (in seconds) (`Number`) after which an incoming call is rejected if not answered. Default value is `60`.

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
`Constant` representing whether the UA should do 100rel. Accepts `SIP.C.supported.REQUIRED`, `SIP.C.supported.SUPPORTED`, and `SIP.C.supported.UNSUPPORTED`. Default value is `SIP.C.supported.UNSUPPORTED`.

~~~ javascript
rel100: SIP.C.supported.REQUIRED
~~~

## replaces
`Constant` representing whether the UA should support the SIP Replaces header.
If you enable support for Replaces, please be sure to listen for the [`replaced` event](../session/#replaced) event on each Session.
Accepts `SIP.C.supported.SUPPORTED`, and `SIP.C.supported.UNSUPPORTED`. Default value is `SIP.C.supported.UNSUPPORTED`.

~~~ javascript
replaces: SIP.C.supported.SUPPORTED
~~~

## sessionDescriptionHandlerFactory
`function` that is a factory for generating sessionDescriptionHandlers. The factory will be passed a `session` object for the current session and the `sessionDescriptionHandlerFactoryOptions` object defined on the UA.

See the [`WebRTC SessionDescriptionHandler`](../sessionDescriptionHandler) documentation for more information on how to create this factory.

~~~ javascript
sessionDescriptionHandlerFactory: function(session, options) {
  return new SessionDescriptionHandler(session, options);
}
~~~

## sessionDescriptionHandlerFactoryOptions
Options that will be passed to the SessionDescriptionHandlerFactory.

* `Object` providing options to the factory.
* Look at the [`WebRTC SessionDescriptionHandler`](../sessionDescriptionHandler) for a list of options the default session description handler takes.


<!-- ## usePreloadedRoute

If set to true every SIP initial request sent by SIP.js includes a Route header with the SIP URI associated to the WebSocket server as value. Some SIP Outbound Proxies require such a header. Valid values are `true` and `false` (`Boolean`). Default value is `false`.

~~~ javascript
wsServers: "ws://example.org/sip-ws"
usePreloadedRoute: true
~~~

The Route header will look like Route: `<sip:example.org;lr;transport=ws>`

~~~ javascript
wsServers: "wss://example.org:8443"
usePreloadedRoute: true
~~~

The Route header will look like Route: `<sip:example.org:8443;lr;transport=ws>` -->

## userAgentString

If this is set then the User-Agent header will have this string appended after name and version.

~~~ javascript
userAgentString: "myAwesomeApp"
~~~

The User-Agent header will look like User-Agent: myAwesomeApp
