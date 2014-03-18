---
title: Send Dtmf | SIP.js
---

# Send Dtmf

* TOC
{:toc}



### Setup

We will start with the code that we produced at the end of the [make a call](/guides/make-call/) example.


### Create The Dial Pad

In order to send dtmf, lets create a dial pad to accept user input.


<iframe
  style="width: 100%; height: 600px"
  src="http://jsfiddle.net/4NMLQ/2/embedded/js,html,css,result/">
</iframe>

### Send the Dial Tone

Now that we have the buttons, we need to send the dtmf dial tone when each one is clicked.  This is done by using the `dtmf(number)` method, which can be used to send one or multiple dial tones at the same time.  Add a click event for each button so that it sends the appropriate DTMF tone.

<iframe
  style="width: 100%; height: 600px"
  src="http://jsfiddle.net/LPSX5/2/embedded/js,html,css,result/">
</iframe>

