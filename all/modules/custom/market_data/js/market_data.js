(function($) {
    /**
     * accordion
     * */
    Drupal.behaviors.marketDataAccordion = {attach: function(context) {
            var target = $('.accordion');
            if (target.length > 0) {
                target.closableAcordion({heightStyle: "content"});
                target.find('.ui-accordion-content').css({height: 'auto'});
            }
        }
    }
})(jQuery);