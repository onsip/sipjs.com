---
title: SIP Signaling JavaScript Library for WebRTC Developers | SIP.js
layout: overview
description: Add SIP signaling to your WebRTC app with this simple, open source JavaScript library - SIP.js.
popup: true
---
<div class="wrapper-bg-extend">
  <article class="group home-feature">
	<div class="feature">
	  <h1>WebRTC Made Easy for Javascript Developers</h1>
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
        <li id="feature-data-channel">
          <img class="icon-unselected"
               src="/shared/img/data-channel.png" alt="message" />
          <img class="icon-selected"
               src="/shared/img/data-channel-highlight.png" alt="message highlight" />
          <h4>data channel</h4>
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
          <svg class="arrow mobile-hide demo-arrow"
               width="60" height="34" viewBox="0 0 80 45">
            <polygon points="40,5 75,40 5,40" />
          </svg>
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
          <svg class="arrow mobile-hide demo-arrow"
               width="60" height="34" viewBox="0 0 80 45">
            <polygon points="40,5 75,40 5,40" />
          </svg>
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
                <p class="message"><span class="message-body placeholder">No files yet sent or received</span></p>
              </div>
            </div>
            <span class="file-chooser-hack">
              <button id="alice-file-choose-button" class="file-choose-button" type="button">choose a file to send</button>
              <input id="alice-file-choose-input" type="file" name="file" class="file-choose-button" />
            </span>
            <span id="alice-filename" class="message-body">no file selected</span>
            <div class="left">
              <h4>Alice's View</h4>
              <h5>Demo user one</h5>
            </div>
            <button id="alice-data-share-button" class="right" type="button">share</button>
            <div class="clearfix"></div>
            <svg class="arrow mobile-hide demo-arrow"
                 width="60" height="34" viewBox="0 0 80 45">
              <polygon points="40,5 75,40 5,40" />
            </svg>
          </div>
        </div>
        <div class="column-box">
          <div class="demo-window">
            <div class="demo-view">
              <div id="bob-data-display" class="message-display">
                <p class="message"><span class="message-body placeholder">No files yet sent or received</span></p>
              </div>
            </div>
            <span class="file-chooser-hack">
              <button id="bob-file-choose-button" class="file-choose-button" type="button">choose a file to send</button>
              <input id="bob-file-choose-input" type="file" name="file" class="file-choose-button" />
            </span>
            <span id="bob-filename" class="message-body">no file selected</span>
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
  </div>

  <div class="full-width-divider orange-bg">
    <div id="code-intro" class="left">
      <h3>See How It's Done</h3>
      <p class="left">
      The code displayed on the right is what powers the selected demo from Alice’s end, although Bob’s code would be very similar. SIP.js allows you to utilize WebRTC’s APIs using just JavaScript. To check out the full code for all three demos, click the button below.
      </p>
    </div>
<div class="code-wrapper">
<div class="index-demo-code" id="code-video-audio" markdown="1">
~~~~ javascript
var domain = 'sipjs.onsip.com';
var aliceURI      = 'alice' + '@' + domain;
var aliceName     = 'Alice';
var aliceButton   = document.getElementById('alice-video-button');

var bobURI        = 'bob' + '@' + domain;
var bobName       = 'Bob';
var bobButton     = document.getElementById('bob-video-button');

// A shortcut function to construct the media options for an SIP session.
function mediaOptions(audio, video, remoteRender, localRender) {
    return {
        media: {
            constraints: {
                audio: audio,
                video: video
            },
            render: {
                remote: {
                    video: remoteRender
                },
                local: {
                    video: localRender
                }
            }
        }
    };
}

// Creates a user agent with the given arguments plugged into the UA
// configuration. This is a standard user agent for WebRTC calls.
// For a user agent for data transfer, see createDataUA
function createUA(callerURI, displayName) {
    var configuration = {
        traceSip: true,
        uri: callerURI,
        displayName: displayName
    };
    var userAgent = new SIP.UA(configuration);
    return userAgent;
}

// Makes a call from a user agent to a target URI
function makeCall(userAgent, target, audio, video, remoteRender, localRender) {
    var options = mediaOptions(audio, video, remoteRender, localRender);
    // makes the call
    var session = userAgent.invite('sip:' + target, options);
    return session;
}

