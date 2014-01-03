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

Send an INVITE request. Based on the call set up, this may prompt the user for media. Returns this InviteClientContext. This is typically called by the `UA` in `ua.invite(...)`.

#### Parameters

Name | Type | Description
-----|------|--------------
`options`|`Object`|Optional `Object` with extra parameters (see below).
`options.extraHeaders`|`Array` of `Strings`|Extra SIP headers for the request.
`options.mediaConstraints`|`Object`|`Object` with two valid fields (`audio` and `video`) indicating whether the session is intended to use audio and/or video and the constraints to be used. Default value is both `audio` and `video` set to `true`.
`options.RTCConstraints`|`Object`|Used similarly to `mediaConstraints`, but for the RTCMediaHandler
`options.inviteWithoutSdp`|`Boolean`|Tells the InviteContext if the INVITE should be sent with or without sdp.
`options.anonymous`|`Boolean`|Tells the InviteContext if the UA being used will be anonymous.
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
var tones = `1234#`;

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

Send a REFER request. The transfer that occurs can be attended or blind. An attended transfer is when you have there are two active call sessions and session A is being transferred to session B. Usually the person who is doing the transfer will talk to both session A and session B before making the transfer. A blind transfer is when the person who is doing the transfer will transfer the session without actually setting up the session to the receiving end. Usually the person making the transfer will not talk to the person receiving the transfer.

#### Parameters

Name | Type | Description
-----|------|--------------
`target`|`SIP.InviteServerContext|SIP.InviteClientContext|String`|If the target is an InviteServerContext or InviteClientContext will start an attended transfer. Otherwise it will do a blind transfer.
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

`SIP.InviteContext` class defines a series of events. Each of them allows callback functions registration in order to let the user execute a handler for each given stimulus.

Every event handler is executed with a [SIP.Event](/api/devel/event/) instance as the only argument.

### `on('connecting', function (response,code) {})`

Fired when ICE is starting to negotiate between the peers.

#### Event `data` fields

Name | Type | Description 
-----|------|--------------
`response`|`Object`|[`SIP.IncomingResponse`](/api/devel/incomingResponse/) instance of the received SIP 1XX response.
`code`||The SIP response code.

### `on('progress', function (data) {})`

Fired each time a provisional (100-199) response is received.

#### Arguments

Name | Type | Description
-----|------|------------
`data`|`Object`|A wrapper object containing the event data
`data.code`|`Integer`|The status code of the received response, between 100 and 199.
`data.response`|[`SIP.IncomingResponse`](/api/devel/incomingResponse)|The received response

### `on('accepted', function (data) {})`

Fired each time a successful final (200-299) response is received.

#### Arguments

Name | Type | Description
-----|------|------------
`data` | `Object` | A wrapper object containing the event data
`data.code` | `Integer` | The status code of the received response, between 200 and 299.
`data.response` | [`SIP.IncomingResponse`](/api/devel/incomingResponse) | The received response

### `on('rejected', function (data) {})`

Fired each time an unsuccessful final (300-699) response is received. *Note: This will also emit a `failed` event.*

#### Arguments

Name | Type | Description
-----|------|------------
`data` | `Object` | A wrapper object containing the event data
`data.code` | `Integer` | The status code of the received response, between 300 and 699.
`data.response` | [`SIP.IncomingResponse`](/api/devel/incomingResponse/) | The received response
`data.cause` | `String` | The reason phrase associated with the SIP response code.

### `on('failed', function (data) {})`

Fired when the request fails, whether due to an unsuccessful final response or due to timeout, transport, or other error.

#### Arguments

Name | Type | Description
-----|------|------------
`data` | `Object` | A wrapper object containing the event data
`data.code` | `Integer` | The status code of the received response, between 300 and 699, or 0 if the failure was not due to a received response.
`data.response` | [`SIP.IncomingResponse|null`](/api/devel/incomingResponse/) | The received response, or `null` if there failure was not due to a received response.
`data.cause` | `String` | The reason phrase associated with the SIP response code, or one of `SIP.C.causes` if the failure was not due to a received response.

### `on('terminated', function(message, cause) {})`

Fired when an established call ends.

#### Event `data` fields

Name | Type | Description 
-----|------|--------------
`message`|`Object`|[`SIP.IncomingResponse`](/api/devel/incomingResponse/) instance of the received SIP 1XX response.
`cause`||One value of Failure and End Causes

### `on('canceled', function(response, code) {})`

Fired when the session was canceled by the UAC.

#### Event `data` fields

Name | Type | Description
-----|------|--------------
`response`|`Object`|[`SIP.IncomingResponse`](/api/devel/incomingResponse/) instance of the received SIP 1XX response.
`code`||The SIP response code.

Type | Description
-|-
`SIP.Invite`| This ClientContext

### `on('referred', function(response) {})`

Fired when the session was unable to establish.

#### Event `data` fields

Name | Type | Description
-----|------|--------------
`response`|`Object`|[`SIP.IncomingResponse`](/api/devel/incomingResponse/) instance of the received SIP 1XX response.


### `.on('dtmf', function(dtmf, request) {})`

Fired for an incoming or outgoing DTMF.

Name | Type | Description 
-----|------|--------------
`dtmf`|`Object`|[`SIP.InviteContext.DTMF`](/api/devel/invite/dtmf/) instance.
`request`|`Object`|[`SIP.IncomingRequest`](/api/devel/incomingRequest/) instance of the received SIP INFO request.

### `on('invite', function() {})`

Fired when an invite is sent.

### `on('preaccepted', function () {})`

Fired when a session is pre-accepted.
 
### `on('bye', function() {})`

Fired when a BYE is sent.