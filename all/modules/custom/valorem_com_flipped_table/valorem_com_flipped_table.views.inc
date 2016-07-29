<?php

/**
 * Implements hook_views_plugins().
 */
function valorem_com_flipped_table_views_plugins() {
  return array(
    'style' => array(
      'flipped' => array(
        'title' => t('Flipped table'),
        'help' => t('Displays a table with rows and columns flipped.'),
        'handler' => 'views_plugin_style_table',
        'parent' => 'table',
        'uses row plugin' => FALSE,
        'uses fields' => TRUE,
        'uses options' => TRUE,
        'type' => 'normal',
        'theme' => 'valorem_com_flipped_table',
        'even empty' => TRUE,
      ),
    ),
  );
}