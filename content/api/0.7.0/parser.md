---
title: Parser | SIP.js
description: The SIP.js Parser object provides methods for extracting and parsing SIP messages in SIP.js.
---

# SIP.Parser

The Parser object provides methods for extracting and parsing SIP messages.

* TOC
{:toc}

<div markdown="1" class="dev">

## Dependencies
{: .no_toc }

* SIP.Grammar.parse
* SIP.IncomingRequest
* SIP.IncomingResponse

### Injected
{: .no_toc }

#### SIP.UA
{: .no_toc }

* .getLogger

</div>

## Methods

### `parseMessage(data, ua)`

Parses a String representation of a SIP message into a SIP.IncomingRequest or SIP.IncomingResponse.

#### Parameters

Name | Type | Description
-|-|-
`data` | `String` | The SIP message, represented as a String.
`ua` | `SIP.UA` | A SIP user agent to use for logging.

#### Returns

Type | Description
-|-
`SIP.IncomingRequest|SIP.IncomingResponse` | The SIP message, parsed to a SIP.IncomingRequest or SIP.IncomingResponse object.

<div markdown="1" class="dev">

### `getHeader(data, headerStart)`
{: .no_toc }

*Private* From a SIP message, find a header beginning at the designated index.

#### Parameters
{: .no_toc}

Name | Type | Description
-|-|-
`data` | `String` | The entire SIP message string.
`headerStart` | `Integer` | The index in the data String at which to start looking for the header.

#### Returns
{: .no_toc }

Type | Description
-|-
`Integer` | The index in the data String just after the end of the found header.

### `parseHeader(message, data, headerStart, headerEnd)`
{: .no_toc }

*Private* Parse a header and set the corresponding properties on the given SIP message object.

#### Parameters
{: .no_toc}

Name | Type | Description
-|-|-
`message` | `SIP.IncomingRequest|SIP.IncomingResponse` | The message object to populate.
`data` | `String` | The entire SIP message string.
`headerStart` | `Integer` | The index in the data String at which to start parsing the header.
`headerEnd` | `Integer` | The index in the data String at which to end parsing the header.

#### Returns
{: .no_toc }

Type | Description
-|-
`Boolean|Object` | `true` if the header was parsed successfully. Otherwise, an object literal containing an `error` message property. 

</div>
