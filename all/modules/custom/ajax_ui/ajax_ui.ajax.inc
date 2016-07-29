<?

/**
 * administra los query del ajax segun los parametros que reciva
 */
function ajax_ui_ajaxAdmin() {
	//url:ajax_ui/<keyword>/<arg>/<arg>/<arg>
	$args = func_get_args();
	$administers = module_invoke_all('ajax_keys_process');
	if (!empty($args)) {
		$keyword = array_shift($args);
		array_key_exists($keyword, $administers);
		if (array_key_exists($keyword, $administers)) {
			$adminItem = $administers[$keyword];
			if (!empty($adminItem['callback'])) {
				if (function_exists($adminItem['callback']))
					$adminItem['callback']($args);
				else
					drupal_set_message(t("the function %funtion_name don't exist", array('%funtion_name' => $adminItem['callback'])), 'error');
			}
			else
				drupal_set_message(t("you must set the key %callback for %keyword don't exist", array('%keyword' => $keyword, '%callback' => 'callback')), 'error');
		}
	}
}

function ajax_ui_ajax_keys_process() {
	$keys = array();
	$keys['view']['callback'] = '_ajax_ui_ajax_view';
	return $keys;
}

function _ajax_ui_ajax_view($params) {
	$viewName = array_shift($params);
	$viewDisplay = array_shift($params);

	$view = views_get_view($viewName);
	$view->set_display($viewDisplay);
	$view->set_arguments($params);
	$view->execute();

	$scapes = array();
	foreach ($params as $i => $arg)
		$scapes["%" . ($i + 1)] = $arg;

	$block = new stdClass();
	$block->module = 'views';
	$block->subject = str_replace(array_keys($scapes), $scapes, $view->display[$view->current_display]->display_options['title']);
	$block->delta = md5(rand(0, 1000) . time());

	print theme('block', array('elements' => array('#block' => $block, '#children' => $view->render())));
}