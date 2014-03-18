---
title: User Agent Construction | SIP.js
---

# User Agent Construction

* TOC
{:toc}

Let's walk through the process of creating a SIP user agent.

## Overview

### Anonymous User Agent

First we need to include the SIP.js library, which can be downloaded [here](/download/).  

In order to make calls and send messages you must create a SIP user agent.  One way to do this is to create an anonymous user agent.  To do this we will call the `SIP.UA()` method without sending anything into it.  An anonymous user agent allows you to make calls and send messages only to other SIP user agents, and not to the PSTN. 



### Authenticated User Agent

To create an authenticated user agent, so that you can receive calls and make calls to the PSTN, we need to pass in a configuration variable.  

This configuration variable needs a `uri`.  This will have a username and a domain.  It will look something like `examplename@test.onsip.com` The `authorizationUser` and `password` are used to authenticate with your SIP provider.  

Further descriptions of the configuration variables can be found [here](/api/devel/ua_configuration_parameters/).

Directions for authenticating a user agent using OnSIP can be found [here](http://developer.onsip.com/guides/useragentauthentication/).

<iframe
  style="width: 100%; height: 250px"
  src="http://jsfiddle.net/V6WMY/3/embedded/js,result/">
</iframe>
