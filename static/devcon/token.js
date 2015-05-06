(function (window, document, undefined) {
  var Token = {};

  Token.pair = function () {
    var query = window.location.search || '?';

    var locationToken = query.match(/j=([^&]*)/);

    if (locationToken && locationToken.length >= 2) {
      return (window.token = locationToken[1]);
    } else {
      window.location.href += '?j=' + Math.floor(Math.random() * 100000000);
    }
  };

  Token.buildLinks = function () {
    if (!document.querySelectorAll) {
      console.error('Cannot build token links: No document.querySelectorAll');
    }

    this.links = document.querySelectorAll('[data-tokenize]');

    var link;
    for (var i = 0, l = this.links.length; i < l; i++) {
      link = this.links[i];
      link.href += '?j=' + this.pair();

      link.addEventListener('click', function (e) {
        this.innerHTML = this.dataset.tokenizeAfter;
      }, false);
    }
  }

  Token.buildLinks();
  window.Token = Token;

})(window, document);
