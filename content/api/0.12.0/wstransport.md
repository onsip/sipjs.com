---
title: Transport | SIP.js
description: SIP.js Transport provides a transport layer for SIP over WebSocket connections.
---

# WebSocket Transport

This is the default implementation of SIP.Transport for SIP.js. It handles transmission and receipt of SIP requests and responses over a WebSocket connection. This class inherits from [`SIP.Transport`](../transport).

* TOC
{:toc}


## Configuration Options

A dictionary of options that is accepted by the WebSocket Transport. Passed to the UA as [`transportOptions`](../ua_configuration_parameters#transportoptions)

### `wsServers`

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

### `connectionTimeout`
Maximum time (`Number`) in seconds for WebSocket initial connection. Default value is 5.

~~~ javascript
connectionTimeout: 5
~~~

### `maxReconnectionAttempts`
`Number` of times to attempt to reconnect to a WebSocket when the connection drops. The default value is 3.

~~~ javascript
maxReconnectionAttempts: 3
~~~

### `reconnectionTimeout`
The time (`Number`) in seconds to wait between WebSocket reconnection attempts. The default timeout is 4 seconds.

~~~ javascript
reconnectionTimeout: 4
~~~

### `keepAliveInterval`
The time (`Number`) in seconds to wait in between CLRF keepAlive sequences are sent. The default is 0.

~~~ javascript
keepAliveInterval: 0
~~~

### `keepAliveDebounce`
The time (`Number`) in seconds to debounce sending CLRF keepAlive sequences by. The default is 10.

~~~ javascript
keepAliveInterval: 10
~~~

### `traceSip`
Indicate whether incoming and outgoing SIP request/responses must be logged in the browser console (`Boolean`). Default value is `false`.

~~~ javascript
traceSip: true
~~~

## State Diagram

The following diagram indicates the states and state transitions that the WebSocket transport can make.

<img src="/shared/img/transport-state-diagram.png" alt="State Diagram" />

## Instance Variables

### `logger`

`Logger` - The outlet for log messages.

### `configuration`

`Object` - The configuration options that have been loaded for the class

### `ws`

`WebSocket` - The WebSocket used for sending and receiving messages.

### `server`

`Object` - The wsServer object the transport connects to; comes from the
configuration.

### `connectionTimer`

`Integer` - Global timer ID used to track time taken for connection.

### `connectionPromise`

`Promise` - The promise from when `connect()` is called

### `reconnectionAttempts`

`Integer` - The number of times the Transport has attempted to reconnect in
event of error.

### `reconnectTimer`

`Integer` - Global timer ID used to track time between reconnection attempts.

### `transportRecoveryAttempts`

`Integer` - The number of times the Transport has attempted to recover

### `transportRecoveryTimer`

`Integer` - Global timer ID used to track time between recovery attempts.

### `keepAliveInterval`

`Integer` - Global timer ID used to track time between keepAlive messages

### `keepAliveDebounceTimeout`

`Integer` - Global timer ID used to debounce keepAlive messages

### `lastTransportError`

`Object` - When the WebSocket is closed, any error condition gets stored here.

### `status`

`Integer` - Indicates the connection state of the transport. See constants for list of valid statuses.


## Instance Methods

### `sendPromise()`

*Internal* Contains message sending logic - instantiates a `WebSocket` and sets up listeners on it

##### Parameters
`msg` - `String` &#124; `SIP.OutgoingRequest` - A SIP Request to send on the WebSocket

`options` (optional) - `Object` with parameters:

Name | Mandatory? | Type | Description
-----|------------|------|------------
`force` | No | Boolean | Whether or not to force status assertions and/or transitions


#### Returns
`Promise` - resolves with an `Object` with parameters:

Name | Type | Value | Description
-----|------|-------|------------
`msg`|String||The message that was just sent
`overrideEvent`| Boolean | True | Whether or not to emit the default event at resolution time. This implementation emits the event in `onOpen()`.



### `connectPromise()`

*Internal*

Contains connection logic - instantiates a `WebSocket` and sets up listeners on it. Will change the Transport state from `CLOSED` to `CONNECTING`.

##### Parameters
`options`(optional) - `Object` with parameters:

Name | Mandatory? | Type | Description
-----|------------|------|-------
`force`| No |Boolean | Whether or not to force status assertions and/or transitions


#### Returns
`Promise` - resolves with an `Object` with parameters.

Resolves when the `state` is `OPEN`. Rejects when the connection cannot be opened.

Name | Type | Value | Description
-----|------|-------|------------
`overrideEvent`| Boolean | True | Whether or not to emit the default event at resolution time. This implementation emits the event in `onOpen()`.


### `onOpen()`
{: .no_toc }
*Internal* This method is called when the WebSocket is opened. Its primary purpose is to clear the reconnection attempts and propagate a `connected` event.

##### Parameters

Name | Type | Description
-----|------|-------------
`resolve`| Function | A promise resolution to call- from `connectPromise()`


### `disconnectionPromise()`

*Internal*

Contains disconnection logic - closes the `WebSocket`. Will change the Transport state from `OPEN` to `CLOSED`.

##### Parameters
`options`(optional) - `Object` with parameters:

Name | Mandatory? | Type | Description
-----|------------|------|-------
`force`| No |Boolean | Whether or not to force status assertions and/or transitions
`code` |No| Number | A numeric value indicating the status code explaining why the connection has been closed.
`reason` |No| String | A human-readable string explaining why the connection has been closed.


#### Returns
`Promise` - resolves with an `Object` with parameters.

Resolves when the `state` is `CLOSED`. Rejects when in the connection cannot be closed.

Name | Type | Value | Description
-----|------|-------|------------
`overrideEvent`| Boolean | True | Whether or not to emit the default event at resolution time. This implementation emits the event in `onClose()`.

### `onClose()`
{: .no_toc }

*Internal* This method is called when the WebSocket is closed. Its primary purpose is to propagate a `disconnected` event and attempt to reconnect if necessary.

### `onMessage()`
{: .no_toc }

*Internal* This method is called when a message is received from the WebSocket. It parses the SIP message, runs sanity checks, and passes it to the UA (for requests) or transaction (for responses) for processing.

### `onError()`
{: .no_toc }

*Internal* Logs an error and emits a `transportError` event. Errors typically also disconnect the WebSocket, so no extra handling is done here.

### `reconnect()`

*Internal* Reconnect to the WebSocket server in the event of unexpected disconnection. This will attempt to reconnect up to [`configuration.maxReconnectionAttempts`](../ws_transport_configuration_parameters/#maxreconnectionattempts) times, with a gap of [`configuration.reconnectionTimeout`](../ws_transport_configuration_parameters/#reconnectiontimeout) seconds between each request.

### `resetServerErrorStatus()`

Resets the error status of all the servers defined in the configuration. Called at the end of all reconnection logic to bring things back to a clean state.

### `getNextWsServer()`

*Internal* Picks the next WebSocket server from `configuration.wsServers` and returns it. Priority is based on given weight (see [`configuration.wsServers`](../ws_transport_configuration_parameters/#wsservers)) and whether the server has been marked as error

#### Returns
`Object` a WsServer configuration object (not to be confused with a `WebSocket`)

### `noAvailableServers()`

*Internal* Checks all WebSocket servers defined in `configuration.wsServers` for their error state. Returns true if all servers have property `isError` set to `true`.

#### Returns
`Boolean` - `true` if there are no available servers, `false` otherwise

### `disposeWs()`
{: .no_toc }

*Internal* Removes all event listeners and then then sets the instance property `this.ws` to null.

### `sendKeepAlive()`

*Internal* Sends a double CLRF sequence on the websocket. Is debounced by `keepAliveTimeout`, which is also set in this function. Configurable by [`configuration.keepAliveDebounce`](../ws_transport_configuration_parameters/#keepalivedebounce)

#### Returns
`Promise`, an invocation of `send()`

### `clearKeepAliveTimeout()`

*Internal* Clears the `keepAliveTimeout` from the global timer provider and sets the instance parameter to null

### `startSendingKeepAlives()`

*Internal* Sets up an interval to call `sendKeepalive()` periodically. Configurable by `configuration.keepAliveInterval`

### `stopSendingKeepAlives()`

*Internal* Clears the keepAlive interval from the global timer provider and sets the instance parameter to null. Also clears the outstanding `keepAliveTimeout`

### `statusAssert()`

*Internal* Checks the current status against the given status for equality, returns true if they are and false if they are not. Can be bypassed by using the `force` parameter and will always return true, using `force` will generate warning-level log messages.

#### Parameters

Name | Type | Description
-----|------|-------------
`status`| Boolean | The status to check
`force` | Boolean | Whether or not to bypass the assertion


#### Returns
`Boolean` - `true` if the given status is equal to the current status, `false` otherwise

### `statusTransition()`

*Internal* Safely transitions the status by checking with `statusAssert()`. Can be forced using the `force` parameter. Only allows certain transitions:

#### Parameters

Name | Type | Description
-----|------|-------------
`status`| Boolean | The status to transition to
`force` | Boolean | Whether or not to bypass the assertion

#### Allowed Transitions

Start Status || Destination Status
-------------||-------------------
`STATUS_CONNECTING` | => | `STATUS_OPEN`
`STATUS_OPEN` | => | `STATUS_CLOSING`
`STATUS_CLOSING` | => | `STATUS_CLOSED`

#### Returns
`Boolean` - `true` if the transition was successful and `false` otherwise
