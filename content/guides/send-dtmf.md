---
title: Send DTMF | SIP.js
description: How to create a dial pad in your WebRTC app and send DTMF tones with SIP.js
---

# Send DTMF

### Overview

Let's write code that calls an attendant menu and sends DTMF to make menu choices. We'll
resue the code from the [making a call guide](/guides/make-call) to setup the call. If you haven't read it, you
may want to do so first for an explanation of core API concepts


### Create The Dial Pad

Let's add a set of buttons to our html that accept DTMF input.

~~~ html
 <button id="1">1</button>
 <button id="2">2</button>
 <button id="3">3</button>
 <button id="4">4</button>
 <button id="5">5</button>
 <button id="6">6</button>
 <button id="7">7</button>
 <button id="8">8</button>
 <button id="9">9</button>
 <button id="0">0</button>
~~~

### Send the Dial Tone

Listen for clicks on our dial pad and respond by sending DTMF to the session.
This is done by using the `dtmf(number)` method, which can be used to send one or multiple dial tones at the same time

~~~ javascript
document.getElementById('1').addEventListener("click", function() { session.dtmf(1);}, false);
document.getElementById('2').addEventListener("click", function() { session.dtmf(2);}, false);
document.getElementById('3').addEventListener("click", function() { session.dtmf(3);}, false);
document.getElementById('4').addEventListener("click", function() { session.dtmf(4);}, false);
document.getElementById('5').addEventListener("click", function() { session.dtmf(5);}, false);
document.getElementById('6').addEventListener("click", function() { session.dtmf(6);}, false);
document.getElementById('7').addEventListener("click", function() { session.dtmf(7);}, false);
document.getElementById('8').addEventListener("click", function() { session.dtmf(8);}, false);
document.getElementById('9').addEventListener("click", function() { session.dtmf(9);}, false);
document.getElementById('0').addEventListener("click", function() { session.dtmf(0);}, false);
~~~

### Putting It Together

Click the result tab of the fiddle to start a call to the attendant menu.  The menu is not video enabled,
so you'll only see local video.  The destination address (`userAgent.invite('sip:welcome@junctionnetworks.com' ... `) in the
fiddle can be changed to call any SIP endpoint.
To further explore SIP.js, try using the `session.on('dtmf', ...)` event to play a tone sound when DTMF is sent.

<iframe
  style="width: 100%; height: 600px"
  src="http://jsfiddle.net/NBUS3/embedded/js,html,css,result/">
</iframe>
