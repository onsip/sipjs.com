(function () {

var headerShrunkHeight = '19vw';
var headerExpandHeight = '38vw';
var shrunkNavBottom = '0';
var expandNavBottom = '7.5%';
var menuOpen = false;
var hideDelay = 400;
var hideFunc = (function () {
    if (!menuOpen) {
        $('#full-nav').css('visibility', 'hidden');
    }
});

$('#mobile-menu').click(function (e) {
    if (!menuOpen) {
        $('#siteHeader').css('height', headerExpandHeight);
        $('#full-nav').css('visibility', 'visible');
        $('#full-nav').css('opacity', '1');
        $('#full-nav').css('bottom', expandNavBottom);
        menuOpen = true;
    } else {
        $('#siteHeader').css('height', headerShrunkHeight);
        $('#full-nav').css('opacity', '0');
        $('#full-nav').css('bottom', shrunkNavBottom);
        setTimeout(hideFunc, hideDelay);
        menuOpen = false;
    }
});

document.addEventListener('click', function (event) {
    // Tests if we clicked outside of the menu button
    if ($(event.target).closest('#mobile-menu').length === 0) {
        $('#siteHeader').css('height', headerShrunkHeight);
        $('#full-nav').css('opacity', '0');
        $('#full-nav').css('bottom', shrunkNavBottom);
        setTimeout(hideFunc, hideDelay);
        menuOpen = false;
    }
});

})();
