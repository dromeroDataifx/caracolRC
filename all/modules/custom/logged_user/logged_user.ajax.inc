<?php

function logged_user_ajax_keys_process() {
	$keys['change-password']['callback'] = '_logged_user_ajax_get_pass';
	return $keys;
}

function _logged_user_ajax_get_pass() {
	$tmp = drupal_get_form('logged_user_user_pass_form');
	$form['messages'] = array('#markup' => theme('status_messages'));
	$form+=$tmp;
	drupal_json_output(array('title' => $form['title']['#markup'], 'html' => render($form)));
}