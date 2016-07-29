<?php

function custom_works_ajax_keys_process() {
    $keys = array();
    $keys['render-prensa']['callback'] = '_custom_works_render_prensa_item';
    $keys['render-node-gallery']['callback'] = '_custom_works_node_gallery_render';
    $keys['fullpuc']['callback'] = '_custom_works_get_full_puc';
    return $keys;
}

function _custom_works_render_prensa_item($args) {
    echo theme('prensa_render', array('args' => $args));
}

function _custom_works_node_gallery_render($args) {
    $nid = array_pop($args);
    $node = node_load($nid);
    $content = node_view($node);
    drupal_json_output(array('title' => $node->title, 'content' => render($content['field_imagenes_de_galeria'])));
}

function _custom_works_get_full_puc() {
    $data = pandora_getfullpuc();
    kpr($data);
}
?>