// Sets up the button for a user to manage calling and hanging up
function setUpVideoInterface(userAgent, target, remoteRenderId, buttonId) {
    // true if the button should initiate a call,
    // false if the button should end a call
    var onCall = false;
    var session;
    var remoteRender = document.getElementById(remoteRenderId);
    var button = document.getElementById(buttonId);

    // Handling invitations to calls.
    // We automatically accept invitations and toggle the button state based on
    // whether we are in a call our not.
    // Also, for each new call session, we need to add an event handler to set
    // the correct button state when we receive a "bye" request.
    userAgent.on('invite', function (incomingSession) {
        onCall = true;
        session = incomingSession;
        var options = mediaOptions(false, true, remoteRender, null);
        button.firstChild.nodeValue = 'hang up';
        remoteRender.style.visibility = 'visible';
        session.accept(options);
        session.on('bye', function () {
            onCall = false;
            button.firstChild.nodeValue = 'video';
            remoteRender.style.visibility = 'hidden';
            session = null;
        });
    });
    // The button either makes a call, creating a session and binding a listener
    // for the "bye" request, or it hangs up a current call.
    button.addEventListener('click', function () {
        // Was on a call, so the button press means we are hanging up
        if (onCall) {
            onCall = false;
            button.firstChild.nodeValue = 'video';
            remoteRender.style.visibility = 'hidden';
            session.bye();
            session = null;
        }
        // Was not on a call, so the button press means we are ringing someone
        else {
            onCall = true;
            button.firstChild.nodeValue = 'hang up';
            remoteRender.style.visibility = 'visible';
            session = makeCall(userAgent, target,
                               false, true,
                               remoteRender, null);
            session.on('bye', function () {
                onCall = false;
                button.firstChild.nodeValue = 'video';
                remoteRender.style.visibility = 'hidden';
                session = null;
            });
        }
    });
}

var aliceUA = createUA(aliceURI, aliceName);
setUpVideoInterface(aliceUA, bobURI, 'video-of-bob', 'alice-video-button');
~~~~
</div>
</div>
<div class="code-wrapper">
<div class="index-demo-code" id="code-message" markdown="1">
~~~~ javascript
var domain = 'sipjs.onsip.com';
var aliceURI      = 'alice' + '@' + domain;
var aliceName     = 'Alice';
var aliceButton   = document.getElementById('alice-video-button');

var bobURI        = 'bob' + '@' + domain;
var bobName       = 'Bob';
var bobButton     = document.getElementById('bob-video-button');

