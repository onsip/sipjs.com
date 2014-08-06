// Calls this when the DOM is done loading
$(function () {
    // Make sure that the union of keys for feature_ids and content_ids equals
    // the intersection of the keys.
    var feature_ids = {'video_audio':  'feature-video-audio',
                       'message':      'feature-message',
                       'data_channel': 'feature-data-channel'};
    var content_ids = {'video_audio':  'content-video-audio',
                       'message':      'content-message',
                       'data_channel': 'content-data-channel'};
    // Prepend all with id hashtag
    for (var key in feature_ids) {
        feature_ids[key] = '#' + feature_ids[key];
        content_ids[key] = '#' + content_ids[key];
    }
    var arrow_id = '#feature-arrow';
    var arrow_elem = $(arrow_id);

    // So that the proper key is accessible in the click function for each
    // click object.
    function bind_key_fn (key) {
        return function () {
            // When clicked on, highlight the icon by unhiding the selected
            // version and hiding the unselected version. For other icons, hide
            // the selected version and unhide the unselected version.
            // We also must show the correct contents in the viewport below the
            // icons.
            var selected_elem = $(this);
            selected_elem.children('.icon-selected').show();
            selected_elem.children('.icon-unselected').hide();
            $(content_ids[key]).show();
            for (var otherkey in feature_ids) {
                if (otherkey !== key) {
                    var other_elem = $(feature_ids[otherkey]);
                    other_elem.children('.icon-selected').hide();
                    other_elem.children('.icon-unselected').show();
                    $(content_ids[otherkey]).hide();
                }
            }
            // Move the arrow to under the proper feature box
            arrow_elem.animate({left: selected_elem.position().left
                                + selected_elem.outerWidth()/2
                                - arrow_elem.outerWidth()/2},
                              400);
        }
    }

    for (var key in feature_ids) {
        $(feature_ids[key]).click(bind_key_fn(key));

        console.log($(feature_ids[key]).position());
        console.log($(feature_ids[key]).outerWidth());
        console.log('');
    }

    $(feature_ids['video_audio']).click();
});
