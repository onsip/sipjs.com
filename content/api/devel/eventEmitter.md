---
title: SIP.EventEmitter | SIP.js
---

# SIP.EventEmitter

SIP.EventEmitter provides an interface for managing event callbacks (via `on()` and `off()` methods), as well as triggering those events (via `emit()`).

### Example

~~~ javascript
// A SIP.js user agent implements the SIP.EventEmitter interface
myUA = new SIP.UA();

myUA.on('invite', function foo(session) {
    session.accept();
});

// Incoming invites will trigger foo() to be called

myUA.off('invite');

// Incoming invites will not trigger foo() to be called
~~~

* TOC
{:toc}

## Construction

The EventEmitter constructor is intended *for internal use only.*

## Public Methods

### `on(event, callback[, bindTarget])`

Register a method to be called each time a particular event is emitted.

#### Parameters

Name | Type | Description
-----|------|-------------
`event`|`String`|The event which must be emitted to trigger the callback
`callback`|`Function`|The callback to be called when the event is emitted
`bindTarget`|`Object`|If provided, when `callback` is called, `this` will be set to the `bindTarget`.  Otherwise, `this` will be bound to this `SIP.EventEmitter`

#### Returns

Type | Description
-----|-------------
`SIP.EventEmitter`| This event emitter


### `once(event, callback[, bindTarget])`

Register a method to be called the next time a particular event is emitted.  The callback will only be called once, even if the event is emitted multiple times.

#### Parameters

Name | Type | Description
-----|------|-------------
`event`|`String`|The event which must be emitted to trigger the callback
`callback`|`Function`|The callback to be called when the event is emitted
`bindTarget`|`Object`|If provided, when `callback` is called, `this` will be set to the `bindTarget`.  Otherwise, `this` will be bound to this `SIP.EventEmitter`

#### Returns

Type | Description
-----|-------------
`SIP.EventEmitter`| This event emitter

### `off([event[, callback[, bindTarget]]])`

Removes callback listeners from a particular event.  The specific behavior varies depending on the number of arguments provided:

* `off(event, callback, bindTarget)` will remove all listeners for that event, callback, and bindTarget.
* `off(event, callback)` will remove all listeners for that event and callback, regardless of whether a bindTarget was provided when adding the listener.
* `off(event)` will remove all listeners for that event
* `off()` will remove all listeners for all events on the emitter.  **Warning: Using `off()` in this fashion is likely to break things!**

#### Parameters

Name | Type | Description
-|-|-
`event`|`String`| The event for which to remove listeners.
`callback`|`Function`| The callback to stop calling.
`bindTarget`|`Object`| If provided, only listeners configured with this bindTarget will be removed.

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
