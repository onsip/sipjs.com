---
title: SIP.UA | SIP.js
---

# SIP.UA

A user agent (or UA) is associated with a SIP user address and acts on behalf of that user to send and receive SIP requests.  A user agent can register to receive incoming requests, as well as create and send outbound messages.  The user agent also maintains the WebSocket over which its signaling travels.

* TOC
{:toc}

## Construction

A new user agent is created via the `SIP.UA` constructor.  There are no mandatory parameters for creating a new user agent. Check the full list for optional [UA Configuration Parameters](/api/devel/ua_configuration_parameters/).

### Examples

~~~ javascript
// Create a new anonymous user agent, and connect using the OnSIP Network
var myUA = new SIP.UA();
~~~

~~~ javascript
// Create a user agent for Bob, and connect using the OnSIP Network
var myUA = new SIP.UA('bob@example.com');`
~~~

~~~ javascript
// Create a user agent for Bob, and connect using a custom WebSocket server
var bob = new SIP.UA({
  uri: 'bob@example.com',
  ws_servers: ['wss://edge.example.com'],
  register: true
});
~~~

## Generic Methods

### `start()`

Connect to the configured WebSocket server, and restore the previous state if previously stopped. The first time `start()` is called, the UA will also attempt to register if the `register` parameter in the UA's configuration is set to `true`.


### `stop()`

Saves the current registration state and disconnects from the WebSocket server after gracefully unregistering and terminating any active sessions.

### `register([options])`

Register the UA to receive incoming requests.  Upon successful registration, the UA will emit a `registered` event.

#### Parameters

Name | Type | Description
-----|------|-------------
`options`|`Object`|Optional `Object` with extra parameters (see below)
`options.extraHeaders`|`Array`|Optional `Array` of `Strings` with extra SIP headers for each REGISTER request.

#### Returns

Type    | Description
--------|----------------
`SIP.UA`| This user agent

#### Example

~~~ javascript
var options = {
  'extraHeaders': [ 'X-Foo: foo', 'X-Bar: bar' ]
};

myUA.register(options);
~~~

### `unregister([options])`

Unregisters the UA.

#### Parameters

Name | Type | Description 
-----|------|-------------
`options`|`Object`|Optional `Object` with extra parameters (see below).
`options.all`|`Boolean`|Optional `Boolean` for unregistering all bindings of the same SIP user. Default value is `false`.
`options.extraHeaders`|`Array`|Optional `Array` of `Strings` with extra SIP headers for each REGISTER request.

#### Returns

Type | Description
-----|-------------
`SIP.UA`| This user agent

#### Example

~~~ javascript
var options = {
  'all': true,
  'extraHeaders': [ 'X-Foo: foo', 'X-Bar: bar' ]
};

myUA.unregister(options);
~~~

### `isRegistered()`

#### Returns

Type     | Description
---------|-------------
`Boolean`| `true` if the UA is registered, `false` otherwise

### `isConnected()`

#### Returns

Type     | Description
---------|-------------
`Boolean`| `true` if the WebSocket connection is established, `false` otherwise.







## Request Methods

The following methods share a similar interface and are all used to send SIP requests from the UA.

### `message(target, body[, options])`

Sends an instant message making use of SIP MESSAGE method.

#### Parameters

Name | Type | Description 
-----|------|--------------
`target`|`String|SIP.URI`|Destination of the call. `String` representing a destination username or a complete SIP URI, or a [`SIP.URI`](/api/devel/uri/) instance.
`body`|`String`|Message content. `String` representing the body of the message.
`options`|`Object`|Optional `Object` with extra parameters (see below).
`options.contentType`|`String`|Optional `String` representing the content-type of the body. Default `text/plain`.
`options.extraHeaders`|`Array`|Optional `Array` of `Strings` with extra SIP headers for the MESSAGE request.

#### Returns

Type | Description
-----|-------------
`SIP.MessageClientContext`|The context surrounding the newly created MESSAGE

#### Example

~~~ javascript
myUA.message('bob@example.com', 'Hello, Bob!');
~~~


### `invite(target[, options])`

Invite the target to start a multimedia session.

#### Parameters

|Name                      | Type        | Description |
|--------------------------|-------------|-------------|
|`target`                  |`String|SIP.URI`     |Destination of the call. `String` representing a destination username or a complete SIP URI, or a [`SIP.URI`](/api/devel/uri/) instance.|
|`options`                 |`Object`     |Optional `Object` with extra parameters (see below).|
|`options.mediaConstraints`|`Object`     |`Object` with two valid fields (`audio` and `video`) indicating whether the session is intended to use audio and/or video and the constraints to be used. If media constraints are not provided, `{audio: true, video: true}` will be used.|
|`options.mediaStream`     |`MediaStream`|`MediaStream` to transmit to the other end.|
|`options.RTCConstraints`  |`Object`     |`Object` representing RTCPeerconnection constraints|
|`options.extraHeaders`    |`Array`      |Optional `Array` of `Strings` with extra SIP headers for the INVITE request.|
|`options.anonymous`       |`Boolean`    |`Boolean` field indicating whether the call should be done anonymously. Default value is `false`.|

#### Returns

Type | Description
-----|-------------
`SIP.InviteClientContext`|The context surrounding the newly created INVITE

#### Example

~~~ javascript
TBD
~~~

### `request(method, target[, options])`

Send a SIP message.

#### Parameters

Name | Type | Description 
-----|------|--------------
`method`|`String`|The SIP request method to send, e.g. `'INVITE'` or `'OPTIONS'`
`target`|`String|SIP.URI`|Destination address. `String` representing a destination username or a complete SIP URI, or a [`SIP.URI`](/api/devel/uri/) instance.
`body`|`String`|Message content. `String` representing the body of the message.
`options`|`Object`|Optional `Object` with extra parameters (see below).
`options.body`|`String`|Optional `String` to be included as the body of the request
`options.extraHeaders`|`Array`|Optional `Array` of `Strings` with extra SIP headers for the MESSAGE request.

#### Returns

Type | Description
-----|-------------
`SIP.ClientContext`|The context surrounding the newly created request













## Events

User agent objects extend the [SIP.EventEmitter](/api/devel/eventEmitter/) interface.  Each event emitted by UA passes specific relevant arguments to its callbacks.

### `on('connected', function () {})`

Fired when the WebSocket connection is established.

#### Arguments

*There are no documented arguments for this event*

### `on('disconnected', function () {})`

Fired when the WebSocket connection attempt (or automatic re-attempt) fails.

#### Arguments

*There are no documented arguments for this event*

### `on('registered', function () {})`

Fired for a successful registration.

#### Arguments

*There are no documented arguments for this event*

### `on('unregistered', function (cause) {})`

Fired for an unregistration. This event is fired in the following scenarios:

* As a result of a unregistration request. `UA.unregister()`.
* If being registered, a periodic re-registration fails.

#### Arguments

Name | Type | Description 
-----|------|--------------
`cause`||`null` for positive response to un-REGISTER SIP request. In other case, one value of [Failure and End Causes](/api/devel/causes)


### `on('registrationFailed', function (cause) {})`

Fired for a registration failure.

#### Arguments

Name | Type | Description 
-----|------|--------------
`cause`||One value of [Failure and End Causes](/api/devel/causes)


### `on('invite', function (invite) {})`

Fired when an incoming INVITE request is received.

#### Arguments

Name | Type | Description 
-----|------|--------------
`invite`|[SIP.InviteServerContext](/api/devel/invite/)| The context surrounding the recently received INVITE request.


### `on('message', function (message) {})`

Fired when an incoming MESSAGE request is received.

#### Arguments

Name | Type | Description 
-----|------|--------------
`message`|[SIP.MessageServerContext](/api/devel/message/)| The context surrounding the recently received MESSAGE request.
