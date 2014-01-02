---
title: SIP.ClientContext | SIP.js
---
# SIP.ClientContext

A `SIP.ClientContext` encapsulates the behavior required to send a request, as well as handle responses and retransmissions of that request. It is typically mixed in with behavior from a method-specific context, such as [`SIP.InviteContext`](/api/devel/invite/) or [`SIP.MessageContext`](/api/devel/message/).

* TOC
{:toc}

## Construction

Typically, construction and sending of a ClientContext is managed by a `SIP.UA`, through either the `ua.request(method, target)` function or through SIP method-specific functions such as `ua.invite(target)`. However, advanced users may construct ClientContexts manually.

### `new SIP.ClientContext(ua, method, target)`

#### Parameters

Name | Type | Description
-----|------|-------------
ua | `SIP.UA` | The user agent from which the request will be sent.
method | `String` | The SIP method to use on the request. For example, `INFO` or `OPTIONS`
target | `String|SIP.URI` | The destination URI for the request to send to.

## Instance Attributes

### `ua`

`SIP.UA` - The user agent from which the request was sent or will be sent.

### `method`

`String` - The SIP method of the request. For example, `"INVITE"` or `"MESSAGE"`.

### `target`

`String` - The requested URI destination for the SIP message.

### `data`

`Object` - An empty object.  Define custom application data here. *Note: SIP.js may overwrite any custom attributes defined outside of the data object.*




## Instance Methods

### `send([options])`

Send the request. A constructed `SIP.ClientContext` will not send itself until this or a similar method is called. This method does not run any custom behavior outside of the default handling of the SIP request. For request methods with their own context objects, please use the method-specific functions for sending requests defined on those objects. (For example, [`SIP.InviteClientContext`](/api/devel/invite/#inviteoptions) uses its `.invite()` method to send itself.)

#### Parameters

Name | Type | Description
-----|------|-------------
`options`|`Object`|Optional `Object` with extra parameters (see below).
`options.body`|`String`|Optional message body to send in the request
`options.extraHeaders`|`Array` of `String`|Optional list of extra SIP headers to include with the request
`options.params`|`Object`|Optional extra configuration parameters (see below). These parameters take priority over the SIP.UA configuration parameters.
`options.params.route_set`|`Array` of `String`|Optional preloaded route set for the request.
`options.params.to_display_name`|`String`|Optional display portion of SIP To: URI
`options.params.to_uri`|`String`|Optional To: URI. By default, this is set to the target.
`options.params.to_tag`|`String`|Optional To: tag.
`options.params.from_display_name`|`String`|Optional display portion of SIP From: URI
`options.params.from_uri`|`String`|Optional From: URI. By default, this is set to the UA's configured URI
`options.params.from_tag`|`String`|Optional From: tag
`options.params.call_id`|`String`|Optional Call-Id value. Otherwise, a new Call-Id is randomly generated.
`options.params.cseq`|`String`|Optional CSeq number.  Otherwise, a new random CSeq is generated

#### Returns

Type | Description
-|-
`SIP.ClientContext`| This ClientContext

## Events

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

