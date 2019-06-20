---
title: SIP.RegisterContext | SIP.js
description: In SIP.js, a SIP.RegisterContext encapsulates the behavior required to register the UA as well as handle responses, retransmissions, and authentication.
---
# SIP.RegisterContext

`SIP.RegisterContext` encapsulates the behavior required to register the UA as well as handle responses, retransmissions, and authentication. It is typically used from within a [`SIP.UA`](../UA).

* TOC
{:toc}

## Configuration Options

A dictionary of options that is accepted by the RegisterContext. Passed to the UA as [`registerOptions`](../ua_configuration_parameters#registeroptions)

### `expires`
Registration expiry time (in seconds) (`Number`). Default value is `600`.

~~~ javascript
expires: 300
~~~

### `extraContactHeaderParams`
Contact header parameters to include on Register requests.

~~~ javascript
extraContactHeaderParams: ['foo= bar']
~~~

### `instanceId`
`String` indicating the UUID URI to be used as instance ID to identify the UA instance when using GRUU.

~~~ javascript
instanceId: "uuid:8f1fa16a-1165-4a96-8341-785b1ef24f12"
~~~

~~~ javascript
instanceId: "8f1fa16a-1165-4a96-8341-785b1ef24f12"
~~~

### `params`
Advanced configuration options that are typically set automatically by the [`SIP.UA`](../ua). `Object` of various parameters to use on Registration.

### `regId`
`number` indicating what to use as the regId on Register requests. Enabling this without an `instanceId` will generate a random `instanceId`.

### `registrar`
Set the SIP registrar URI. Valid value is a SIP URI without username. Default value is `null` which means that the registrar URI is taken from the uri parameter (by removing the username).

~~~ javascript
registrar: 'sip:registrar.mydomain.com'
~~~

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

## Instance Variables

`SIP.Message` inherits its instance attributes from [`SIP.ClientContext`](../context/client/) or [`SIP.ServerContext`](../context/server/).

## Instance Methods

`SIP.Message` inherits its instance methods from [`SIP.ClientContext`](../context/client/) or [`SIP.ServerContext`](../context/server/).

## Events

`SIP.Message` inherits its events from [`SIP.ClientContext`](../context/client/) or [`SIP.ServerContext`](../context/server/).

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
