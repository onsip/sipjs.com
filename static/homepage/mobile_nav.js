(function () {

/* For desktop layout */
var headerDesktopHeight = '120px';

var headerShrunkHeight = '19vw';
var headerExpandHeight = '48vw';
var shrunkNavBottom = '0';
var expandNavBottom = '7.5%';
expandNavBottom = '8vw';
var menuOpen = false;
var showDelay = 150;
var hideDelay = 400;
var hideFunc = (function () {
    if (!menuOpen)
        $('#full-nav').css('visibility', 'hidden');
});
var showFunc = (function () {
    if (menuOpen)
        $('#full-nav').css('visibility', 'visible');
})

$('#mobile-menu').click(function (e) {
    if (!menuOpen) {
        menuOpen = true;
        $('#siteHeader').css('height', headerExpandHeight);
        $('#full-nav').css('opacity', '1');
        $('#full-nav').css('bottom', expandNavBottom);
        $('#expand-divider').css('visibility', 'visible');
        setTimeout(showFunc, showDelay);
    } else {
        menuOpen = false;
        $('#siteHeader').css('height', headerShrunkHeight);
        $('#full-nav').css('opacity', '0');
        $('#full-nav').css('bottom', shrunkNavBottom);
        $('#expand-divider').css('visibility', 'hidden');
        setTimeout(hideFunc, hideDelay);
    }
});

document.addEventListener('click', function (event) {
    // Tests if we clicked outside of the menu button
    if ($('#mobile-nav').css('display') !== 'none'
        && $(event.target).closest('#mobile-menu').length === 0) {
        menuOpen = false;
        $('#siteHeader').css('height', headerShrunkHeight);
        $('#full-nav').css('opacity', '0');
        $('#full-nav').css('bottom', shrunkNavBottom);
        $('#expand-divider').css('visibility', 'hidden');
        setTimeout(hideFunc, hideDelay);
    }
});


$(window).resize(function (event) {
    if (window.innerWidth > 700) {
        $('#siteHeader').removeAttr('style');
        $('#full-nav').removeAttr('style');
    }
});

})();
