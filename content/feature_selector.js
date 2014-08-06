/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
*/
$.extend($.easing,
{
    easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin(t/d * (Math.PI/2)) + b;
    }
});

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
                               { duration: 300,
                                 easing: 'easeOutSine',
                               });
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
