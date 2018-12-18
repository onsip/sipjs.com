---
title: Transport | SIP.js
description: SIP.js Transport provides a parent class in which an implementation transport layer is built on top of. This layer handles the actual sending and receiving of SIP requests and responses.
---

# SIP.Transport

SIP.js Transport provides a parent class in which an implementation transport layer is built on top of. This layer handles the actual sending and receiving of SIP requests and responses.

* TOC
{:toc}

## Construction

The construction of a transport is not meant to be done manually. Instead, SIP.js user agents create a transport to use for themselves. As of 0.11.0, transport in SIP.js represents a generic layer upon which an implementation is built, with websockets being the default. A transport implementation can be specified in the UA passing in the constructor as the `transportConstructor` configuration option. Any configuration options required for the transport layer will be passed in as the `transportOptions` UA configuration option.

When constructed, the UA will assign the new Transport as its own transport property before automatically attempting to connect (configurable by `ua.configuration.autostart`).

## Instance Methods

### `send(msg)`

Send a message and automatically emits a `messageSent` event. Implementation delegated to abstract method `sendPromise`.

#### Parameters

Name | Mandatory? | Type | Description
-----|------|----|---------
`msg`|Yes| SIP.OutgoingRequest &#124; String | A SIP Request (represented as a String or [SIP.OutgoingRequest](../sipMessage/)) to send along the WebSocket.
`options` |No| Object | Object to pass to `sendPromise()`

#### Returns

`Promise`

### `sendPromise()`

*Abstract*
Implementation of sending a message over the transport. MUST return a promise that resolves with an object with mandatory parameter `msg` and optional parameter `overrideEvent`.

#### Parameters

Name | Mandatory? | Type | Description
-----|------|----|---------
`msg`|Yes| SIP.OutgoingRequest &#124; String | A SIP Request (represented as a String or [SIP.OutgoingRequest](../sipMessage/)) to send along the WebSocket.
`options` |No| Object | Options to pass to the implementation


#### Returns
`Promise` that resolves with an object with 2 parameters, `overrideEvent` and `msg`.

Name | Mandatory? | Type | Description
-|-|-|-
`msg`|Yes| String | A SIP Request (represented as a String or [SIP.OutgoingRequest](../sipMessage/)) to send along the WebSocket.
`overrideEvent`|No|Boolean| If set to `true`, the default `messageSent` event emitted by `send()` will not be emitted. If you override the event in this fashion, you SHOULD emit it in your implementation of `sendPromise()`

### `connect()`

Connects the transport and automatically emits a `connected` event. Implementation is delegated to abstract method `connectPromise()`.

#### Parameters

Name | Mandatory? | Type | Description
-----|------|----|---------
`options` |No| Object | Object to pass to `connectPromise()`


#### Returns

`Promise`

### `connectPromise()`

*Abstract*
Implementation of connecting the transport. Called by `connect()`. MUST return a promise that resolves with an object.

#### Returns
`Promise` that resolves with an object with properties:

Name | Mandatory? | Type | Description
-----|------------|------|-------
`overrideEvent`|No|Boolean| If set to `true`, the default `connected` event emitted by `connect()` will not be emitted. If you override the event in this fashion, you SHOULD emit it in your implementation of `connectPromise()`

### `disconnect()`

Disconnects the transport and automatically emits a `disconnected` event. Implementation is delegated to abstract method `disconnectPromise()`.

#### Parameters

Name | Mandatory? | Type | Description
-----|------|----|---------
`options` |No| Object | Object to pass to `disconnectPromise()`

#### Returns

`Promise`

### `disconnectPromise()`

*Abstract*
Implementation of disconnecting the transport. Called by `disconnect()`. MUST return a promise that resolves with an object.

#### Returns
`Promise` that resolves with an object with properties:

Name | Mandatory? | Type | Description
-----|------------|------|-------
`overrideEvent`|No|Boolean| If set to `true`, the default `disconnected` event emitted by `disconnect()` will not be emitted. If you override the event in this fashion, you SHOULD emit it in your implementation of `disconnectPromise()`


### `isConnected()`
*Abstract*

#### Returns

Type     | Description
---------|-------------
`Boolean`| `true` if the connection is established, `false` otherwise

### `afterConnected()`

If the transport is connected, the `callback` is executed immediately- otherwise sets up a `once` listener on own `connected` event supplying the given `callback`. Checks connection state via own `isConnected()` method.

#### Parameters

Name | Type | Description
-----|------|-------------
`callback`| Function | A callback to be executed

## Events

Transport objects extend the [SIP.EventEmitter](../eventEmitter/) interface.  Each event emitted by the transport passes specific relevant arguments to its callbacks. Additional events MAY be added for child implementations.

### `connecting`

Fired when the transport is attempting to connect.

#### `on('connecting', function() {})`

*There are no documented arguments for this event.*

### `connected`

Fired when the connection is established.

#### `on('connected', function () {})`

*There are no documented arguments for this event.*

### `disconnecting`

Fired when the connection is attempting to disconnect.

#### `on('disconnecting', function() {})`

*There are no documented arguments for this event.*

### `disconnected`

Fired when the connection is interrupted or lost

#### `on('disconnected', function () {})`

*There are no documented arguments for this event.*

### `messageSent`

Fired when a message is sent over the transport

#### `on('messageSent', function (message) {})`

#### Arguments
`message` - `String` - The message that was sent

### `message`

Fired when a message is received over the transport

#### `on('message', function (message) {})`

#### Arguments
`message` - `String` - The message that was received

### `transportError`

Fired when an error occurs in the transport layer and other layers need to be notified

#### `on('transportError', function () {})`

*There are no documented arguments for this event.*
