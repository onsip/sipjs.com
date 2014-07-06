(function (window, document, undefined) {
  window.caller = 'Alice';
  window.uri = 'alice.' + window.token + '@onslip.onsip.com';
  window.callee = 'Bob';
  window.target = 'bob.' + window.token + '@onslip.onsip.com';
}) (window, document);