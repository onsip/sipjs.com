// Check if we have clicked outside the popup, and close the popup if so.
// We get the click event, and then find the closest ancestor of the event
// target that has the id "success-story". Either we clicked within the
// popup and such an item exists, and therefore it has a positive length,
// or we clicked outside the event and the length property is 0.
// If 0, then we clicked outside the popup, so we hide the popup.
// Otherwise, nothing happens.
// Also, because of event bubbling, we avoid registering clicks to the overlay
// if the current event just opened up the popup.
function overlayDetector(event) {
    if (!event.popupOpening
        && $(event.target).closest('#success-story').length === 0) {
        setSuccessPopupDisplay('none');
    }
}

function setSuccessPopupDisplay(dispStyle, event) {
    if (dispStyle === 'none') {
        $($('.overlay')[0]).css('display', 'none');
    } else {
        $($('.overlay')[0]).css('display', 'block');
        if (event !== undefined) {
            event.popupOpening = true;
        }
    }
    document.getElementById('success-story').parentNode
        .style.setProperty('display', dispStyle);
}

(function () {
    function wrapPopupDisplayFunc (dispStyle) {
        return (function (event) {
            setSuccessPopupDisplay(dispStyle, event);
        });
    }

    // Listener to open the popup
    document.getElementById('success-opener')
        .addEventListener('click', wrapPopupDisplayFunc('block'));
    // Listeners for form submission, which closes the popup.
    document.getElementById('success-story-form')
        .addEventListener('submit', wrapPopupDisplayFunc('none'));
    // Listen for click on exit button, which closes the popup.
    document.getElementById('close-popup')
        .addEventListener('click', wrapPopupDisplayFunc('none'));
    document.addEventListener('click', overlayDetector);
})();
