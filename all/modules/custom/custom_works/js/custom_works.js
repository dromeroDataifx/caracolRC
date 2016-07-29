(function($) {
    /**
     * accordion
     * */
    Drupal.behaviors.filter = {attach: function(context) {
            var links = $('#block-custom-works-banco-recursos-filter .content li a.disabled');
            links.click(function(event) {
                event.preventDefault();
            });
        }
    },
    Drupal.behaviors.bancoRecursosDownloadAddons = {attach: function(context) {
            var triggers = $('.view-banco-de-recursos-interna .views-field-field-imagen, .view-banco-de-recursos-interna-filtro .views-field-field-imagen, .view-display-id-prensa_resultados_busqueda .views-field-field-imagen ');
            triggers.find('.field-content').prepend('<a href="#" class="custom-trigger download-trigger"></a>');

            triggers.each(function(index, value) {
                var type = $(this).siblings('.views-field-field-tipo-multimedia').find('.icon').attr('class').replace('icon ', '');

                $(this).find('a.custom-trigger')
                        .addClass(type)
                        .css({zIndex: -999}).hide();
            });
            triggers.die();
            triggers.live({
                mouseenter: function(event) {
                    var downloadTrigger = $(this).find('.custom-trigger');
                    downloadTrigger.css({zIndex: 999})
                            .fadeIn(700);
                },
                mouseleave: function(event) {
                    var downloadTrigger = $(this).find('.custom-trigger');
                    downloadTrigger.css({zIndex: -999})
                            .fadeOut(300);
                }
            });
            var downloadTriggers = triggers.find('.field-content a.download-trigger');
            downloadTriggers.click(function(event) {
                event.preventDefault();
                var anchor = $(this).parent().find('a:not(.custom-trigger)');
                var box = $('div#fake-box');
                box.css({display: 'none', overflow: 'hidden'});
                var type = $(this).parent().parent().siblings('.views-field-field-tipo-multimedia').find('.icon').attr('class').replace('icon ', '');
                var config = {};
                config.dimension = {};
                config.dimension.width = 'auto';
                config.dimension.height = 400;
                config.isGallery = false;
                config.group = anchor.attr('data-group');
                var segments = Array();
                segments.push(Drupal.settings.ajax_ui.path);
                segments.push('render-prensa');
                segments.push('element');
                segments.push(anchor.attr('data-nid'));
                switch (type) {
                    case 'icon_image':
                        config.dimension.width = 677;
                        config.dimension.height = 710;
                        config.isGallery = anchor.attr('data-isgallery') === 'true';

                        if (config.isGallery) {
                            /*se extrae el nid del nodo y el marcador para el renderizado*/
                            segments.pop();
                            segments.pop();
                            /*se agrega el marcador para el renderizado*/
                            segments.push('gallery')
                            /*se agrega el tid de la produccion*/
                            segments.push(anchor.attr('data-produccion'))
                            /*se agrega el tid del grupo*/
                            segments.push(anchor.attr('data-group'))
                            config.dimension.width = 760;
//							config.dimension.height = 725;
                            box.css({height: 725});
                        }
                        break;
                    case 'icon_audio':
                        config.dimension.width = 525;
                        config.dimension.height = 190;
                        break;
                    case 'icon_video':
                        config.dimension.width = 1010;
                        config.dimension.height = 670;
                        break;
                }
                box.html('<iframe src="' + segments.join('/') + '" style="width: 100%; height: 100%;" scrolling="no" frameborder="0"></iframe>');
                setTimeout(function() {
                    box.dialog({
                        modal: true,
                        resizable: false,
                        width: config.dimension.width,
                        height: config.dimension.height,
                        close: function() {
                            box.html('');
                        }
                    });
                }, 10);
            });
        }
    },
    Drupal.behaviors.searchFormFilterAddons = {attach: function(context) {
           var filters = $('.search-form-addons-sort-by, .general-search-form-filters');
            var triggers = $('.search-form-addons-sort-by li a, .general-search-form-filters li a');
            var form = $(filters.data('target'));
            var fieldSubmit = form.find('[type=submit]');
            triggers.die();
            triggers.live({
                click: function(event) {
                    event.preventDefault();
                    var fieldFilterBy = form.find('[name=' + $(this).data('filter-field') + ']');
                    var args = $(this).data('filter-argument').split(',');
                    fieldFilterBy.val(args);
                    fieldSubmit.trigger('click');
                }
            });
        }
    }
})(jQuery);
