---
title: Transport | SIP.js
description: TODO
---

# SIP.Transport

The transport layer is responsible for the actual transmission of requests
and responses over network transports. For SIP.js, this includes maintaining the WebSocket connection, as well as sending and receiving SIP requests and responses over the WebSocket.

* TOC
{:toc}

<div markdown="1" class="dev">

## Dependencies
{: .no_toc }

* SIP.Parser.parseMessage
* SIP.IncomingRequest
* SIP.IncomingResponse
* SIP.sanityCheck
* SIP.UA.C
* WebSocket

### Injected
{: .no_toc }

#### SIP.UA
{: .no_toc }

* .getLogger
* .transport
* .status
* .emit
* .onTransportConnecting
* .onTransportConnected
* .onTransportClosed
* .onTransportError
* .receiveRequest
* .transactions.{ict,nict}
* .configuration.traceSip
* .configuration.wsServerMaxReconnection
* .configuration.wsServerReconnectionTimeout
* WebSocket server

#### wsServer
{: .no_toc }

* .ws_uri

</div><!-- end dev -->


## Construction

The construction of a transport is not meant to be done manually. Instead, SIP.js user agents create a transport to use for themselves. The UA is passed in so that incoming messages may be routed to the appropriate transactions for processing.

When constructed, the new Transport will assign itself as the UA's transport property before automatically attempting to connect to the designated WebSocket server.

## Instance Attributes

### `logger`

`Logger` - The outlet for log messages.

### `ua`

`SIP.UA` - The UA using the transport

### `ws`

`WebSocket` - The WebSocket used for sending and receiving messages.

### `server`

`Object` - The wsServer object the transport connects to, from the UA
configuration.

### `reconnection_attempts`

`Integer` - The number of times the Transport has attempted to reconnect in
event of error.

### `closed`

`Boolean` - Whether or not the UA has requested the Transport be closed.

### `connected`

`Boolean` - Whether or not the WebSocket connection is open.

### `reconnectTimer`

`Integer` - Global timer ID used to track time between reconnection attempts.

### `lastTransportError`

`Object` - When the WebSocket is closed, any error condition gets stored here.




## Instance Methods





### `send(msg)`

Send a message along the WebSocket

#### Parameters

Name | Type | Description
-|-|-
`msg` | `SIP.OutgoingRequest|String` | A SIP Request (represented as a String or [SIP.OutgoingRequest](#TODO)) to send along the WebSocket.

#### Returns

`Boolean` - `true` if the WebSocket is open for sending. Otherwise, `false`

### `connect()`

Create and open a new WebSocket connection to the configured WebSocket server.

### `disconnect()`

Disconnect from the WebSocket and cancel any reconnection attempts.

### `reConnect()`

*Internal* Reconnect to the WebSocket in the event of unexpected disconnection. This will attempt to reconnect up to [`ua.configuration.wsServerMaxReconnection`](#TODO) times, with a gap of [`ua.configuration.wsServerReconnectionTimeout`](#TODO) seconds between each request.

### `onOpen()`

*Internal* This method is called when the WebSocket is opened. Its primary purpose is to clear the reconnection attempts and notify the UA.

### `onClose()`

*Internal* This method is called when the WebSocket is closed. Its primary purpose is to notify the UA and attempt to reconnect if necessary.

### `onMessage()`

*Internal* This method is called when a message is received from the WebSocket. It parses the SIP message, runs sanity checks, and passes it to the UA (for requests) or transaction (for responses) for processing.

### `onError()`

*Internal* Logs an error when the WebSocket errors. Errors typically also disconnect the WebSocket, so no extra handling is done here.
