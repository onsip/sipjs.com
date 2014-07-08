(function () {
    var tab_links = document.getElementById('codebox').getElementsByTagName('a');
    for(var i = 0; i < tab_links.length; i++) {
        tab_links[i].addEventListener('click', function(e) {
            onTabChange(e.target.getAttribute("data-tab"));
        });
    }

    function onTabChange(tab_num) {
        var tabs = document.getElementById('code-tabs').querySelectorAll('[data-tab]');
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].style.display = (tabs[i].getAttribute("data-tab") == tab_num) ? 'block' : 'none';
        }

        var tab_links = document.getElementById('codelist').getElementsByTagName('a');
        for(var i = 0; i < tab_links.length; i++) {
            tab_links[i].parentNode.className = (tab_links[i].dataset.tab == tab_num) ? 'active' : '';
        }
    }
})();