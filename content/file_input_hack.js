// We cannot customize the look of the file input tag that much, so we hide it
// behind the "choose a file to send" button. Unfortunately, I'm pretty sure
// that to correctly size the "input" tag we need to use Javascript.
(function () {
    var button = document.querySelector('button.file-choose-button');
    var fileInputs = document.querySelectorAll('input.file-choose-button');
    var width = button.style.width;
    var height = button.style.height;
    var paddingLeft = button.style.paddingLeft;
    var paddingRight = button.style.paddingRight;
    var paddingTop = button.style.paddingTop;
    var paddingBottom = button.style.paddingBottom;

    for (var i=0; i < fileInputs.length; i++) {
        var input = fileInputs[i];
        input.style.width = width;
        input.style.height = height;
        input.style.paddingLeft = paddingLeft;
        input.style.paddingRight = paddingRight;
        input.style.paddingTop = paddingTop;
        input.style.paddingBottom = paddingBottom;
    }
})();
