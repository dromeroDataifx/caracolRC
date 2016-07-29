var pygopened = null;
var separadorMillon = "'";
(function($) {

    $(document).ready(function() {

        buildpygtoy(currentpuc);

        $(".pygbox").live('click', function() {
            if ($(this).hasClass("hasmore")) {
                pygopened = $(this).addClass("opened").removeClass("closed");
                $(".pyg-toy").removeClass("allclosed");
                if ($(this).hasClass("level1")) {
                    var box = $(this);
                    $(".pyg-opener").show();
                    $(".pyg-opener").each(function(ev1, ev2) {
                        if (box.hasClass($(this).attr("href").replace("#", ""))) {
                            $(this).hide();
                        }
                    });
                }
            }
            return false;
        });
        $(".pyg-back").click(function() {
            if (pygopened != null) {
                pygopened.removeClass("opened").addClass("closed");
                pygopened = pygopened.closest(".opened");
                if ($(".opened").size() == 0) {
                    $(".pyg-toy").addClass("allclosed");
                }
            }
        });
        $(".pyg-opener").click(function() {
            $(".pygbox").removeClass("opened").addClass("closed");
            pygopened = $(".pygbox.level1." + $(this).attr("href").replace("#", "")).addClass("opened").removeClass("closed");
        });



        $(".pyg-datechanger").click(function() {

            var date_id = $(".pyg-dateselect").val();

            $.get('../pyg/puc/' + date_id, function(data) {
                buildpygtoy(data);
            }, "json");

            return false;
        });


        var pygyears = $(".pygyears");
        var years = {};
        if (pygyears.size() > 0) {
            while (pygyears.hasClass("allowoverrideparent")) {
                pygyears = pygyears.parent();
            }


            $(".pyg-dateselect option").each(function(e1, e2) {
                var id = $(this).val();
                if (parseInt($(this).val()) > 0) {
                    if (typeof years[id.substring(0, 4)] == "undefined") {
                        years[id.substring(0, 4)] = [];
                    }
                    years[id.substring(0, 4)].push(id);
                }
            });

            var html = "";
            var c = 0;
            for (year in years) {
                c++;
                html += '<li><a class="' + ((c == 1) ? 'active' : '') + ' pygyear-changer pygyear-changer-' + c + '" href="#' + year + '">' + year + '</a></li>';
            }
            pygyears.after(html).remove();
            $(".pygyear-changer").click(function() {
                $(".pygyear-changer").removeClass("active");
                $(this).addClass("active");
                var options_html = "";
                periodo_id = "";
                var c = 0;
                for (periodo in years[$(this).attr("href").replace("#", "")]) {
                    c++;
                    periodo = years[$(this).attr("href").replace("#", "")][periodo];
                    var selected = "";
                    if (c == 1) {
                        periodo_id = periodo;
                        selected = 'selected="selected"';
                    }
                    options_html += '<option ' + selected + ' value="' + periodo + '">' + periodo.substring(0, 4)
                            + "-" + periodo.substring(4, 6) + "-" + periodo.substring(6, 8)
                            + '</option>';
                }
                $(".pyg-dateselect").html(options_html);

                /*obtiene la lista de documentos financieros*/
                $.get(Drupal.settings.basePath + 'ajax_ui/view/documentos_estados_financieros/caja_documentos_estados_financieros/' + $(this).attr("href").replace("#", ""),
                        function(data) {
                            if (data) {
                                var box = $(".view-documentos-estados-financieros").parent().parent().parent();
                                box.replaceWith(data);
                            }
                        }, 'html');

                $.get('../pyg/puc/' + periodo_id, function(data) {
                    buildpygtoy(data);
                }, "json");

            });
            $(".pygyear-changer-1").click();


        }


    });

})(jQuery);

