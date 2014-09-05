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
    // subkeys:
    //   feature_id: the feature button that the user can click on
    //   content_id: the content for the demo for that feature
    //   code_id: the code for the feature code example
    var elem_ids = {
        'video_audio': {
            'feature_id' : 'feature-video-audio',
            'content_id' : 'content-video-audio',
            'code_id'    : 'code-video-audio'
        },
        'message': {
            'feature_id' : 'feature-message',
            'content_id' : 'content-message',
            'code_id'    : 'code-message'
        },
        'data_channel': {
            'feature_id' : 'feature-data-channel',
            'content_id' : 'content-data-channel',
            'code_id'    : 'code-data-channel'
        }
    }

    // Prepend all with id hashtag
    for (var key in elem_ids) {
        elem_ids[key].feature_id = '#' + elem_ids[key].feature_id;
        elem_ids[key].content_id = '#' + elem_ids[key].content_id;
        elem_ids[key].code_id    = '#' + elem_ids[key].code_id;
    }
    var arrow_id = '#feature-arrow';
    var arrow_elem = $(arrow_id);
    var selected_elem = $(elem_ids.video_audio.feature_id);

    function positionArrow(arrow_elem, selected_elem) {
        // Firefox returns NaN for the JQuery width() or outerWidth() function
        // calls, so we need to do this instead.
        var svgWidth = arrow_elem[0].width.baseVal.value;

        arrow_elem.animate({left: selected_elem.position().left
                            + selected_elem.outerWidth()/2
                            - svgWidth/2},
                           { duration: 300,
                             easing: 'easeOutSine',
                           });
    }

    // So that the proper key is accessible in the click function for each
    // click object.
    function bind_key_fn (key) {
        return function () {
            // When clicked on, highlight the icon by unhiding the selected
            // version and hiding the unselected version. For other icons, hide
            // the selected version and unhide the unselected version.
            // We also must show the correct contents in the viewport below the
            // icons.
            selected_elem = $(this);
            selected_elem.children('.icon-selected').show();
            selected_elem.children('.icon-unselected').hide();
            selected_elem.children('h4').css('color', 'rgb(234, 75, 53)');
            $(elem_ids[key].content_id).show();
            $(elem_ids[key].code_id).show();
            for (var otherkey in elem_ids) {
                if (otherkey !== key) {
                    var other_elem = $(elem_ids[otherkey].feature_id);
                    other_elem.children('.icon-selected').hide();
                    other_elem.children('.icon-unselected').show();
                    other_elem.children('h4').css('color', '#8a7c7a');
                    $(elem_ids[otherkey].content_id).hide();
                    $(elem_ids[otherkey].code_id).hide();
                }
            }
            positionArrow(arrow_elem, selected_elem);
        }
    }

    for (var key in elem_ids) {
        $(elem_ids[key].feature_id).click(bind_key_fn(key));
    }

    $(elem_ids.video_audio.feature_id).click();


    // We need to notice when we change from mobile to desktop layouts, and
    // then properly position the arrow for desktop. If we just go with the
    // positioning from mobile, the arrow will not be aligned correctly.
    var mobileView = ($(window).width() <= 700);
    $(window).resize(function (event) {
        if ($(window).width() > 700) {
            if (mobileView) {
                positionArrow(arrow_elem, selected_elem);
            }
            mobileView = false;
        } else {
            mobileView = true;
        }
    });


    // Show the right form popup button if we have JS enabled
    // $('#success-column-box').css('display', 'block');
    // $('#success-column-newpage').css('display', 'none');

});
