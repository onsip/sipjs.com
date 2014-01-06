---
title: SIP.InviteContext | SIP.js
---
# SIP.InviteContext

The class SIP.InviteContext represents a WebRTC media (audio/video) session. It can be initiated by the local user or by a remote peer. TODO: explain context turning into session

* TOC
{:toc}

## Construction

The InviteContext constructor is intended for internal use only.

## Instance Attributes

### `dialog`

`SIP.Dialog` - The SIP dialog associated with the particular InviteContext

### `earlyDialogs`

`SIP.Dialog` - The early SIP dialogs associated with the particular InviteContext

### `rtcMediaHandler`

`SIP.RTCMediaHandler` - The WebRTC Media Handler for the InviteContext which has the local and remote streams

### `start_time`

`DATE` - Date object indicating the time when the session started. Takes its value at the moment when the accepted event is fired.

### `end_time`

`DATE` - Date object indicating the time when the session ended. Takes its value at the moment when terminated event was fired.

## Instance Methods (Client)

### `invite([options])`

Send an INVITE request. Based on the call set up, this may prompt the user for media. This is typically called by the `UA` in `ua.invite(...)`.

#### Parameters

Name | Type | Description
-----|------|--------------
`options`|`Object`|Optional `Object` with extra parameters (see below).
`options.extraHeaders`|`Array` of `Strings`|Extra SIP headers for the request.
`options.mediaConstraints`|`Object`|`Object` with two valid fields (`audio` and `video`) indicating whether the session is intended to use audio and/or video and the constraints to be used. If media constraints are not provided, `{audio: true, video: true}` will be used.
`options.RTCConstraints`|`Object`|`Object` representing RTCPeerconnection constraints.
`options.inviteWithoutSdp`|`Boolean`|`true` if the INVITE should be sent without sdp, `false` otherwise.
`options.anonymous`|`Boolean`|`true` if the UA being used will be anonymous, `false` otherwise.
`options.body`|`String`|represents the SIP message body (in case this parameter is set, a corresponding Content-Type header field must be set in `extraHeaders` field).

#### Returns

Type | Description
-|-
`SIP.InviteContext` | This InviteContext

### `cancel([options])`

Sends a CANCEL request following an INVITE request that has not received a 2xx response. Returns this InviteClientContext.

#### Parameters

Name | Type | Description
-----|------|--------------
`options`|`Object`|Optional `Object` with extra parameters (see below).
`options.status_code`|`Number`|The SIP response code that will be used in the upcoming response instead of the default.
`options.reason_phrase`|`String`|The SIP reason phrase.

#### Returns

Type | Description
-|-
`SIP.InviteContext` | This InviteContext

#### Throws

TypeError
INVALID_STATE_ERROR

## Instance Methods (Server)

### `accept([options])`

