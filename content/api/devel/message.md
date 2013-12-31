---
title: SIP.MessageContext | SIP.js
---
# SIP.MessageContext

`SIP.MessageContext` represents an instant message using the SIP method MESSAGE. By default, the message is treated as plain text. However, any valid content type may be specified.

* TOC
{:toc}

#### `progress()`

Inherited from [`SIP.ServerContext`]

#### `accept()`

#### `reject()`

#### `reply()`

## Instance Attributes

### `body`

`String` - The body of the SIP message.

### `content_type`

`String` - The content type of the message body.

### `request`

`SIP.OutgoingRequest|SIP.IncomingRequest` - The SIP MESSAGE request associated with this context.

## Instance Method

### `message(options)` *(MessageClientContext Only)*

Send this MESSAGE.

#### Parameters

Name                  | Type               | Description
----------------------|--------------------|--------------
`options`             |`Object`            |Optional `Object` with extra parameters (see below).
`options.extraHeaders`|`Array` of `Strings`|Extra SIP headers for the request.

#### Returns

Type | Description
-----|-------------
`SIP.MessageClientContext`| This MessageClientContext

