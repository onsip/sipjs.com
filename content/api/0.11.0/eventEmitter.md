---
title: SIP.EventEmitter | SIP.js
description: In SIP.js, SIP.EventEmitter provides an interface for managing event callbacks, via on() and removeListener() methods, as well as triggering those events, via emit().
---

# SIP.EventEmitter

SIP.EventEmitter provides an interface for managing event callbacks (via `on()` and `removeListener()` methods), as well as triggering those events (via `emit()`).

### Example

~~~ javascript
// A SIP.js user agent implements the SIP.EventEmitter interface
myUA = new SIP.UA();

myUA.on('invite', function foo(session) {
    session.accept();
});

// Incoming invites will trigger foo() to be called

myUA.removeListener('invite', foo);

// Incoming invites will not trigger foo() to be called
~~~

* TOC
{:toc}

## Construction

The EventEmitter constructor is intended *for internal use only.*

## Instance Methods

### `on(event, callback)`

Register a method to be called each time a particular event is emitted.

#### Parameters

Name | Type | Description
-----|------|-------------
`event`|`String`|The event which must be emitted to trigger the callback
`callback`|`Function`|The callback to be called when the event is emitted
`bindTarget`|`Object`|*(Removed in 0.7.0)* Please bind your target explicitly with `callback.bind(bindTarget)`

#### Returns

Type | Description
-----|-------------
`SIP.EventEmitter`| This event emitter


### `once(event, callback)`

Register a method to be called the next time a particular event is emitted.  The callback will only be called once, even if the event is emitted multiple times.

#### Parameters

Name | Type | Description
-----|------|-------------
`event`|`String`|The event which must be emitted to trigger the callback
`callback`|`Function`|The callback to be called when the event is emitted
`bindTarget`|`Object`|*(Removed in 0.7.0)* Please bind your target explicitly with `callback.bind(bindTarget)`

#### Returns

Type | Description
-----|-------------
`SIP.EventEmitter`| This event emitter

### `removeListener(type, listener[, scope])`

Removes callback listeners from a particular event.  The specific behavior varies depending on the number of arguments provided:

* `removeListener(type, listener)` will remove all listeners for that event and callback.

#### Parameters

Name | Type | Description
-|-|-
`type`|`String`| The event for which to remove listeners.
`listener`|`Function`| The callback to stop calling.
`scope`|`Object`| The scope the event must have to be removed.

#### Returns

Type | Description
-----|-------------
`SIP.EventEmitter`| This event emitter

### `removeAllListeners(type)`

Removes callback listeners from a particular event.  The specific behavior varies depending on the number of arguments provided:

* `removeAllListeners(event)` will remove all listeners for that event

#### Parameters

Name | Type | Description
-|-|-
`type`|`String`| The event for which to remove listeners.

#### Returns

Type | Description
-----|-------------
`SIP.EventEmitter`| This event emitter

### `setMaxListeners(listeners)`

Change the maximum number of listeners per event that are allowed to be registered on this EventEmitter.  The initial default is `SIP.EventEmitter.C.MAX_LISTENERS`: 10.

#### Parameters

Name | Type | Description
-|-|-
`listeners`|`Number`|The new maximum number of listeners per event