Reply to a received INVITE request with a 200 OK response. Based on the call set up, this may prompt the user for media. Returns this InviteServerContext. TODO: everything chains, do we need this last piece? I`m gonna stop doing it from here.

#### Parameters

Name | Type | Description
-----|------|--------------
`options`|`Object`|Optional `Object` with extra parameters (see below).
`options.extraHeaders`|`Array` of `Strings`|Extra SIP headers for the request.
`options.mediaConstraints`|`Object`|`Object` with two valid fields (`audio` and `video`) indicating whether the session is intended to use audio and/or video and the constraints to be used. Default value is both `audio` and `video` set to `true`.

#### Returns

Type | Description
-|-
`SIP.InviteContext` | This InviteContext

#### Throws

INVALID_STATE_ERROR

### `preaccept()`

Reply to a received INVITE request with a provisional response (183 Session in Progress) after the user is prompted for media. This response contains the sdp of the UAS and is used to negotiate the media of the session before a final response is sent.

#### Returns

Type | Description
-|-
`SIP.InviteContext` | This InviteContext

### `progress([options])`

Inherited from `SIP.ServerContext`

### `reject([options])`

Reject the received INVITE request. The default response is 480 Temporarily Unavailable.

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
`SIP.InviteContext` | This InviteContext

#### Throws

TypeError
INVALID_STATE_ERROR

## Instance Methods (Both)

### `sendDTMF(tone[, options])`

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
`SIP.InviteContext` | This InviteContext

#### Example 1

~~~ javascript
call.sendDTMF(1);
call.sendDTMF(4);
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

call.sendDTMF(tones, options);
~~~


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
`SIP.InviteContext` | This InviteContext

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

### `getLocalStreams()`

Returns a sequence of MediaStream objects representing the streams that are currently sent in this InviteContext.

#### Returns

Type | Description
-|-
`Array of RTCMediaStream`| The local media stream

### `getRemoteStreams()`

Returns a sequence of MediaStream objects representing the streams that are currently received in this InviteContext.

Type | Description
-|-
`Array of RTCMediaStream`| The remote media stream

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
`SIP.InviteContext`| This InviteContext

### `refer(target[, options])`

Send a REFER request. A REFER occurs when persons A and B have an active call session, and A wants to transfer B to speak with C. This is called a transfer, and these transfers can be attended or blind. An attended transfer occurs when A creates a session with C before connecting B to speak with C. A blind transfer occurs when A causes B to create a session with C, so A and C have no contact.

#### Parameters

Name | Type | Description
-----|------|--------------
`target`|`SIP.InviteServerContext` `| SIP.InviteClientContext` `| String`|If the target is an InviteServerContext or InviteClientContext will start an attended transfer. Otherwise it will do a blind transfer.
`options`|`Object`|Optional `Object` with extra parameters (see below).
`options.extraHeaders`|`Array` of `Strings`|Extra SIP headers for the request.

#### Returns

Type | Description
-|-
`SIP.InviteContext`| This InviteContext

#### Throws

TypeError
INVALID_STATE_ERROR

## Events

`SIP.InviteContext` class defines a series of events. Each of them allows a callback function to be defined in order to let the user execute a handler for each given stimulus.

Every event handler is executed with a [SIP.Event](/api/devel/event/) instance as the only argument.

### `connecting`

Fired when ICE is starting to negotiate between the peers.

#### `on('connecting', function (response,code) {})`

Name | Type | Description 
-----|------|--------------
`response`|`Object`|[`SIP.IncomingResponse`](/api/devel/incomingResponse/) instance of the received SIP 1XX response.
`code`||The SIP response code.

### `progress`

Fired each time a provisional (100-199) response is received.

#### `on('progress', function (data) {})`

Name | Type | Description
-----|------|------------
`data`|`Object`|A wrapper object containing the event data
`data.code`|`Integer`|The status code of the received response, between 100 and 199.
`data.response`|[`SIP.IncomingResponse`](/api/devel/incomingResponse)|The received response

### `accepted`

Fired each time a successful final (200-299) response is received.

#### `on('accepted', function (data) {})`

Name | Type | Description
-----|------|------------
`data` | `Object` | A wrapper object containing the event data
`data.code` | `Integer` | The status code of the received response, between 200 and 299.
`data.response` | [`SIP.IncomingResponse`](/api/devel/incomingResponse) | The received response

### `rejected`

Fired each time an unsuccessful final (300-699) response is received. *Note: This will also emit a `failed` event.*

#### `on('rejected', function (data) {})`

Name | Type | Description
-----|------|------------
`data` | `Object` | A wrapper object containing the event data
`data.code` | `Integer` | The status code of the received response, between 300 and 699.
`data.response` | [`SIP.IncomingResponse`](/api/devel/incomingResponse/) | The received response
`data.cause` | `String` | The reason phrase associated with the SIP response code.

### `failed`

Fired when the request fails, whether due to an unsuccessful final response or due to timeout, transport, or other error.

#### `on('failed', function (data) {})`

Name | Type | Description
-----|------|------------
`data` | `Object` | A wrapper object containing the event data
`data.code` | `Integer` | The status code of the received response, between 300 and 699, or 0 if the failure was not due to a received response.
`data.response` | [`SIP.IncomingResponse|null`](/api/devel/incomingResponse/) | The received response, or `null` if the failure was not due to a received response.
`data.cause` | `String` | The reason phrase associated with the SIP response code, or one of `SIP.C.causes` if the failure was not due to a received response.

### `terminated`

Fired when an established call ends.

#### `on('terminated', function(message, cause) {})`

Name | Type | Description 
-----|------|--------------
`message`|`Object`|[`SIP.IncomingResponse`](/api/devel/incomingResponse/) instance of the received SIP 1XX response.
`cause`||One value of [Failure and End Causes](/api/devel/causes)

### `canceled`

Fired when the session was canceled by the UAC.

#### `on('canceled', function(response, code) {})`

Name | Type | Description
-----|------|--------------
`response`|`Object`|[`SIP.IncomingResponse`](/api/devel/incomingResponse/) instance of the received SIP 1XX response.
`code`||The SIP response code.

### `referred`

Fired when the session was unable to establish.

#### `on('referred', function(response) {})`

Name | Type | Description
-----|------|--------------
`response`|`Object`|[`SIP.IncomingResponse`](/api/devel/incomingResponse/) instance of the received SIP 1XX response.


### `dtmf`

Fired for an incoming or outgoing DTMF.

#### `.on('dtmf', function(dtmf, request) {})`

Name | Type | Description 
-----|------|--------------
`dtmf`|`Object`|[`SIP.InviteContext.DTMF`](/api/devel/invite/dtmf/) instance.
`request`|`Object`|[`SIP.IncomingRequest`](/api/devel/incomingRequest/) instance of the received SIP INFO request.

### `invite`

Fired when an invite is sent.

#### `on('invited', function () {})`

*There are no documented arguments for this event*

### `preaccepted`

Fired when a session is pre-accepted.

#### `on('preaccepted', function () {})`

*There are no documented arguments for this event*

### `bye`

Fired when a BYE is sent.

#### `on('bye', function() {})`

*There are no documented arguments for this event*