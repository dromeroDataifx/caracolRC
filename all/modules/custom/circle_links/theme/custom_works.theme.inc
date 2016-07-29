<?php

function template_preprocess_banco_recursos_filter(&$args) {
    drupal_add_js(drupal_get_path('module', 'custom_works') . '/js/custom_works.js', 'file');
    $vocabulary = taxonomy_get_tree(16);

    $parents = array();
    foreach ($vocabulary as $term)
        if ($term->depth != 0)
            $parents[$term->parents[0]] = $term->parents[0];

    $matches = false;
    preg_match_all('/(\d{1,})/', current_path(), $matches);

    $params = array();
    if ($matches) {
        $params = $matches[0];
        $path = "prensa/banco-de-recursos/{$params[0]}/filtro/";
    }
    $args['links'][] = l(t('All'), "{$path}all", array('attributes' => array('class' => array(), 'data-tid' => -1, 'data-hasChilds' => 'false')));
    foreach ($vocabulary as $term)
        if ($term->depth == 0) {
            $query = db_select('field_data_field_filter_tags', 'tags');
            $query->addExpression('IF(COUNT(*) = 0, FALSE, TRUE)', 'hasResults');
            $query->innerJoin('taxonomy_term_data', 'terms', 'terms.tid = tags.field_filter_tags_tid');

            $query->condition('tags.deleted', '0', '=')
                    ->condition('tags.entity_type', 'node', '=')
                    ->condition('tags.bundle', 'recurso', '=')
                    ->condition('terms.tid', $term->tid, '=');

            $result = $query->execute();
            $aditionalClass = '';
            $aditionalAttribute = '';
            if (isset($params[1]) && $params[1] == $term->tid) {
                $aditionalClass = 'selected';
                $aditionalAttribute = 'padding-left: 17px;';
            }

            $args['links'][] = l($term->name, "$path{$term->tid}", array(
                'attributes' => array('style' => $aditionalAttribute, 'class' => array(!$result->fetchObject()->hasResults ? 'disabled' : '', $aditionalClass), 'data-tid' => $term->tid, 'data-hasChilds' => isset($parents[$term->tid]) ? 'true' : 'false'))
            );
        }

    $args['sw'] = true;
    $args['i'] = 0;
    $args['n'] = count($args['links']);
}

function template_preprocess_buscador_general_filter(&$args) {
    drupal_add_js(drupal_get_path('module', 'custom_works') . '/js/custom_works.js', 'file');
    switch ($args['type']) {
        case 'general':
            $args['resourceTypes'] = array('All' => t('All'));
            $viewName = 'buscador';
            $viewDisplay = 'resultados_busqueda_general';

            $view = views_get_view($viewName);
            $view->set_display($viewDisplay);

            $types = node_type_get_types();
            foreach ($view->display[$viewDisplay]->display_options['filters']['type']['value'] as $key => $value)
                $view->display[$viewDisplay]->display_options['filters']['type']['value'][$key] = isset($types[$key]) ? $types[$key]->name : $value;

            $args['resourceTypes']+=$view->display[$viewDisplay]->display_options['filters']['type']['value'];

            $toMerge = array('documento_corporativo', 'informe', 'reporte_gri');

            $resourceTypes = array();
            $args['resourceTypes']+= array('All' => t('All'));
            foreach ($args['resourceTypes'] as $key => $value) {
                if (in_array($key, $toMerge)) {
                    $resourceTypes['descargables']['value'] = 'Descargables';
                    $resourceTypes['descargables']['arguments'][$key] = $key;
                } else {
                    $resourceTypes[$key]['value'] = $value;
                    $resourceTypes[$key]['arguments'][$key] = $key;
                }
            }
            $args['filterBy'] = '"type[]"';
            $args['resourceTypes'] = $resourceTypes;
            break;
        case 'prensa':
       
            $config = field_info_field('field_tipo_multimedia');
            $args['resourceTypes'] = array('All' => t('All'));
            $resourceTypes['All'] = array('value' => t('All'), 'arguments' => array('All' => 'All'));
            foreach ($config['settings']['allowed_values'] as $key => $value) {
                $label = explode(':', $value);
                $resourceTypes[$key]['value'] = $label[0];
                $resourceTypes[$key]['arguments'][$key] = $key;
            }
            $args['resourceTypes'] = $resourceTypes;
            $args['filterBy'] = 'tipo_multimedia';
            break;
    }
}

function template_preprocess_prensa_render(&$args) {
    $args['renderType'] = @array_shift($args['args']);
    switch ($args['renderType']) {
        case 'gallery':
            _custom_works_render_gallery($args);
            break;
        case 'element':
            _custom_works_render_element($args);
            break;
    }
}

function _custom_works_render_gallery(&$args) {
    $viewName = 'banco_de_recursos_interna_filtro';
    $viewDisplay = 'juice_imagenes';

    $view = views_get_view($viewName);
    $view->set_display($viewDisplay);
    $view->set_arguments($args['args']);

    $view->execute();
    $args['content'] = $view->render();
    $library = libraries_detect('juicebox');
    $args['jsLibrary'] = file_create_url("{$library['library path']}/{$library['version arguments']['file']}");
}

function _custom_works_render_element(&$args) {
    $nid = @array_pop($args['args']);
    if (is_numeric($nid)) {
        $node = node_load($nid);
        $args['contentType'] = $node->field_tipo_multimedia['und'][0]['value'];
        switch ($args['contentType']) {
            case'image':
                $args['content'] = theme_image_style(array('style_name' => '630x615', 'path' => $node->field_imagen['und'][0]['uri'], 'alt' => $node->field_imagen['und'][0]['value']['alt']));
                $args['link']['type'] = 'direct';
                $args['link']['url'] = file_create_url($node->field_imagen['und'][0]['uri']);
                break;
            case'article':
                $args['content'] = theme_image_style(array('style_name' => '630x615', 'path' => $node->field_imagen['und'][0]['uri'], 'alt' => $node->field_imagen['und'][0]['value']['alt']));
                $args['link']['type'] = 'direct';
                $args['link']['url'] = file_create_url($node->field_archivo['und'][0]['uri']);
                break;
            case'video':
            case'audio':
                $args['content'] = $node->field_full_multimedia_code['und'][0]['value'];
                $args['link']['type'] = 'download-multimedia';
                $args['link']['url'] = "ajax_ui/prepare/{$node->field_video['und'][0]['value']}";
                $args['link']['ajaxRequest'] = true;
                break;
        }
    }
}
