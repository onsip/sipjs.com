---
title: SIP.Session | SIP.js
---
# SIP.Session

The class SIP.Session represents a WebRTC media (audio/video) session. It can be initiated by the local user or by a remote peer. Sessions are created via INVITE SIP messages. Sessions also implement one of [`SIP.ClientContext`](/api/0.5.0/context/client/) or [`SIP.ServerContext`](/api/0.5.0/context/server), depending on if they are the result of outbound (client) or inbound (server) INVITE requests.

* TOC
{:toc}

## Construction

The Session constructor is intended for internal use only. Instead, outbound Sessions are created through the `SIP.UA.invite` method. Inbound Sessions are obtained via the `SIP.UA` `invite` event callback.

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

## Instance Attributes

<!--

### `dialog`

`SIP.Dialog` - The SIP dialog associated with the particular InviteContext

### `earlyDialogs`

`SIP.Dialog` - The early SIP dialogs associated with the particular InviteContext

### `rtcMediaHandler`

`SIP.RTCMediaHandler` - The WebRTC Media Handler for the InviteContext which has the local and remote streams

-->

### `startTime`

`Date` - Date object indicating the time when the session started. Takes its value at the moment when the accepted event is fired.

### `endTime`

`DATE` - Date object indicating the time when the session ended. Takes its value at the moment when terminated event was fired.

### `ua`

