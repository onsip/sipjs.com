---
title: Send a Message | SIP.js
---

# Send a Message

* TOC
{:toc}

Let's walk through core API concepts as we tackle some everyday use cases.

## Overview

### Setup and Video Elements

Like in the make a call example, we must create the files index.html and main.js in the same folder.  In the index.html file we need to include the SIP.js library, which can be downloaded [here](/download/), as well as the main.js file.  

Although we are loading the SIP.js library, we are not doing anything with it yet.

We are also including a `<button>` element which we will use to determine when to send the message.


<iframe
  style="width: 100%; height: 250px"
  src="http://jsfiddle.net/5JbvL/2/embedded/html,js,result/">
</iframe>



### Creating the User Agent

In order to make calls and send messages you must create a SIP user agent.  For this example, we will create an anonymous user agent.  To do this we will call the `SIP.UA()` method and then we must start the user agent.

<iframe
  style="width: 100%; height: 250px"
  src="http://jsfiddle.net/gk3p4/4/embedded/js,html,result/">
</iframe>


### Sending the Message


After the user agent has connected to the SIP server (which is a public Google server by default) we can send the message.

To send the message we must use call the `.message(target, body)` method, along with the address that we are sending the message to in the `target` variable and the message that we are sending in the `body` variable.

We will add a click event to the `<button>` element, which calls the `message()` method.


<iframe
  style="width: 100%; height: 250px"
  src="http://jsfiddle.net/8Cg6M/4/embedded/js,html,result/">
</iframe>

