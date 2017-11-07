---
title: SIP.Session | SIP.js
description: In SIP.js, the class SIP.Session represents a WebRTC media (audio/video) session.
---
# SIP.Session

The class SIP.Session represents a WebRTC media (audio/video) session. It can be initiated by the local user or by a remote peer. Sessions are created via SIP INVITE messages. Sessions also implement one of [`SIP.ClientContext`](../context/client/) or [`SIP.ServerContext`](../context/server), depending on if they are the result of outbound (client) or inbound (server) INVITE requests.

* TOC
{:toc}

## Construction

The Session constructor is intended for internal use only. Instead, outbound Sessions are created through the [`SIP.UA.invite`](../ua/#invitetarget-options) method. Inbound Sessions are obtained via the `SIP.UA` [`invite` event](../ua/#invite) callback.

### Examples

~~~ javascript
// Create a new outbound (User Agent Client) Session
var session = myUA.invite('alice@example.com');
~~~

~~~ javascript
// Accept an inbound (User Agent Server) Session
myUA.on('invite', function (session) {
  session.accept();
});
~~~

## Instance Variables

<!--

### `dialog`

`SIP.Dialog` - The SIP dialog associated with the particular InviteContext

### `earlyDialogs`

`SIP.Dialog` - The early SIP dialogs associated with the particular InviteContext
-->

### `startTime`

`Date` - Date object indicating the time when the session started. Takes its value at the moment when the accepted event is fired.

### `endTime`

`Date` - Date object indicating the time when the session ended. Takes its value at the moment when the terminated event was fired.

### `ua`

[`SIP.UA`](../ua/) - Inherited from [`SIP.ClientContext`](../context/client/#ua) or [`SIP.ServerContext`](../context/server/#ua).

### `method`

`String` - The value of `method` is always `"INVITE"`. Inherited from [`SIP.ClientContext`](../context/client/#method) or [`SIP.ServerContext`](../context/server/#method).

### `sessionDescriptionHandler`

[`SIP.WebRTC.SessionDescriptionHandler`](../sessionDescriptionHandler) (default) -
To maintain separation of signaling from media, Sessions delegate all media functionality down to a separate [SessionDescriptionHandler](../sessionDescriptionHandler) object. The SessionDescriptionHandler deals with all SDP descriptions, negotiating SDP, gathering ICE candidates, etc.

By default, this object is configured to use WebRTC. When using SIP.js in Node.js, mobile apps, or other platforms, you can define a custom SessionDescriptionHandler using the [UA](../ua/)'s [sessionDescriptionHandlerFactory](../ua_configuration_parameters/#sessionDescriptionHandlerFactory) configuration parameter.


### `request`

[`SIP.IncomingRequest`](../sipMessage/) or [`SIP.OutgoingRequest`](../sipMessage/) - Inherited from [`SIP.ClientContext`](../context/client/#request) or [`SIP.ServerContext`](../context/server/#request).

### `localIdentity`

[`SIP.NameAddrHeader`](../nameAddrHeader/) - Inherited from [`SIP.ClientContext`](../context/client/#localIdentity) or [`SIP.ServerContext`](../context/server/#localIdentity).

### `remoteIdentity`

[`SIP.NameAddrHeader`](../nameAddrHeader/) - Inherited from [`SIP.ClientContext`](../context/client/#remoteIdentity) or [`SIP.ServerContext`](../context/server/#remoteIdentity).

### `data`

`Object` - Empty object for application to define custom data. Inherited from [`SIP.ClientContext`](../context/client/#data) or [`SIP.ServerContext`](../context/server/#data).



## Instance Methods

### `dtmf(tone[, options])`

Send one or multiple DTMF tones making use of SIP INFO method.

#### Parameters

Name | Type | Description
-----|------|--------------
`tone`|`String` or `Number`|One or multiple valid DTMF symbols. Converts `Number` to `String` using `toString()`.
`options`|`Object`|Optional `Object` with extra parameters (see below).
`options.extraHeaders`|`Array`|Optional `Array` of `Strings` with extra SIP headers for each INFO request.
`options.duration`|`Number`|Positive decimal `Number` indicating the duration of the tone expressed in milliseconds. Default value is `100`.
`options.interToneGap`|`Number`|Positive decimal `Number` indicating the interval between two tones expressed in milliseconds. Default value is `500`.

#### Throws

TypeError
INVALID_STATE_ERROR

#### Returns

Type | Description
-|-
`SIP.Session` | This Session

#### Example 1

~~~ javascript
call.dtmf(1);
call.dtmf(4);
~~~

#### Example 2

~~~ javascript
var tones = '1234#';

var extraHeaders = [ 'X-Foo: foo', 'X-Bar: bar' ];

var options = {
  'duration': 160,
  'interToneGap': 1200,
  'extraHeaders': extraHeaders
};

call.dtmf(tones, options);
~~~

### `terminate([options])`

Terminate the current session. Depending on the state of the session, this function may send a CANCEL request, a non-2xx final response, a BYE request, or even no request at all.
Different behavior will result in different events being emitted, but they will always result in a final `terminated` event.

#### Parameters

Name | Type | Description
-----|------|--------------
`options`|`Object`|Optional `Object` with extra parameters (see below).
`options.status_code`|`Number`|The SIP response code that will be used in the upcoming response instead of the default.
`options.reason_phrase`|`String`|The SIP reason phrase.
`options.body`|`String`|represents the SIP message body (in case this parameter is set, a corresponding Content-Type header field must be set in `extraHeaders` field).
`options.extraHeaders`|`Array` of `Strings`|Extra SIP headers for the request.

#### Returns

Type | Description
-|-
`SIP.Session` | This Session

#### Throws

TypeError
INVALID_STATE_ERROR


### `bye([options])`

Sends a BYE request on a confirmed session.

#### Parameters

Name | Type | Description
-----|------|--------------
`options`|`Object`|Optional `Object` with extra parameters (see below).
`options.status_code`|`Number`|The SIP response code that will be used in the upcoming response instead of the default.
`options.reason_phrase`|`String`|The SIP reason phrase.
`options.body`|`String`|represents the SIP message body (in case this parameter is set, a corresponding Content-Type header field must be set in `extraHeaders` field).
`options.extraHeaders`|`Array` of `Strings`|Extra SIP headers for the request.

#### Throws

TypeError
INVALID_STATE_ERROR

### `hold([options, modifiers])`

#### Parameters

Name | Type | Description
-----|------|--------------
|`options`                        |`Object`     |Optional `Object` with extra parameters (see below)|
|`options.extraHeaders`           |`Array` of `Strings` |Optional `Array` of `Strings` with extra SIP headers for the INVITE request|
|`options.anonymous`              |`Boolean`    |`Boolean` field indicating whether the call should be done anonymously. Default value is `false`|
|`options.rel100`                 | `SIP.C.supported.REQUIRED`, `SIP.C.supported.SUPPORTED`, `SIP.C.supported.UNSUPPORTED` | Optionally declare support or requirement of reliable provisional responses (100rel), as defined in [RFC3262](http://tools.ietf.org/html/rfc3262). Default is Unsupported.
|`options.inviteWithoutSdp`       | `Boolean` | If `true`, send the INVITE with no SDP offer. In this case, the SDP offer is to be generated by the remote endpoint, and the SDP answer will be sent in an ACK or PRACK. Default is `false` (send *with* SDP).
|`options.sessionDescriptionHandlerOptions`| `Object` | Optional `Object` of options to be passed to the session description handler.
|`modifiers`|`Array` of `Function` returning `Promise`| Optional modifiers that will be applied to the incoming or outgoing description.

### `unhold([options, modifiers])`

#### Parameters

Name | Type | Description
-----|------|--------------
|`options`                        |`Object`     |Optional `Object` with extra parameters (see below)|
|`options.extraHeaders`           |`Array` of `Strings` |Optional `Array` of `Strings` with extra SIP headers for the INVITE request|
|`options.anonymous`              |`Boolean`    |`Boolean` field indicating whether the call should be done anonymously. Default value is `false`|
|`options.rel100`                 | `SIP.C.supported.REQUIRED`, `SIP.C.supported.SUPPORTED`, `SIP.C.supported.UNSUPPORTED` | Optionally declare support or requirement of reliable provisional responses (100rel), as defined in [RFC3262](http://tools.ietf.org/html/rfc3262). Default is Unsupported.
|`options.inviteWithoutSdp`       | `Boolean` | If `true`, send the INVITE with no SDP offer. In this case, the SDP offer is to be generated by the remote endpoint, and the SDP answer will be sent in an ACK or PRACK. Default is `false` (send *with* SDP).
|`options.sessionDescriptionHandlerOptions`| `Object` | Optional `Object` of options to be passed to the session description handler.
|`modifiers`|`Array` of `Function` returning `Promise`| Optional modifiers that will be applied to the incoming or outgoing description.

### `reinvite([options, modifiers])`

#### Parameters

Name | Type | Description
-----|------|--------------
|`options`                        |`Object`     |Optional `Object` with extra parameters (see below)|
|`options.extraHeaders`           |`Array` of `Strings` |Optional `Array` of `Strings` with extra SIP headers for the INVITE request|
|`options.anonymous`              |`Boolean`    |`Boolean` field indicating whether the call should be done anonymously. Default value is `false`|
|`options.rel100`                 | `SIP.C.supported.REQUIRED`, `SIP.C.supported.SUPPORTED`, `SIP.C.supported.UNSUPPORTED` | Optionally declare support or requirement of reliable provisional responses (100rel), as defined in [RFC3262](http://tools.ietf.org/html/rfc3262). Default is Unsupported.
|`options.inviteWithoutSdp`       | `Boolean` | If `true`, send the INVITE with no SDP offer. In this case, the SDP offer is to be generated by the remote endpoint, and the SDP answer will be sent in an ACK or PRACK. Default is `false` (send *with* SDP).
|`options.sessionDescriptionHandlerOptions`| `Object` | Optional `Object` of options to be passed to the session description handler.
|`modifiers`|`Array` of `Function` returning `Promise`| Optional modifiers that will be applied to the incoming or outgoing description.

<!--

### `sendRequest(method[, options])`

Generic function that sends a `method` request.

#### Parameters

Name | Type | Description
-----|------|--------------
`method`|`String`|The name of the SIP request to be sent
`options`|`Object`|Optional `Object` with extra parameters (see below).
`options.extraHeaders`|`Array` of `Strings`|Extra SIP headers for the request.
`options.eventHandlers`|TODO:FINISH|TODO:FINISH

#### Returns

Type | Description
-|-
`SIP.Session`| This session

-->

### `refer(target[, options])`

Send a REFER request. A REFER occurs when persons A and B have an active call session, and A wants to transfer B to speak with C.
This is called a transfer, and these transfers can be attended or blind. An attended transfer occurs when A creates a session with C
before connecting B to speak with C. A blind transfer occurs when A causes B to create a session with C, so A and C have no contact.

#### Parameters

Name | Type | Description
-----|------|--------------
`target`|`String|SIP.Session`|If a String, the target address to refer the remote party to (Blind Transfer).  If a Session object, the target session to refer the remote party to, with Replaces (Attended Transfer)
`options`|`Object`|Optional `Object` with extra parameters (see below).
`options.extraHeaders`|`Array` of `Strings`|Extra SIP headers for the request.

#### Returns

Type | Description
-|-
`SIP.Session`| This session

#### Throws

TypeError
INVALID_STATE_ERROR

## Instance Methods (Outbound/Client)

### `cancel([options])`

Overrides [`SIP.ClientContext.cancel`](../context/client/#canceloptions/).

Note that a `cancel` request will result in the termination of the session, but not immediately.
Instead, a CANCEL request will be sent.  Depending on the timing of the request, this usually
triggers a rejection response (and thus `rejected`, `failed`, and `terminated` events).  If the remote
end has already accepted the Invite, however, a BYE must be sent, resulting in `accepted`, `bye`, and `terminated` events.

## Instance Methods (Inbound/Server)

### `progress([options])`

Overrides [`SIP.ServerContext.progress`](../context/server/#progressoptions). Additional parameters specific to INVITE requests can be specified.

As per [RFC 3262](http://tools.ietf.org/html/rfc3262), non-100 provisional responses may be transmitted reliably. Support for this is determined by the initial invite request (see the [`rel100`](../ua/#invitetarget-options) parameter on `ua.invite()`). If the INVITE prohibits reliable provisional responses, all responses sent with `progress` will be transmitted unreliably. Likewise, if the INVITE requires 100rel, all non-100 responses will be sent reliably. If 100rel is supported, reliable transmission is determined by the `options.rel100` parameter.

#### Parameters

Name | Type | Description
-|-|-
|`options`                        |`Object`     |Optional `Object` with extra parameters (see below)|
|`options.extraHeaders`           |`Array` of `Strings` |Optional `Array` of `Strings` with extra SIP headers for the INVITE request|
|`options.anonymous`              |`Boolean`    |`Boolean` field indicating whether the call should be done anonymously. Default value is `false`|
|`options.rel100`                 | `SIP.C.supported.REQUIRED`, `SIP.C.supported.SUPPORTED`, `SIP.C.supported.UNSUPPORTED` | Optionally declare support or requirement of reliable provisional responses (100rel), as defined in [RFC3262](http://tools.ietf.org/html/rfc3262). Default is Unsupported.

### `accept([options])`

Overrides [`SIP.ServerContext.accept`](../context/server/#acceptoptions).  Additional parameters specific to INVITE requests can be specified.

#### Parameters

Name | Type | Description
-|-|-
|Destination of the call. `String` representing a destination, username, a complete SIP URI, or a [`SIP.URI`](../uri/) instance|
|`options`                        |`Object`     |Optional `Object` with extra parameters (see below)|
|`options.extraHeaders`           |`Array` of `Strings` |Optional `Array` of `Strings` with extra SIP headers for the INVITE request|
|`options.anonymous`              |`Boolean`    |`Boolean` field indicating whether the call should be done anonymously. Default value is `false`|
|`options.rel100`                 | `SIP.C.supported.REQUIRED`, `SIP.C.supported.SUPPORTED`, `SIP.C.supported.UNSUPPORTED` | Optionally declare support or requirement of reliable provisional responses (100rel), as defined in [RFC3262](http://tools.ietf.org/html/rfc3262). Default is Unsupported.
|`options.inviteWithoutSdp`       | `Boolean` | If `true`, send the INVITE with no SDP offer. In this case, the SDP offer is to be generated by the remote endpoint, and the SDP answer will be sent in an ACK or PRACK. Default is `false` (send *with* SDP).
|`options.sessionDescriptionHandlerOptions`| `Object` | Optional `Object` of options to be passed to the session description handler.

### `reject([options])`

Overrides [`SIP.ServerContext.reject`](../context/server/#rejectoptions)

### `reply([options])`

Overrides [`SIP.ServerContext.reply`](../context/server/#replyoptions)





## Events

The `SIP.Session` class defines a series of events. Each of them allows a callback function to be defined in order to let the user execute a handler for each given stimulus.

Every event handler is executed with a [SIP.Event](../eventEmitter/) instance as the only argument.


### `progress`

Fired each time a provisional (100-199) response is received.

#### `on('progress', function (response) {})`

Name | Type | Description
-----|------|------------
`response`|[`SIP.IncomingResponse`](../sipMessage)|The received response

### `accepted`

Fired each time a successful final (200-299) response is received.

#### `on('accepted', function (data) {})`

Outbound sessions emit `accepted` with the following parameters:

Name | Type | Description
-----|------|------------
`data` | `Object` | A wrapper object containing the event data
`data.code` | `Number` | The status code of the received response, between 200 and 299.
`data.response` | [`SIP.IncomingResponse`](../sipMessage) | The received response

Inbound sessions do not currently provide any parameters when emitting the `accepted` event. [Track this bug on GitHub.](https://github.com/onsip/SIP.js/issues/15)

### `rejected`

Fired each time an unsuccessful final (300-699) response is received. *Note: This will also emit a `failed` event, followed by a `terminated` event.*

#### `on('rejected', function (response, cause) {})`

Name | Type | Description
-----|------|------------
`response` | [`SIP.IncomingResponse`](../sipMessage/) | The received response
`cause` | `String` | The reason phrase associated with the SIP response code.

### `failed`

Fired when the request fails, whether due to an unsuccessful final response or due to timeout, transport, or other error.  This event will only be emitted
by Sessions which have not yet been `accepted`.  After acceptance, look for a `bye` event instead, or listen for `terminated` in all cases.

*Note: This will also emit a `terminated` event.*

#### `on('failed', function (response, cause) {})`

Name | Type | Description
-----|------|------------
`response` | [`SIP.IncomingResponse`](../sipMessage/) | The received response. On a failure not due to a SIP message, this will be null.
`cause` | `String` | The reason phrase associated with the SIP response code, or one of [Failure and End Causes](../causes).


### `terminated`

Fired when the session is destroyed, whether before or after it has been accepted.

The terminated event is a catch-all event of sorts.  Whether the Session has been explicitly rejected,
failed due to technical issues, or ended with a BYE request, a `terminated` event will always be fired.

Please note:  The `terminated` event in 0.6.x versions does not always behave as you would expect.  This was fixed in 0.7.0, so be careful when migrating.

Note:  In 0.7.0, the message and cause arguments are emitted as parameters on a single object.  0.7.1 and beyond will unwrap the arguments into the signature used here.

#### `on('terminated', function(message, cause) {})`

Name | Type | Description
-----|------|--------------
`message`|`Object`|[`SIP.IncomingResponse`](../sipMessage/) instance of the received SIP response that caused the termination, if there was one.
`cause`||One value of [Failure and End Causes](../causes), if there was one.


### `cancel`

Fired when the session was canceled by the client.  Note that this will **not** be immediately followed by a `rejected`, `failed`, or `terminated` event.
Depending on the timing of the cancel, it may trigger a rejection response or the session may be accepted and immediately terminated.  In those cases,
the `rejected` and `failed` or `bye` event will be emitted as expected, and the `terminated` event will then follow.

#### `on('cancel', function() {})`

*There are no documented arguments for this event*

### `reinvite`

Fired when an invite is received on an already established session.

Version 0.8.3+

#### `on('reinvite', function(session) {})`

Name | Type | Description
-----|------|--------------
`session`|`SIP.Session`| The session that received the invite.

### `refer`

Fired when a REFER is received, and the user would like to handle the
transfer at the application level. To have SIP.js automatically follow
the refer, use the `session.followRefer(callback)` function.

#### `on('refer', function(request) {})`

Name | Type | Description
-----|------|--------------
`request`|[`SIP.IncomingRequest`](../sipMessage/)|Instance of the received SIP REFER request.

#### `on('refer', session.followRefer(callback))`

Name | Type | Description
-----|------|--------------
`callback`|`function(request, newSession)`|Callback function to be called after the refer is followed.
`request`|[`SIP.IncomingRequest`](../sipMessage/)|Instance of the received SIP REFER request.
`newSession`|[`SIP.Session`](.)|The Session created by following the REFER

### `replaced`

Fired when an INVITE with Replaces has caused this session to end and be replaced by a new session.
Use this event to clean up the old session and associate any UI elements seamlessly with the new session.
This fires immediately before the session is terminated and the new session is accepted.

#### `on('replaced', function (newSession) {})`

Name | Type | Description
-|-|-
`newSession`|`SIP.Session`| The new session replacing this one.

### `dtmf`

Fired for an incoming or outgoing DTMF.

#### `.on('dtmf', function(request, dtmf) {})`

Name | Type | Description
-----|------|--------------
`request`|[`SIP.IncomingRequest`](../sipMessage/)|Instance of the received SIP INFO request.
`dtmf`|`SIP.Session.DTMF`|DTMF instance.

<!--

### `invite`

Fired when an invite is sent.

#### `on('invited', function () {})`

*There are no documented arguments for this event*

### `preaccepted`

Fired when a session is pre-accepted.

#### `on('preaccepted', function () {})`

*There are no documented arguments for this event*

-->

<!--
### `connecting`

Fired when [ICE](http://www.html5rocks.com/en/tutorials/webrtc/infrastructure/#after-signaling-using-ice-to-cope-with-nats-and-firewalls) is starting to negotiate between the peers.

#### `on('connecting', function () {})`

*There are no documented arguments for this event*
-->


### `bye`

Fired when a BYE is sent or received.  *Note:  A BYE request will also cause a `terminated` event to be emitted.*

#### `on('bye', function(request) {})`

Name | Type | Description
-----|------|--------------
`request`|[`SIP.IncomingRequest`](../sipMessage/)|Instance of the received SIP BYE request.
