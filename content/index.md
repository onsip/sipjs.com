---
title: SIP Signaling JavaScript Library for WebRTC Developers | SIP.js
layout: overview
description: Add SIP signaling to your WebRTC app with this simple, open source JavaScript library - SIP.js.
popup: true
---
<div class="wrapper-bg-extend">
  <article class="group home-feature" id="feature-selector">
	<div class="feature">
	  <h1>WebRTC Made Easy for Javascript Developers</h1>
	  <h4 class="intro">A simple yet powerful JS library that takes care of WebRTC and SIP signaling for you</h4>
	</div>
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
      <li id="feature-data-channel">
        <img class="icon-unselected"
             src="/shared/img/data-channel.png" alt="message" />
        <img class="icon-selected"
             src="/shared/img/data-channel-highlight.png" alt="message highlight" />
        <h4>data channel</h4>
      </li>
    </ul>
    <!-- This draws an arrow that we use to indicate the highlighted feature -->
    <svg class="arrow" id="feature-arrow" width="60" height="34" viewBox="0 0 80 45">
      <polygon points="40,5 75,40 5,40" />
    </svg>
  </article>

  <div class="full-width-divider mid-gray-bg feature" id="feature-demo">
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
    </div>
    <div id="content-data-channel">
      <h2>Send Real-Time Data In A Flash</h2>
      <h4 class="intro">Go ahead. Upload a file as Alice and Download it as Bob.</h4>
      <div class="two-column-boxes">
        <div class="column-box">
          <div class="demo-window">
            <div class="demo-view">
              <div id="alice-data-display" class="message-display">
                <p class="message"><span class="message-from">Alice:</span> <span class="message-body placeholder">No data sent yet</span></p>
                <p class="message"><span class="message-from">Bob:</span> <span class="message-body placeholder">No data received yet</span></p>
              </div>
            </div>
            <span class="file-chooser-hack">
              <button id="alice-file-choose-button" class="file-choose-button dark-gray-bg" type="button">choose a file to send</button>
              <input id="alice-file-choose-input" type="file" name="file" class="file-choose-button" />
            </span>
            <span id="alice-filename" class="message-body">example_file_name.jpg</span>
            <div class="left">
              <h4>Alice's View</h4>
              <h5>Demo user one</h5>
            </div>
            <button id="alice-data-share-button" class="right" type="button">share</button>
            <div class="clearfix"></div>
          </div>
        </div>
        <div class="column-box">
          <div class="demo-window">
            <div class="demo-view">
              <div id="bob-data-display" class="message-display">
                <p class="message"><span class="message-from">Bob:</span> <span class="message-body placeholder">No data sent yet</span></p>
                <p class="message"><span class="message-from">Alice:</span> <span class="message-body placeholder">No data received yet</span></p>
              </div>
            </div>
            <span class="file-chooser-hack">
              <button id="bob-file-choose-button" class="file-choose-button dark-gray-bg" type="button">choose a file to send</button>
              <input id="bob-file-choose-input" type="file" name="file" class="file-choose-button" />
            </span>
            <span id="bob-filename" class="message-body">example_file_name.jpg</span>
            <div class="clearfix"></div>
            <div class="left">
              <h4>Bob's View</h4>
              <h5>Demo user two</h5>
            </div>
            <button id="bob-data-share-button" class="right" type="button">share</button>
            <div class="clearfix"></div>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
    <svg class="arrow" id="demo-arrow" width="60" height="34" viewBox="0 0 80 45">
      <polygon points="40,5 75,40 5,40" />
    </svg>
  </div>

  <div class="full-width-divider orange-bg">
    <div class="two-column-boxes align-left">
      <div class="column-box">
        <h3>See How It's Done</h3>
        <p>
          The code displayed on the right is what powers the selected demo from Alice’s end, although Bob’s code would be very similar. SIP.js allows you to utilize WebRTC’s APIs using just JavaScript. To check out the full code for all three demos, click the button below.
        </p>

        <a class="button" href="/">
          <span id="code-button-text">See Full Demo Code</span>
          <span class="hover-arrow">⟩</span>
        </a>
      </div>
      <div class="column-box">
<div id="code-video-audio" markdown="1">
~~~~ javascript
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
~~~~
</div>
<div id="code-message" markdown="1">
~~~~ javascript
CODE MESSAGE
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
~~~~
</div>
<div id="code-data-channel" markdown="1">
~~~~ javascript
CODE DATA CHANNEL
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
~~~~
</div>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>

  <div class="full-width-divider">
    <h2 class="orange-fg">Don't Want to Bother with the Back End?</h2>
    <p class="multicolumn">
      If you’d like to identify and locate your user addresses on the Internet so they can participate in RTC sessions, you’ll need SIP servers. You can build your own using open source <a href="http://www.freeswitch.org/">FreeSWITCH</a> or <a href="http://www.asterisk.org/">Asterisk</a>, or you can try out OnSIP Network - no system setup, modifications, maintenance, or upfront capital required.
      <a class="button orange-bg left" href="https://signup.onsip.com/network">Sign up for a free OnSIP sandbox account</a>
    </p>
    <div class="clearfix"></div>
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
        <h3>Learn</h3>
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
        <h3>Connect</h3>
        <p>Get answers, stay up to date, and become part of the SIP.js community.</p>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>

  <div class="full-width-divider dark-gray-bg">
    <div class="two-column-boxes align-center">
      <div class="column-box">
        <h3>Built An App Using SIP.js?</h3>
      </div>
      <div class="column-box">
        <button id="success-opener" class="orange-bg">We want to hear about it!</button>
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
      <li>Share your screen or desktop from Chrome</li>
      <li>Utilize advanced call features such as early media, call hold and resume, and transfers</li>
      <li>Send DTMF with SIP INFO</li>
      <li>100% open source, 100% JavaScript</li>
      <li>Chrome, Firefox, and Opera supported</li>
    </ul>
  </div>
  <div class="full-width-divider light-gray-bg">
    <div class="two-column-boxes align-center" id="git-mit-images">
      <div class="column-box">
        <img src="/shared/img/github.png" alt="github: social coding" />
      </div>
      <div class="column-box">
        <img src="/shared/img/mit-license.png" alt="MIT open-source license" />
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
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
