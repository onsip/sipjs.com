---
title: WebRTC Media Handler
description: The WebRTC Media Handler is the default media handler for SIP.js.
---
# Media Handler

`MediaHandler` represents a common interface for SIP.js to interact with media streams.
The default MediaHandler included with SIP.js interacts with WebRTC to provide voice, video, and data streams.

When using SIP.js in Node.js, mobile apps, or other platforms, you can define a custom MediaHandler using
the [UA](../ua/)'s [mediaHandlerFactory](../ua_configuration_parameters/#mediahandlerfactory) configuration parameter.
This is an advanced topic, and the source code is your friend.  Refer to the placeholder `SIP.MediaHandler` file for the required interface.  We also define
a custom Rock-Paper-Scissors MediaHandler in our test suite.

The rest of this page documents `SIP.WebRTC.MediaHandler`, the default Media Handler for WebRTC.

* TOC
{:toc}

## Construction

A WebRTC Media Handler will be automatically constructed by SIP.js.

## Instance Variables

There are no public instance attributes for the MediaHandler.

## Application Methods

### `getLocalStreams()`

#### Returns

Type     | Description
---------|-------------
`Array of MediaStream`| An array containing all of the local MediaStreams.

### `getRemoteStreams()`

#### Returns

Type     | Description
---------|-------------
`Array of MediaStream`| An array containing all of the remote MediaStreams.

### `render([renderHint])`

Renders the media to the application.

#### Parameters

Name | Type | Description
-----|------|--------------
`renderHint`|`Object`| Optional object that contains local and remote properties from the application to the MediaStreamManager (see below). If no renderHint is provided the render function will look at the MediaHandler's mediaHint.render property. If the mediaHint.render property does not exist the render function will not execute.
`renderHint.local`|`Object`| Optional `<audio>` or `<video>` element (or `Array` of elements) to use to render the local media. If not provided, no local media will be rendered automatically.
`renderHint.remote`|`Object`| Optional `<audio>` or `<video>` element (or `Array` of elements) to use to render the remote media. If not provided, no remote media will be rendered automatically.


## Events

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







### `dataChannel`

Fired when a WebRTC data channel is setup.

#### `on('dataChannel', function (dataChannel) {})`

Name | Type | Description
-----|------|--------------
`dataChannel`|`DataChannel`| The WebRTC data channel setup between the peers.

### `addStream`

Fired when a new stream is added to the PeerConnection.

#### `on('addStream', function (stream) {})`

Name | Type | Description
-----|------|--------------
`stream`|`Object`| The stream that was added to the PeerConnection.
