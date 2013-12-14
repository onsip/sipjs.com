---
title: SIP.UA | SIP.js
---
# SIP.UA

SIP.js SIP User Agent class.

* TOC
{:toc}

## Instantiation

A User Agent is associated to a SIP user account. This class requires some configuration parameters for its initialization which are provided through a configuration object.

Check the full [UA Configuration Parameters](/SIPjs/ua_configuration_parameters/) list.

Instantiation of this class will raise an exception if any of the mandatory parameters is not defined or due to a malformed parameter value.

#### Throws

* [`CONFIGURATION_ERROR`](/SIPjs/dom_exceptions/">

#### Example
~~~ javascript
var configuration = {
  'ws_servers':         'ws://sip-ws.example.com',
  'uri':                'sip:alice@example.com',
  'password':           'superpassword'
};

var coolPhone = new SIP.UA(configuration);
~~~

##Instance Methods


### `start()`
Connects to the WebSocket server and restores the previous state if previously stopped. For a fresh start, registers with the SIP domain if `register` parameter in the UA's configuration is set to `true`.


### `stop()`
Saves the current registration state and disconnects from the WebSocket server after gracefully unregistering and terminating active sessions if any.


### `register(options=null)`

Registers the UA.

Note: If `register` parameter is set to `true` in [UA Configuration Parameters](/SIPjs/ua_configuration_parameters/), the UA will register automatically.

#### Parameters

Name | Type | Description 
-----|------|--------------
`options`|`Object`|Optional `Object` with extra parameters (see below).

#### Fields in <code>options</code> Object

Name | Type | Description 
-----|------|--------------
`extraHeaders`|`Array`|Optional `Array` of `Strings` with extra SIP headers for each REGISTER request.

#### Example

~~~ javascript
var options = {
  'extraHeaders': [ 'X-Foo: foo', 'X-Bar: bar' ]
};

coolPhone.register(options);
~~~


### `unregister(options=null)`
Unregisters the UA.

#### Parameters

Name | Type | Description 
-----|------|--------------
`options`|`Object`|Optional `Object` with extra parameters (see below).

#### Fields in <code>options</code> Object

Name | Type | Description 
-----|------|--------------
`all`|`Boolean`|Optional `Boolean` for unregistering all bindings of the same SIP user. Default value is `false`.
`extraHeaders`|`Array`|Optional `Array` of `Strings` with extra SIP headers for each REGISTER request.

#### Example

~~~ javascript
var options = {
  'all': true,
  'extraHeaders': [ 'X-Foo: foo', 'X-Bar: bar' ]
};

coolPhone.unregister(options);
~~~


### `invite(target, options=null)`

Makes an outgoing multimedia call.

#### Parameters

Name | Type | Description 
-----|------|--------------
`target`|`String`|Destination of the call. `String` representing a destination username or a complete SIP URI, or a [`SIP.URI`](/SIPjs/uri/) instance.
`options`|`Object`|Optional `Object` with extra parameters (see below).

#### Fields in <code>options</code> Object

Name | Type | Description 
-----|------|--------------
`mediaConstraints`|`Object`|`Object` with two valid fields (`audio` and `video`) indicating whether the session is intended to use audio and/or video and the constraints to be used. Default value is both `audio` and `video` set to `true`.
`mediaStream`|`MediaStream`|`MediaStream` to transmit to the other end.
`RTCConstraints`|`Object`|`Object` representing RTCPeerconnection constraints
`eventHandlers`|`Object`|Optional `Object` of event handlers to be registered to each call event. Define an event handler for each event you want to be notified about.
`extraHeaders`|`Array`|Optional `Array` of `Strings` with extra SIP headers for the INVITE request.
`anonymous`|`Boolean`|`Boolean` field indicating whether the call should be done anonymously. Default value is `false`.

#### Example

~~~ javascript
// HTML5 &lt;video&gt; elements in which local and remote video will be shown
var views = {
  'selfView':   document.getElementById('my-video'),
  'remoteView': document.getElementById('peer-video')
};

// Register callbacks to desired call events
var eventHandlers = {
  'progress':   function(e){ /* Your code here */ },
  'failed':     function(e){ /* Your code here */ },
  'accepted':    function(e){
    var rtcSession = e.data;

    // Attach local stream to selfView
    if (rtcSession.getLocalStreams().length &gt; 0) {
      selfView.src = window.URL.createObjectURL(rtcSession.getLocalStreams()[0]);
    }

    // Attach remote stream to remoteView
    if (rtcSession.getRemoteStreams().length &gt; 0) {
      remoteView.src = window.URL.createObjectURL(rtcSession.getRemoteStreams()[0]);
    }
  },
  'terminated':      function(e){ /* Your code here */ }
};

var options = {
  'extraHeaders': [ 'X-Foo: foo', 'X-Bar: bar' ],
  'mediaConstraints': {'audio': true, 'video': true}
};

coolPhone.call('sip:bob@example.com', options);
~~~

### `message(target, body, options=null)`

Sends an instant message making use of SIP MESSAGE method.

#### Parameters

Name | Type | Description 
-----|------|--------------
`target`|`String`|Destination of the call. `String` representing a destination username or a complete SIP URI, or a [`SIP.URI`](/SIPjs/uri/)> instance.
`body`|`String`|Message content. `String` representing the body of the message.
`options`|`Object`|Optional `Object` with extra parameters (see below).

#### Fields in <code>options</code> Object

Name | Type | Description 
-----|------|--------------
`contentType`|`String`|Optional `String` representing the content-type of the body. Default `text/plain`.
`eventHandlers`|`Object`|Optional `Object` of event handlers to be registered to each [`SIP.Message`](/SIPjs/message/#events)"> event. Define an event handler for each event you want to be notified about.
`extraHeaders`|`Array`|Optional `Array` of `Strings` with extra SIP headers for the MESSAGE request.

#### Example

~~~ javascript
var text = 'Hello Bob!';

coolPhone.message('sip:bob@example.com', text, options);
~~~


### `isRegistered()`

Returns `true` if the UA is registered, `false` otherwise.


### `isConnected()`

Returns `true` if the WebSocket connection is established, `false` otherwise.


## Events

`SIP.UA` class defines a series of events. Each of them allows callback functions registration in order to let the user execute a handler for each given stimulus.

Every event handler is executed with a [SIP.Event](/SIPjs/event/) instance as the only argument.


### `connected`

Fired when the WebSocket connection is established.

#### Event `data` fields

Name | Type | Description 
-----|------|--------------
`transport`||WebSocket connection.


### `disconnected`

Fired when the WebSocket connection attempt (or automatic re-attempt) fails.

#### Event `data` fields

Name | Type | Description 
-----|------|--------------
`transport`||WebSocket connection.
`code`|`Number`|`Number` indicating the WebSocket disconnection code.
`reason`|`String`|`String` indicating the WebSocket disconnection reason.

### `registered`

Fired for a successful registration.

#### Event `data` fields

Name | Type | Description 
-----|------|--------------
`response`|[`JsSIP.IncomingResponse`](/SIPjs/incomingResponse/)|[`JsSIP.IncomingResponse`](/SIPjs/incomingResponse/) instance of the received SIP 2XX response.

### `unregistered`

Fired for an unregistration. This event is fired in the following scenarios:

*As a result of a unregistration request. `UA.unregister()`.
*If being registered, a periodic re-registration fails.

#### Event `data` fields

Name | Type | Description 
-----|------|--------------
`response`|[`JsSIP.IncomingResponse`](/SIPjs/incomingResponse/)|[`JsSIP.IncomingResponse`](/SIPjs/incomingResponse/) instance of the received SIP response for a (un)REGISTER SIP request
`cause`||`null` for possitive response to un-REGISTER SIP request. In other case, one value of [Failure and End Causes](SIPjs/causes)


### `registrationFailed`

Fired for a registration failure.

#### Event `data` fields

Name | Type | Description 
-----|------|--------------
`response`|[`JsSIP.IncomingResponse`](/SIPjs/incomingResponse/)|[`JsSIP.IncomingResponse`](/SIPjs/incomingResponse/) instance of the received SIP negative response if the failure is generated by the recepcion of such response, null otherwise.
`cause`||`null` for possitive response to un-REGISTER SIP request. In other case, one value of [Failure and End Causes](SIPjs/causes)


### `invite`

Fired for an incoming call.

#### Event `data` fields

Name | Type | Description 
-----|------|--------------
`session`|[SIP.Session](/SIPjs/session/)|[SIP.Session](/SIPjs/session/) instance of the session.
`request`|[SIP.IncomingRequest](/SIPjs/incoming-request/)|[SIP.IncomingRequest](/SIPjs/incoming-request/) instance of the incoming INVITE request.

#### Event `data` fields for an outgoing session

Name | Type | Description 
-----|------|--------------
`session`|[SIP.Session](/SIPjs/session/)|[SIP.Session](/SIPjs/session/) instance of the session.
`request`|[SIP.OutgoingRequest](/SIPjs/outgoing-request/)|[SIP.OutgoingRequest](/SIPjs/outgoing-request/) instance of the outgoing INVITE request.


### `message`

Fired for an incoming <span class="caps">MESSAGE</span> request.

#### Event `data` fields

Name | Type | Description 
-----|------|--------------
`message`|[SIP.Message](/SIPjs/message/)|[SIP.Message](/SIPjs/message/) instance.
`request`|[SIP.IncomingRequest](/SIPjs/incoming-request/)|[SIP.IncomingRequest](/SIPjs/incoming-request/) instance of the incoming MESSAGE request.