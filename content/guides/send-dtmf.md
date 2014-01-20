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


### Send the Dial Tone

Now we need to send the dtmf dial tone.  This is done by using the `sendDTMF(number)` method.  Using this method you can send one or multiple dial tones at the same time.  

<iframe
  style="width: 100%; height: 600px"
  src="http://jsfiddle.net/qWmG7/20/embedded/js,html,css,result/">
</iframe>

