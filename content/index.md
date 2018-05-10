---
title: SIP Signaling JavaScript Library for WebRTC Developers | SIP.js
layout: overview
description: Add SIP signaling to your WebRTC app with this simple, open source JavaScript library - SIP.js.
popup: true
---
<div class="wrapper-bg-extend">
  <article class="group home-feature">
	<div class="feature">
	  <h1>WebRTC Made Easy for JavaScript Developers</h1>
	  <h4 class="intro">A simple yet powerful JS library that takes care of WebRTC and SIP signaling for you</h4>
	</div>
  </article>
  <div class="full-width-divider group home-feature" id="feature-selector">
    <div>
      <ul class="highlights">
        <li id="feature-video-audio">
          <img class="icon-unselected"
               src="/shared/img/video-audio.png" alt="video + audio" />
          <img class="icon-selected"
               src="/shared/img/video-audio-highlight.png" alt="video + audio highlight" />
          <h4>video + audio</h4>
        </li>
        <li id="feature-message">
          <img class="icon-unselected"
               src="/shared/img/message.png" alt="message" />
          <img class="icon-selected"
               src="/shared/img/message-highlight.png" alt="message highlight" />
          <h4>message</h4>
        </li>
      </ul>
      <!-- This draws an arrow that we use to indicate the highlighted feature -->
      <svg class="arrow mobile-hide" id="feature-arrow"
           width="60" height="34" viewBox="0 0 80 45">
        <polygon points="40,5 75,40 5,40" />
      </svg>
    </div>
  </div>

  <div class="full-width-divider mid-gray-bg feature" id="feature-demo">
    <div id="demo-error">
      <h1>Oops!</h1>
      <h2>Looks like your browser can't run this demo.</h2>
      <p>
        To get the full experience, download the latest version of
        <em>Chrome</em> or <em>Firefox</em>
      </p>
    </div>
    <div id="content-video-audio">
      <h2>In-browser Video Chat is Now a Breeze</h2>
      <h4 class="intro">Here's a demo. Start a video chat between Alice and Bob.</h4>
      <div class="two-column-boxes">
        <div class="column-box">
          <div class="demo-window">
            <div class="demo-view">
              <video id="video-of-bob" muted="muted"></video>
            </div>
            <div class="left">
              <h4>Alice's View</h4>
              <h5>Demo user one</h5>
            </div>
            <button id="alice-video-button" class="right" type="button">video</button>
            <div class="clearfix"></div>
          </div>
        </div>
        <div class="column-box">
          <div class="demo-window">
            <div class="demo-view">
              <video id="video-of-alice" muted="muted"></video>
            </div>
            <div class="left">
              <h4>Bob's View</h4>
              <h5>Demo user two</h5>
            </div>
            <button id="bob-video-button" class="right" type="button">video</button>
            <div class="clearfix"></div>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
      <svg class="arrow mobile-hide demo-arrow"
           width="60" height="34" viewBox="0 0 80 45">
        <polygon points="40,5 75,40 5,40" />
      </svg>
    </div>
    <div id="content-message">
      <h2>Real-Time Messaging with a Dozen Lines of Code</h2>
      <h4 class="intro">Check it out. Instant message between Alice and Bob.</h4>
      <div class="two-column-boxes">
        <div class="column-box">
          <div class="demo-window">
            <div class="demo-view">
              <div id="alice-message-display" class="message-display">
                <p class="message"><span class="message-from">Bob:</span> <span class="message-body placeholder">No messages yet</span></p>
              </div>
              <textarea id="alice-message-input" class="message-input" placeholder="Enter your message to Bob here!"></textarea>
            </div>
            <div class="left">
              <h4>Alice's View</h4>
              <h5>Demo user one</h5>
            </div>
            <button id="alice-message-button" class="right" type="button">send message</button>
            <div class="clearfix"></div>
          </div>
        </div>
        <div class="column-box">
          <div class="demo-window">
            <div class="demo-view">
              <div id="bob-message-display" class="message-display">
                <p class="message"><span class="message-from">Alice:</span> <span class="message-body placeholder">No messages yet</span></p>
              </div>
              <textarea id="bob-message-input" class="message-input" placeholder="Enter your message to Alice here!"></textarea>
            </div>
            <div class="left">
              <h4>Bob's View</h4>
              <h5>Demo user two</h5>
            </div>
            <button id="bob-message-button" class="right" type="button">send message</button>
            <div class="clearfix"></div>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
      <svg class="arrow mobile-hide demo-arrow"
           width="60" height="34" viewBox="0 0 80 45">
        <polygon points="40,5 75,40 5,40" />
      </svg>
    </div>
  </div>
  <div class="full-width-divider orange-bg">
    <div id="code-intro" class="left">
      <h3 class="homepage">See How It's Done</h3>
      <p class="left mobile-hide">
      The code displayed on the right is what powers the selected demo from Alice’s end, although Bob’s code would be very similar. SIP.js allows you to utilize WebRTC’s APIs using just JavaScript. To check out the full code for all three demos, click the button below.
      </p>
      <p class="desktop-hide">
        SIP.js makes it easy to utilize WebRTC's APIs and set up SIP communication sessions. In no time at all, you can have two separate users talking to one another. To learn more about the SIP.js API, click the button below.
      </p>
    </div>
