---
title: SIP.IncomingMessage | SIP.js
---

# SIP.IncomingMessage

An IncomingMessage is an Object that holds an Incoming Message for the UA.  An IncomingMessage can receive messages through the WebSocket maintained by the UA.

* TOC
{:toc}

## Construction

The IncomingMessage constructor is intended for internal use only.

## Instance Attributes

### `data`

`Object` - The data portion of the incoming SIP message

### `headers`

`Object` - Headers.

### `method`

`String` - The method of the incoming SIP message

### `via`

`String` - The sip via header on the incoming SIP message

### `via_branch`

`String` - The sip via branch header on the incoming SIP message

### `call_id`

`String` - The call id header on the incoming SIP message

### `cseq`

`String` - The cseq header on the incoming SIP message

### `from`

`String` - The from header on the incoming SIP message

### `from_tag`

`String` - The from tag header on the incoming SIP message

### `to`

`String` - The to header on the incoming SIP message

### `to_tag`

`String` - The to tag header on the incoming SIP message

### `body`

`String` - The body of the incoming SIP message

## Instance Methods

### `addHeader(name,value)`

Inserts a header with the given name and value into the last position of the header array

#### Parameters

Name | Type | Description
-----|------|-------------
`name`|`String`|The name of the SIP header to add
`value`|`String`|The value to place in the SIP header field

### `getHeader(name)`

Gets the value of the given header name.

#### Parameters

Name | Type | Description
-----|------|-------------
`name`|`String`|The name of the SIP header to get the value of

#### Returns

Type    | Description
--------|----------------
`String|undefined`| Returns the specified header, undefined if header doesn't exist 

### `getHeaders(name)`

Gets the header(s) of the given name.

#### Parameters

Name | Type | Description
-----|------|-------------
`name`|`String`|The name of the SIP header to get

#### Returns

Type    | Description
--------|----------------
`Array`| All of the headers of the specified name

### `hasHeader(name)`

Verify the existence of the given header name

#### Parameters

Name | Type | Description 
-----|------|-------------
`name`|`String`|The name of the SIP header to verify

#### Returns

Type | Description
-----|-------------
`boolean`| `true` if the header with the given name exists, `false` otherwise

### `parseHeader(name[,idx])`

Parses the given header on the given index.

#### Parameters

Name | Type | Description 
-----|------|-------------
`name`|`String`|Name of the SIP header to parse
`idx`|`Number`|Optional `Number` header index to parse

#### Returns

Type     | Description
---------|-------------
`Object|undefined`| The parsed header object or undefined if there is a parsing error or the the header is not present.

### `setHeader(name,value)`

Replaces the given header name with the given value.

#### Parameters

Name | Type | Description
-----|------|-------------
`name`|`String`|The name of the SIP header to replace
`value`|`String|Array`|The value of to place in the SIP header field

### `toString()`

Returns the data of the message

#### Returns

Type     | Description
---------|-------------
`String`| The message data
