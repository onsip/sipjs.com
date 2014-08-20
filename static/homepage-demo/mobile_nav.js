(function () {

var headerShrunkHeight = '19vw';
var headerExpandHeight = '38vw';
var shrunkNavBottom = '0';
var expandNavBottom = '7.5%';
var hideDelay = 400;
var hideFunc = (function () {
    $('#full-nav').css('visibility', 'hidden');
});

var menuOpen = false;

$('#mobile-menu').click(function (e) {
    if (!menuOpen) {
        menuOpen = true;
        $('#siteHeader').css('height', headerExpandHeight);
        $('#full-nav').css('visibility', 'visible');
        $('#full-nav').css('opacity', '1');
        $('#full-nav').css('bottom', expandNavBottom);
    } else {
        menuOpen = false;
        $('#siteHeader').css('height', headerShrunkHeight);
        $('#full-nav').css('opacity', '0');
        $('#full-nav').css('bottom', shrunkNavBottom);
        setTimeout(hideFunc, hideDelay);
    }
});

document.addEventListener('click', function (event) {
    // Tests if we clicked outside of the menu button
    if ($(event.target).closest('#mobile-menu').length === 0) {
        menuOpen = false;
        $('#siteHeader').css('height', headerShrunkHeight);
        $('#full-nav').css('opacity', '0');
        $('#full-nav').css('bottom', shrunkNavBottom);
        setTimeout(hideFunc, hideDelay);
    }
});

})();
