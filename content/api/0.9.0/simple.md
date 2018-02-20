---
title: Simple
description: The Simple WebRTC layer for SIP.js
---

# Simple

Simple is a simplified interface to make getting up and running easier for new users. It is not intended for advanced use cases.

* TOC
{:toc}

## Construction

### `new SIP.WebRTC.Simple([configuration])`

A new Simple interface via the `SIP.WebRTC.Simple` constructor. A remote video or audio DOM element is required, as well as credentials to register SIP.js with your SIP service. Check the [Simple Configuration Parameters](../simple_configuration_parameters/) for a full list of parameters.

### Example

~~~ javascript
// Create a Simple interface with a user named bob and a remote video element in the DOM
var simple = new SIP.WebRTC.Simple({
  media: {
    remote: {
      video: document.getElementById('remoteVideo'),
      // This is necessary to do an audio/video call as opposed to just a video call
      audio: document.getElementById('remoteAudio')
    }
  },
  ua: {
    uri: 'bob@example.com',
    wsServers: ['wss://sip-ws.example.com'],
  }
});
~~~

## Instance Variables

### `state`

The state that simple is in. See [`states`](#states) below for a list of states and description of each state.

## Instance Methods

### `call(destination)`

Start a call with the destination

#### Parameters

Name | Type | Description
-----|------|-------------
`destination`|`String|`[`SIP.URI`](../uri/)| The destination endpoint that wish to call

#### Example

~~~ javascript
simple.call('bob@example.com');
~~~

### `answer()`

Answer an incoming call.

#### Example

~~~ javascript
simple.answer();
~~~

### `reject()`

Reject an incoming call.

#### Example

~~~ javascript
simple.reject();
~~~

### `hangup()`

Hangup a call.

#### Example

~~~ javascript
simple.hangup();
~~~

### `mute()`

Mute the local media of a call.

#### Example

~~~ javascript
simple.mute();
~~~

### `unmute()`

Unmute the local media of a call.

#### Example

~~~ javascript
simple.unmute();
~~~

### `hold()`

Place a call on hold and mute the local media.

#### Example

~~~ javascript
simple.hold();
~~~

### `unhold()`

Take a call off hold and unmute the local media.

#### Example

~~~ javascript
simple.unhold();
~~~

### `hangup()`

Hangup a call.

#### Example

~~~ javascript
simple.hangup();
~~~

### `sendDTMF(tone)`

Send a DTMF event via SIP Message to the active call. Requires an active call.

#### Parameters

Name | Type | Description
-----|------|-------------
`tone`|`String`| The tone that you want to send to the active call

#### Example

~~~ javascript
simple.sendDTMF('1');
~~~

### `message(destination, message)`

Send a SIP Message to the destination. Does not require an active call.

#### Parameters

Name | Type | Description
-----|------|-------------
`destination`|`String|`[`SIP.URI`](../uri/)| The tone that you want to send to the active call
`message`|`String`| The message to be sent

#### Example

~~~ javascript
simple.message('bob@example.com','Hello Bob');
~~~

## Events

### `registered`

Fired for a successful registration.

#### `on('registered', function() {})`

### `unregistered`

Fired for an unregistration. This is event is fired in the following scenarios:

* As a result of an unregistration request, `UA.unregister()`.
* When registered, a periodic re-registration fails.

#### `on('unregistered', function() {})`

### `new`

Fired when there is a new call (incoming or outgoing), before a progress message is sent or received.

#### `on('new', function() {})`

### `ringing`

Fired when there is an incoming call that has not yet been answered.

#### `on('ringing', function() {})`

### `connecting`

Fired when there is a progress message sent or received by a call, and the call is not yet in a connected state.

#### `on('connectiing', function() {})`

### `connected`

Fired when the call is connected.

#### `on('connected', function() {})`

### `ended`

Fired when the call has ended.

#### `on('ended', function() {})`

### `hold`

Fired when the call is placed on hold by either side.

#### `on('hold', function() {})`

### `unhold`

Fired when the call is taken off hold by either side.

#### `on('unhold', function() {})`

### `mute`

Fired when the local media is muted.

#### `on('mute', function() {})`

### `unmute`

Fired when the local media is unmuted.

#### `on('unmute', function() {})`

### `dtmf`

Fired for an incoming or outgoing DTMF.

#### `.on('dtmf', function(tone) {})`

Name | Type | Description
-----|------|--------------
`tone`|`SIP.Session.DTMF`|DTMF instance.

### `message`

Fired when an incoming MESSAGE request is received. Valid messages are automatically accepted by SIP.js, to confirm delivery of this message.

#### `on('message', function (message) {})`

*The argument passed to this event implements multiple interfaces.*

Name | Types | Description
-----|-------|-------------
`message`|[`SIP.Message`](../message/), [`SIP.ServerContext`](../context/server/)| The inbound message received. This argument also implements the shared [`SIP.ServerContext`](../context/server/) behavior for inbound requests

#### Example

~~~ javascript
simple.on('message', function(message) {
  alert(message.body);
});
~~~

## States

Simple has 5 states that it can be in at any given time. The states will always flow in a single direction from `STATUS_NEW` to `STATUS_COMPLETED`. For example you cannot go from `STATUS_CONNECTED` to `STATUS_CONNECTING`, but you could go directly from `STATUS_CONNECTING` to `STATUS_COMPLETED`. Once you are in `STATUS_COMPLETED` you can transition back to `STATUS_NEW`.

### `STATUS_NULL`

A blank state for when Simple is instantiated.

### `STATUS_NEW`

A new call has been initialized.

### `STATUS_CONNECTING`

The call is setting up, but is not yet finalized.

### `STATUS_CONNECTED`

The call is now connected and media is flowing.

### `STATUS_COMPLETED`

The call is completed.
