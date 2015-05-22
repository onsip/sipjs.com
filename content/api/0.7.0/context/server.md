---
title: SIP.ServerContext | SIP.js
description: In SIP.js, a SIP.ServerContext encapsulates the behavior required to receive and send replies to a request.
---
# SIP.ServerContext

A `SIP.ServerContext` encapsulates the behavior required to receive and send replies to a request.  It is typically mixed in with behavior from a method-specific class, such as [`SIP.Session`](../../session/) or [`SIP.Message`](../../message/).

* TOC
{:toc}

<!--
## Construction

Typically, construction of a ServerContext is managed by a `SIP.UA` and happens automatically upon receipt of a new incoming request. However, advanced users may construct ServerContexts manually.

### `new SIP.ServerContext(ua, request)`

#### Parameters

Name | Type | Description
-|-|-
ua | `SIP.UA` | The user agent that received the request.
request | `SIP.IncomingRequest` | The request received.

-->

## Instance Attributes

### `ua`

[`SIP.UA`](../../ua/) - The user agent which received the request.

### `method`

`String` - The SIP method of the request. For example, `"INVITE"` or `"MESSAGE"`.

### `request`

[`SIP.IncomingMessage`](../../sipMessage/) - The request received.

### `localIdentity`

[`SIP.NameAddrHeader`](../../nameAddrHeader/) - The To header field value, representing the local endpoint. This is typically the URI of the UA as a `SIP.NameAddrHeader`.

### `remoteIdentity`

[`SIP.NameAddrHeader`](../../nameAddrHeader/) - The From header field value, representing the remote endpoint.

### `data`

`Object` - An empty object.  Define custom application data here. *Note: SIP.js may overwrite any custom attributes defined outside of the data object.*



## Instance Methods

### `progress([options])`

Send a provisional (100-199) response. By default, `progress` will send a `180 Ringing` response with no body.

#### Parameters

Name | Type | Description
-|-|-
`options`|`Object`|Optional `Object` with extra parameters (see below).
`options.statusCode`|`Number`|Optional SIP response code between 100 and 199 to be used in the reply. By default, 180 will be used.
`options.reasonPhrase`|`String`|Optional SIP description of the response code. If not specified, the reason phrase for the response code from SIP.C.REASON_PHRASE will be used, or the empty string.
`options.extraHeaders`|`Array` of `String`|Optional list of extra headers to be added to the response.
`options.body`|`String`|Optional body to include with the response.

#### Returns

Type | Description
-|-
`SIP.ServerContext`|This server context.

### `accept([options])`

Send a successful (200-299) response. By default, `accept` will send a `200 OK` response with no body.

#### Parameters

Name | Type | Description
-|-|-
`options`|`Object`|Optional `Object` with extra parameters (see below).
`options.statusCode`|`Number`|Optional SIP response code between 200 and 299 to be used in the reply. By default, 200 will be used.
`options.reasonPhrase`|`String`|Optional SIP description of the response code. If not specified, the reason phrase for the response code from SIP.C.REASON_PHRASE will be used, or the empty string.
`options.extraHeaders`|`Array` of `String`|Optional list of extra headers to be added to the response.
`options.body`|`String`|Optional body to include with the response.

#### Returns

Type | Description
-|-
`SIP.ServerContext`|This server context.

### `reject([options])`

Send a failure (300-699) response. By default, `reject` will send a `480 Temporarily Unavailable` response with no body.

#### Parameters

Name | Type | Description
-|-|-
`options`|`Object`|Optional `Object` with extra parameters (see below).
`options.statusCode`|`Number`|Optional SIP response code between 300 and 699 to be used in the reply. By default, 480 will be used.
`options.reasonPhrase`|`String`|Optional SIP description of the response code. If not specified, the reason phrase for the response code from SIP.C.REASON_PHRASE will be used, or the empty string.
`options.extraHeaders`|`Array` of `String`|Optional list of extra headers to be added to the response.
`options.body`|`String`|Optional body to include with the response.

#### Returns

Type | Description
-|-
`SIP.ServerContext`|This server context.

### `reply([options])`

Send any (100-699) response. `reply` does not have default settings and will fail without a specified status code.

#### Parameters

Name | Type | Description
-|-|-
`options`|`Object`|`Object` with extra parameters (see below).
`options.statusCode`|`Number`|SIP response code between 100 and 699 to be used in the reply.
`options.reasonPhrase`|`String`|Optional SIP description of the response code. If not specified, the reason phrase for the response code from SIP.C.REASON_PHRASE will be used, or the empty string.
`options.extraHeaders`|`Array` of `String`|Optional list of extra headers to be added to the response.
`options.body`|`String`|Optional body to include with the response.

#### Returns

Type | Description
-|-
`SIP.ServerContext`|This server context.






## Events

### `progress`

Fired each time a provisional (100-199) response is sent.

#### `on('progress', function (response, cause) {})`

Name | Type | Description
-----|------|------------
`response`|[`SIP.IncomingMessage`](../../sipMessage)|The sent response
`cause`|`String`|The SIP cause of the event

### `accepted`

Fired each time a successful final (200-299) response is sent.

#### `on('accepted', function (response, cause) {})`

Name | Type | Description
-----|------|------------
`response`|`String`| The SIP message sent
`cause`|`String`|The SIP cause of the event

### `rejected`

Fired each time an unsuccessful final (300-699) response is sent. *Note: This will also emit a `failed` event.*

#### `on('rejected', function (response, cause) {})`

Name | Type | Description
-----|------|------------
`response`|[`SIP.IncomingMessage`](../../sipMessage)|The sent response
`cause`|`String`|The SIP cause of the event

### `failed`

Fired when the request fails, whether due to an unsuccessful final response or due to timeout, transport, or other error.

#### `on('failed', function (response, cause) {})`

Name | Type | Description
-----|------|------------
`response`|[`SIP.IncomingMessage`](../../sipMessage)|The received response, on a non SIP related failure this will be null
`cause`|`String`|The SIP cause of the event

