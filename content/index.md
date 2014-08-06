---
title: SIP Signaling JavaScript Library for WebRTC Developers | SIP.js
layout: overview
description: Add SIP signaling to your WebRTC app with this simple, open source JavaScript library - SIP.js.
---
<article class="wrapper group home-feature" id="feature-selector">
	<div class="feature">
		<h1>WebRTC Made Easy for Javascript Developers</h1>
		<h4 class="intro">A simple yet powerful JS library that takes care of WebRTC and SIP signaling for you</h4>
	</div>
    <ul class="wrapper highlights">
      <!-- TODO allow for highlighting of a list item. -->
      <li>
        <img src="/shared/img/video-audio.png" alt="video + audio" />
        <img src="/shared/img/video-audio-highlight.png" alt="video + audio highlight" />
        <h3>video + audio</h3>
      </li>
      <li>
        <img src="/shared/img/message.png" alt="message" />
        <img src="/shared/img/message-highlight.png" alt="message highlight" />
        <h3>message</h3>
      </li>
      <li>
        <img src="/shared/img/data-channel.png" alt="message" />
        <img src="/shared/img/data-channel-highlight.png" alt="message highlight" />
        <h3>data channel</h3>
      </li>
    </ul>
    <!-- This draws an arrow that we use to indicate the highlighted feature -->
    <svg id="feature-arrow" width="80" height="45">
      <polygon points="40,5 75,40 5,40"
               style="fill:rgb(193,191,182); stroke:rgb(193,191,182); stroke-width:10;"
               stroke-linejoin="round" />
    </svg>
</article>

<div class="full-width-divider mid-gray feature">
  <h2>In-browser Video Chat is Now a Breeze</h2>
  <h4 class="intro">Here's a demo. Start a video chat between Alice and Bob.</h4>
  <div class="two-column-boxes wrapper">
    <div class="column-box" style="background-color:red;"></div>
    <div class="column-box" style="background-color:blue;"></div>
    <div class="clearfix"></div>
  </div>
</div>
<div class="full-width-divider orange">
  <div class="two-column-boxes wrapper">
    <div class="column-box">
      <h3>See How It's Done</h3>
      <p>
        The code displayed on the right is what powers the selected demo from yAlice’s end, although Bob’s code would be very similar.  SIP.js allows you to utilize WebRTC’s APIs using just JavaScript. To check out the full code for all three demos, click the button below.
      </p>

      <a href="/">See Full Demo Code</a>
    </div>
    <div class="column-box">
      <pre style="height:100%">
var session,
ua = window.ua,
target = window.target;

function call(vid) {
  session = ua.invite(
    target,
    {
      media: {
        constraints: {
          audio: true,
          video: vid
        },
        render: {
          remote: {
            video: elements.videoStream
          }
        }
      }
    });
}
      </pre>
    </div>
    <div class="clearfix"></div>
  </div>
</div>

<div class="wrapper full-width-divider">
  <h2>Don't Want to Bother with the Back End?</h2>
  <p>
    If you’d like to identify and locate your user addresses on the Internet so they can participate in RTC sessions, you’ll need SIP servers. You can build your own using open source FreeSWITCH or Asterisk, or you can try out OnSIP Network - no system setup, modifications, maintenance, or upfront capital required.
  </p>
  <a href="/">Sign up for a free OnSIP sandbox account</a>
</div>

<div class="full-width-divider light-gray">
  <div class="two-column-boxes wrapper">
    <div class="column-box">
      <h3>Learn</h3>
      <p>New to SIP.js? Our guides and docs will have you up and running in a snap.</p>
    </div>
    <div class="column-box">
      <h3>Connect</h3>
      <p>Get answers, stay up to date, and become part of the SIP.js community.</p>
    </div>
    <div class="clearfix"></div>
  </div>
</div>

<div class="full-width-divider dark-gray">
  <h3>Built An App Using SIP.js?</h3>
  <a href="/">We want to hear about it!</a>
</div>

<div class="wrapper full-width-divider">
  <h2>Features</h2>

  <ul class="multicolumn">
    <li>Register <a href="/faq/#what-is-sip">SIP</a> User Agents using the <a href="http://tools.ietf.org/html/rfc7118">SIP over WebSocket</a> transport</li>
    <li>Create Audio and Video sessions</li>
    <li>Send <a href="/guides/send-message/">Instant Messages</a> and view Presence</li>
    <li>Share your screen or desktop from Chrome</li>
    <li>Utilize advanced call features such as early media, call hold and resume, and transfers</li>
    <li>Send DTMF with SIP INFO</li>
    <li>100% open source, 100% JavaScript</li>
    <li>Chrome, Firefox, and Opera supported</li>
  </ul>
</div>
<div class="full-width-divider light-gray">
  <div class="two-column-boxes">
    <div class="column-box">
      <img src="/shared/img/github.png" alt="github: social coding" />
    </div>
    <div class="column-box">
      <img src="/shared/img/mit-license.png" alt="MIT open-source license" />
    </div>
    <div class="clearfix"></div>
  </div>
</div>
<div class="wrapper full-width-divider">
  <h2>SIP Standards</h2>
  <p><strong>SIP.js</strong> implements the following standard RFCs:</p>

  <ul class="multicolumn">
    <li><a href="http://tools.ietf.org/html/rfc3261">[3261] SIP: Session Initiation Protocol</a></li>
    <li><a href="http://tools.ietf.org/html/rfc3262">[3262] Reliability of Provisional Responses in SIP</a></li>
    <li><a href="http://tools.ietf.org/html/rfc3326">[3326] The Reason Header Field for SIP</a></li>
    <li><a href="http://tools.ietf.org/html/rfc3327">[3327] SIP Extension Header Field for Registering Non-Adjacent Contacts (Path)</a></li>
    <li><a href="http://tools.ietf.org/html/rfc3428">[3428] SIP Extension for Instant Messaging</a></li>
    <li><a href="http://tools.ietf.org/html/rfc3856">[3856] A Presence Event Package for SIP</a></li>
    <li><a href="http://tools.ietf.org/html/rfc4235">[4235] An INVITE-Initiated Dialog Event Package for SIP</a></li>
    <li><a href="http://tools.ietf.org/html/rfc3515">[3515] SIP Refer Method</a></li>
    <li><a href="http://tools.ietf.org/html/rfc5626">[5626] Managing Client-Initiated Connections in SIP (SIP Outbound)</a></li>
    <li><a href="http://tools.ietf.org/html/rfc5954">[5954] Essential Correction for IPv6 ABNF and URI Comparison in RFC 3261</a></li>
    <li><a href="http://tools.ietf.org/html/rfc6026">[6026] Correct Transaction Handling for 2xx Responses to SIP INVITE Requests</a></li>
    <li><a href="http://tools.ietf.org/html/rfc6665">[6665] SIP-Specific Event Notification (SUBSCRIBE/NOTIFY, formerly RFC 3265)</a></li>
    <li><a href="http://tools.ietf.org/html/rfc7118">[7118] The WebSocket Protocol as a Transport for SIP</a></li>
  </ul>
</div>
