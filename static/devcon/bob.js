(function (window, document, undefined) {
  window.caller = 'Bob';
  window.uri = 'bob.' + window.token + '@devcon5.onsip.com';
  window.callee = 'Alice';
  window.target = 'alice.' + window.token + '@devcon5.onsip.com';
}) (window, document);
