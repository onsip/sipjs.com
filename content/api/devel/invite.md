---
title: SIP.InviteContext | SIP.js
---
# SIP.InviteContext

The class SIP.InviteContext represents a WebRTC media (audio/video) session. It can be initiated by the local user or by a remote peer. TODO: explain context turning into session

* TOC
{:toc}

## Construction

Typically, construction and sending of a InviteContext is managed by a `SIP.UA`, through the `ua.invite(target[, options])` function. However, advanced users may construct InviteContext's manually.

## Instance Attributes

### `dialog`

The SIP dialog associated with the particular InviteContext

### `earlyDialogs`

The early SIP dialogs associated with the particular InviteContext

### `rtcMediaHandler`

The WebRTC Media Handler for the InviteContext which has the local and remote streams

### `mediaStream`

The remote media stream that is associated with the particular InviteContext

### `start_time`

Date object indicating the time when the session started. Takes its value at the moment when the accepted event is fired.

### `end_time`

Date object indicating the time when the session ended. Takes its value at the moment when terminated event was fired.

## Instance Methods (Client)

### `invite([options])`

Send an INVITE request. Based on the call set up, this may prompt the user for media. Returns this InviteClientContext.

#### Parameters

Name | Type | Description
-----|------|--------------
`options`|`Object`|Optional `Object` with extra parameters (see below).

#### Returns

Type | Description
-|-
`SIP.InviteContext` | This InviteContext

#### Fields in `options` Object

Name | Type | Description
-----|------|--------------
`extraHeaders`|`Array` of `Strings`|Extra SIP headers for the request.
`mediaConstraints`|`Object`|`Object` with two valid fields (`audio` and `video`) indicating whether the session is intended to use audio and/or video and the constraints to be used. Default value is both `audio` and `video` set to `true`.
`RTCConstraints`|`Object`|Used similarly to `mediaConstraints`, but for the RTCMediaHandler
`inviteWithoutSdp`|`Boolean`|Tells the InviteContext if the INVITE should be sent with or without sdp.
`anonymous`|`Boolean`|Tells the InviteContext if the UA being used will be anonymous.
`body`|`String`|represents the SIP message body (in case this parameter is set, a corresponding Content-Type header field must be set in `extraHeaders` field).


### `cancel([options])`

Sends a CANCEL request following an INVITE request that has not received a 2xx response. Returns this InviteClientContext.

#### Parameters

Name | Type | Description
-----|------|--------------
`options`|`Object`|Optional `Object` with extra parameters (see below).

#### Fields in `options` Object

Name | Type | Description
-----|------|--------------
`status_code`|`Number`|The SIP response code that will be used in the upcoming response instead of the default.
`reason_phrase`|`String`|The SIP reason phrase.

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

#### Fields in `options` Object

Name | Type | Description
-----|------|--------------
`extraHeaders`|`Array` of `Strings`|Extra SIP headers for the request.
`mediaConstraints`|`Object`|`Object` with two valid fields (`audio` and `video`) indicating whether the session is intended to use audio and/or video and the constraints to be used. Default value is both `audio` and `video` set to `true`.

#### Returns

Type | Description
-|-
`SIP.InviteContext` | This InviteContext

#### Throws

INVALID_STATE_ERROR

### `preaccept([options])`

Reply to a received INVITE request with a reliable provisional response (183 Session in Progress) after the user is prompted for media. This response contains the sdp of the UAS and is used to negotiate the media of the session before a final response is sent.

#### Parameters

Name | Type | Description
-----|------|--------------
`options`|`Object`|Optional `Object` with extra parameters (see below).

#### Fields in `options` Object

Name | Type | Description
-----|------|--------------
CURRENTLY|NOTHING|TODO


### `reject([options])`

Reject the received INVITE request. The default response is 480 Temporarily Unavailable.

#### Parameters

Name | Type | Description
-----|------|--------------
`options`|`Object`|Optional `Object` with extra parameters (see below).

#### Fields in `options` Object

Name | Type | Description
-----|------|--------------
`status_code`|`Number`|The SIP response code that will be used in the upcoming response instead of the default.
`reason_phrase`|`String`|The SIP reason phrase.
`body`|`String`|represents the SIP message body (in case this parameter is set, a corresponding Content-Type header field must be set in `extraHeaders` field).
`extraHeaders`|`Array` of `Strings`|Extra SIP headers for the request.

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

#### Fields in `options` Object

Name | Type | Description
-----|------|--------------
`extraHeaders`|`Array`|Optional `Array` of `Strings` with extra SIP headers for each INFO request.
`duration`|`Number`|Positive decimal `Number` indicating the duration of the tone expressed in milliseconds. Default value is `100`.
`interToneGap`|`Number`|Positive decimal `Number` indicating the interval between two tones expressed in milliseconds. Default value is `500`.

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

