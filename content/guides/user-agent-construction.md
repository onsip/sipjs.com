---
title: User Agent Construction | SIP.js
---

# User Agent Construction

* TOC
{:toc}

Let's walk through the process of creating a SIP user agent.


### Anonymous User Agent

First we need to include the SIP.js library, which can be downloaded [here](/download/).  

In order to make calls and send messages you must create a SIP user agent.  In this example, we will create an anonymous user agent.  To do this, call the `SIP.UA()` method with no arguments.  An anonymous user agent can make calls and send messages to SIP endpoints.  It cannot receive calls or messages.



### Authenticated User Agent

To create an authenticated user agent, pass a configuration object to the `SIP.UA` constructor. 

This configuration object needs a `uri`.  This will have a username and a domain.  It will look something like `examplename@test.onsip.com` The `authorizationUser` and `password` are used to authenticate with your SIP provider.  

Further descriptions of the configuration object can be found [here](/api/0.5.0/ua_configuration_parameters/).

Directions for authenticating a user agent using OnSIP can be found [here](http://developer.onsip.com/guides/useragentauthentication/).

<iframe
  style="width: 100%; height: 250px"
  src="http://jsfiddle.net/V6WMY/3/embedded/js,result/">
</iframe>
