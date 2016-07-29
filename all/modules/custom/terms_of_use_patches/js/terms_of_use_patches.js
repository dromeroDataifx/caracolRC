(function($) {
    /**
     * accordion
     * */
    Drupal.behaviors.modalRender = {attach: function(context) {
            var triggers = $('a.terms_of_use');
            triggers.die();
            triggers.live({
                click: function(event) {
                    event.preventDefault();
                    $.get(Drupal.settings.ajax_ui.path + '/terms_of_use', null, function(data) {
                        if (data) {
                            var box = $('div#fake-box');
                            box.html(data.body);
                            box.css({position: 'absolute', left: "-9999pc", top: '-9999pc', display: 'block'});
                            setTimeout(function() {
                                box.attr('title', data.title);
                                box.removeAttr('style')
                                        .hide()
                                        .dialog({
                                            modal: true,
                                            resizable: false,
                                            width: 800,
                                            height: 600
                                        });
                            }, 10);
                        }
                    }, 'json');
                }
            });
        }
    }
})(jQuery);