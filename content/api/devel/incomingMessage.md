---
title: SIP.IncomingMessage | SIP.js
---

# SIP.IncomingMessage

An IncomingMessage is a data structure that represents an incoming SIP message and it's attributes.

* TOC
{:toc}

## Construction

The IncomingMessage constructor is intended for internal use only.

## Instance Attributes

### `data`

`String` - A string representation of the SIP message

### `method`

`String` - The method of the incoming SIP message

### `via`

`Object` - An object containing the VIA information of the SIP message

### `via_branch`

`String` - The name of the VIA branch of the SIP message

### `call_id`

`String` - The Call-ID header on the SIP message

### `cseq`

`Number` - The cseq on the SIP message

### `from`

`SIP.NameAddrHeader` - Instance representing the from header value of the SIP message

### `from_tag`

`String` - The name of the from tag header on the SIP message

### `to`

`SIP.NameAddrHeader` - Instance representing the from header value of the SIP message

### `to_tag`

`String` - The to tag header on the SIP message

### `body`

`String` - The body of the SIP message

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
`String | undefined`| Returns the specified header, undefined if header doesn't exist 

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
`Object | undefined`| The parsed header object or undefined if there is a parsing error or the header is not present.

### `setHeader(name,value)`

Replaces the given header name with the given value.

#### Parameters

Name | Type | Description
-----|------|-------------
`name`|`String`|The name of the SIP header to replace
`value`|`String|Array`|The value to place in the SIP header field

### `toString()`

Returns the data of the message

#### Returns

Type     | Description
---------|-------------
`String`| The message data

#### Example

~~~ javascript
incomingMessage.toString();

'INVITE sip:jl5as9dj@7n93g7oohn8t.invalid;transport=ws;aor=alice%40example.com SIP/2.0
Record-Route: <sip:3ad1a7b505@1.2.3.4:443;transport=wss;lr;ovid=7cb85a5c>
Record-Route: <sip:1.2.3.4:5060;transport=udp;lr;ovid=7cb85a5c>
Via: SIP/2.0/WSS 1.2.3.4:443;branch=z9hG4bK9f901aba80f26a0c9ba3c655711867914bf4c53e;rport
Max-Forwards: 65
From: "Alice" <sip:alice@example.com>;tag=eceN3v52HaQtD
To: <sip:jl5as9dj@7n93g7oohn8t.invalid;transport=ws;aor=bob%40example.com>
Call-ID: fdf5e4d7-ee93-1231-1a94-52540040a380
CSeq: 54012202 INVITE
Contact: <sip:alice@example.com:5060>
Allow: INVITE, ACK, BYE, CANCEL, OPTIONS, MESSAGE, INFO, UPDATE, REGISTER, REFER, NOTIFY
Supported: timer, precondition, path, replaces
Content-Type: application/sdp
Content-Disposition: session
Content-Length: 916

v=0
o=UserAgent 1388671790 1388671791 IN IP4 1.2.3.4
s=UserAgent
c=IN IP4 1.2.3.4
t=0 0
a=msid-semantic: WMS KfiUZ0uBaZEAawCUOatOc6sgJ42dJYwk
m=audio 24742 RTP/SAVPF 0 101
a=rtpmap:101 telephone-event/8000
a=fingerprint:sha-256 24:C2:A8:62:EF:65:E5:C4:F5:77:D9:A1:7F:29:29:3D:D1:53:84:B5:0F:DB:1D:D2:F7:8E:62:7D:10:91:0A:11
a=rtcp:24743 IN IP4 1.2.3.4
a=ssrc:3737708532 cname:3E4TuokvePWfbo0Q
a=ssrc:3737708532 msid:KfiUZ0uBaZEAawCUOatOc6sgJ42dJYwk a0
a=ssrc:3737708532 mslabel:KfiUZ0uBaZEAawCUOatOc6sgJ42dJYwk
a=ssrc:3737708532 label:KfiUZ0uBaZEAawCUOatOc6sgJ42dJYwka0
a=ice-ufrag:pkurgNxQHpUhegr7
a=ice-pwd:KmQ5A1rFGdKIsAoH
a=candidate:8521483177 1 udp 659136 1.2.3.4 24742 typ host generation 0
a=candidate:8521483177 2 udp 659136 1.2.3.4 24743 typ host generation 0
a=crypto:1 AES_CM_128_HMAC_SHA1_80 inline:q6Nvw6KpcRJEsGYf71U9lsB0a+d6nq/ZtC068SHF
a=ptime:20
'
~~~
