---
title: Video, Chat, and Data Demo | SIP.js
description: An example demo app of video chat, text chat, and data transfer with WebRTC using SIP.js
---

# Video, Chat, and Data Demo

SIP.js is capable of voice and audio communications, text-based messaging,
and data transfers, among other features. Here is some demo code that shows you
how a simple app might support these features. This is the same demo that
appears on the homepage, minus all of the extra CSS styling. Both endpoint
users, Bob and Alice, are on the same machine, but you can easily set up Alice
and Bob on different machines by splitting up the HTML and only instantiating
one user's UserAgent object and application interfaces per host.

<iframe
    style="width: 100%; height: 800px;"
    src="http://jsfiddle.net/OnSIP/xv00uLur/embedded/js,html,css,result/"
    allowfullscreen="allowfullscreen" frameborder="0">
</iframe>