// Sets up the chat interface for text messaging
function setUpMessageInterface(userAgent, target,
                               messageRenderId, messageInputId, buttonId) {
    var messageRender = document.getElementById(messageRenderId);
    var messageInput = document.getElementById(messageInputId);
    var button = document.getElementById(buttonId);

    function sendMessage() {
        var msg = messageInput.value;
        // Only send a message if the message is non-empty
        if (msg !== '') {
            messageInput.value = '';
            userAgent.message(target, msg);
        }
    }

    // We have placeholder text in the message render box. It should be deleted
    // after we have sent or received our first message. This keeps track of
    // that.
    var noMessages = true;

    // Receive a message and put it in the message display div
    userAgent.on('message', function (msg) {
        // If we have not received any messages yet, remove the placeholder
        // text.
        if (noMessages) {
            noMessages = false;
            if (messageRender.childElementCount > 0)
                messageRender.removeChild(messageRender.children[0]);
        }
        var msgTag = createMsgTag(msg.remoteIdentity.displayName, msg.body);
        messageRender.appendChild(msgTag);
    });
    // Cut the content from the input textarea and send it
    button.addEventListener('click', function () {
        sendMessage();
    });
    // Register pressing of the "enter" key while in textarea to send a message.
    // If user presses shift while entering, then add a newline instead.
    messageInput.onkeydown = (function(e) {
        if(e.keyCode == 13 && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
}

// Creates the HTML tag and its children for a given message.
function createMsgTag(from, msgBody) {
    var msgTag = document.createElement('p');
    msgTag.className = 'message';
    // Create the "from" section
    var fromTag = document.createElement('span');
    fromTag.className = 'message-from';
    fromTag.appendChild(document.createTextNode(from + ':'));
    // Create the message body
    var msgBodyTag = document.createElement('span');
    msgBodyTag.className = 'message-body';
    msgBodyTag.appendChild(document.createTextNode(' ' + msgBody));
    // Put everything in the message tag
    msgTag.appendChild(fromTag);
    msgTag.appendChild(msgBodyTag);
    return msgTag;
}

var aliceUA = createUA(aliceURI, aliceName);
setUpMessageInterface(aliceUA, bobURI,
                      'alice-message-display',
                      'alice-message-input',
                      'alice-message-button');
~~~~
</div>
</div>
<div class="code-wrapper">
<div class="index-demo-code" id="code-data-channel" markdown="1">
~~~~ javascript
var domain = 'sipjs.onsip.com';
var aliceURI      = 'alice' + '@' + domain;
var aliceName     = 'Alice';
var aliceButton   = document.getElementById('alice-video-button');

var bobURI        = 'bob' + '@' + domain;
var bobName       = 'Bob';
var bobButton     = document.getElementById('bob-video-button');

// Creates a user agent with the given parameters. This user agent is only for
// sending data, so it has a special media handler factory for the
// RTCDataChannel.
function createDataUA(callerURI, displayName) {
    var dataURI = 'data.' + callerURI;
    var configuration = {
        traceSip: true,
        uri: dataURI,
        displayName: displayName,
        mediaHandlerFactory: function mediaHandlerFactory(session, options) {

            /* Like a default mediaHandler, but no streams to manage */
            var self = new SIP.WebRTC.MediaHandler(session, {
                mediaStreamManager: {
                    acquire: function (onSuccess) {
                        // Must be async for on('dataChannel') callback to have a chance
                        setTimeout(onSuccess.bind(null, {}), 0);
                    },
                    release: function (onSuccess) {
                        setTimeout(onSuccess, 0);
                    }
                }
            });

            // No stream to add. Assume success.
            self.addStream = function addStream(stream, success, failure) {
                success();
            };

            return self;
        }
    };

    return dataUA = new SIP.UA(configuration);
}

// Sets up the file transfer interface for the WebRTC data channel.
function setUpDataInterface(userAgent, target,
                            dataRenderId,
                            fileInputId,
                            filenameDisplayId,
                            dataShareButtonId) {
    // Target has a 'data.' prefix
    var dataTarget = 'data.' + target;
    var dataRender = document.getElementById(dataRenderId);
    var fileInput = document.getElementById(fileInputId);
    var filenameDisplay = document.getElementById(filenameDisplayId);
    var dataShareButton = document.getElementById(dataShareButtonId);

    // The open data transfer session
    var session;
    // The File object for the chosen local file
    var file = null;
    // An ArrayBuffer of the loaded local File that has actually been loaded
    // into memory
    var loadedFile = null;
    // Metadata for the received file. The metadata has "name" and "type"
    var receivedFileMetadata;
    // The actual received file data
    var receivedFileData;
    // The Blob object that combines the received file data and file type.
    // We cannot construct File objects, so we must make a Blob, which does not
    // have a file name.
    var receivedFile;

    // We have placeholder text in the message render box. It should be deleted
    // after we have sent or received our first message. This keeps track of
    // that.
    var noMessages = true;

    // When we receive an invite, we must set up our media handler to read in
    // data from over the RTCDataChannel.
    // Each data transmission consists of three parts:
    //   1) a JSON text object with the fields:
    //          "name" --> file name
    //          "type" --> file type
    //   2) an ArrayBuffer of binary content, which is the actual file.
    //   3) a terminating single newline character
    // The only order restriction on the transmission is that parts 1 and 2 come
    // before the terminating part 3.
    //
    // This then makes a link to the file and puts the file received notice and
    // link into the message display box.
    // After a terminating newline, the session is closed. So, each session has
    // only one file transfer.
    userAgent.on('invite', function (session) {
        session.mediaHandler.on('dataChannel', function (dataChannel) {
            dataChannel.onmessage = function (event) {
                // The terminating empty newline.
                // Here we construct our Blob object and create a download URL
                // and plug it into the message render box.
                if (typeof(event.data) === 'string' && event.data === '\n') {
                    receivedFile = new Blob([receivedFileData],
                                            {type: receivedFileMetadata.type});
                    var fileUrl = URL.createObjectURL(receivedFile);
                    var msgTag = createDataMsgTag(
                        session.remoteIdentity.displayName,
                        'data received',
                        receivedFileMetadata.name,
                        fileUrl
                    );
                    if (noMessages) {
                        dataRender.removeChild(dataRender.children[0]);
                        noMessages = false;
                    }
                    dataRender.appendChild(msgTag);
                    session.bye();
                // The file metadata
                } else if (typeof(event.data) === 'string') {
                    receivedFileMetadata = JSON.parse(event.data);
                // The actual file content
                } else {
                    receivedFileData = event.data;
                }
            };
        });
        session.accept();
    });

    // This fires every time we choose a new file.
    // We display what file we have selected and load it into an ArrayBuffer.
    fileInput.addEventListener('change', function (event) {
        var tmpFile = event.target.files[0];
        if (tmpFile !== undefined && tmpFile !== file) {
            file = tmpFile;

            var filename = file.name;
            filenameDisplay.childNodes[0].nodeValue = filename;

            var reader = new FileReader();
            reader.onload = (function (e) {
                loadedFile = e.target.result;
            });
            reader.readAsArrayBuffer(file);
        }
    });

    // This shares the loaded file.
    // We invite the target and then send the data to them and wait for a "BYE"
    // response to signal that they got the file.
    dataShareButton.addEventListener('click', function () {
        // No video or audio, only data
        var options = {
            media: {
                constraints: {
                    audio: false,
                    video: false
                },
                dataChannel: true
            }
        };
        // Make sure we don't try to send nothing
        if (loadedFile !== null) {
            session = userAgent.invite('sip:' + dataTarget, options);

            session.mediaHandler.on('dataChannel', function (dataChannel) {
                dataChannel.onopen = (function () {
                    // Send JSON data about file
                    dataChannel.send(JSON.stringify({
                        name: file.name,
                        type: file.type
                    }));
                    dataChannel.send(loadedFile);
                    // Send empty newline to end transmission
                    dataChannel.send('\n');
                });
            });

            // Handling the BYE response, which means that we successfully
            // sent the file.
            session.on('bye', function (req) {
                var msgTag = createDataMsgTag(
                    userAgent.configuration.displayName,
                    'data sent',
                    file.name,
                    URL.createObjectURL(file)
                );
                if (noMessages) {
                    dataRender.removeChild(dataRender.children[0]);
                    noMessages = false;
                }
                dataRender.appendChild(msgTag);
            });
        }
    });
}

// Creates the HTML tag and its children for a given message.
function createMsgTag(from, msgBody) {
    var msgTag = document.createElement('p');
    msgTag.className = 'message';
    // Create the "from" section
    var fromTag = document.createElement('span');
    fromTag.className = 'message-from';
    fromTag.appendChild(document.createTextNode(from + ':'));
    // Create the message body
    var msgBodyTag = document.createElement('span');
    msgBodyTag.className = 'message-body';
    msgBodyTag.appendChild(document.createTextNode(' ' + msgBody));
    // Put everything in the message tag
    msgTag.appendChild(fromTag);
    msgTag.appendChild(msgBodyTag);
    return msgTag;
}

// Similar to the createMsgTag, but we add in an extra section with a link to
// the file sent or received.
// To download files, they must be anchors to the file reference.
// Typically, you will create your dataURI by calling URL.createObjectURL,
// which creates a unique URI (for some reason it's still called a URL).
function createDataMsgTag(from, msgBody, filename, dataURI) {
    var msgTag = createMsgTag(from, msgBody + ' ');
    var fileLinkTag = document.createElement('a');
    fileLinkTag.className = 'message-link';
    fileLinkTag.setAttribute('href', dataURI);
    // Set the filename of the Blob and indicate that it should download when we
    // click on it, not open up somewhere else.
    fileLinkTag.setAttribute('download', filename);
    fileLinkTag.appendChild(document.createTextNode(filename));
    msgTag.appendChild(fileLinkTag);
    return msgTag;
}

var aliceDataUA = createDataUA(aliceURI, aliceName);
setUpDataInterface(aliceDataUA, bobURI,
                   'alice-data-display',
                   'alice-file-choose-input',
                   'alice-filename',
                   'alice-data-share-button');
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
      If you’d like to identify and locate your user addresses on the Internet so they can participate in RTC sessions, you’ll need SIP servers. You can build your own using open source <a href="http://www.freeswitch.org/">FreeSWITCH</a> or <a href="http://www.asterisk.org/">Asterisk</a>, or you can try out OnSIP Network - no system setup, modifications, maintenance, or upfront capital required.
      <a id="signup-button" class="mobile-hide button orange-bg left"
         href="https://signup.onsip.com/network">
        <span class="text-hover-left">Sign up for a free OnSIP sandbox account</span>&nbsp;<span class="hover-arrow">⟩</span>
      </a>
    </p>
    <div class="clearfix"></div>
    <a class="desktop-hide button orange-bg"
       href="https://signup.onsip.com/network">
        <span class="text-hover-left">Sign up for a free OnSIP sandbox account</span>&nbsp;<span class="hover-arrow">⟩</span>
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
        <h3><span>Learn</span></h3>
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
        <h3><span>Connect</span></h3>
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
      <div class="column-box mobile-hide" id="success-column-box">
        <button id="success-opener" class="orange-bg">We want to hear about it!</button>
      </div>
      <div class="column-box desktop-hide" id="success-column-newpage">
        <a id="success-newpage" class="button orange-bg"
           href="/success-story/">We want to hear about it!</a>
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