<div class="code-wrapper mobile-hide">
<div class="index-demo-code" id="code-video-audio" markdown="1">
~~~~ javascript
var domain = 'sipjs.onsip.com';
var aliceURI      = 'alice.' + window.token + '@' + domain;
var aliceName     = 'Alice';

var bobURI        = 'bob.' + window.token + '@' + domain;
var bobName       = 'Bob';

// Function: createSimple
//   creates a SIP.js Simple instance with the given arguments plugged into the
//   configuration. This is a standard Simple instance for WebRTC calls.
//
// Arguments:
//   callerURI: the URI of the caller, aka, the URI that belongs to this user.
//   displayName: what name we should display the user as
//   remoteVideo: the DOM element id of the video for the remote
//   buttonId: the DOM element id of the button for that user
function createSimple(callerURI, displayName, target, remoteVideo, buttonId) {
    var remoteVideoElement = document.getElementById(remoteVideo);
    var button = document.getElementById(buttonId);

    var configuration = {
        media: {
            remote: {
                video: remoteVideoElement,
                // Need audio to be not null to do audio & video instead of just video
                audio: remoteVideoElement
            }
        },
        ua: {
            traceSip: true,
            uri: callerURI,
            displayName: displayName,
            userAgentString: SIP.C.USER_AGENT + " sipjs.com"
        }
    };
    var simple = new SIP.WebRTC.Simple(configuration);

    button.addEventListener('click', function() {
        // No current call up
        if (simple.state === SIP.WebRTC.Simple.C.STATUS_NULL ||
            simple.state === SIP.WebRTC.Simple.C.STATUS_COMPLETED) {
            simple.call(target);
        } else {
            simple.hangup();
        }
    });

    return simple;
}

var aliceSimple = createSimple(aliceURI, aliceName, bobURI, 'video-of-bob', 'alice-video-button');
~~~~
</div>
</div>
<div class="code-wrapper mobile-hide">
<div class="index-demo-code" id="code-message" markdown="1">
~~~~ javascript
var domain = 'sipjs.onsip.com';
var aliceURI      = 'alice' + '@' + domain;
var aliceName     = 'Alice';

var bobURI        = 'bob' + '@' + domain;
var bobName       = 'Bob';

// Sets up the chat interface for text messaging
function setUpMessageInterface(simple) {
    // Receive a message and put it in the message display div
    simple.on('message', function (msg) {
        alert(msg.body);
    });
}


var aliceSimple = createSimple(aliceURI, aliceName, bobURI, 'video-of-bob', 'alice-video-button');

