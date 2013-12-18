---
title: Getting Started | SIP.js
---

# Make a Call

* TOC
{:toc}

Let's walk through core API concepts as we tackle some everyday use cases.

## Overview


### Hello World

#### Example
~~~ javascript
var configuration = {
  'ws_servers':         'ws://sip-ws.example.com',
  'uri':                'sip:alice@example.com',
  'password':           'superpassword'
};

var coolPhone = new SIP.UA(configuration);
~~~


