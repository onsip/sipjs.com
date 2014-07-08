(function (window, document, undefined) {
  document.getElementById('remote-uri').innerHTML = window.target;
  document.getElementById( 'local-uri').innerHTML = window.uri;
})(window, document);

(function (window, document, undefined) {
  window.ua  = new SIP.UA({
          traceSip: true,
          uri: window.uri,
          displayName: window.caller
  });
})(window, document);


/** VOICE + VIDEO **/
(function (window, document, undefined) {
  var audio = document.getElementById("audio"),
      video = document.getElementById("video"),
      accept = document.getElementById("accept"),
      reject = document.getElementById("reject"),
      bye = document.getElementById("bye"),
      vidStream = document.getElementById("videoStream"),
      incomingcall = document.getElementById("incomingcall"),
      beforecall = document.getElementById("beforecall"),
      duringcall = document.getElementById("duringcall"),
      states;

  states = {
    before: function () {
      audio.disabled = false;
      video.disabled = false;
      reject.disabled = true;
      accept.disabled = true;
      bye.disabled = true;

      beforecall.className = 'show';
      incomingcall.className = 'hide';
      duringcall.className = 'hide';

      vidStream.src = null;
    },

    incoming: function () {
      audio.disabled = true;
      video.disabled = true;
      accept.disabled = false;
      reject.disabled = false;
      bye.disabled = true;

      beforecall.className = 'hide';
      incomingcall.className = 'show';
      duringcall.className = 'hide';
    },

    during: function () {
      audio.disabled = true;
      video.disabled = true;
      accept.disabled = true;
      reject.disabled = true;
      bye.disabled = false;

      beforecall.className = 'hide';
      incomingcall.className = 'hide';
      duringcall.className = 'show';
    }
  };

  function call(vid) {
    var session =  window.session = window.ua.invite(
      window.target,
      {
        media: {
          constraints: {
            audio: true,
            video: vid
          },
          render: {
            remote: {
              video: vidStream
            }
          }
        }
      }
    );

    states.during();

    session.on("rejected", states.before);
    session.on("accepted", states.during);
    session.on("bye", states.before);
  }

  window.ua.on("invite", function (incomingSession) {
    states.incoming();
    window.session = incomingSession;
  });

  audio.addEventListener("click", function() { call(false);}, false);
  video.addEventListener("click", function() { call(true);}, false);

  accept.addEventListener("click", function () {
    states.during();
    window.session.accept(
      {
        media: {
          render: {
            remote: {
              video: vidStream
            }
          }
        }
      }
    );

    window.session.on("bye", states.before);
  }, false);

  reject.addEventListener("click", function () {
    states.before();
    window.session.reject();
  }, false);

  bye.addEventListener("click", function() {
    states.before();
    window.session.bye();
  }, false);
})(window, document);

/** MESSAGE **/
(function (window, document, undefined) {
  var msg = document.getElementById("sendMessage"),
      msgContent = document.getElementById("messageContent"),
      showMessage = document.getElementById("incomingMessage");

  msg.addEventListener("click", function() {
    window.ua.message(window.target, msgContent.value);
  }, false);

  window.ua.on('message', function (request) {
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

  window.dataua = new SIP.UA({
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

  window.dataua.on('invite', function (dataSession) {
    window.dataSession = dataSession;
    window.dataSession.mediaHandler.on("dataChannel", function (dataChannel) {
      dataChannel.onmessage = function (e) {
        console.log('Data Channel received message: ', e.data);
        dataReceive.innerHTML = "The browser is " + e.data;
        window.dataSession.bye();
      };
    });

    dataSession.accept();
  });

  data.addEventListener('click', function () {
    var browser = (navigator.userAgent.search("Chrome") > 0) ? "Chrome" : "Firefox";

    window.dataSession = window.dataua.invite(
      'data' + window.target,
      {
        media: {
          dataChannel: true
        }
      }
    );


    window.dataSession.mediaHandler.on("dataChannel", function (dataChannel) {
      dataChannel.onopen = function () {
        dataChannel.send(browser);
      };
    });
  });
})(window, document);