(function () {

var drawerShrunkHeight = '0';
var drawerExpandHeight = '8em';
var menuOpen = true;

// If Javascript is disabled, then the drawer should always be open.
// Otherwise, we must close it to start. We don't want close animations to
// kick in until after it has been closed because the user shouldn't notice the
// initial closing. We're supposed to pretend that it starts closed and that
// Javascript isn't doing anything here.
var drawerNav = $('#drawer-nav');
drawerNav.css('max-height', drawerShrunkHeight);
menuOpen = false;

window.setTimeout(function () {
    drawerNav.css('transition', 'max-height 0.4s ease-in-out');
    drawerNav.css('-webkit-transition', 'max-height 0.4s ease-in-out');
    drawerNav.css('-moz-transition', 'max-height 0.4s ease-in-out');
    drawerNav.css('-ms-transition', 'max-height 0.4s ease-in-out');
    drawerNav.css('-o-transition', 'max-height 0.4s ease-in-out');
}, 500);

var hideFunc = (function () {
    if (!menuOpen)
        $('#drawer-nav').css('visibility', 'hidden');
});
var showFunc = (function () {
    if (menuOpen)
        $('#drawer-nav').css('visibility', 'visible');
});

$('#mobile-menu').click(function (e) {
    if (!menuOpen) {
        menuOpen = true;
        $('#drawer-nav').css('max-height', drawerExpandHeight);
    } else {
        menuOpen = false;
        $('#drawer-nav').css('max-height', drawerShrunkHeight);
    }
});

document.addEventListener('click', function (event) {
    // Tests if we clicked outside of the menu button
    if ($('#mobile-nav').css('display') !== 'none'
        && $(event.target).closest('#mobile-menu').length === 0
        && $(event.target).closest('#drawer-nav').length === 0) {
        menuOpen = false;
        $('#drawer-nav').css('max-height', drawerShrunkHeight);
    }
});


$(window).resize(function (event) {
    if (window.innerWidth > 700) {
        menuOpen = false;
        $('#drawer-nav').css('max-height', 0);
    }
});

})();
