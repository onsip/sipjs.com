---
title: SIP.js
layout: overview
---
<article class="wrapper group home-feature">
	<div class="feature">
		<h1>Leverage the power of SIP.js in your WebRTC app</h1>
		<p class="intro">Build audio, video, and realtime data into your into your application. SIP.js is fast, lightweight, and easy to use.</p>
	</div>
	<pre>
<span style="color:#080;font-weight:bold">var</span> ua = <span style="color:#080;font-weight:bold">new</span> SIP.<span style="color:#06B;font-weight:bold">UA</span>();
ua.<span style="color:#06B;font-weight:bold">message</span>(
  <span style="background-color:hsla(0,100%,50%,0.05); color:#D20;"><span style="color:#710">'</span>will@example.onsip.com<span style="color:#710">'</span></span>,
  <span style="background-color:hsla(0,100%,50%,0.05); color:#D20;"><span style="color:#710">'</span>Hello, world!<span style="color:#710">'</span></span>
);

<span style="color:#080;font-weight:bold">var</span> session = ua.<span style="color:#06B;font-weight:bold">invite</span>(<span style="background-color:hsla(0,100%,50%,0.05); color:#D20;"><span style="color:#710">'</span>will@example.onsip.com<span style="color:#710">'</span></span>);
session.<span style="color:#06B;font-weight:bold">on</span>(<span style="background-color:hsla(0,100%,50%,0.05); color:#D20;"><span style="color:#710">'</span>accepted<span style="color:#710">'</span></span>, function () {
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
				<div class="highlight-icon icon-arrow">
					<div class="hoverstate">
						<a href="https://github.com/onsip/sip.js" target="_blank">Github</a>
						<hr>
						<a href="/download/">Download</a>
					</div>
				</div>
			</div>
			<p class="subpara">Version devel is the development version and should not be used for production.</p>
		</li>
		<li>
			<h2>Learn</h2>
			<div class="highlight-icon-wrapper">
				<div class="highlight-icon icon-books">
					<div class="hoverstate">
						<a href="/guides/">Guides</a>
						<hr>
						<a href="/api/">API Docs</a>
					</div>
				</div>
			</div>
			<p class="subpara">New to SIP.js? Our guides and docs will have you up and running in a snap.</p>
		</li>
		<li>
			<h2>Connect</h2>
			<div class="highlight-icon-wrapper">
				<div class="highlight-icon icon-chat">
					<div class="hoverstate">
						<a href="https://groups.google.com/forum/#!forum/sip_js">Support</a>
						<hr>
						<a href="https://groups.google.com/forum/#!forum/sip_js">Newsletter</a>
					</div>
				</div>
			</div>
			<p class="subpara">Get answers, stay up to date and become part of the SIP.js community.</p>
		</li>
		<div class="clearfix"></div>
	</ul>
</div>
