(function (window, document, undefined) {
  window.caller = 'Alice';
  window.uri = 'alice.' + window.token + '@devcon5.onsip.com';
  window.callee = 'Bob';
  window.target = 'bob.' + window.token + '@devcon5.onsip.com';
}) (window, document);
