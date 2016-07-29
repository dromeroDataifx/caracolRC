<?php

/**
 * @file
 * Views integration for dataifx_gallery module.
 */

/**
 * Implements hook_views_plugin().
 */
function dataifx_gallery_views_plugins() {
	$path = drupal_get_path('module', 'dataifx_gallery');
	$plugins['style']['dataifx_gallery'] = array(
		'title' => t('DataiFX Gallery'),
		'help' => t('Display rows as a DataiFX Gallery.'),
		'handler' => 'dataifx_gallery_style_plugin',
		'path' => $path . '/plugins',
		'uses row plugin' => FALSE,
		'uses fields' => TRUE,
		'uses options' => TRUE,
		'uses grouping' => FALSE,
		'type' => 'normal',
	);
	return $plugins;
}
