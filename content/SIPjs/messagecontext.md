---
title: SIP.MessageContext | SIP.js
---
# Class `SIP.MessageContext`

SIP.js SIP MESSAGE based IM.

* TOC
{:toc}

## Instance Attributes

### `local_identity`

SIP.NameAddrHeader instance indicating the local identity.

### `remote_identity`

SIP.NameAddrHeader instance indicating the remote identity.

## Instance Method (Client)

### `message(options)`

Send a MESSAGE through the WebSocket connection.

#### Parameters

Name | Type | Description
-----|------|--------------
`options`|`Object`|Optional `Object` with extra parameters (see below).

#### Fields in <code>options</code> Object

Name | Type | Description
-----|------|--------------
`extraHeaders`|`Array` of `Strings`|Extra SIP headers for the request.
body`|`String`|represents the SIP message body (in case this parameter is set, a corresponding Content-Type header field must be set in `extraHeaders` field).