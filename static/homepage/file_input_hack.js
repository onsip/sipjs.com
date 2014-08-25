// We cannot customize the look of the file input tag that much, so we hide it
// behind the "choose a file to send" button. Unfortunately, I'm pretty sure
// that to correctly size the "input" tag we need to use Javascript.
(function () {
    // Gets the potential dimensions of an element, regardless of whether it
    // currently has no display.
    function potentialDimensions(elem) {
        // If an element had its display set to "none", then the styles for
        // dimensions will not be available.
        var displayWasNone = (elem.style.display === 'none');
        // So we toggle the item to a hidden block.
        if (displayWasNone) {
            elem.style.visibility = 'hidden';
            elem.style.display = '';
        }
        // We put all of the dimensions in an object that we return.
        var dimensions = {};
        var style = getComputedStyle(elem);
        dimensions.width = style.width;
        dimensions.height = style.height;
        // Getting all padding dimensions
        dimensions.paddingTop = style.paddingTop;
        dimensions.paddingRight = style.paddingRight;
        dimensions.paddingBottom = style.paddingBottom;
        dimensions.paddingLeft = style.paddingLeft;
        // Getting all border dimensions
        dimensions.borderTop = style.borderTop;
        dimensions.borderRight = style.borderRight;
        dimensions.borderBottom = style.borderBottom;
        dimensions.borderLeft = style.borderLeft;
        // Getting all margin dimensions
        dimensions.marginTop = style.marginTop;
        dimensions.marginRight = style.marginRight;
        dimensions.marginBottom = style.marginBottom;
        dimensions.marginLeft = style.marginLeft;
        // Set the element back to its standard visibility and display if we
        // changed it.
        if (displayWasNone) {
            elem.style.visibility = '';
            elem.style.display = '';
        }
        return dimensions;
    }

    var button = document.querySelector('button.file-choose-button');
    var buttonDimensions = potentialDimensions(button);
    var width = buttonDimensions.width;
    var height = buttonDimensions.height;
    var paddingLeft = buttonDimensions.paddingLeft;
    var paddingRight = buttonDimensions.paddingRight;
    var paddingTop = buttonDimensions.paddingTop;
    var paddingBottom = buttonDimensions.paddingBottom;

    var fileInputs = document.querySelectorAll('input.file-choose-button');
    for (var i=0; i < fileInputs.length; i++) {
        var input = fileInputs[i];
        for (var styleKey in buttonDimensions) {
            input.style[styleKey] = buttonDimensions[styleKey];
        }
    }
})();
