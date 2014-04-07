---
title: FAQ | SIP.js
description: Answers to FAQ about SIP.js API, including - What can I do with SIP.js? What is SIP? What browsers support SIP.js (and WebRTC)? 
---

# Frequently Asked Questions

## What can I do with SIP.js?
You can add a signaling layer to your WebRTC app so it can create, modify, and terminate communication sessions between its peers. In other words, you can create a full SIP user agent right in a web page. With this SIP user agent, you can send and receive voice and video calls as well as SIP messages.

## What is SIP?
SIP stands for Session Initiation Protocol and is used for setting up communications in an IP network. It is commonly leveraged to control multimedia VOIP communications sessions, such as voice and video calls— but it is designed to manage real-time media of all kinds.

## What is a user agent?
A user agent (UA for short) is generally a software agent that is acting on behalf of a user. In the land of SIP, the term user agent refers to both end points of a communications session. SIP.js associates a SIP address to a UA, and that SIP address can make and receive requests on that user's behalf. The UA also maintains the WebSocket, on which the signaling travels.

## I see references to something called a context in your documentation. That's not a SIP term! What is it?
This is a term we created in order to group together related SIP transactions.  For more information, we have [an in-depth explanation in our documentation](/api/0.5.0/context/).

## Does SIP.js work in every web browser?
SIP.js requires the browser to have WebRTC support. The current browsers that support WebRTC are listed by Google's [WebRTC project site](http://www.webrtc.org/). SIP.js also uses SIP over WebSockets for transporting SIP requests. To check out browser support there, we suggest [Can I Use Webosockets? http://caniuse.com/websockets](http://caniuse.com/websockets)

## My SIP.js application isn’t working!  Where do I get help?
The best way to get help is through our [Google Group mailing list](https://groups.google.com/forum/#!forum/sip_js).

