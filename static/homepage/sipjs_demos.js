// sipjs_demos.js
//
// Even though both "Alice" and "Bob" are running on the same computer,
// this demo behaves as if the dialog was an SIP call over a network.

var URL = window.URL || window.webkitURL;

function getCookie(key) {
    var re = new RegExp('(?:(?:^|.*;\s*) ?' + key + '\s*\=\s*([^;]*).*$)|^.*$');
    return document.cookie.replace(re, "$1");

}

// This demo uses unauthenticated users on the "sipjs.onsip.com" demo domain.
// To allow multiple users to run the demo without playing a game of
// chatroulette, we give both callers in the demo a random token and then only
// make calls between users with these token suffixes.
// So, you still might run into a user besides yourself.
function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i)
        result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}
// Each session gets a token that expires 1 day later. This is so we minimize
// the number of users we register for the SIP domain, because SIP hosts
// generally have limits on the number of registered users you may have in total
// or over a period of time.
var token = getCookie('onsipToken');
if (token === '') {
    token = randomString(32, ['0123456789',
                              'abcdefghijklmnopqrstuvwxyz',
                              'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].join(''));
    var d = new Date();
    d.setTime(d.getTime() + 1000*60*60*24); // expires in 1 day
    document.cookie = ('onsipToken=' + token + ';'
                       + 'expires=' + d.toUTCString() + ';');
}
var domain = 'sipjs.onsip.com';
var aliceURI      = 'alice.' + window.token + '@' + domain;
var aliceName     = 'Alice';
var aliceButton   = document.getElementById('alice-video-button');

var bobURI        = 'bob.' + window.token + '@' + domain;
var bobName       = 'Bob';
var bobButton     = document.getElementById('bob-video-button');

// Function: mediaOptions
//   A shortcut function to construct the media options for an SIP session.
//
// Arguments:
//   audio: whether or not to send audio in a SIP WebRTC session
//   audio: whether or not to send audio in a SIP WebRTC session
//   remoteRender: the video tag to render the callee's remote video in. Can be null
//   localRender: the video tag to render the caller's local video in. Can be null
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

// Function: createUA
//   creates a user agent with the given arguments plugged into the UA
//   configuration. This is a standard user agent for WebRTC calls.
//   For a user agent for data transfer, see createDataUA
//
// Arguments:
//   callerURI: the URI of the caller, aka, the URI that belongs to this user.
//   displayName: what name we should display the user as
function createUA(callerURI, displayName) {
    var configuration = {
        traceSip: true,
        uri: callerURI,
        displayName: displayName
    };
    var userAgent = new SIP.UA(configuration);
    return userAgent;
}

// Function: makeCall
//   Makes a call from a user agent to a target URI
//
// Arguments:
//   userAgent: the user agent to make the call from
//   target: the URI to call
//   audio: whether or not to send audio in a SIP WebRTC session
//   audio: whether or not to send audio in a SIP WebRTC session
//   remoteRender: the video tag to render the callee's remote video in. Can be null
//   localRender: the video tag to render the caller's local video in. Can be null
function makeCall(userAgent, target, audio, video, remoteRender, localRender) {
    var options = mediaOptions(audio, video, remoteRender, localRender);
    // makes the call
    var session = userAgent.invite('sip:' + target, options);
    return session;
}

// Function: setUpVideoInterface
//   Sets up the button for a user to manage calling and hanging up
//
// Arguments:
//   userAgent: the user agent the button is associated with
//   target: the target URI that the button calls and hangs up on
//   remoteRenderId: the video tag to render the callee's remote video in.
//                   Can be null
//   buttonId: the id of the button to set up
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

// Function: setUpMessageInterface
//   Sets up the chat interface for text messaging
//
// Arguments:
//   userAgent: the local user agent that sends and receives messages
//   target: the target URI that our local user agent communicates with
//   messageRenderId: the ID of where we display sent and received chat messages
//   messageInputId: the ID for the text area that the local user agent types
//                   his or her messages into
//   buttonId: the ID of the button that actually sends the given input message
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

// Function: createMsgTag
//   creates the HTML tag and its children for a given message.
//
// Arguments:
//   from: the display name of who the message came from
//   msgBody: the actual body content of the message
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


// Function: createDataUA
//   Creates a user agent with the given parameters. This user agent is only for
//   sending data, so it has a special media handler factory for the
//   RTCDataChannel.
//
// Arguments:
//   callerURI: the URI of the caller, aka, the URI that belongs to this user.
//   displayName: what name we should display the user as
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
                    release: function (stream) {
                        // no-op
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

// Function: setUpDataInterface
//   Sets up the file transfer interface for the WebRTC data channel.
//
// Arguments:
//   userAgent: the local user agent that sends and receives data files
//   target: the target URI that the local user agent sends data to and
//           receives data from
//   dataRenderId: the display box where we render communications about sent and
//                 received data
//   fileInputId: the ID of the file input tag where the user selects the file
//                to send.
//   filenameDisplayId: the name of the ID that displays the currently chosen
//                      filename
//   dataShareButtonId: the ID of the button that sends the chosen file to the
//                      target URI
//   errorMsgContainerId: the ID of the container element for error messages
function setUpDataInterface(userAgent, target,
                            dataRenderId,
                            fileInputId,
                            filenameDisplayId,
                            dataShareButtonId,
                            errorMsgContainerId) {
    // Target has a 'data.' prefix
    var dataTarget = 'data.' + target;
    var dataRender = document.getElementById(dataRenderId);
    var fileInput = document.getElementById(fileInputId);
    var filenameDisplay = document.getElementById(filenameDisplayId);
    var dataShareButton = document.getElementById(dataShareButtonId);
    var errorMsgContainer = document.getElementById(errorMsgContainerId);
    if (errorMsgContainer.childNodes.length === 0) {
        errorMsgContainer.appendChild(document.createTextNode(''));
    }

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
    // We do not support file chunking, so we can only send small files.
    var maxChunkSize = 16000; // 16 KB
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
            // Reset the loadedFile variable, since we are supposed to load in a
            // new file but have not done so yet.
            // This value might not be set if the file is too large. This is
            // intended. We later prevent ourselves from sending a null file.
            loadedFile = null;
            file = tmpFile;

            var filename = file.name;
            filenameDisplay.childNodes[0].nodeValue = filename;

            // File is small enough to send, so we load it.
            if (file.size <= maxChunkSize) {
                // Clear the error message
                errorMsgContainer.childNodes[0].nodeValue = '';
                // errorMsgContainer.nodeValue = '';
                var reader = new FileReader();
                reader.onload = (function (e) {
                    loadedFile = e.target.result;
                });
                reader.readAsArrayBuffer(file);
            }
            // The file is too large to send. We still display its name, but we
            // do not set the loadedFile variable, which will prevent us from
            // sending it.
            else {
                // DBM: foobar
                var errorStr = 'File too large to send using demo (chunking not supported)';
                errorMsgContainer.childNodes[0].nodeValue = errorStr;
                // errorMsgContainer.nodeValue = errorStr;
            }
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

// Function: createDataMsgTag
//   Similar to the createMsgTag, but we add in an extra section with a link to
//   the file sent or received.
//   To download files, they must be anchors to the file reference.
//   Typically, you will create your dataURI by calling URL.createObjectURL,
//   which creates a unique URI (for some reason it's still called a URL).
//
// Arguments:
//   from: the display name of who the message came from
//   msgBody: the actual body content of the message
//   filename: the name of the file we are sending
//   dataURI: the data URI for the file being sent
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


if (SIP.WebRTC.isSupported()) {
    // Javascript is not disabled and WebRTC works, so hide the
    // "demo-error" div.
    var demoErrorDiv = document.getElementById('demo-error');
    demoErrorDiv.style.display = 'none';
    var featureArrow = document.getElementById('feature-arrow');
    for (var i=0; i < featureArrow.children.length; i++) {
        var child = featureArrow.children[i];
        if (child.tagName === 'polygon') {
            child.style.fill = 'rgb(193,191,182)';
            child.style.stroke = 'rgb(193,191,182)';
        }
    }

    // Now we do SIP.js stuff
    var aliceUA = createUA(aliceURI, aliceName);
    var bobUA   = createUA(bobURI, bobName);
    /*
     * Custom media handler factories don't have great compatibility with
     * our WebRTC function caching (like SIP.WebRTC.RTCPeerConnection)
     */
    var aliceDataUA = createDataUA(aliceURI, aliceName);
    var bobDataUA = createDataUA(bobURI, bobName);
    // Unregister the user agents and terminate all active sessions when the
    // window closes or when we navigate away from the page
    window.onunload = function () {
        aliceUA.stop();
        bobUA.stop();
        aliceDataUA.stop();
        bobDataUA.stop();
    }

    setUpVideoInterface(aliceUA, bobURI, 'video-of-bob', 'alice-video-button');
    setUpVideoInterface(bobUA, aliceURI, 'video-of-alice', 'bob-video-button');
    setUpMessageInterface(aliceUA, bobURI,
                          'alice-message-display',
                          'alice-message-input',
                          'alice-message-button');
    setUpMessageInterface(bobUA, aliceURI,
                          'bob-message-display',
                          'bob-message-input',
                          'bob-message-button');
    setUpDataInterface(aliceDataUA, bobURI,
                       'alice-data-display',
                       'alice-file-choose-input',
                       'alice-filename',
                       'alice-data-share-button',
                       'alice-file-error-msg');
    setUpDataInterface(bobDataUA, aliceURI,
                       'bob-data-display',
                       'bob-file-choose-input',
                       'bob-filename',
                       'bob-data-share-button',
                       'bob-file-error-msg');
}
