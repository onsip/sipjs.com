---
title: SIP.ReferClientContext | SIP.js
description: In SIP.js, a SIP.ReferClientContext encapsulates the behavior required to send a refer, as well as handle responses and retransmissions of that refer.
---
# SIP.ReferClientContext

A `SIP.ReferClientContext` encapsulates the behavior required to send a refer, as well as handle responses and retransmissions of that request. It is typically used from within a [`SIP.Session`](../../session/), but can be used on it's own to send an out of dialog refer.

* TOC
{:toc}

## Construction

Typically, construction and sending of a ReferClientContext is managed by a `SIP.Session`, through the `session.refer(target, options)` function. However, advanced users may construct ReferClientContexts manually.

### `new SIP.ReferClientContext(ua, applicant, target[, options])`

#### Parameters

Name | Type | Description
-----|------|-------------
ua | `SIP.UA` | The user agent from which the request will be sent.
applicant | `Object|SIP.Session` | The applicant that is sending the refer. For in dialog refers, this is a session.
target | `String|SIP.URI` | The destination URI for the request to send to.
options| `Object` | Optional options to use for the `ReferClientContext`

## Instance Methods

### `refer([options])`

Send the request. A constructed `SIP.ReferClientContext` will not send itself until this or a similar method is called. This takes an optional `options` argument.

#### Parameters

Name | Type | Description
-----|------|-------------
`options`|`Object`|Optional `Object` with extra parameters (see below).
`options.extraHeaders`|`Array` of `String`|Optional list of extra SIP headers to include with the request
`options.receiveResponse`|`function`| Called with the response of the `Refer`

#### Returns

Type | Description
-|-
`SIP.ReferClientContext`| This ReferClientContext

<!--
### `receiveNotify(request)`

Used to process a received notify for a Refer.

#### Parameters

Name | Type | Description
-----|------|--------------
`request`|[`SIP.IncomingRequest`](../sipMessage/)|Instance of the received SIP REFER request.
-->

## Events

### `referRequestAccepted`

Fired after a 2XX response is received for a `REFER`.

#### `on('referRequestAccepted', function (referClientContext) {})`

Name | Type | Description
-----|------|------------
`referClientContext`|`SIP.ReferClientContext|This ReferClientContext`

### `referRequestRejected`

Fired when a 4XX, 5XX, or 6XX response is received for a `REFER`.

#### `on('referRequestRejected', function (referClientContext) {})`

Name | Type | Description
-----|------|------------
`referClientContext`|`SIP.ReferClientContext|This ReferClientContext`

### `referProgress`

Fired when the `REFER` is progressing on the target. A `NOTIFY` with a 1XX `sipfrag` has been received.

#### `on(referProgress, function(referClientContext) {})`

Name | Type | Description
-----|------|------------
`referClientContext`|`SIP.ReferClientContext|This ReferClientContext`

### `referAccepted`

Fired when the `REFER` is accepted on the target. A `NOTIFY` with a 2XX `sipfrag` has been received

#### `on('referAccepted', function (referClientContext) {})`

Name | Type | Description
-----|------|------------
`referClientContext`|`SIP.ReferClientContext|This ReferClientContext`

### `referRejected`

Fired when the `REFER` is rejected on the target. A `NOTIFY` with 4XX, 5XX, or 6XX `sipfrag` has been received.

#### `on('referRejected', function (referClientContext) {})`

Name | Type | Description
-----|------|------------
`referClientContext`|`SIP.ReferClientContext|This ReferClientContext`

### `notify`

Fired every time a `NOTIFY` is received for a `REFER`.

#### `on('notify', function (request) {})`

Name | Type | Description
-----|------|--------------
`request`|[`SIP.IncomingRequest`](../sipMessage/)|Instance of the received SIP REFER request.
