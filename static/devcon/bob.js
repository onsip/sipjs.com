(function (window, document, undefined) {
  window.caller = 'Bob';
  window.uri = 'bob.' + window.token + '@onslip.onsip.com';
  window.callee = 'Alice';
  window.target = 'alice.' + window.token + '@onslip.onsip.com';
}) (window, document);