#### Fields in `options` Object

Name | Type | Description
-----|------|--------------
`status_code`|`Number`|The SIP response code that will be used in the upcoming response instead of the default.
`reason_phrase`|`String`|The SIP reason phrase.
`body`|`String`|represents the SIP message body (in case this parameter is set, a corresponding Content-Type header field must be set in `extraHeaders` field).
`extraHeaders`|`Array` of `Strings`|Extra SIP headers for the request.

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

#### Fields in `options` Object

Name | Type | Description
-----|------|--------------
`status_code`|`Number`|The SIP response code that will be used in the upcoming response instead of the default.
`reason_phrase`|`String`|The SIP reason phrase.
`body`|`String`|represents the SIP message body (in case this parameter is set, a corresponding Content-Type header field must be set in `extraHeaders` field).
`extraHeaders`|`Array` of `Strings`|Extra SIP headers for the request.

#### Throws

TypeError
INVALID_STATE_ERROR


### `getLocalStreams()`

Returns a sequence of MediaStream objects representing the streams that are currently sent in this InviteContext.

#### Returns

Type | Description
-|-
`RTCMediaStream`| The local media stream

### `getRemoteStreams()`

Returns a sequence of MediaStream objects representing the streams that are currently received in this InviteContext.

Type | Description
-|-
`RTCMediaStream`| The remote media stream

### `sendRequest(method[, options])`

Generic function that sends a `method` request.

#### Parameters

Name | Type | Description
-----|------|--------------
`method`|`String`|The name of the SIP request to be sent
`options`|`Object`|Optional `Object` with extra parameters (see below).

#### Fields in `options` Object

Name | Type | Description
-----|------|--------------
`extraHeaders`|`Array` of `Strings`|Extra SIP headers for the request.
`eventHandlers`|TODO:FINISH|TODO:FINISH

#### Returns

Type | Description
-|-
`SIP.InviteContext`| This InviteContext

### `refer(target[, options])`

Send a REFER request. The transfer that occurs can be attended or blind.

#### Parameters

Name | Type | Description
-----|------|--------------
`target`|`SIP.InviteServerContext|SIP.InviteClientContext|String`|If the target is an InviteServerContext or InviteClientContext will start an attended transfer. Otherwise it will do a blind transfer.
`options`|`Object`|Optional `Object` with extra parameters (see below).

#### Fields in `options` Object

Name | Type | Description
-----|------|--------------
`extraHeaders`|`Array` of `Strings`|Extra SIP headers for the request.

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

### `progress`

Fired when receiving or generating a 1XX SIP class response (>100) to the INVITE request.

#### Event `data` fields

Name | Type | Description 
-----|------|--------------
`response`|`Object`|[`SIP.IncomingResponse`](/api/devel/incomingResponse/) instance of the received SIP 1XX response.
`code`||The SIP response code.


### `accepted`

Fired when the call is answered.

#### Event `data` fields

Name | Type | Description 
-----|------|--------------
`response`|`Object`|[`SIP.IncomingResponse`](/api/devel/incomingResponse/) instance of the received SIP 1XX response.
`code`||The SIP response code.


### `terminated`

Fired when an established call ends.

#### Event `data` fields

Name | Type | Description 
-----|------|--------------
`message`|`Object`|[`SIP.IncomingResponse`](/api/devel/incomingResponse/) instance of the received SIP 1XX response.
`cause`||One value of Failure and End Causes


### `failed`

Fired when the session was unable to establish.

#### Event `data` fields

Name | Type | Description 
-----|------|--------------
`response`|`Object`|[`SIP.IncomingResponse`](/api/devel/incomingResponse/) instance of the received SIP 1XX response.
`cause`||One value of Failure and End Causes
`code`||The SIP response code.


### `canceled`

Fired when the session was canceled by the UAC.

#### Event `data` fields

Name | Type | Description
-----|------|--------------
`response`|`Object`|[`SIP.IncomingResponse`](/api/devel/incomingResponse/) instance of the received SIP 1XX response.
`code`||The SIP response code.

Type | Description
-|-
`SIP.Invite`| This ClientContext

### `referred`

Fired when the session was unable to establish.

#### Event `data` fields

Name | Type | Description
-----|------|--------------
`response`|`Object`|[`SIP.IncomingResponse`](/api/devel/incomingResponse/) instance of the received SIP 1XX response.


### `dtmf`

Fired for an incoming or outgoing DTMF.

Name | Type | Description 
-----|------|--------------
`dtmf`|`Object`|[`SIP.InviteContext.DTMF`](/api/devel/invite/dtmf/) instance.
`request`|`Object`|[`SIP.IncomingRequest`](/api/devel/incomingRequest/) instance of the received SIP INFO request.