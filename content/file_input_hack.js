// We cannot customize the look of the file input tag that much, so we hide it
// behind the "choose a file to send" button. Unfortunately, I'm pretty sure
// that to correctly size the "input" tag we need to use Javascript.
(function () {
    var button = $($('button.file-choose-button')[0]);
    var fileInputs = $('input.file-choose-button');
    window.fileInputs = fileInputs;
    var width = button.outerWidth();
    var height = button.outerHeight();
    var horizMargin = button.outerWidth(true) - width;
    var vertMargin = button.outerHeight(true) - height;

    fileInputs.width(width);
    fileInputs.height(height);
    fileInputs.css('margin-left', horizMargin/2);
    fileInputs.css('margin-right', horizMargin/2);
    fileInputs.css('margin-top', vertMargin/2);
    fileInputs.css('margin-bottom', vertMargin/2);
})();
