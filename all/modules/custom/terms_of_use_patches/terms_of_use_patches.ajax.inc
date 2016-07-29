<?php

function terms_of_use_patches_ajax_keys_process() {
    $keys = array();
    $keys['terms_of_use']['callback'] = '_terms_of_use_patches_print_terms_of_use';
    return $keys;
}

function _terms_of_use_patches_print_terms_of_use() {
    // Getting the nid of the the Terms of Use node.
    $terms_of_use_node_id = variable_get('terms_of_use_node_id', 0);
    // If the translation module is active the node might be available in other
    // languages.
    if (module_exists('translation')) {
        $translations = translation_node_get_translations($terms_of_use_node_id);
        if (!empty($translations[$GLOBALS['language']->language])) {
            $terms_of_use_node_id = $translations[$GLOBALS['language']->language]->nid;
        }
    }

    // A nid for the desired language was found.
    if ($terms_of_use_node_id) {
        $node = node_load($terms_of_use_node_id);
        // If we were able to load the node.
        if ($node->nid) {
            // If we find @link in the text for the terms checkbox we just show a
            // link. Otherwise we show the full terms.
            if (strpos($checkbox_label, '@link') !== FALSE) {
                $checkbox_label = str_replace('@link', l($node->title, 'node/' . $node->nid), $checkbox_label);
            }
            // If there wasn't a link to the node we add the body field of the node
            // to the login form.
            elseif ($items = field_get_items('node', $node, 'body')) {
                // Limit the height of the body text with css.
                $form['#attached']['css'] = array(drupal_get_path('module', 'terms_of_use') . '/terms_of_use.css');
                $form['terms_of_use']['terms_of_use_text'] = field_view_value('node', $node, 'body', $items[0]);
            } else {
                watchdog('terms_of_use', 'The body field of the "terms of use" node was empty. Please check the the nodes content.', array(), WATCHDOG_ALERT, l(t('Administer terms of use'), 'admin/config/people/terms_of_use'));
            }
        } else {
            watchdog('terms_of_use', 'The "terms of use" node could not be loaded. Please check the settings and if the node exists.', array(), WATCHDOG_ALERT, l(t('Administer terms of use'), 'admin/config/people/terms_of_use'));
        }
    } else {
        watchdog('terms_of_use', 'No node is set as "terms of use" in the current language [@lang].', array('@lang' => $GLOBALS['language']->language), WATCHDOG_NOTICE, l(t('Administer terms of use'), 'admin/config/people/terms_of_use'));
    }
    $output['body'] = render($form['terms_of_use']);
    $output['title'] = $node->title;
    drupal_json_output($output);
}
