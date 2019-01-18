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
    var simple = new SIP.Web.Simple(configuration);

    // Adjust the style of the demo based on what is happening
    simple.on('ended', function() {
        remoteVideoElement.style.visibility = 'hidden';
        button.firstChild.nodeValue = 'video';
    });

    simple.on('connected', function() {
        remoteVideoElement.style.visibility = 'visible';
        button.firstChild.nodeValue = 'hang up';
    });

    simple.on('ringing', function() {
      simple.answer();
    });

    button.addEventListener('click', function() {
        // No current call up
        if (simple.state === SIP.Web.Simple.C.STATUS_NULL ||
            simple.state === SIP.Web.Simple.C.STATUS_COMPLETED) {
            simple.call(target);
        } else {
            simple.hangup();
        }
    });

    return simple;
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
function setUpMessageInterface(simple, target,
                               messageRenderId, messageInputId, buttonId) {
    var messageRender = document.getElementById(messageRenderId);
    var messageInput = document.getElementById(messageInputId);
    var button = document.getElementById(buttonId);

    function sendMessage() {
        var msg = messageInput.value;
        // Only send a message if the message is non-empty
        if (msg !== '') {
            messageInput.value = '';
            simple.message(target, msg);
        }
    }

    // We have placeholder text in the message render box. It should be deleted
    // after we have sent or received our first message. This keeps track of
    // that.
    var noMessages = true;

    // Receive a message and put it in the message display div
    simple.on('message', function (msg) {
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

(function () {
if (window.RTCPeerConnection) {
    // Javascript is not disabled and WebRTC works, so hide the
    // "demo-error" div and fix the color of the feature arrow.
    var demoErrorDiv = document.getElementById('demo-error');
    var featureArrow = document.getElementById('feature-arrow');
    function setFeatureArrowColor(color) {
        for (var i=0; i < featureArrow.children.length; i++) {
            var child = featureArrow.children[i];
            if (child.tagName === 'polygon') {
                child.style.fill = color;
                child.style.stroke = color;
            }
        }
    }
    demoErrorDiv.style.display = 'none';
    setFeatureArrowColor('rgb(193,191,182)');

    // Now we do SIP.js stuff
    var aliceSimple = createSimple(aliceURI, aliceName, bobURI, 'video-of-bob', 'alice-video-button');
    var bobSimple   = createSimple(bobURI, bobName, aliceURI, 'video-of-alice', 'bob-video-button');

    // We want to only run the demo if all users for the demo can register
    var numToRegister = 2;
    var numRegistered = 0;
    var registrationFailed = false;
    var markAsRegistered = function () {
        numRegistered += 1;
        if (numRegistered >= numToRegister && !registrationFailed) {
            setupInterfaces();
        }
    };
    var failRegistration = function () {
        registrationFailed = true;
        failInterfaceSetup();
    };
    // We don't want to proceed until we've registered all users.
    // For each registered user, increase the counter.
    aliceSimple.on('registered', markAsRegistered);
    bobSimple.on('registered', markAsRegistered);
    // If any registration fails, then we need to disable the app and tell the
    // user that we could not register them.
    aliceSimple.on('registrationFailed', failRegistration);
    bobSimple.on('registrationFailed', failRegistration);

    // Unregister the user agents and terminate all active sessions when the
    // window closes or when we navigate away from the page
    window.onunload = function () {
        aliceSimple.stop();
        bobSimple.stop();
    };

    // Only run the demo if we could register every user agent
    function setupInterfaces() {
        setUpMessageInterface(aliceSimple, bobURI,
                              'alice-message-display',
                              'alice-message-input',
                              'alice-message-button');
        setUpMessageInterface(bobSimple, aliceURI,
                              'bob-message-display',
                              'bob-message-input',
                              'bob-message-button');
    }
    function failInterfaceSetup() {
        // Display an error message
        demoErrorDiv.style.display = 'block';
        setFeatureArrowColor('rgb(114,117,115)');
        var overlayMessage = demoErrorDiv.getElementsByTagName('p')[0];
        while (overlayMessage.firstChild) {
            overlayMessage.removeChild(overlayMessage.firstChild);
        }
        overlayMessage.appendChild(document.createTextNode('Max registration limit hit. Could not register all user agents, so they cannot communicate. The app is disabled.'));
    }
}
})();
