(function (window, document, undefined) {
  document.getElementById('remote-uri').innerHTML = window.target;
  document.getElementById( 'local-uri').innerHTML = window.uri;
})(window, document);

(function (window, document, undefined) {
  window.ua = new SIP.UA({
          traceSip: true,
          uri: window.uri,
          displayName: window.caller
  });
})(window, document);


/**
 * VOICE + VIDEO
 **/
(function (window, document, undefined) {

  var elements = [
    'audio',
    'video',
    'accept',
    'reject',
    'bye',
    'videoStream',
    'beforecall',
    'incomingcall',
    'duringcall'
  ].reduce(function (previousValue, currentValue) {
    previousValue[currentValue] = document.getElementById(currentValue);
    return previousValue;
  }, {});

  /** UI **/
  var updateUI = function (state) {
    function update(before, incoming, during) {
      elements.audio.disabled = !before;
      elements.video.disabled = !before;
      elements.reject.disabled = !incoming;
      elements.accept.disabled = !incoming;
      elements.bye.disabled = !during;

      elements.beforecall.className = before ? 'show' : 'hide';
      elements.incomingcall.className = incoming ? 'show' : 'hide';
      elements.duringcall.className = during ? 'show' : 'hide';

      if (before) {
        videoStream.src = null;
      }
    }

    if (state === 'before') {
      update(true, false, false);
    } else if (state === 'incoming') {
      update(false, true, false);
    } else if (state === 'during') {
      update(false, false, true);
    }
  };

  /** SIP **/
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
      }
    );

    updateUI('during');

    session.on("rejected", updateUI.bind(null, 'before'));
    session.on("accepted", updateUI.bind(null, 'during'));
    session.on("bye", updateUI.bind(null, 'before'));
  }

  ua.on("invite", function (incomingSession) {
    updateUI('incoming');
    session = incomingSession;
  });

  elements.audio.addEventListener("click", call.bind(null, false), false);
  elements.video.addEventListener("click", call.bind(null, true),  false);

  elements.accept.addEventListener("click", function () {
    updateUI('during');
    session.accept(
      {
        media: {
          render: {
            remote: {
              video: elements.videoStream
            }
          }
        }
      }
    );

    session.on("bye", updateUI.bind(null, 'before'));
  }, false);

  elements.reject.addEventListener("click", function () {
    updateUI('before');
    session.reject();
  }, false);

  elements.bye.addEventListener("click", function() {
    updateUI('before');
    session.bye();
  }, false);
})(window, document);

/** MESSAGE **/
(function (window, document, undefined) {
  var msg = document.getElementById("sendMessage"),
      msgContent = document.getElementById("messageContent"),
      showMessage = document.getElementById("incomingMessage");

  var ua = window.ua,
      target = window.target;

  msg.addEventListener("click", function() {
    ua.message(target, msgContent.value);
  }, false);

  ua.on('message', function (request) {
    showMessage.innerHTML = request.body;
  });
})(window, document);

/** DATA **/
(function (window, document, undefined) {
  var dataSend = document.getElementById("sendData"),
      dataReceive = document.getElementById("incomingdata");

  /*
    Custom media handler factories don't have great compatibility with
    our WebRTC function caching (like SIP.WebRTC.RTCPeerConnection)
  */
  SIP.WebRTC.isSupported();

  var dataUA;

  dataUA = new SIP.UA({
    traceSip: true,
    uri: 'data' + window.uri,
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

      // No stream to add.  Assume success.
      self.addStream = function addStream(stream, success, failure) {
        success();
      };

      return self;
    }
  });

  dataUA.on('invite', function (session) {
    session.mediaHandler.on("dataChannel", function (dataChannel) {
      dataChannel.onmessage = function (e) {
        dataReceive.innerHTML = "The browser is " + e.data;
        session.bye();
      };
    });

    session.accept();
  });

  data.addEventListener('click', function () {
    var browser = (navigator.userAgent.search("Chrome") > 0) ? "Chrome" : "Firefox";

    session = dataUA.invite(
      'data' + window.target,
      {
        media: {
          dataChannel: true
        }
      }
    );

    session.mediaHandler.on("dataChannel", function (dataChannel) {
      dataChannel.onopen = function () {
        dataChannel.send(browser);
      };
    });
  });

})(window, document);
