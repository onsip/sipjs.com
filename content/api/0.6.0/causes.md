---
title: Failure and End Causes | SIP.js
---

# Failure and End Causes
SIP.js provides a set of causes in order to make the user aware of why the request or session ended. These causes are defined in the `SIP.C.causes` namespace, which can be used for comparisons.

~~~ javascript
// Create a user agent named bob, connect, and register to receive invitations.
var bob = new SIP.UA({
  uri: 'bob@example.com',
  register: true
});

var session =  bob.invite('alice@example.com');
session.on('failed', function (request) {
  var cause = request.cause; //sometimes this is request.reason_phrase
  if (cause === SIP.C.causes.REJECTED) {
    bob.message('alice@example.com', 'Please, call me later!');
  }
});
~~~

# Common Causes

Constant | Value | Description
-----|------|-------------
`INVALID_TARGET` | 'Invalid target' | The specified target can not be parsed as a valid [`SIP.URI`](/api/0.6.0/uri/).
`CONNECTION_ERROR` | 'Connection Error' | WebSocket connection error occurred.
`REQUEST_TIMEOUT` | 'Request Timeout' | The timeout expired for the client transaction before a response was received.
`SIP_FAILURE_CODE` | 'SIP Failure Code' | A negative SIP response was received which is not part of any of the groups defined in the table below.


# SIP Error Causes
Some SIP response status codes are grouped into the following causes:

Constant | Value | SIP Status Codes
-----|------|-------------
`BUSY` | 'Busy' | 486,600
`REJECTED` | 'Rejected' | 403,603
`REDIRECTED` | 'Redirected' | 300,301,302,305,380
`UNAVAILABLE` | 'Unavailable' | 408,410,430,480
`NOT_FOUND` | 'Not Found' | 404,604
`ADDRESS_INCOMPLETE` | 'Address Incomplete' | 484
`INCOMPATIBLE_SDP` | 'Incompatible SDP' | 488,606
`AUTHENTICATION_ERROR` | 'Authentication Error' | 401,407


# Session Causes
The following causes apply to audio/video sessions:

Constant | Value | Description
-----|------|-------------
`BYE` | 'Terminated' | Session terminated normally by local or remote peer.
`CANCELED` | 'Canceled' | Session canceled by local or remote peer.
`NO_ANSWER` | 'No Answer' | Incoming call was not answered in the time given in the configuration `no_answer_timeout` parameter.
`EXPIRES` | 'Expires' | Incoming call contains an Expires header and the local user did not answer within the time given in the header.
`NO_ACK` | 'No ACK' | An incoming INVITE was replied to with a 2XX status code, but no ACK was received.
`NO_PRACK` | 'No PRACK' | An incoming iNVITE was replied to with a reliable provisional response, but no PRACK was received.
`USER_DENIED_MEDIA_ACCESS` | 'User Denied Media Access' | Local user denied media access when prompted for audio/video devices.
`WEBRTC_NOT_SUPPORTED` | 'WebRTC not supported' | The browser or device does not support the WebRTC specification.
`RTP_TIMEOUT` | 'RTP Timeout' | There was an error involving the PeerConnection associated with the call.
`BAD_MEDIA_DESCRIPTION` | 'Bad Media Description' | Received SDP is wrong.
`DIALOG_ERROR` | 'Dialog Error' | An in-dialog request received a 408 or 481 SIP error.
