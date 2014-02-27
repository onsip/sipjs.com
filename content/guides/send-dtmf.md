---
title: Send Dtmf | SIP.js
---

# Send Dtmf

* TOC
{:toc}


## Overview

### Setup

We will start with the code that we produced at the end of the [make a call](/guides/make-call/) example.


### Create The Dial Pad

In order to send dtmf, we need to create a dial pad to accept user input.  We will do this by creating buttons which, when clicked, send the appropriate dial tone.



<iframe
  style="width: 100%; height: 600px"
  src="http://jsfiddle.net/4NMLQ/2/embedded/js,html,css,result/">
</iframe>

### Send the Dial Tone

These buttons don't do anything yet, though.  Now we need to send the dtmf dial tone when the buttons are clicked.  This is done by using the `dtmf(number)` method.  Using this method you can send one or multiple dial tones at the same time.  We will add a click event for each button so that it sends the appropriate DTMF tone.

<iframe
  style="width: 100%; height: 600px"
  src="http://jsfiddle.net/LPSX5/1/embedded/js,html,css,result/">
</iframe>

