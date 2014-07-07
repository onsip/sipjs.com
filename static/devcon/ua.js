(function (window, document, undefined) {
  window.ua  = new SIP.UA({
          traceSip: true,
          uri: window.uri,
          displayName: window.caller
  });
})(window, document);

(function (window, document, undefined) {
  var audio = document.getElementById("audio"),
      video = document.getElementById("video"),
      accept = document.getElementById("accept"),
      hangup = document.getElementById("hangup"),
      audStream = document.getElementById("audioStream"),
      vidStream = document.getElementById("videoStream");

  function disableHangup() {
    hangup.disable = true;
  }

  function call(vid) {
    window.session = window.ua.invite(
      window.target,
      {
        media: {
          constraints: {
            audio: true,
            video: vid
          },
          render: {
            remote: {
              audio: audStream,
              video: vidStream
            }
          }
        }
      }
    );

    window.session.on("accepted", function() {
      hangup.disabled = false;
    });

    window.session.on("bye", disableHangup);
  }

  window.ua.on("invite", function (incomingSession) {
    accept.disabled = false;
    window.session = incomingSession;
  });

  audio.addEventListener("click", function() { call(false);}, false);
  video.addEventListener("click", function() { call(true);}, false);

  accept.addEventListener("click", function () {
    accept.disabled = true;
    hangup.disabled = false;

    window.session.accept(
      {
        media: {
          render: {
            remote: {
              audio: audStream,
              video: vidStream
            }
          }
        }
      }
    );

    window.session.on("bye", disableHangup);
  }, false);

  hangup.addEventListener("click", function() {
    window.session.bye();
    hangup.disabled = true;
  }, false);
})(window, document);

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

(function (window, document, undefined) {

})(window, document);