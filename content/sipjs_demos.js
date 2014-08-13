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
var aliceURI      = 'alice.' + window.token + '@' + domain;
var aliceName     = 'Alice';
var videoOfAlice  = document.getElementById('video-of-alice');
var aliceButton   = document.getElementById('alice-video-button');

var bobURI        = 'bob.' + window.token + '@' + domain;
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
        wsServers: null,
        uri: callerURI,
        authorizationUser: null,
        password: null,
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

// Function: setupButton
//   Sets up the button for a user to manage calling and hanging up
//
// Arguments:
//   buttonName: the id of the button to set up
//   userAgent: the user agent the button is associated with
//   target: the target URI that the button calls and hangs up on
//   remoteRender: the video tag to render the callee's remote video in. Can be null
function setupButton(buttonName, userAgent, target, remoteRender)  {
    // true if the button should initiate a call,
    // false if the button should end a call
    var onCall = false;
    var session;
    var button = document.getElementById(buttonName);

    // Handling invitations to calls.
    // We automatically accept invitations and toggle the button state based on
    // whether we are in a call our not.
    // Also, for each new call session, we need to add an event handler to set
    // the correct button state when we receive a "bye" request.
    userAgent.on('invite', function (incomingSession) {
        session = incomingSession;
        var options = mediaOptions(false, true, remoteRender, null);
        session.accept(options);
        button.firstChild.nodeValue = 'hang up';
        onCall = true;
        session.on('bye', function () {
            button.firstChild.nodeValue = 'video';
            onCall = false;
        });
    });
    // The button either makes a call, creating a session and binding a listener
    // for the "bye" request, or it hangs up a current call.
    button.addEventListener('click', function () {
        if (onCall) {
            button.firstChild.nodeValue = 'hang up';
            session.bye();
            session = null;
        }
        else {
            button.firstChild.nodeValue = 'video';
            session = makeCall(userAgent, target,
                               false, true,
                               remoteRender, null);
            session.on('bye', function () {
                button.firstChild.nodeValue = 'video';
            });
        }
        onCall = !onCall;
    });
}


// We disable audio because you're going to call yourself in the demo,
// and then the audio would just echo.
var aliceUA = createUA(aliceURI, aliceName, false, true, videoOfBob, null);
var bobUA   = createUA(bobURI, bobName, false, true, videoOfAlice, null);
setupButton('alice-video-button', aliceUA, bobURI, videoOfBob);
setupButton('bob-video-button', bobUA, aliceURI, videoOfAlice);

// Unregister the user agents and terminate all active sessions when the window
// closes or when we navigate away from the page
window.onunload = function () {
    aliceUA.stop();
    bobUA.stop();
}
