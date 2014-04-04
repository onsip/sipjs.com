---
title: SIP.Message for WebRTC apps| SIP.js
description: In SIP.js, a SIP.Message represents an instant message using the SIP MESSAGE request.
---
# SIP.Message

`SIP.Message` represents an instant message using the SIP MESSAGE request. By default, the message is treated as plain text. However, any valid content type may be specified.

* TOC
{:toc}

## Construction

The Message constructor is intended for internal use only. Instead, outbound Messages are created through the [`SIP.UA.message`](/api/0.5.0/ua/#messagetarget-body-options) method. Inbound Messages are obtained via the `SIP.UA` [`message`](/api/0.5.0/ua/#message) event callback.

### Examples

~~~ javascript
// Sends a new message
myUA.message('alice@example.com', 'Hello Alice!');
~~~

~~~ javascript
// When receiving a message, prints it out
myUA.on('message', function (message) {
  console.log(message.body);
});
~~~

## Instance Attributes

`SIP.Message` inherits its instance attributes from [`SIP.ClientContext`](/api/0.5.0/context/client/) or [`SIP.ServerContext`](/api/0.5.0/context/server/).

## Instance Methods

`SIP.Message` inherits its instance methods from [`SIP.ClientContext`](/api/0.5.0/context/client/) or [`SIP.ServerContext`](/api/0.5.0/context/server/).

## Events

`SIP.Message` inherits its events from [`SIP.ClientContext`](/api/0.5.0/context/client/) or [`SIP.ServerContext`](/api/0.5.0/context/server/).

<!--

### `message(options)` *(Client Only)*

Send this MESSAGE.

#### Parameters

Name                  | Type               | Description
----------------------|--------------------|--------------
`options`             |`Object`            |Optional `Object` with extra parameters (see below).
`options.extraHeaders`|`Array` of `Strings`|Extra SIP headers for the request.

#### Returns

Type | Description
-----|-------------
`SIP.Message`| This Message

-->

