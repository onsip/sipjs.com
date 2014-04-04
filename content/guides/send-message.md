---
title: Send a Message | SIP.js
description: How to send a SIP message from your WebRTC application with SIP.js.
---

# Send a Message

* TOC
{:toc}

Let's walk through how to send a message.

### Setup

We must create the files index.html and main.js in the same folder.  In the index.html file we need to include the SIP.js library, which can be downloaded [here](/download/), as well as the main.js file.  

A `<button>` element is included to determine when to send the message.


<iframe
  style="width: 100%; height: 250px"
  src="http://jsfiddle.net/5JbvL/3/embedded/html,js,result/">
</iframe>



### Creating the User Agent

In order to send messages, create a SIP user agent.  Calling `SIP.UA()` method, with no parameters, creates an anonymous user agent.

<iframe
  style="width: 100%; height: 250px"
  src="http://jsfiddle.net/gk3p4/5/embedded/js,html,result/">
</iframe>


### Sending the Message


After the user agent has been created we can send the message.

To send the message, call the `.message(target, body)` method, along with the address that the message is being sent to in the `target` argument and the message that we are sending in the `body` argument.

Add a click event to the `<button>` element, that calls the `message()` method.


<iframe
  style="width: 100%; height: 250px"
  src="http://jsfiddle.net/8Cg6M/5/embedded/js,html,result/">
</iframe>

