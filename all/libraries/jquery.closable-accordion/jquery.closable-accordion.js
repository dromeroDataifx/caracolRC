// Closed Accordion Plugin v1.0.0 for jQuery
// =============
// Author: Javier Rojas
// Created: 6/14/2013
// Date: 6/14/2013
(function($) {
    $.fn.closableAcordion = function(options) {

        var defaults = {
            height: 150,
            duration: 100,
            hidearrows: true,
            auto: true,
            autoTime: 6000,
            parent: false
        };
        var options = $.extend(defaults, options);
        var sw = true;
        return this.each(function() {
            var divobj = $(this);

            divobj.parent().addClass('ui-accordion ui-widget ui-helper-reset ui-accordion-icons');

            var rows = divobj.find('> .accordion-row');
            var headers = rows.find('> h3');
            var content = rows.find('> div.accordion-content');

            content.addClass('ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom');

            /*built all headers*/
            headers.addClass('even ui-accordion-header ui-helper-reset ui-state-default ui-corner-all');
            headers.prepend('<span class="ui-icon ui-icon-triangle-1-e"></span>');


            headers.click(function(event) {
                if ($(this).hasClass('ui-state-active')) {
                    collapse($(this).parent());
                }
                else {
                    headers.each(function(index, value) {
                        collapse($(this).parent());
                    });
                    expand($(this).parent());
                }

            });

            //fix default accordion
            expand(rows.filter(':eq(0)'));
        });
        function collapse(obj) {
            var header = obj.find('> h3');
            header.removeClass('ui-state-active');
            header.addClass('ui-state-default');
            header.find('> span').removeClass('ui-icon-triangle-1-s')
                    .addClass('ui-icon-triangle-1-e');
            obj.find('>.accordion-content').slideUp(500);
        }
        function expand(obj) {
            var header = obj.find('> h3');
            header.removeClass('ui-state-default');
            header.addClass('ui-state-active');
            header.find('> span').removeClass('ui-icon-triangle-1-e')
                    .addClass('ui-icon-triangle-1-s');
            obj.find('> .accordion-content').slideDown(500);
        }
    };
})(jQuery);