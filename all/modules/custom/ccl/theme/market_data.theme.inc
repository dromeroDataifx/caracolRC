<?php

function _market_data_trasform($lines) {
	$lines = drupal_json_decode($lines);
	return $lines;
}

function template_preprocess_market_data(&$args) {
	drupal_add_css('misc/ui/jquery.ui.accordion.css');
	/* se agregan las librerias necesarias */
	drupal_add_js(libraries_get_path('jquery.closable-accordion') . "/jquery.closable-accordion.js", 'file');
	drupal_add_js(drupal_get_path('module', 'market_data') . '/js/market_data.js', 'file');
	drupal_add_js('https://pandoradataifx.blob.core.windows.net/pandora/scripts/v1/dataifx_values.js', 'file');

	$args['data'] = _market_data_trasform(variable_get('dataifx_indices', ''));
	$args['image'] = theme_image(array('path' => drupal_get_path('module', 'market_data') . "/images/logo-dataifx.png"));
}