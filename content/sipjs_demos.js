// sipjs_demos.js
//
// Even though both "Alice" and "Bob" are running on the same computer,
// this demo behaves as if the dialog was an SIP call over a network.

var URL = window.URL || window.webkitURL;

// This demo uses unauthorized users on the "sipjs.onsip.com" demo domain.
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
var token = randomString(32, ['0123456789',
                              'abcdefghijklmnopqrstuvwxyz',
                              'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].join(''));

var domain = 'sipjs.onsip.com';
// var aliceURI      = 'alice.' + window.token + '@' + domain;
var aliceURI      = 'alice' + '@' + domain;
var aliceName     = 'Alice';
var videoOfAlice  = document.getElementById('video-of-alice');
var aliceButton   = document.getElementById('alice-video-button');

// var bobURI        = 'bob.' + window.token + '@' + domain;
var bobURI        = 'bob' + '@' + domain;
var bobName       = 'Bob';
var videoOfBob    = document.getElementById('video-of-bob');
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
//   remoteRender: the video tag to render the callee's remote video in. Can be null
//   buttonId: the id of the button to set up
function setUpVideoInterface(userAgent, target, remoteRender, buttonId) {
    // true if the button should initiate a call,
    // false if the button should end a call
    var onCall = false;
    var session;
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
        file = event.target.files[0];
        var filename = file.name;
        filenameDisplay.childNodes[0].nodeValue = filename;

        var reader = new FileReader();
        reader.onload = (function (e) {
            loadedFile = e.target.result;
        });
        reader.readAsArrayBuffer(file);
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

// Similar to the createMsgTag, but we add in an extra section with a link to
// the file sent or received.
// To download files, they must be anchors to the file reference.
// Typically, you will create your dataURI by calling URL.createObjectURL,
// which creates a unique URI (for some reason it's still called a URL).
function createDataMsgTag(from, msgBody, filename, dataURI) {
    var msgTag = createMsgTag(from, msgBody);
    var fileLinkTag = document.createElement('a');
    fileLinkTag.className = 'message-link';
    fileLinkTag.setAttribute('href', dataURI);
    // Set the filename of the Blob and indicate that it should download when we
    // click on it, not open up somewhere else.
    fileLinkTag.setAttribute('download', filename);
    fileLinkTag.appendChild(document.createTextNode(' ' + filename));
    msgTag.appendChild(fileLinkTag);
    return msgTag;
}


// We disable audio because you're going to call yourself in the demo,
// and then the audio would just echo.
var aliceUA = createUA(aliceURI, aliceName);
var bobUA   = createUA(bobURI, bobName);
/*
 * Custom media handler factories don't have great compatibility with
 * our WebRTC function caching (like SIP.WebRTC.RTCPeerConnection)
 */
SIP.WebRTC.isSupported();
var aliceDataUA = createDataUA(aliceURI, aliceName);
var bobDataUA = createDataUA(bobURI, bobName);
// Unregister the user agents and terminate all active sessions when the window
// closes or when we navigate away from the page
window.onunload = function () {
    aliceUA.stop();
    bobUA.stop();
    aliceDataUA.stop();
    bobDataUA.stop();
}

setUpVideoInterface(aliceUA, bobURI, videoOfBob, 'alice-video-button');
setUpVideoInterface(bobUA, aliceURI, videoOfAlice, 'bob-video-button');
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
                   'alice-data-share-button');
setUpDataInterface(bobDataUA, aliceURI,
                   'bob-data-display',
                   'bob-file-choose-input',
                   'bob-filename',
                   'bob-data-share-button');
