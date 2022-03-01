---
title: Attach media | SIP.js
description: How to attach media from your WebRTC application with SIP.js.
---

# Attach Media

This guide uses the full [SIP.js API](https://github.com/onsip/SIP.js/blob/master/docs/api/sip.js.md). The [Simple User](./simple) is intended to help get beginners up and running quickly. This guide is adopted from the [SIP.js Github API documentation](https://github.com/onsip/SIP.js/blob/master/docs/api.md).

## Prerequisites

See the [User Agent](./user-agent) guide on how to create a user agent. This guide requires a registered user agent.

See the [Make a Call](./make-call) guide on how to make a call.

See the [Receive a Call](./receive-call) guide on how to receive a call.

SIP.js tries to leave the majority of handling media to the user application. This guide assumes that your application is using the built in Session Description Handler in a standard Web Browser with full WebRTC support.

## Session State Change

When SIP.js sets up a session, the session goes through a life cycle. When the session is `Established` you may want to play media for your user. To do this you will need to get a handle on the session state. An event listener can be added to the `stateChange` event emitter. The listener can be added to an `Inviter` before calling the `invite()` function or to an `Invitation` before calling the `accept()` or `reject()` function. These functions are purposely split from the constructor to give your application appropriate time to add listeners.

~~~javascript
const inviter = new Inviter(userAgent, target);
inviter.stateChange.addListener((state: SessionState) => {
  console.log(`Session state changed to ${state}`);
  switch (state) {
    case SessionState.Initial:
      break;
    case SessionState.Establishing:
      break;
    case SessionState.Established:
      setupRemoteMedia(inviter);
      break;
    case SessionState.Terminating:
      // fall through
    case SessionState.Terminated:
      cleanupMedia();
      break;
    default:
      throw new Error("Unknown session state.");
});
inviter.invite();
~~~

~~~javascript
function onInvite(invitation) {
  invitation.stateChange.addListener((state: SessionState) => {
    console.log(`Session state changed to ${state}`);
    switch (state) {
      case SessionState.Initial:
        break;
      case SessionState.Establishing:
        break;
      case SessionState.Established:
        setupRemoteMedia(invitation);
        break;
      case SessionState.Terminating:
        // fall through
      case SessionState.Terminated:
        cleanupMedia();
        break;
      default:
        throw new Error("Unknown session state.");
  });
  invitation.accept();
}
~~~

## Attaching Media

Once you have a handle on the session and the state you can get the Session Description Handler and then get the tracks from the Session Description Handler. There is no common interface for doing this since the Session Description Handler can be swapped out by the user's application.

~~~javascript
// Assumes you have a media element on the DOM
const mediaElement = document.getElementById('mediaElement');

const remoteStream = new MediaStream();
function setupRemoteMedia(session: Session) {
  session.sessionDescriptionHandler.peerConnection.getReceivers().forEach((receiver) => {
    if (receiver.track) {
      remoteStream.addTrack(receiver.track);
    }
  });
  mediaElement.srcObject = remoteStream;
  mediaElement.play();
}
~~~

## Cleaning up Media

Once the call is complete you may want to clean up the media elements used by the call.

~~~javascript
// Assumes you have a media element on the DOM
var mediaElement = document.getElementById('mediaElement');

function cleanupMedia() {
  mediaElement.srcObject = null;
  mediaElement.pause();
}
~~~
