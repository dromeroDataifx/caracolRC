/*!
 * jQuery Custom Contextual Links plugin: Custom Contextual Links
 * version 1.0 (20-FEB-2014)
 * Requires jQuery v1.9 or later
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Authors: Javier Rojas <jrojas@dataifx.com>
 */

/**
 *  corner() takes a single string argument:  $('#myDiv').corner("effect corners width")
 *
 *  effect:  name of the effect to apply, such as round, bevel, notch, bite, etc (default is round). 
 *  corners: one or more of: top, bottom, tr, tl, br, or bl.  (default is all corners)
 *  width:   width of the effect; in the case of rounded corners this is the radius. 
 *           specify this value using the px suffix such as 10px (yes, it must be pixels).
 */
;
(function($) {
    function mouseEnterParentListener(event) {
        console.log('enter me');
        var trigger = $(event.currentTarget).find('.contextual-links-trigger');
        trigger.show();
    }
    function mouseOutParentListener(event) {
        console.log('out me');
        var trigger = $(event.currentTarget).find('.contextual-links-trigger');
        if (!$(event.currentTarget).hasClass('custom-contextual-links-region-active'))
            trigger.hide();
    }
    function mouseEnterTriggerListener(event) {
        console.log('trigger on me');
        var region = $(event.currentTarget).parent().parent();
        region.toggleClass('.custom-contextual-links-region-active');

    }
    function mouseOutTriggerListener(event) {
        console.log('trigger out me');
        var region = $(event.currentTarget).parent();
        region.toggleClass('.custom-contextual-links-region-active');
    }
    $.fn.buildCustomContextualLinks = function(options) {
        var defaults = {
            labels: {configure: 'Configure', edit: 'Edit'},
            duration: 100
        };

        var options = $.extend(defaults, options);

        return this.each(function(index) {
            var parent = $(this).parent();
            $(this).find('.contextual-links-trigger').bind({mouseenter: mouseEnterTriggerListener, mouseout: mouseOutTriggerListener});
            parent.bind({mouseenter: mouseEnterParentListener, mouseout: mouseOutParentListener});
            parent.addClass('custom-contextual-links-region');
            parent.bind({mouseenter: mouseEnterParentListener, mouseout: mouseOutParentListener});
        });
    };
    $(document).ready(function() {
        $('.custom-contextual-links-wrapper').buildCustomContextualLinks();
    });
})(jQuery);
