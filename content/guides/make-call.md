---
title: Make a call | SIP.js
---

# Make a Call

* TOC
{:toc}

Let's walk through core API concepts as we tackle some everyday use cases.


### Setup and Video Elements

First we must create the files index.html, main.js, and style.css in the same folder.  In the index.html file we need to include the SIP.js library, which can be downloaded [here](/download/), as well as the main.js file.  

A `<video>` element is need to display the video stream.  The `<video>` element adds a standard way for browsers to display video over the internet without additional plugins. This makes `<video>` elements perfect for WebRTC. 

Within the `<body>` tags, there is a `remoteVideo` `<video>` element, to display the video of the person being calling.  There is also a `localVideo` `<video>` element, to display the video stream that is being sendt to the person being called.  The local video stream should always be muted to prevent feedback.

Although we are loading the SIP.js library, we are not doing anything with it yet.

In the style.css file we will put a border around the `<video>` elements, to visualize them better.

<iframe
  style="width: 100%; height: 300px"
  src="http://jsfiddle.net/mgc2e/11/embedded/html,js,css,result/">
</iframe>

### Making the Call

These `<video>` elements are not useful if we aren't calling anyone, so let's make a call.

#### Creating the User Agent

In order to make calls and send messages you must create a SIP user agent.  For this example, we will create an anonymous user agent.  To do this we will call the `SIP.UA()` method.

<iframe
  style="width: 100%; height: 300px"
  src="http://jsfiddle.net/4m7dc/12/embedded/js,html,css,result/">
</iframe>


#### Sending the Invite


After the user agent has connected to the SIP server, we can send an invite to make a call and thereby create a SIP session.

To send an invite we must first create a javascript object, which contains the `media` variable in which we specify whether the session contains audio and video (i.e. whether it is a video call or an audio call).  

We must then call the `.invite()` method, along with the address that we are sending the invite to, and the `options` object containing media information.

When we make the call the browser will ask for permission to access the camera and microphone.  We must allow this in order to make the call.  Once we send the invite the other party has the choice of either accepting or rejecting the call.  

We will also add an `endCall` button, which terminates the session using the `.bye()` method.

<iframe
  style="width: 100%; height: 410px"
  src="http://jsfiddle.net/T4Kv2/18/embedded/js,html,css,result/">
</iframe>


###Displaying the Call

Although we are now able to make calls, we are not yet displaying the videos on the screen.  To do this we need to attach the video streams that we are sending and receiving to the video elements that we added in the beginning.  

We cannot just immediately attach the media streams; we must first wait until the call begins.  To do this we need to catch the `accepted` event and attach the media streams after this point.  

We have created a new function called onAccepted(), which runs as soon as the call connects.  This function calls the `attachMediaStream` function on both media streams, and then plays both video elements.

The function `attachMediaStream` attaches the media stream to the video element.

<iframe
  style="width: 100%; height: 600px"
  src="http://jsfiddle.net/qWmG7/26/embedded/js,html,css,result/">
</iframe>







