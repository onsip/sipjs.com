---
title: SIP.PublishClientContext | SIP.js
description: In SIP.js, a SIP.PublishClientContext encapsulates the behavior required to send a refer, as well as handle responses and retransmissions of that refer.
---
# SIP.PublishClientContext

A `SIP.PublishClientContext` encapsulates the behavior required to send a SIP publish event as outlined in [RFC 3903](https://www.ietf.org/rfc/rfc3903.txt). Currently only outgoing publish requests are supported, hence you will not find a `PublishServerContext`.

* TOC
{:toc}

## Construction

Typically, construction and sending of a PublishClientContext is managed by a `SIP.UA`, through the `ua.publish(target, event, body[, options])` function.

#### Parameters

Name | Type | Description
-----|------|-------------
target | `String` &#124; `SIP.URI` | The destination URI for the request to send to.
event | `String` | The event to publish
body | `String` | The body for the request
options| `Object` | Optional options to use for the `PublishClientContext`, see below

## Instance Attributes

### event

`string`, event to publish

### target

`string` | `SIP.URI`, request target

### body

 `string`, request body to send with publish

### options

`object`, optional. Object with extra parameters, see below

### options.extraHeaders

`array`, optional. Array of strings with extra SIP headers to add with publish/unpublish requests

### options.contentType

`string`, optional. Content-Type header representing body content type. Default is 'text/plain'

### options.expires

`int`, optional. Default expire value for the published event. If not set, default value 3600 is used

### options.unpublishOnClose

`boolean`, optional. If set true, UA will gracefully unpublish for the event on UA close. Default value is true.

## Instance Methods

### `publish([body])`
publish the event state. Used for updating the current state for the event or to restore the publish after the unpublish was called. When no body provided, existing state is refreshed ( no need to do this manually, as state will be refreshed periodically on 0.9 * Expire intervals)

### `unpublish()`
removes published event

### `close()`
removes published event and UA internal pointer to the object

### `sendPublishRequest()`
*Internal* Is called by `publish()`, this function is what actually sends the request via `SIP.OutgoingRequest`

### `receiveResponse()`
*Internal* Handles the response by the Event State Compositor (see [RFC 3903](https://www.ietf.org/rfc/rfc3903.txt))

## Events

`published` Fired for a publish request success (2xx response received on PUBLISH request)
```
.on('published', function (response, cause) {});
```

`unpublished` Fired for a unpublish request success or for a periodic publish refresh failure
```
.on('unpublished', function (response, cause) {});
```

`progress` Fired for a publish/unpublish request progress. This event indicate session progress state (1xx response received) or recovering after the 412 or 423 responses
```
.on('progress', function (response, cause) {});
```

`failed` Fired for a publish request failure or on a periodic publish refresh failure
```
.on('failed', function (response, cause) {});
```
