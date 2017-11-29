---
title: Session Description Handler
description: The WebRTC Media Handler is the default media handler for SIP.js.
---
# Session Description Handler

`SessionDescriptionHandler` represents a common interface for SIP.js to interact with the underlying RTP connection.
The default Session Description Handler included with SIP.js interacts with WebRTC to provide voice, video, and data streams.

When using SIP.js in Node.js, mobile apps, or other platforms, you can define a custom Session Description Handler using
the [UA](../ua/)'s [sessionDescriptionHandlerFactory](../ua_configuration_parameters/#ssessionDescriptionHandlerFactory) configuration parameter.

A custom Session Description Handler just needs to implement a constructor and 5 methods, as outlined below. All the methods are required. It is recommended that any custom Session Description Handler also utilize modifiers, though this is not required.

## Differences from the Media Handler
{:.no_toc}

The Session Description Handler is an attempt to separate SIP.js from the media handling aspect of WebRTC and focus on the SIP signaling. The 0.7.0 api docs provide some documenation for the old [`MediaHandler`](/api/0.7.0/mediaHandler/).

The downfall of the media handler was the slow addition of more and more functionality. Every user wanted something different for their specific application. The entry points for the media handler were undocumented, and certain options only worked in certain places. In an attempt to simplify SIP.js, we have decided that the developer should be responsible for their own media, and let us handle the SIP aspect of your calls.

### `render()`
{:.no_toc}

There is no longer a render function. There is no longer passing media elements or streams to SIP.js to handle. The developer is responsible for handling this in their specific application.

#### Example
{:.no_toc}

This is an example of how to attach the remote media to a DOM element using the new Session Description Handler in WebRTC.

~~~ javascript
var domElement = document.getElementById('remoteMedia');
var pc = session.SessionDescriptionHandler.peerConnection;
var remoteStream = new MediaStream();
pc.getReceivers().forEach(function(receiver) {
  var track = receiver.track;
  if (track) {
    remoteStream.addTrack(track);
  }
});
domElement.srcObject = remoteStream;
domElement.play();
~~~

### Modifiers
{:.no_toc}

