---
title: User Agent | SIP.js
description: Create a SIP user agent using SIP.js so your WebRTC application can send and receive calls and messages.
---

# User Agent

* TOC
{:toc}

This guide uses the full [SIP.js API](https://github.com/onsip/SIP.js/blob/master/docs/api/sip.js.md). The [Simple User](./simple) is intended to help get beginners up and running quickly. This guide is adopted from the [SIP.js Github API documentation](https://github.com/onsip/SIP.js/blob/master/docs/api.md)

### Transport Options

The first thing SIP.js needs to know is where it will connect to. This guide assumes that you are using the default WebSocket Transport that is included with SIP.js. The only parameter that is required is a Websocket URL for your SIP Websocket server.

~~~javascript
const transportOptions = {
  server: "wss://example.com:8443"
};
~~~

### Anonymous User Agent

In order to make calls and send messages you must create a SIP user agent.  In this example, we will create an anonymous user agent.  To do this, call the `new UserAgent(userAgentOptions)` constructor. No options are required by the library, but it is recommended that you pass `transportOptions` to indicate where SIP.js should connect to. An anonymous user agent can make calls and send messages to SIP endpoints.  It cannot receive calls or messages.

~~~javascript
const userAgent = new UserAgent({transportOptions});
userAgent.start();
~~~

### Authenticated User Agent

To create an authenticated user agent add a `URI`, `authorizationUsername`, `authorizationPassword` to the configuration option passed to the `new UserAgent(userAgentOptions)` constructor. The `URI` option is specifically typed as a `URI` type and not a string. There is a static helper function `makeURI(uri: string)` on the `UserAgent` that can help create this type.

~~~javascript
const uri = UserAgent.makeURI("sip:alice@example.com");
~~~

Once a URI is created the rest of the [user agent options](https://github.com/onsip/SIP.js/blob/master/docs/api/sip.js.useragentoptions.md) can be added to the options object. The Most platforms will require and `authorizationUsername` and `authorizationPassword` to authorize your user.

~~~javascript
const userAgentOptions: UserAgentOptions = {
  authorizationPassword: 'secretPassword',
  authorizationUsername: 'authorizationUsername',
  transportOptions,
  uri
};
const userAgent = new UserAgent(userAgentOptions);
~~~

After the User Agent is created it will need to Register in order to authenticate with the server and receive messages. To do this a `new Registerer(userAgent: UserAgent)` needs to be created. A `Registerer` will register and automatically handle re-registrations when required.

~~~javascript
const registerer = new Registerer(userAgent);
~~~

Now that everything is created it can all be started. First the `UserAgent` must be started then the `Registerer` told to `register()`.

~~~javascript
userAgent.start().then(() => {
  registerer.register();
});
~~~