setUpMessageInterface(aliceSimple);
aliceSimple.message(bobURI, 'Check out this palindrome: "Now sir, a war is never even. Sir, a war is won."');
~~~~
</div>
</div>

  <a class="mobile-hide button" href="/guides/full-demo-app/">
    <span class="text-hover-left">See Full Demo Code</span>&nbsp;<span class="hover-arrow">⟩</span>
  </a>
  <a class="desktop-hide button" href="/api/0.6.0/">
    <span class="text-hover-left">Check out the full API</span>&nbsp;<span class="hover-arrow">⟩</span>
  </a>
    <div class="clearfix"></div>
  </div>

  <div class="full-width-divider">
    <h2 class="orange-fg">Don't Want to Bother with the Back End?</h2>
    <p class="multicolumn">
      If you’d like to identify and locate your user addresses on the Internet so they can participate in RTC sessions, you’ll need SIP servers. You can build your own using open source <a href="guides/server-configuration/freeswitch/">FreeSWITCH</a> or <a href="guides/server-configuration/asterisk/">Asterisk</a>, or you can try out OnSIP - no system setup, modifications, maintenance, or upfront capital required.
      <a id="signup-button" class="mobile-hide button orange-bg left"
         href="https://signup.onsip.com/sipjs">
        <span class="text-hover-left">Sign up for an OnSIP free trial</span>&nbsp;<span class="hover-arrow">⟩</span>
      </a>
    </p>
    <div class="clearfix"></div>
    <a class="desktop-hide button orange-bg"
       href="https://signup.onsip.com/sipjs">
        <span class="text-hover-left">Sign up for an OnSIP free trial</span>&nbsp;<span class="hover-arrow">⟩</span>
    </a>
  </div>

  <div class="full-width-divider light-gray-bg">
    <div class="two-column-boxes highlights align-center">
      <div class="column-box">
        <div class="highlight-icon-wrapper">
          <div class="highlight-icon icon-books" onclick="window.location='/guides/'">
            <div class="hoverstate">
              <a href="/guides/">Guides</a>
            </div>
          </div>
        </div>
        <h3 class="homepage"><span>Learn</span></h3>
        <p>New to SIP.js? Our guides and docs will have you up and running in a snap.</p>
      </div>
      <div class="column-box">
        <div class="highlight-icon-wrapper">
          <div class="highlight-icon icon-people" onclick="window.location='https://groups.google.com/forum/#!forum/sip_js'">
            <div class="hoverstate">
              <a href="https://groups.google.com/forum/#!forum/sip_js">Support</a>
            </div>
          </div>
        </div>
        <h3 class="homepage"><span>Connect</span></h3>
        <p>Get answers, stay up to date, and become part of the SIP.js community.</p>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>

  <div class="full-width-divider">
    <h2>Features</h2>

    <ul class="multicolumn">
      <li>Register <a href="/faq/#what-is-sip">SIP</a> User Agents using the <a href="http://tools.ietf.org/html/rfc7118">SIP over WebSocket</a> transport</li>
      <li>Create Audio and Video sessions</li>
      <li>Send <a href="/guides/send-message/">Instant Messages</a> and view Presence</li>
      <li>Share your screen or desktop</li>
      <li>Utilize advanced call features such as early media, call hold and resume, and transfers</li>
      <li>Send DTMF with SIP INFO</li>
      <li>100% open source, 100% JavaScript</li>
      <li>All major browsers supported</li>
    </ul>
  </div>
  <div class="full-width-divider light-gray-bg">
    <h2>Trusted By</h2>
    <div class="two-column-boxes align-center" id="git-mit-images">
      <div class="column-box" style="width: 33%;">
        <img src="/shared/logos/onsip-gray.png" alt="Trusted by OnSIP" />
      </div>
      <div class="column-box" style="width: 33%;">
        <img src="/shared/logos/firertc-gray.png" alt="Trusted by FireRTC" />
      </div>
      <div class="column-box" style="width: 33%;">
        <img src="/shared/logos/ringcentral-gray.png" alt="Trusted by RingCentral" />
      </div>
    </div>
  </div>
  <div class="full-width-divider light-gray-bg">
    <div class="two-column-boxes align-center" id="git-mit-images">
      <div class="column-box" style="width: 33%;">
        <img src="/shared/logos/twilio-gray.png" alt="Trusted by Twilio" />
      </div>
      <div class="column-box" style="width: 33%;">
        <img src="/shared/logos/spacivox-gray.png" alt="Trusted by Spacivox" />
      </div>
      <div class="column-box" style="width: 33%;">
        <img src="/shared/logos/hodusoft-gray.png" alt="Trusted by Spacivox" />
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
  <!-- <div class="full-width-divider light-gray-bg">
    <div class="two-column-boxes align-center" id="git-mit-images">
      <div class="column-box">
        <img src="/shared/img/github.png" alt="github: social coding" />
      </div>
      <div class="column-box">
        <img src="/shared/img/mit-license.png" alt="MIT open-source license" />
      </div>
      <div class="clearfix"></div>
    </div>
  </div> -->
  <div class="full-width-divider">
    <h2>SIP Standards</h2>
    <h4 class="intro"><strong>SIP.js</strong> implements the following standard RFCs:</h4>

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
</div>
