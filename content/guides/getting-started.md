---
title: Getting Started | SIP.js
---

# Getting Started

* TOC
{:toc}

Let's walk through core API concepts as we tackle some everyday use cases.

## Overview

Download our library here:


~~~ html
  <!DOCTYPE html>
    <head>
      <script src="sip.js"></script> 
    </head>

    <body>
      <video id="remoteVideo"></video>
      <video id="localVideo" muted="muted"></video>  
      <button type="button" id="answerButton">Answer</button>
      <button type="button" id="endButton">End</button>
	
      <script src="phone.js"></script>
    </body>
  </html>
~~~