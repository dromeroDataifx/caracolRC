(function($) {
    Drupal.behaviors.multimediaFormPatches = {attach: function(context) {
            if (Drupal.settings.ooyala_patches.forms.length > 0) {
                var forms = $('#' + Drupal.settings.ooyala_patches.forms.join(', #').replace(new RegExp('_', 'g'), '-'), context);
                if (forms.length > 0) {
                    forms.each(function(index, value) {
                        var thisForm = $(this);
                        var scriptField = thisForm.find('#edit-field-full-multimedia-code-und-0-value');
                        var codeField = thisForm.find('.field-widget-ooyala-embed-code input.ooyala-embed-code-input');
                        scriptField.bind({
                            keyup: function(event) {
                                var matches = $(this).val().match(/embedCode\=(\S*)&/);
                                if (matches != null && matches.length > 1) {
                                    codeField.val(matches[1]);
                                    /*dispara el evento para traer los thumbnails*/
                                    $('input.ooyala-refresh-thumbnails', context).trigger('mousedown');
                                }
                            }
                        });

                        /*toma la url del thumbnail seleccionado*/
                        $('.ooyala-upload-thumbnails label', context).live({
                            click: function(event) {
                                var img = $(this).find('img');
                                if (img.length > 0)
                                    $('input[name=thumbnail]', context).val(img.attr('src'));
                            }
                        });
                    });
                }
            }
        }
    }
})(jQuery);