(function (window, document, undefined) {
  var ua  = new SIP.UA({
          traceSip: true,
          uri: window.uri,
          displayName: window.caller
    });

  var msg = document.getElementById("sendMessage");
  var msgContent = document.getElementById("messageContent");
  var showMessage = document.getElementById("incomingMessage");

  msg.addEventListener("click", function() {
          window.ua.message(window.target, msgContent.value);
  }, false);

  ua.on('message', function (request) {
          showMessage.innerHTML = request.body;
  });

  window.ua = ua;
})(window, document);