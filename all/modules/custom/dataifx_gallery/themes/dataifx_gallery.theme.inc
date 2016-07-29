<?php

/**
 * @file
 * Theme related functions for processing output related to dataifx_gallery galleries.
 */

/**
 * Returns HTML for embedding a dataifx_gallery gallery.
 *
 * @param array $data
 *   An associative array containing variables used to render this HTML.
 *
 * @ingroup themeable
 */
function template_preprocess_dataifx_gallery_embed_markup(&$data) {
//	drupal_set_message(kpr(func_get_args(), true), 'warning');
	$path = drupal_get_path('module', 'dataifx_gallery');

	$data['custom_classes'] = '';
	if (!empty($data['settings']['custom_parent_classes']))
		$data['custom_classes'] = ' ' . check_plain(trim($data['settings']['custom_parent_classes']));
}
