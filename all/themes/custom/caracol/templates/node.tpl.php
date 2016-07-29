<article<?php print $attributes; ?>>
    <?php print $user_picture; ?>
    <?php print render($title_prefix); ?>
    <?php if ($title): ?>
        <header>
            <?php if ($node->type == "avance_programacion"): ?>
                <?php if (date('l', strtotime($node->field_fecha['und'][0]['value'])) == "Saturday" || date('l', strtotime($node->field_fecha['und'][0]['value'])) == "Sunday" ): ?>
                    <img src="/sites/all/themes/custom/caracol/images/prensaRojo2.png" class="img_header">
                    <?php $title_attributes =  " property='dc:title' datatype='' class='node-title title_red'"; ?>
                <?php endif; ?>

                <?php if (date('l', strtotime($node->field_fecha['und'][0]['value'])) != "Saturday" && date('l', strtotime($node->field_fecha['und'][0]['value'])) != "Sunday" ) : ?>
                   <img src="/sites/all/themes/custom/caracol/images/prensaVerde2.png" class="img_header">
                    <?php $title_attributes =  " property='dc:title' datatype='' class='node-title title_green'"; ?>

                <?php endif; ?>

            <?php endif; ?>

            <h2<?php print $title_attributes; ?>><?php print $title ?></h2>
        </header>
    <?php endif; ?>
    <?php print render($title_suffix); ?>
    <?php if ($display_submitted): ?>
        <footer class="submitted"><?php print $date; ?> -- <?php print $name; ?></footer>
    <?php endif; ?>

    <div<?php print $content_attributes; ?>>

        <?php
        hide($content['comments']);
        hide($content['links']);

        if($node->type == "noticia")
            $linkToSection = str_replace("/agencia-de-noticias", "", $node->linkToSection);
        else
            $linkToSection = $node->linkToSection;

        if ($node->type != 'blog')
            $content['field_tema']['#title'] = t('Tags');

         if ($node->type != 'page_with_downloadable_file' && $node->type != 'avance_programacion'){
        ?>
        <div class="field field-name-date field-type-date-formatted">
            <div class="field-items"><?= t(date('F', $node->created)) . ' ' . date('d \d\e Y', $node->created) ?></div>
        </div>
        <div class="field field-name-type field-type-type">
            <div class="field-items"><?= $linkToSection ?></div>
        </div>
        <?php
         }
        ?>
        <?= $node->created < (time() - 60 * 60 * 24 * 7) ? render($content['sharethis']) : ''; ?>
        <div class="field field-name-field-tags field-type-taxonomy-term-reference field-label-above">
            <? if (!empty($content['field_tags']['#items'])): ?>
                <div class="field-label"><?= t('Tags') ?>:</div>
                <div class="field-items">
                    <? $sw = true; ?>
                    <? foreach ($content['field_tags']['#items'] as $tag): ?>
                        <div class="field-item <?= $sw ? 'odd' : 'even' ?>">
                            <?= l($tag['taxonomy_term']->name, 'resultados-de-busqueda', array('query' => array('keys' => $tag['taxonomy_term']->name, 'tipo_multimedia' => 'All', 'sort_by' => 'created', 'sort_order' => 'DESC'))) ?>
                        </div>
                        <? $sw = !$sw; ?>
                    <? endforeach; ?>
                </div>
            <? endif; ?>
        </div>
        <?= render($content['field_tema']) ?>
        <?

        if($node->type != 'proyecto' && $node->type != "responsabilidad_social_contenido"){
            if(isset($node->field_tipo_multimedia)){
                switch ($node->field_tipo_multimedia['und'][0]['value']) {
                    case 'video':
                        $c = $content['field_full_multimedia_code']['#object']->field_full_multimedia_code['und'][0]['value'];
                        if(strlen($c) > 13)
                        {
                            $pos = strpos($c, "@videoPlayer=");
                            $c = substr($c, $pos, 50);
                            $posIgual = strpos($c, "=");
                            $posSymbol = strpos($c, "&");
                            $c = substr($c, $posIgual +1, $posSymbol - 13);
                        }

                        $video = "<div style='display: block; margin-bottom: 30px; position: relative; max-width: 620px;'><div style='padding-top: 56.25%;'><video data-video-id='" . $c . "' data-account='3827094934001' data-player='default' data-embed='default' class='video-js' controls='' style='width: 100%; height: 100%; position: absolute; top: 0px; bottom: 0px; right: 0px; left: 0px;'></video>
<script src='//players.brightcove.net/3827094934001/default_default/index.min.js'></script></div></div><ol class='vjs-playlist'></ol>";
                        echo $video;
                        break;
                    case 'audio':
                        $imagen = isset($content['field_image']) ? $content['field_image'] : $content['field_imagen'];
                        print render($imagen);
                        print render($content['field_full_multimedia_code']);
                        break;
                    case 'gallery':
                        $imagen = isset($content['field_imagenes_de_galeria']) ? $content['field_imagenes_de_galeria'] : $content['field_imagen'];
                        //dpm($node->field_nombre_de_galeria['und'][0]['value']);
                        //dpm($content['field_imagenes_de_galeria']['#items'][0]['uri']);

                        if(isset($node->field_nombre_de_galeria['und'][0]['value'])){
                        $filename = $node->field_nombre_de_galeria['und'][0]['value'];
                        $uri = $content['field_imagenes_de_galeria']['#items'][0]['uri'];
                        $vowels = array("s3://");
                        $nw = str_replace($vowels, "", $uri);
                        //dpm($nw);
                        $partes_ruta = explode("/", $nw);
                        if(isset($partes_ruta[0]) && isset($partes_ruta[1]) &&isset($partes_ruta[2])){
                        $ruta_s3 = "http://static.caracoltvcorporativo.com.s3-us-west-2.amazonaws.com/".$partes_ruta[0]."-descargables" ."/".$partes_ruta[1] ."/Galerias/". $filename;
                        //dpm($ruta_s3);
                        }
                        }
                        print render($imagen);
                        ?>
                            <a class="button button-download" href="<?php if(isset($ruta_s3)) echo $ruta_s3 ?>" target='_blank' download >Descargar todo el material fotográfico</a> <br /><br />
                        <?php
                        break;
                    default:
                        if ($node->nid != 3003 ) {
                           $imagen = isset($content['field_image']) ? $content['field_image'] : $content['field_imagen'];
                            print render($imagen);
                        }else{
                            $block = module_invoke('circle_links', 'block_view', 'circle_links');

                            print render($block['content']);
                        }
                     break;
                }
            }else{

                $imagen = isset($content['field_image']) ? $content['field_image'] : $content['field_imagen'];
                print render($imagen);

            }
        }
    if($node->type == 'proyecto'){

        if(isset($node->field_multimedia_proyectos)){
            switch ($node->field_multimedia_proyectos['und'][0]['value']) {

                case 'video':
                        //print render($node->field_video_proyectos['und'][0]['value']);
                        $c = $node->field_video_proyectos['und'][0]['value'];
                        if(strlen($c) > 13)
                        {
                            $pos = strpos($c, "@videoPlayer=");
                            $c = substr($c, $pos, 50);
                            $posIgual = strpos($c, "=");
                            $posSymbol = strpos($c, "&");
                            $c = substr($c, $posIgual +1, $posSymbol - 13);
                        }

                        $video = "<div style='display: block; position: relative; margin-bottom: 30px; max-width: 620px;'><div style='padding-top: 56.25%;'><video data-video-id='" . $c . "' data-account='3827094934001' data-player='default' data-embed='default' class='video-js' controls='' style='width: 100%; height: 100%; position: absolute; top: 0px; bottom: 0px; right: 0px; left: 0px;'></video>
<script src='//players.brightcove.net/3827094934001/default_default/index.min.js'></script></div></div><ol class='vjs-playlist'></ol>";
                        echo $video;

                    break;
                default:

                    if($node->field_multimedia_proyectos['und'][0]['value'] != 'video'){

                        $imagen = isset($content['field_image']) ? $content['field_image'] : $content['field_imagen'];
                        print render($imagen);
                    }
                    break;
            }
        }else{

            $imagen = isset($content['field_image']) ? $content['field_image'] : $content['field_imagen'];
                    print render($imagen);



        }
    }
    ?>
    <?php
      if (isset($content['body'])) {
        print render($content['body']);
      }
      if(isset($content['field_archivo_formato_pdf'])) {
        print render($content['field_archivo_formato_pdf']);
      }

     if($node->type == 'responsabilidad_social_contenido'){
        //$node->field_titulo_bloque_uno['und'][0]['value'];
        $block1 = "<div id='block1'>".render($content['field_titulo_bloque_uno']) ;
        if(isset($content['field_video_bloque_uno'])){
            $c = $node->field_video_bloque_uno['und'][0]['value'];
            $block1 =  $block1 . "<div style='display: block; position: relative; margin-bottom: 30px; max-width: 270px;'><div style='padding-top: 56.25%;'><video data-video-id='" . $c . "' data-account='3827094934001' data-player='default' data-embed='default' class='video-js' controls='' style='width: 100%; height: 174px; position: absolute; top: 0px; bottom: 0px; right: 0px; left: 0px;'></video><script src='//players.brightcove.net/3827094934001/default_default/index.min.js'></script></div></div><ol class='vjs-playlist'></ol>";
        }else{
              $block1 =  $block1 . "<a href='http://static.caracoltvcorporativo.com.s3-us-west-2.amazonaws.com/styles/620x415/s3/2015/11/Iniciativa/MAMTV.png?itok=aI7vBkNx' title='bannerpopupalternativo' target='_blank' class='colorbox init-colorbox-processed cboxElement' rel='gallery-node-7350'>" .render($content['field_imagen']) ."</a>";
        }

         $block1 =  $block1 . "</div>";


        $block2 = "<div id='block2'>".render($content['field_titulo_bloque_dos']) ;

        if(isset($content['field_video_bloque_dos'])){
            $c = $node->field_video_bloque_dos['und'][0]['value'];
            $block2 =  $block2 . "<div style='display: block; position: relative; margin-bottom: 30px; max-width: 270px;'><div style='padding-top: 56.25%;'><video data-video-id='" . $c . "' data-account='3827094934001' data-player='default' data-embed='default' class='video-js' controls='' style='width: 100%; height: 174px; position: absolute; top: 0px; bottom: 0px; right: 0px; left: 0px;'></video><script src='//players.brightcove.net/3827094934001/default_default/index.min.js'></script></div></div><ol class='vjs-playlist'></ol>";
        }else{
              $block2 =  $block2 . render($content['field_imagen_bloque_dos']);
        }

        $block2 =  $block2 . "</div>";

        print $block1;
        print $block2;

    }

    ?>


    </div>
</article>
