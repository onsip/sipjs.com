function setSuccessPopupDisplay(dispStyle) {
    return (function () {
        document.getElementById('success-story')
            .style.setProperty('display', dispStyle);
    });
}

(function () {
    // Listener to open the popup
    document.getElementById('success-opener')
        .addEventListener('click', setSuccessPopupDisplay('block'));
    // Listeners to close the popup when we exit out or submit the form
    document.getElementById('success-story-form')
        .addEventListener('submit', setSuccessPopupDisplay('none'));
    document.getElementById('close-popup')
        .addEventListener('click', setSuccessPopupDisplay('none'));
})();
