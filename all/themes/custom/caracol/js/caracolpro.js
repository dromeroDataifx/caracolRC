function iframeRef( frameRef ) {
        return frameRef.contentWindow ? frameRef.contentWindow.document : frameRef.contentDocument
}
(function($) {
    var medioSelect = false;
    Drupal.behaviors.corners = {
        attach: function(context) {
            $(".caja-blanca-3-espacios .block h2.block-title").corner("5px");
            $("#block-views-red-de-portales-block h2.block-title").corner("5px");
            $("#block-views-red-de-portales-block .content").corner("top 5px");
            $(".region-sidebar-second .block-views .block-title").corner("5px");
            $("a.btn-ver-mas").corner("5px");
            $("a.btn-superfinanciera").corner("5px");
            $("ul.quicktabs-tabs.quicktabs-style-basic li").corner("top 5px").corner("bottom 1px");
            if ($.browser.msie != true || $.browser.version > 8) {
                //elementos de formulario
                $("#edit-mail").corner("7px");
                $("#edit-submit--2").corner("7px");
                $("#edit-submit").corner("7px");
            }
        }
    },
    Drupal.behaviors.fixSlideShow = {
        attach: function(context) {
            /*fixes for insert separators y slideshow pager*/
            var items = $(".view-frontpage.view-display-id-page .views-slideshow-pager-field-item");
            items.filter(':lt(' + (items.length - 1) + ')').after('<span class="separator"></span>');

            /*fixes for wrapper all fields in slideshow main frame*/
            $('.view-frontpage.view-display-id-page .views-slideshow-cycle-main-frame-row-item').each(function(index, item) {
                var fields = $(this).find('.views-field');
                var firstField = fields.filter(":eq(0)");
                var html = '';
                fields.filter(":gt(0)").each(function(index, item) {
                    html += item.outerHTML;
                });
                $(this).html(firstField[0].outerHTML + '<div class="row-wrapper">' + html + '</div>');
            });
        }
    },
    Drupal.behaviors.imagesdowload = {
        attach: function(context) {
            var triggers_dowloads = $('.view-agencia-de-noticias-nodos .views-field-php, .page-taxonomy .field-name-field-imagen, .node-type-noticia .env, .node-type-avance-programacion .env');

            $('a.custom-trigger-noticias')
                    .addClass("icon_image")
                    .css({zIndex: -999}).hide();
        
            triggers_dowloads.die();
            triggers_dowloads.live({
                mouseenter: function(event) {
                    var downloadTrigger = $('.custom-trigger-noticias');
                    downloadTrigger.css({zIndex: 999})
                            .fadeIn(700);
                    var position = triggers_dowloads.position();
                    var topy =  position.top ;
                    console.log(topy);
                    $(".view-agencia-de-noticias-nodos .views-field-php, .field-name-descaragar-img-personaje, .node-type-noticia .env, .node-type-avance-programacion .env").css({top:topy});
                     $('.env a.custom-trigger-noticias').css({top:topy});       
                }
               
            });

            $(".view-agencia-de-noticias-nodos .views-field-php, .field-name-descaragar-img-personaje, .node-type-noticia .env, .node-type-avance-programacion .env").die();
            $(".view-agencia-de-noticias-nodos .views-field-php, .field-name-descaragar-img-personaje, .node-type-noticia .env, .node-type-avance-programacion .env").live({
              
                mouseleave: function(event) {
                    var downloadTrigger = $('.custom-trigger-noticias');
                    downloadTrigger.css({zIndex: -999})
                            .fadeOut(300);
                }
            });
        }
    },
    Drupal.behaviors.collapsableMenuBlog = {
        attach: function(context) {
            /*fixes for insert separators y slideshow pager*/
            var rows = $(".view-display-id-block_menu_temas .view-content ul li.views-row");

            /*sets the initial state*/
            //hide all views
            rows.find('.views-field-view').hide();
            rows.addClass('collapsed');
            //show the first view
//            var defaultRow = rows.filter(':eq(0)');
//            defaultRow.find('.views-field-view').show();
//            defaultRow.removeClass('collapsed');
//            defaultRow.addClass('expanded');

            /*bind all events*/
            rows.find('.views-field-name').bind({
                click: function(event) {
                    if ($(this).parent().hasClass('collapsed')) {
                        $(this).parent().find('.views-field-view').slideDown(500, function() {
                            $(this).parent().removeClass('collapsed');
                            $(this).parent().addClass('expanded');
                        });
                    } else {
                        $(this).parent().find('.views-field-view').slideUp(500, function() {
                            $(this).parent().removeClass('expanded');
                            $(this).parent().addClass('collapsed');
                        });
                    }
                }
            });
        }
    },
    Drupal.behaviors.stickyMenu = {
        attach: function(context) {
            $("#region-menu").sticky({topSpacing: 0});
        }
    },
    Drupal.behaviors.blockFiltersResponsabilidadSocial = {
        attach: function(context) {
            var options = $("ul.fecha-filter a");
            var form = options.parents('.views-exposed-form').find('input');
            console.log("preventt");
            options.die();
            options.live({
                click: function(event) {
                    event.preventDefault();
                    console.log("preventt2");
                   
                    form.filter('#edit-field-fecha-value-max-date, #edit-created-max').val($(this).attr('data-max'));
                    form.filter('#edit-field-fecha-value-min-date, #edit-created-min').val($(this).attr('data-min'));
                    form.filter('[type=submit]').trigger('click');
               }
           });
        }
    },
    Drupal.behaviors.blockFiltersEffects = {
        attach: function(context) {
            var options = $("ul.fecha-filter a, ul.resource-types a");
            var cssIni = {paddingLeft: 0, color: 'black'};
            var cssFin = {paddingLeft: 14, color: '#F46B00'};
            var time = 500;
            options.die();
            options.live({
                click: function(event) {
                    event.preventDefault();
                    options.filter('.selected')
                            .removeClass('selected')
                            .animate(cssIni, time);

                    $(this).addClass('selected');
                    $(this).animate(cssFin, time);
                }
            });
        }
    },
    Drupal.behaviors.setFakeBox = {
        attach: function(context) {
            /*set the box*/
            var box = $('div#fake-box');
            if (box.length < 1)
                $('body').append('<div id="fake-box" title=""><a href="#" class="btn-close" title="' + Drupal.t('Close') + '">' + Drupal.t('Close') + '</a><span id="fake-box-content"></span></div>');
            box = $('div#fake-box');
            box.css({display: 'none'});
        }
    },
    Drupal.behaviors.customInlineModalDialog = {
        attach: function(context) {
            var triggers = $('.dialog-inline-custom');
       
        //obteniendo parametros de la url

        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        var data;

        for (var i = 0; i < sURLVariables.length; i++) 
        {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == "data") 
            {
                data = sParameterName[1];
            }
        }

       
        if(data){

             $("#block-views-reportes-bloque-modal").dialog({
                modal: true,
                resizable: false,
                width: '70%',
                create: function(event, ui) {
                    $("#block-views-reportes-bloque-modal").show();
                },
                close: function() {
                    $(target).hide();
                }
            });
            
        }
          
        }
    },


    Drupal.behaviors.buttonregister = {
        attach: function(context) {           
            
            $('#webform-client-form-1083').hide();           
            $("#block-webform-client-block-1083").append( "<div class='text-form-register'><br><p>Para tener acceso a todo nuestro contenido especial registrate.</p> <a href='#' class='btn-registro' style='text-decoration:none;'>Registro</a></div>" );
             var br = $('.btn-registro');
            br.click(function(event) {
               event.preventDefault();
               var link = $(this);
               $('.text-form-register').hide();
               $('#webform-client-form-1083').show();   
                
               
            });
        }
    },
    Drupal.behaviors.multimediaTriggering = {
        attach: function(context) {
            var triggers = $('a.multimedia-player-trigger', context);
            triggers.click(function(event) {
                event.preventDefault();
                var link = $(this);
                var multimedia = $('.multimedia-container').filter('[data-multimedia-id=' + link.attr('data-multimedia-target') + ']');
                multimedia.dialog({
                    modal: true,
                    resizable: false,
                    width: 'auto',
                    create: function(event, ui) {
                        multimedia.show();
                    },
                    close: function() {
                        multimedia.html('');
                    }
                });
            });
        }
    },
    Drupal.behaviors.portafolioCompanias = {
        attach: function(context) {
            var items = $('.view-id-portafolio_de_companias.view-display-id-pagina_portafolio_companias tr td');
            items.each(function(index, value) {
                $(this).html('<div class="frame-container">' + $(this).html() + '</div>');
                var text = items.find('.views-field-body');
                text.css({position: 'absolute', top: $(this).outerHeight(), left: 0, height: $(this).outerHeight(), width: $(this).outerWidth()});
            });
            items.find('.frame-container').css({position: 'relative', overflow: 'hidden'});
            items.find('.views-field-body .field-content').removeClass('noned');
            items.die();
            items.live({
                mouseenter: function(event) {
                    var text = $(this).find('.views-field-body');
                    text.css({top: $(this).outerHeight(), left: 0, height: $(this).outerHeight(), width: $(this).outerWidth()});

                    text.stop();
                    text.animate({top: 0, opacity: 1}, 700);
                },
                mouseleave: function(event) {
                    var text = $(this).find('.views-field-body');
                    text.stop();
                    text.animate({top: $(this).parent().outerHeight() * -1, opacity: 0}, 700);
                }
            });
        }
    },
    Drupal.behaviors.portafolioBolsaValores = {
        attach: function(context) {
            var items = $('.view-id-bolsa_de_valores tr td');
            items.each(function(index, value) {
                $(this).html('<div class="frame-container">' + $(this).html() + '</div>');
                var text = items.find('.views-field-title');
                text.css({position: 'absolute', top: $(this).outerHeight(), left: 0, height: $(this).outerHeight(), width: $(this).outerWidth()});
            });
            items.find('.frame-container').css({position: 'relative', overflow: 'hidden'});
            items.find('.views-field-title .field-content').removeClass('noned');
            items.die();
            items.live({
                mouseenter: function(event) {
                    var text = $(this).find('.views-field-title');
                    text.css({top: $(this).outerHeight(), left: 0, height: $(this).outerHeight(), width: $(this).outerWidth()});

                    text.stop();
                    text.animate({top: 0, opacity: 1}, 700);
                },
                mouseleave: function(event) {
                    var text = $(this).find('.views-field-title');
                    text.stop();
                    text.animate({top: $(this).parent().outerHeight() * -1, opacity: 0}, 700);
                }
            });
        }
    },

    Drupal.behaviors.prensaDownload = {attach: function(context) {
            var downloadTriggers = $('a.download-trigger-prensa');
            downloadTriggers.click(function(event) {
                event.preventDefault();
                var box = $('div#fake-box');
                box.css({display: 'none', overflow: 'hidden'});
                var type = $(this).parents('.views-field:eq(0)').siblings('.views-field-field-tipo-multimedia').find('.icon').attr('class').replace('icon ', '');
                var dimension = {};
                dimension.width = 'auto';
                dimension.height = 400;
                switch (type) {
                    case 'icon_image':
                        dimension.width = 677;
                        dimension.height = 710;
                        break;
                    case 'icon_audio':
                        dimension.width = 525;
                        dimension.height = 190;
                        break;
                    case 'icon_video':
                        dimension.width = 1030;
                        dimension.height = 670;
                        break;
                }
                box.html('<iframe src="' + Drupal.settings.ajax_ui.path + '/render-prensa/element/' + $(this).attr('data-nid') + '"  style="width: 100%; height: 100%;" scrolling="no" frameborder="0"></iframe>');
                box.dialog({
                    modal: true,
                    resizable: false,
                    width: dimension.width,
                    height: dimension.height,
                    close: function() {
                        box.html('');
                    }
                });
            });
        }
    },
    Drupal.behaviors.searchFormAddons = {
        attach: function(context) {
            var addons = $('.search-form-addons-sort-by', context);
            var triggers = addons.find('.sorting-tabs li a');
            var form = $(addons.data('target'), context);
            var fieldSortBy = form.find('[name=sort_by]');
            var fieldSortOrder = form.find('[name=sort_order]');
            var buttonSubmit = form.find('[type=submit]');
            triggers.die();
            triggers.live({
                click: function(event) {
                    event.preventDefault();
                    fieldSortBy.val($(this).attr('data-short_by'));
                    fieldSortOrder.val($(this).data('sort_order'));
                    buttonSubmit.val($(this).data('sort_order'));
                    buttonSubmit.trigger('click');
                    $.ajax({complete: function() {
                            $('input#edit-submit-buscador').val('Buscar');
                        }, beforeSend: function() {
                            $('input#edit-submit-buscador').val('Buscar');
                        }});
                }});
        }
    },
    Drupal.behaviors.noLink = {
        attach: function(context) {
            var links = $('a.nolink');
            links.die();
            links.live({click: function(event) {
                    event.preventDefault();
                }});
        }
    },
    Drupal.behaviors.removeMark = {
        attach: function(context) {
            $.ajax({
                complete: function() {
                    setTimeout(function() {
                        $('.jcbx-glry-classic > div').each(function(index, value) {
                            if ($(this).attr('class') === '')
                                $(this).removeAttr('style');
                        });
                    }, 2000);
                }
            });
        }
    },
    Drupal.behaviors.fullNodeViewFixVideoRender = {
        attach: function(context) {
            var videoField = $('.page-node .field-name-field-full-multimedia-code');
            if (videoField.length > 0) {
                var i = 0;
                var sw = setInterval(function() {
                    var object = videoField.find('object');
                    object.attr('width', videoField.outerWidth(true));
                    object.attr('height', videoField.outerHeight(true));
                    if (i > 10 || object.length > 0)
                        clearInterval(sw);
                    i++;
                }, 10);
            }
        }
    },
    Drupal.behaviors.galleryTrigger = {
        attach: function(context) {
            var links = $('.gallery-trigger');
            links.die();
            links.live({click: function(event) {
                    event.preventDefault();
                    var img = links.parents('article').find('.field-name-field-imagen img');
                    var box = $('div#fake-box');
                    $.get(Drupal.settings.ajax_ui.path + '/render-node-gallery/' + $(this).attr('data-gallery-nid'), {}, function(data) {
                        box.html(data.content);
                        box.dialog({
                            modal: true,
                            resizable: false,
                            width: img.outerWidth(true),
                            height: $(window).height() * .7,
                            title: data.title,
                            open: function(event, ui) {
                                setTimeout(function() {
                                    Drupal.behaviors.removeMark.attach();
                                }, 2000);
                            },
                            close: function() {
                                box.html('');
                            }
                        });
                    }, 'json');
                }});
        }
    },

      Drupal.behaviors.tabsbancorecursos = {
        attach: function(context) {
            var triggers = $('#quicktabs-banco_de_recursos_interna_filtro ul.quicktabs-tabs a');

            triggers.click(function(event) {
                var id = $(this).attr('id');
                id = id.replace("-tab-","-tabpage-");
                $("#"+id).removeClass('quicktabs-hide');
                
            });
            var triggers2 = $('#quicktabs-banco_de_recursos_interna ul.quicktabs-tabs a');

            triggers2.click(function(event) {
                var id = $(this).attr('id');
                id = id.replace("-tab-","-tabpage-");
                $("#"+id).removeClass('quicktabs-hide');
                
            });
            
        }
    },


   Drupal.behaviors.botonesProgramacion = {
        attach: function(context) {     

        if ( $("body").hasClass('page-prensa-avances-de-programacion')) {

             $(".block-system-main").prepend($(".botones-semanas"));
             /*$(".botones-semanas").clone().appendTo("#zone-post-content");*/


             /* $("#zone-post-content .region-content-second-inner").prepend(($(".botones-semanas").clone)); */

            $(".avance-page-1").addClass('aparece');
            $(".avance-page-1").removeClass('desaparece');
            $(".avance-page-2").addClass('desaparece');
            $(".avance-page-2").removeClass('aparece');

            $(".boton-esta-semana").click(function() {
                $(".avance-page-1").addClass('aparece');
                $(".avance-page-1").removeClass('desaparece');
                $(".avance-page-2").removeClass('aparece');
                $(".avance-page-2").addClass('desaparece');

                $(".boton-esta-semana").addClass('boton-activo');
                $(".boton-fin-de-semana").removeClass('boton-activo');  

            });
            $(".boton-fin-de-semana").click(function() {
                console.log("dddd");
                $(".avance-page-2").addClass('aparece');
                $(".avance-page-2").removeClass('desaparece');
                $(".avance-page-1").removeClass('aparece');
                $(".avance-page-1").addClass('desaparece'); 

                $(".boton-fin-de-semana").addClass('boton-activo');
                $(".boton-esta-semana").removeClass('boton-activo');                 
                
            });
        }

        }
    },

         Drupal.behaviors.popupLogin = {
        attach: function(context) {     

            $(".not-logged-in.page-prensa.context-prensa .grid-8").addClass("popuplogin");
            $(".not-logged-in.page-prensa.context-prensa #sombralogin").addClass("sombra");
          
            $(".cerrar").click(function(event) {
                    event.preventDefault();
                $(".not-logged-in.page-prensa.context-prensa .grid-8").removeClass("popuplogin");
                $(".not-logged-in.page-prensa.context-prensa #sombralogin").removeClass("sombra");
                $(".cerrar").addClass("cerrarShow");

                            
                
            });
        

        }
    }


})(jQuery);