---
title: SIP.MessageContext | SIP.js
---
# SIP.MessageContext

SIP.js SIP MESSAGE based IM.

* TOC
{:toc}

## Inherited Methods

### From ServerContext *(MessageServerContext Only)*

#### `progress()`

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