function buildpygtoy(puclist) {

    var struct = {};
    for (puc in puclist) {
        if (puc < 10) {
            struct[puc] = {content: {}};
            struct[puc]['name'] = puclist[puc].name;
            struct[puc]['value'] = puclist[puc].value;
        } else if (puc < 100) {
            if (typeof struct[puc.substring(0, 1)] == "undefined")
                struct[puc.substring(0, 1)] = {content: {}};
            struct[puc.substring(0, 1)]['content'][puc] = {content: {}};
            struct[puc.substring(0, 1)]['content'][puc]['name'] = puclist[puc].name;
            struct[puc.substring(0, 1)]['content'][puc]['value'] = puclist[puc].value;
        } else if (puc < 10000) {
            if (typeof struct[puc.substring(0, 1)]['content'][puc.substring(0, 2)] == "undefined")
                struct[puc.substring(0, 1)]['content'][puc.substring(0, 2)] = {content: {}};
            struct[puc.substring(0, 1)]['content'][puc.substring(0, 2)]['content'][puc] = {content: {}};
            struct[puc.substring(0, 1)]['content'][puc.substring(0, 2)]['content'][puc]['name'] = puclist[puc].name;
            struct[puc.substring(0, 1)]['content'][puc.substring(0, 2)]['content'][puc]['value'] = puclist[puc].value;
        } else {
            if (typeof struct[puc.substring(0, 1)] == "undefined")
                struct[puc.substring(0, 1)] = {content: {}};
            if (typeof struct[puc.substring(0, 1)]['content'][puc.substring(0, 2)] == "undefined")
                struct[puc.substring(0, 1)]['content'][puc.substring(0, 2)] = {content: {}};
            if (typeof struct[puc.substring(0, 1)]['content'][puc.substring(0, 2)]['content'][puc.substring(0, 4)] == "undefined")
                struct[puc.substring(0, 1)]['content'][puc.substring(0, 2)]['content'][puc.substring(0, 4)] = {content: {}};
            struct[puc.substring(0, 1)]['content'][puc.substring(0, 2)]['content'][puc.substring(0, 4)]['content'][puc] = {};
            struct[puc.substring(0, 1)]['content'][puc.substring(0, 2)]['content'][puc.substring(0, 4)]['content'][puc]['name'] = puclist[puc].name;
            struct[puc.substring(0, 1)]['content'][puc.substring(0, 2)]['content'][puc.substring(0, 4)]['content'][puc]['value'] = puclist[puc].value;
        }
    }

    jQuery(".pyg-toy .toycontent").html(buildpygbox(struct, 1));

    jQuery(".pygbox").addClass("closed");
    jQuery(".pyg-toy").addClass("allclosed");

    var separador = parseFloat(jQuery(".level1.p2").css("marginBottom").replace("px", "") / 2);
    var pasivopatrimonio = parseFloat(puclist[2].value) + parseFloat(puclist[3].value);
    var alturaactivo = jQuery(".pyg-toy").height();
    var porcentaje_pasivo = parseFloat(puclist[2].value / pasivopatrimonio);
    if (porcentaje_pasivo < 0.2)
        porcentaje_pasivo = 0.2;
    jQuery(".level1.p2").css("height", (alturaactivo * porcentaje_pasivo) - separador);
    jQuery(".level1.p3").css("top", (alturaactivo * porcentaje_pasivo) + separador);
    jQuery(".level1.p3").css("height", (alturaactivo * (1 - porcentaje_pasivo)) - separador * 2);



}
;

function buildpygbox(struct, level) {

    if (level == 5)
        return '';

    var html = "";

    for (puc in struct) {

        var clase = "";
        if (typeof struct[puc].content != "undefined" && Object.size(struct[puc].content) > 0) {
            clase += " hasmore";
        }

        html += '<div class="pygbox level' + level + ' p' + puc + clase + '">';
        html += '  <div class="pygtitle level' + level + '">';
        html += '    <span class="name">' + struct[puc].name + '</span>';
        html += '    <span class="value op">' + accounting.formatMoney(struct[puc].value / 1000000) + '</span>';
        html += '  </div>';
        html += '  <div class="content level' + level + '">' + buildpygbox(struct[puc].content, level + 1) + '</div>';
        html += '</div>';

    }

    return html;

}
;

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key))
            size++;
    }
    return size;
};