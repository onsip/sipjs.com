---
title: SIP.Subscription | SIP.js
---
# SIP.Subscription

`SIP.Subscription` represents a subscription to an event (presence or dialog, for example) of a sip address using the SIP SUBSCRIBE request. Currently, only outgoing subscriptions are available, so incoming SUBSCRIBEs will be ignored.

* TOC
{:toc}

## Construction

The Subscription constructor is intended for internal use only. Subscriptions are obtained via the `SIP.UA` [`subscribe`](/api/devel/ua/#subscribe) method.

### Examples

~~~ javascript
//Subscribes to the presence information of alice@example.com
var subscription = myUA.subscribe('alice@example.com', 'presence');

// Once subscribed, receive notifications and print out the presence information
subscription.on('notify', function (notification) {
  console.log(notification.request.body);
});
~~~

## Instance Variables

`SIP.Subscription` inherits some of its instance attributes from [`SIP.ClientContext`](../context/client/).

### `id`

`String` - Once the subscription is confirmed, this string is used to differentiate between subscriptions.

### `state`

`String` - String indicating the current state of the subscription.

### `event`

`String` - The event that will be subscribed to.

### `dialog`

`SIP.Dialog` - The SIP dialog associated with the particular Subscription

### `timers`

`Object` - Keeps track of the two timers associated with this subscription, which are RFC6665-defined TIMER_N and a subscription duration timer.

### `errorCodes`

`Array` of type `Number` - The SIP response codes, defined by RFC 6665, for which a subscription must be considered terminated if they are received.

### `ua`

[`SIP.UA`](../ua/) - Inherited from [`SIP.ClientContext`](../context/client/#ua) or [`SIP.ServerContext`](../context/server/#ua).

### `method`

`String` - The value of `method` is always `"INVITE"`. Inherited from [`SIP.ClientContext`](../context/client/#method) or [`SIP.ServerContext`](../context/server/#method).

### `request`

[`SIP.IncomingRequest`](../incomingMessage/) or [`SIP.OutgoingRequest`](../outgoingRequest/) - Inherited from [`SIP.ClientContext`](../context/client/#request) or [`SIP.ServerContext`](../context/server/#request).

### `localIdentity`

`SIP.NameAddrHeader` - Inherited from [`SIP.ClientContext`](../context/client/#localIdentity) or [`SIP.ServerContext`](../context/server/#localIdentity).

### `remoteIdentity`

`SIP.NameAddrHeader` - Inherited from [`SIP.ClientContext`](../context/client/#remoteIdentity) or [`SIP.ServerContext`](../context/server/#remoteIdentity).

### `data`

`Object` - Empty object for application to define custom data. Inherited from [`SIP.ClientContext`](../context/client/#data) or [`SIP.ServerContext`](../context/server/#data).


## Instance Methods

### `subscribe()`

Sends a SUBSCRIBE request and sets TIMER_N. This is used for the initial SUBSCRIBE as well as all resubscription requests.

#### Returns

Type | Description
-|-
`SIP.Subscription` | This Subscription

### `unsubscribe()`

Sends an unsubscribe request, which is a SUBSCRIBE request with an expires header with value 0.

### `close()`

Unsubscribes this subscription, terminates its dialog, and removes it from the UA's array of subscriptions. This should be used to gracefully remove a Subscription.

## Events

`SIP.Subscription` inherits events from [`SIP.ClientContext`](../context/client/). Each event allows a callback function to be defined in order to let the user execute a handler for each given stimulus.

### `notify`

Whenever a NOTIFY request is received, this event is emitted with the full request.

#### `on('notify', function(request) {})`

Name                  | Type               | Description
----------------------|--------------------|--------------
`request`             |`SIP.IncomingRequest`|The received NOTIFY request.