[`SIP.UA`](/api/0.5.0/ua/) - Inherited from [`SIP.ClientContext`](/api/0.5.0/context/client/#ua) or [`SIP.ServerContext`](/api/0.5.0/context/server/#ua).

### `method`

`String` - The value of `method` is always `"INVITE"`. Inherited from [`SIP.ClientContext`](/api/0.5.0/context/client/#method) or [`SIP.ServerContext`](/api/0.5.0/context/server/#method).

### `request`

[`SIP.IncomingRequest`](/api/0.5.0/incomingMessage/) or [`SIP.OutgoingRequest`](/api/0.5.0/outgoingRequest/) - Inherited from [`SIP.ClientContext`](/api/0.5.0/context/client/#request) or [`SIP.ServerContext`](/api/0.5.0/context/server/#request).

### `localIdentity`

`SIP.NameAddrHeader` - Inherited from [`SIP.ClientContext`](/api/0.5.0/context/client/#localIdentity) or [`SIP.ServerContext`](/api/0.5.0/context/server/#localIdentity).

### `remoteIdentity`

`SIP.NameAddrHeader` - Inherited from [`SIP.ClientContext`](/api/0.5.0/context/client/#remoteIdentity) or [`SIP.ServerContext`](/api/0.5.0/context/server/#remoteIdentity).

### `data`

`Object` - Empty object for application to define custom data. Inherited from [`SIP.ClientContext`](/api/0.5.0/context/client/#data) or [`SIP.ServerContext`](/api/0.5.0/context/server/#data).



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

<!--

### `terminate([options])`

Terminate the current session. Depending on the state of the session, this function may send a CANCEL request, a non-2xx final response, a BYE request, or even no request.

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

-->

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

### `getLocalStreams()`

Returns a sequence of MediaStream objects representing the streams that are currently sent in this Session.

#### Returns

Type | Description
-|-
`Array of RTCMediaStream`| The local media stream

### `getRemoteStreams()`

Returns a sequence of MediaStream objects representing the streams that are currently received in this session.

Type | Description
-|-
`Array of RTCMediaStream`| The remote media stream

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

Send a REFER request. A REFER occurs when persons A and B have an active call session, and A wants to transfer B to speak with C. This is called a transfer, and these transfers can be attended or blind. An attended transfer occurs when A creates a session with C before connecting B to speak with C. A blind transfer occurs when A causes B to create a session with C, so A and C have no contact.

#### Parameters

Name | Type | Description
-----|------|--------------
`target`|`SIP.Session|String`|If the target is a session, this will start an attended transfer. Otherwise, it will do a blind transfer.
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

Overrides [`SIP.ClientContext.cancel`](/api/0.5.0/context/client/#canceloptions/)

## Instance Methods (Inbound/Server)

### `progress([options])`

Overrides [`SIP.ServerContext.progress`](/api/0.5.0/context/server/#progressoptions)

### `accept([options])`

Overrides [`SIP.ServerContext.accept`](/api/0.5.0/context/server/#acceptoptions)

### `reject([options])`

Overrides [`SIP.ServerContext.reject`](/api/0.5.0/context/server/#rejectoptions)

### `reply([options])`

Overrides [`SIP.ServerContext.reply`](/api/0.5.0/context/server/#replyoptions)


## Events

`SIP.Session` class defines a series of events. Each of them allows a callback function to be defined in order to let the user execute a handler for each given stimulus.

Every event handler is executed with a [SIP.Event](/api/0.5.0/eventEmitter/) instance as the only argument.


### `progress`

Fired each time a provisional (100-199) response is received.

#### `on('progress', function (data) {})`

Name | Type | Description
-----|------|------------
`data`|`Object`|A wrapper object containing the event data
`data.code`|`Integer`|The status code of the received response, between 100 and 199.
`data.response`|[`SIP.IncomingMessage`](/api/0.5.0/incomingMessage)|The received response

### `accepted`

Fired each time a successful final (200-299) response is received.

#### `on('accepted', function (data) {})`

Name | Type | Description
-----|------|------------
`data` | `Object` | A wrapper object containing the event data
`data.code` | `Integer` | The status code of the received response, between 200 and 299.
`data.response` | [`SIP.IncomingMessage`](/api/0.5.0/incomingMessage) | The received response

### `rejected`

Fired each time an unsuccessful final (300-699) response is received. *Note: This will also emit a `failed` event.*

#### `on('rejected', function (data) {})`

Name | Type | Description
-----|------|------------
`data` | `Object` | A wrapper object containing the event data
`data.code` | `Integer` | The status code of the received response, between 300 and 699.
`data.response` | [`SIP.IncomingMessage`](/api/0.5.0/incomingMessage/) | The received response
`data.cause` | `String` | The reason phrase associated with the SIP response code.

### `failed`

Fired when the request fails, whether due to an unsuccessful final response or due to timeout, transport, or other error.

#### `on('failed', function (data) {})`

Name | Type | Description
-----|------|------------
`data` | `Object` | A wrapper object containing the event data
`data.code` | `Integer` | The status code of the received response, between 300 and 699, or 0 if the failure was not due to a received response.
`data.response` | [`SIP.IncomingMessage|null`](/api/0.5.0/incomingMessage/) | The received response, or `null` if the failure was not due to a received response.
`data.cause` | `String` | The reason phrase associated with the SIP response code, or one of `SIP.C.causes` if the failure was not due to a received response.




### `connecting`

Fired when ICE is starting to negotiate between the peers.

#### `on('connecting', function (response,code) {})`

Name | Type | Description 
-----|------|--------------
`response`|`Object`|[`SIP.IncomingMessage`](/api/0.5.0/incomingMessage/) instance of the received SIP 1XX response.
`code`||The SIP response code.

<!--

### `terminated`

Fired when an established call ends.

#### `on('terminated', function(message, cause) {})`

Name | Type | Description 
-----|------|--------------
`message`|`Object`|[`SIP.IncomingResponse`](/api/0.5.0/incomingResponse/) instance of the received SIP 1XX response.
`cause`||One value of [Failure and End Causes](/api/0.5.0/causes)

-->

### `canceled`

Fired when the session was canceled by the UAC.

#### `on('canceled', function(response, code) {})`

Name | Type | Description
-----|------|--------------
`response`|`Object`|[`SIP.IncomingMessage`](/api/0.5.0/incomingMessage/) instance of the received SIP 1XX response.
`code`||The SIP response code.

### `referred`

Fired when the session was unable to establish.

#### `on('referred', function(response) {})`

Name | Type | Description
-----|------|--------------
`response`|`Object`|[`SIP.IncomingMessage`](/api/0.5.0/incomingMessage/) instance of the received SIP 1XX response.


### `dtmf`

Fired for an incoming or outgoing DTMF.

#### `.on('dtmf', function(dtmf, request) {})`

Name | Type | Description 
-----|------|--------------
`dtmf`|`Object`|`SIP.Session.DTMF` instance.
`request`|`Object`|[`SIP.IncomingMessage`](/api/0.5.0/incomingMessage/) instance of the received SIP INFO request.

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

### `bye`

Fired when a BYE is sent.

#### `on('bye', function() {})`

*There are no documented arguments for this event*
