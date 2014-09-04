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

if ($('#success-story').hasClass('popup')) {
    (function () {
        function wrapPopupDisplayFunc (dispStyle) {
            return (function (event) {
                setSuccessPopupDisplay(dispStyle, event);
            });
        }

        var form = document.getElementById('success-story-form');
        var name_input = form.querySelector('#full_name');
        var first_name = form.querySelector('#first_name');
        var last_name = form.querySelector('#last_name');

        // Listener to open the popup
        document.getElementById('success-opener')
            .addEventListener('click', wrapPopupDisplayFunc('block'));
        // Listeners for form submission, which closes the popup and splits up
        // the full name into separate first and last name inputs.
        form.addEventListener('submit', function () {
                var full_name = name_input.value.split(' ');
                first_name.value = full_name.shift();
                last_name.value = full_name.shift() || '';
                wrapPopupDisplayFunc('none')();
            }, false);
        // Listen for click on exit button, which closes the popup.
        document.getElementById('close-popup')
            .addEventListener('click', wrapPopupDisplayFunc('none'));
        document.addEventListener('click', overlayDetector);
    })();
}
// This is for the mobile version. This version is also used if Javascript is
// disabled, so this does some formatting changes to make up for Javascript
// default layouts that are unoptimal but necessary.
else if ($('#success-story').hasClass('popdown')) {
    var form = document.getElementById('success-story-form');
    var name_input = form.querySelector('#full_name');
    var first_name = form.querySelector('#first_name');
    var last_name = form.querySelector('#last_name');

    // Optimizing layout now that we have Javascript
    name_input.setAttribute('type', 'text');
    name_input.setAttribute('required', 'required');
    first_name.setAttribute('type', 'hidden');
    last_name.setAttribute('type', 'hidden');

    // Listeners for form submission, which closes the popup and splits up
    // the full name into separate first and last name inputs.
    form.addEventListener('submit', function () {
        var full_name = name_input.value.split(' ');
        first_name.value = full_name.shift();
        last_name.value = full_name.shift() || '';
    }, false);
}
