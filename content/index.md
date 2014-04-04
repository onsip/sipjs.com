---
title: SIP Signaling JavaScript Library for WebRTC Developers | SIP.js
layout: overview
description: Add SIP signaling to your WebRTC app with this simple, open source JavaScript library - SIP.js.
---
<article class="wrapper group home-feature">
	<div class="feature">
		<h1>Bring your WebRTC app to life with SIP.js</h1>
		<p class="intro">A simple, intuitive, and powerful JavaScript library to add signaling to your app.</p>
	</div>
	<pre>
<span style="color:#080;font-weight:bold">var</span> ua = <span style="color:#080;font-weight:bold">new</span> SIP.<span style="color:#06B;font-weight:bold">UA</span>();
ua.<span style="color:#06B;font-weight:bold">message</span>(
  <span style=" color:#ea4b35;"><span style="color:#710">'</span>will@example.onsip.com<span style="color:#710">'</span></span>,
  <span style=" color:#ea4b35;"><span style="color:#710">'</span>Hello, world!<span style="color:#710">'</span></span>
);

<span style="color:#080;font-weight:bold">var</span> session = ua.<span style="color:#06B;font-weight:bold">invite</span>(<span style=" color:#ea4b35;"><span style="color:#710">'</span>will@example.onsip.com<span style="color:#710">'</span></span>);
session.<span style="color:#06B;font-weight:bold">on</span>(<span style=" color:#ea4b35;"><span style="color:#710">'</span>accepted<span style="color:#710">'</span></span>, function () {
  this.<span style="color:#06B;font-weight:bold">bye</span>();
});
	</pre>
	<div class="clearfix"></div>
</article>

<div class="full-width-divider">
	<ul class="wrapper highlights">
		<li>
			<h2>Get SIP.js</h2>
			<div class="highlight-icon-wrapper">
				<div class="highlight-icon icon-arrow" onclick="window.location='/download/'">
					<div class="hoverstate">
						<a href="/download/">Download</a>
					</div>
				</div>
			</div>
			<p class="subpara">Version devel is the development version and should not be used for production.</p>
		</li>
		<li>
			<h2>Learn</h2>
			<div class="highlight-icon-wrapper">
				<div class="highlight-icon icon-books" onclick="window.location='/guides/'">
					<div class="hoverstate">
						<a href="/guides/">Guides</a>
					</div>
				</div>
			</div>
			<p class="subpara">New to SIP.js? Our guides and docs will have you up and running in a snap.</p>
		</li>
		<li>
			<h2>Connect</h2>
			<div class="highlight-icon-wrapper">
				<div class="highlight-icon icon-chat" onclick="window.location='https://groups.google.com/forum/#!forum/sip_js'">
					<div class="hoverstate">
						<a href="https://groups.google.com/forum/#!forum/sip_js">Support</a>
					</div>
				</div>
			</div>
			<p class="subpara">Get answers, stay up to date and become part of the SIP.js community.</p>
		</li>
		<div class="clearfix"></div>
	</ul>
</div>

<div class="wrapper">
  <h2>Features</h2>

  <ul>
    <li>Register <a href="/faq/#what-is-sip">SIP</a> User Agents using the <a href="http://tools.ietf.org/html/rfc7118">SIP over WebSocket</a> transport</li>
    <li>Create Audio and Video sessions</li>
    <li>Send <a href="/guides/send-message/">Instant Messages</a> and view Presence</li>
    <li>Utilize advanced call features such as early media, call hold and resume, and transfers</li>
    <li>Share your screen or desktop from Chrome</li>
    <li>Send DTMF with SIP INFO</li>
    <li>100% open source, 100% JavaScript</li>
    <li>Chrome, Firefox, and Opera supported</li>
  </ul>

  <h2>SIP Standards</h2>
  <p><strong>SIP.js</strong> implements the following standard RFCs:</p>

  <ul>
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
