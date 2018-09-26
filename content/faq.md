---
title: FAQ | SIP.js
description: Answers to FAQ about SIP.js API, including - What can I do with SIP.js? What is SIP? What browsers support SIP.js (and WebRTC)?
---

# Frequently Asked Questions

## I would like to use SIP.js in Node.js, React Native, Nativescript, some other non web browser environment. How can I do this?
We are a small team at OnSIP and an even smaller subset of us actively working on SIP.js. We cannot support all of these different environments so we choose to support only the latest versions of the major browsers. Chrome, Firefox, Safari, Internet Explorer Edge, and Opera. If you do get something working in a different environment we would happily take a pull request back to the library to help out the rest of the community.

## Does SIP.js work on mobile?
See the previous answer, but we choose to support only the latest versions of major mobile browsers. This would be Chrome on Android and iOS on Safari.

## I am using Simple and would like to do something that is not supported. Can you add support for it?
No. Simple is intended to help get someone up and running quickly. If you need to do something more please upgrade to the full [SIP.js API](/api/0.11.0/).

## SIP.js is not working with my Asterisk, FreeSWITCH, etc. pbx. Can you fix it?
No. We cannot support SIP server configurations outside of our [guides](/guides/server-configuration/). You are responsible for making SIP.js work in your own environment.

## The default Session Description Handler does not do everything I need. Can you make it do more?
No. We are trying to build a SIP signaling library. We do not want to be in the business of handling all the different media cases. You should build your own [Session Description Handler](/api/0.11.0/sessionDescriptionHandler/).

## How can I play early media (with and invite SDP)?
Early media can be played if you do an [invite without SDP](/api/0.11.0/ua/#invitetarget-options-modifiers). As of writing this the browsers do not currently support early media. SIP.js uses a "hack" where we set the early media as final media. Since each peer connection can only have a single offer and answer we need to create a new peer connection for each endpoint that sends us media. We cannot create multiple offers and send it to each fork, so we send no offer and force each fork to send us an offer. We can then create an individual peer connection and answer for each fork. This is fully compliant with the [SIP RFC](https://tools.ietf.org/html/rfc3261) and compatible with most major SIP implementations. This is why we cannot support early media on invites with SDP.

## My call does not fork, so can you add early media support for invite with SDP?
No. Since we cannot support this for all users, we cannot add it to the library unless it supports all use cases.

## My SIP.js application isn’t working!  Where do I get help?
The best way to get help is through our [Google Group mailing list](https://groups.google.com/forum/#!forum/sip_js). Make sure that you include logs with [traceSip](/api/0.11.0/ws_transport_configuration_parameters/#tracesip) enabled. The Github issue tracker is reserved for bugs within the library.

## What can I do with SIP.js?
You can add a signaling layer to your WebRTC app so it can create, modify, and terminate communication sessions between its peers. In other words, you can create a full SIP user agent right in a web page. With this SIP user agent, you can send and receive voice and video calls as well as SIP messages.

## What is SIP?
SIP stands for Session Initiation Protocol and is used for setting up communications in an IP network. It is commonly leveraged to control multimedia VOIP communications sessions, such as voice and video calls— but it is designed to manage real-time media of all kinds.

## What is a user agent?
A user agent (UA for short) is generally a software agent that is acting on behalf of a user. In the land of SIP, the term user agent refers to both end points of a communications session. SIP.js associates a SIP address to a UA, and that SIP address can make and receive requests on that user's behalf. The UA also maintains the WebSocket, on which the signaling travels.

## I see references to something called a context in your documentation. That's not a SIP term! What is it?
This is a term we created in order to group together related SIP transactions.  For more information, we have [an in-depth explanation in our documentation](/api/0.11.0/context/).
