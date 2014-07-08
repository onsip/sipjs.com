---
title: SIP Messages | SIP.js
description: SIP.js contains several data structures for representing SIP messages, including OutgoingRequests, IncomingRequests, and IncomingResponses.
---

# SIP Messages

This page describes data structures for SIP packets:  Incoming Messages, Incoming Requests, Incoming Responses, and Outgoing Requests. While each has its own constructor, they share much similar structure, properties, and methods. As such, they are all documented together below.

* TOC
{:toc}

## Instance Attributes

### `logger`

`Logger` - The outlet for log messages.

### `ua`

`SIP.UserAgent` - The local User Agent the message is to or from.

### `headers`

`Object` - The internal data structure for header storage.  Use the getter and setter methods instead of directly accessing this.

### `method`

`String` - The SIP method of the request or response.

### `body`

`String` - The body contained in the SIP message, if present.

### `from`

`SIP.NameAddrHeader` - The From header address of the SIP message.

### `to`

`SIP.NameAddrHeader` - The To header address of the SIP message.

### `call_id`

`String` - The value of the Call-ID header field.

### `cseq`

`String` - The value of the CSeq header field.

### `ruri`

*IncomingRequest and OutgoingRequest only*

`String|SIP.URI` - The requested URI from the first line of the SIP request. For SIP.IncomingRequests, this is a String.  For SIP.OutgoingRequests, it is a SIP.URI.

### `extraHeaders`

*OutgoingRequest only*

`Array` - An array of extra headers to be appended to the request.

### `statusCode`

*OutgoingRequest only*

`Integer` - The status code to include in a Reason header with the request.

### `status_code`

*Incoming Response only*

`Integer` - The status code of the received response.

### `reasonPhrase`

*OutgoingRequest only*

`String` - The reason phrase to include in a Reason header with the request.

### `reason_phrase`

*IncomingResponse only*

`String` - The reason phrase of the received response.

### `data`

*IncomingRequest and IncomingResponse only*

`String` - A raw string representation of the SIP message.

### `via`

*IncomingRequest and IncomingResponse only*

`Object` - The value of the Via header(s) of the SIP message.

### `via_branch`

*IncomingRequest and IncomingResponse only*

`String` - The value of the first Via header's branch parameter.

### `from_tag`

*IncomingRequest and IncomingResponse only*

`String` - The tag parameter of the From header, if present.

### `to_tag`

*IncomingRequest and IncomingResponse only*

`String` - The tag parameter of the To header, if present.

### `transport`

*IncomingRequest only*

`SIP.Transport` - The transport the request was received on, for sending replies.

### `server_transaction`

*IncomingRequest only*

`SIP.Transaction` - The transaction associated with the request.

## Instance Methods

### `setHeader(name, value)`

Sets the value of the header, overwriting any existing header with the same name.

### `addHeader(name, value)`

*IncomingRequest and IncomingResponse only*

Sets the value of the header, appending it to the list of headers with that name.

### `getHeader(name)`

Gets the value of the first header with the given name.

### `getHeaders(name)`

Gets the array of values for the headers with the given name.

### `hasHeader(name)`

Tests for the existence of a given header.

### `parseHeader(name, idx)`

*IncomingRequest and IncomingResponse only. Meant for internal use.*

Parses the given header from a raw string based on the Grammar.

### `s(name, idx)`

*IncomingRequest and IncomingResponse only. Meant for internal use.*

Alias for `parseHeader`.

### `toString()`

Returns the SIP message as a String.

### `reply(code, reason, extraHeaders, body, onSuccess, onFailure)`

*IncomingRequest only.*

Reply to the incoming request.

### `reply_sl(code, reason)`

*IncomingRequest only.*

Reply statelessly to the incoming request, bypassing any server transaction.


<div markdown="1" class="dev">

<!--  Outgoing Request -->

## OutgoingRequest
{: .no_toc}

### Construction
{: .no_toc}

`function (method, ruri, ua, params, extraHeaders, body)`

### Dependencies
{: .no_toc}

* UA.C
* SIP.NameAddrHeader
* SIP.Utils.createRandomToken
* SIP.Utils.headerize
* SIP.C

#### Injected
{: .no_toc}

* UA.getLogger
* UA.configuration.displayName
* UA.configuration.uri
* UA.configuration.sipjsId
* UA.configuration.userAgentString

<!--  Incoming Message -->

## IncomingMessage
{: .no_toc}

### Construction
{: .no_toc}

`function ()`

### Dependencies
{: .no_toc}

* SIP.Utils.headerize
* SIP.Grammar

<!-- Incoming Request -->

## IncomingRequest
{: .no_toc}

### Construction
{: .no_toc}

`function (ua)`

### Dependencies
{: .no_toc}

* SIP.Utils.newTag
* SIP.C

#### Injected
{: .no_toc}

* UA.getLogger
* UA.contact
* UA.configuration.rel100
* Transaction.receiveResponse
* Transport.send

<!-- Incoming Response -->

## IncomingResponse
{: .no_toc}

### Construction
{: .no_toc}

`function (ua)`

### Dependencies
{: .no_toc}

* Injected: UA

</div>
