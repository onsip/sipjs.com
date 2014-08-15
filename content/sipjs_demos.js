// sipjs_demos.js
//
// Even though both "Alice" and "Bob" are running on the same computer,
// this demo behaves as if the dialog was an SIP call over a network.

// This demo uses unauthorized users on the "sipjs.onsip.com" demo domain.
// To allow multiple users to run the demo without playing a game of
// chatroulette, we give both callers in the demo a random token and then only
// make calls between users with these token suffixes.
// So, you still might run into a user besides yourself,
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
//   configuration and the options for handling an INVITE request.
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
//   buttonId: the id of the button to set up
//   userAgent: the user agent the button is associated with
//   target: the target URI that the button calls and hangs up on
//   remoteRender: the video tag to render the callee's remote video in. Can be null
function setUpVideoInterface(buttonId, userAgent, target, remoteRender)  {
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


// We disable audio because you're going to call yourself in the demo,
// and then the audio would just echo.
var aliceUA = createUA(aliceURI, aliceName, false, true, videoOfBob, null);
var bobUA   = createUA(bobURI, bobName, false, true, videoOfAlice, null);
// Unregister the user agents and terminate all active sessions when the window
// closes or when we navigate away from the page
window.onunload = function () {
    aliceUA.stop();
    bobUA.stop();
}

setUpVideoInterface('alice-video-button', aliceUA, bobURI, videoOfBob);
setUpVideoInterface('bob-video-button', bobUA, aliceURI, videoOfAlice);
setUpMessageInterface(aliceUA, bobURI,
                   'alice-message-display',
                   'alice-message-input',
                   'alice-message-button');
setUpMessageInterface(bobUA, aliceURI,
                   'bob-message-display',
                   'bob-message-input',
                   'bob-message-button');