One of the most requested features that we are asked for, is how can I modify SDP before setting it on the `PeerConnection` or sending it to a peer. With the `MediaHandler` you would have to create an entire custom media handler. Now you can just pass a [`modifier`](#modifiers) function to the `SessionDescriptionHandler`.

* TOC
{:toc}

## Construction

The `Session` object will create a `SessionDescriptionHandler` using the `sessionDescriptionHandlerFactory` defined on the UA when it is needed. The session will pass itself as the first argument to the factory and any options that are provided to the UA, under `sessionDescriptionHandlerFactoryOptions` as the second argument.

## Instance Variables

There are no public instance attributes for the Session Description Handler.

## Application Methods

### `getDescription(options, modifiers)`

Gets the session description from the underlying connection for the `session` to use for the SIP session.

#### Parameters

Name | Type | Description
-----|------|--------------
`options`|`Object`| Optional
`options.constraints`|`Object`| Optional rtcConstraints to use when getting local media. If media streams are already open and new constraints are defined, will re-acquire media.
`options.peerConnectionOptions`|`Object`|Optional options to be passed to the PeerConnection initialization. If this is defined here, the current peer connection will be closed and a new one created with the options provided.
`options.peerConnectionOptions.rtcConfiguration`|`Object`|Options to be passed to the constructor of the RTCPeerConnection
`options.peerConnectionOptions.rtcConfiguration.iceServers`|`Object`|Ice Servers to be used by the Peer Connection. Default `[{urls: 'stun:stun.l.google.com:19302'}]`
`options.peerConnectionOptions.iceCheckingTimeout`|`Integer`|Maximum number of milliseconds to wait for Ice Candidates. Default `5000`.
`options.RTCOfferOptions`|`Object`|Options to be used on the peerConnection functions `createOffer` or `createAnswer`
`modifiers`|`Array` of `Function` returning `Promise`| Optional modifiers that will be applied to the incoming or outgoing description.

#### Returns

Type     | Description
---------|-------------
`Promise`| Promise that resolves with the local description to be used for the session.

### `setDescription(sessionDescription, options, modifiers)`

Sets the session description from the remote peer on the `session` on the underlying connection for SIP session.

#### Parameters

Name | Type | Description
-----|------|--------------
`sessionDescription`|`String`| The remote description that is to be set on the underlying connection for the session.
`options`|`Object`| Optional
`options.constraints`|`Object`| Optional rtcConstraints to use when getting local media. If media streams are already open and new constraints are defined, will re-acquire media.
`options.peerConnectionOptions`|`Object`|Optional options to be passed to the PeerConnection initialization. If this is defined here, the current peer connection will be closed and a new one created with the options provided.
`options.peerConnectionOptions.rtcConfiguration`|`Object`|Options to be passed to the constructor of the RTCPeerConnection
`options.peerConnectionOptions.rtcConfiguration.iceServers`|`Object`|Ice Servers to be used by the Peer Connection. Default `[{urls: 'stun:stun.l.google.com:19302'}]`
`options.peerConnectionOptions.iceCheckingTimeout`|`Integer`|Maximum number of milliseconds to wait for Ice Candidates. Default `5000`.
`options.RTCOfferOptions`|`Object`|Options to be used on the peerConnection functions `createOffer` or `createAnswer`
`modifiers`|`Array` of `Function` returning `Promise`| Optional modifiers that will be applied to the incoming or outgoing description.


#### Returns

Type     | Description
---------|-------------
`Promise`| Promise that resolves once the description is set successfully on the underlying. The promise will reject if there was an error setting the description.

### `hasDescription(contentType)`

#### Parameters

Name | Type | Description
-----|------|--------------
`contentType`|`String`| The type of description that was received in a SIP message.

#### Returns

Type     | Description
---------|-------------
`Boolean`|`true` if the handler can handle that type of description, `false` otherwise.

### `close()`

Destructor for the Session Description Handler. Any cleanup of the underlying connection should go here.

### `holdModifier(description)`

This is a [`Modifier`](#modifiers) that is used by the session's `hold` function. The `hold` function will automatically append this modifier to the end of the [modifiers array](#modifiers-2), before calling `sendReinvite`.

#### Parameters

Name | Type | Description
-----|------|--------------
description|Object| [RTCSessionDescription](https://developer.mozilla.org/en-US/docs/Web/API/RTCSessionDescription) object containing the session to be put on hold.

#### Returns

Type     | Description
---------|-------------
`Promise`| Promise that resolves with the modified [RTCSessionDescription](https://developer.mozilla.org/en-US/docs/Web/API/RTCSessionDescription), rejects if the description cannot be modified.

## Modifiers

Modifiers are used to modify the description before it is set on the connection or sent to a remote peer via the SIP session.

### `[Modifiers]`

Modifiers should always be passed in an array. The `SessionDescriptionHandler` should take the array and chain the promises together in order of them in the array. `SIP.Utils.reducePromises(array)` can do this for you. The modifiers should be passed as a reference to a function, and each function should return a promise which is resolved with the modified SDP.

#### Parameters

Name | Type | Description
-----|------|--------------
`description`|`Object`| [RTCSessionDescription](https://developer.mozilla.org/en-US/docs/Web/API/RTCSessionDescription) object.

#### Returns

Type     | Description
---------|-------------
`Promise`| Promise that resolves with the modified [RTCSessionDescription](https://developer.mozilla.org/en-US/docs/Web/API/RTCSessionDescription), rejects if the description cannot be modified.

#### Example

~~~javascript
var myModifier = function(description) {
  description.sdp = description.sdp.replace(/^a=candidate:\d+ \d+ tcp .*?\r\n/img, "");
  return Promise.resolve(description);
};

var modifierArray = [myModifier, SIP.WebRTC.Modifiers.stripTelephoneEvent];

ua.invite('alice@example.onsip.com', {}, modifierArray);

~~~

## Default Options

The options listed below are the options that are supported by the default WebRTC Session Description Handler. SIP.js does not internally rely on these options in any way.

The options can either be passed in from the [`sessionDescriptionHandlerFactoryOptions`](/api/0.8.0/ua_configuration_parameters/#sessiondescriptionhandlerfactoryoptions) on the UA, or as `SessionDescriptionHandlerOptions` on calls to [`invite`](/api/0.8.0/ua/#invitetarget-elementoptions) or [`accept`](/api/0.8.0/session/#acceptoptions).

### `constraints`

Constraints to be used on calls to the WebRTC [`getUserMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) function.
Default value is audio true, and video true.

~~~ javascript
constraints: {
  audio: true,
  video: true
}
~~~

### `iceCheckingTimeout`

When setting up a session, how long (in milliseconds) to allow the browser to collect ICE candidates before proceeding.
Lowering this timeout will speed up signaling but potentially fail to set up connections in some network topologies.
Default value is 5 seconds, and this can be set as low as 0.5 seconds.

~~~ javascript
iceCheckingTimeout: 5000
~~~

### `modifiers`

A set of default modifiers to use every time a description is requested or set by the Session Description Handler. These modifiers will occur before modifiers passed by a specific call to the Session Description Handler.

### `rtcConfiguration`

Options to be passed to the WebRTC [`PeerConnection`](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection) constructor.

### `RTCOfferOptions`

Options to be passed to the WebRTC Peer Connection [`createOffer`](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createOffer) or [`createAnswer`](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createAnswer) call.

## Default Events

The events listed below are what is emitted from the default WebRTC Session Description Handler. SIP.js does not internally rely on these events.

### `userMediaRequest`

Fired when `getUserMedia()` has been called and the application is waiting for a response.

#### `on('userMediaRequest', function (constraints) {})`

Name | Type | Description
-----|------|--------------
`constraints`|`Object`| The constraints that were used with getUserMedia().

### `userMedia`

Fired when `getUserMedia()` returned local media.

#### `on('userMedia', function (stream) {})`

Name | Type | Description
-----|------|--------------
`stream`|`MediaStream`| The local media stream that was returned from getUserMedia().

### `userMediaFailed`

Fired when `getUserMedia()` has returned unsuccessfully from getting user media. Typically this might mean that the user has denied access to local media.

#### `on('userMediaFailed', function (error) {})`

Name | Type | Description
-----|------|--------------
`error`|`String`| The message returned from the getUserMedia failure.




### `iceGathering`

Fired when the WebRTC layer has started gathering ICE candidates.

#### `on('iceGathering', function () {})`

### `iceCandidate`

Fired each time the WebRTC layer finds an ICE candidate.

#### `on('iceCandidate', function (candidate) {})`

### `iceGatheringComplete`

Fired when the WebRTC layer has finished gathering ICE candidates.

#### `on('iceGatheringComplete', function () {})`



### `iceConnection`

Fired when the ICE connection state is `new`.

### `iceConnectionChecking`

Fired when the ICE connection state is `checking`.

### `iceConnectionConnected`

Fired when the ICE connection state is `connected`.

### `iceConnectionCompleted`

Fired when the ICE connection state is `completed`.

### `iceConnectionFailed`

Fired when the ICE connection state is `failed`.

### `iceConnectionDisconnected`

Fired when the ICE connection state is `disconnected`.

### `iceConnectionClosed`

Fired when the ICE connection state is `closed`.


### `getDescription`

Fired when the browser completes the WebRTC getDescription function.

#### `on('getDescription', function (sdpWrapper) {})`

Name | Type | Description
-----|------|--------------
`sdpWrapper`|`Object`| The sdpWrapper used by getDescription.
`sdpWrapper.type`|`String`| Can be either 'offer' or 'answer' depending on which type of SDP was gotten from the browser.
`sdpWrapper.sdp`|`String`| The SDP that was gotten from the browser.

### `setDescription`

Fired when the browser completes the WebRTC setDescription function.

#### `on('setDescription', function (sdpWrapper) {})`

Name | Type | Description
-----|------|--------------
`sdpWrapper`|`Object`| The sdpWrapper used by setDescription.
`sdpWrapper.type`|`String`| Can be either 'offer' or 'answer' depending on which type of SDP was received.
`sdpWrapper.sdp`|`String`| The SDP that was received.

### `addStream`

Fired when a new stream is added to the PeerConnection.

* Deprecated. Note: This has been deprecated in the WebRTC api for the new `addTrack` event instead. Neither api is currently fully supported in all browser enviornments.

#### `on('addStream', function (stream) {})`

Name | Type | Description
-----|------|--------------
`stream`|`Object`| The stream that was added to the PeerConnection.


### `addTrack`

Fired when a new track is added to the PeerConnection.

#### `on('addTrack', function (track) {})`

Name | Type | Description
-----|------|--------------
`track`|`Object`| The track that was added to the PeerConnection.
