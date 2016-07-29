<?php

function ooyala_patches_ajax_keys_process() {
	$keys = array();
	$keys['prepare']['callback'] = '_ooyala_patches_render_prensa_item';
	$keys['download']['callback'] = '_ooyala_patches_render_prensa_download';
	return $keys;
}

function _ooyala_patches_render_prensa_item($params) {
	$embedCode = @array_pop($params);
	$path = drupal_get_path('module', 'ooyala');
	require_once "{$path}/includes/OoyalaApiV2.php";

	$keys = array(
		'api' => variable_get('ooyala_global_pcode'),
		'secret' => variable_get('ooyala_global_secret')
	);
	$ooyala = new Ooyala\OoyalaApiV2($keys['secret'], $keys['api']);

	$response = drupal_json_decode($ooyala->request(GET, "/v2/assets/{$embedCode}/source_file_info"));
	$file = false;
	if (is_array($response) && !empty($response)) {
		$uri = "public://tmp-download/{$response['original_file_name']}";
		$wrapper = file_stream_wrapper_get_instance_by_uri($uri);
		$path = system_retrieve_file($response['source_file_url'], $wrapper->realpath());
		if (!empty($path) && file_exists($path)) {
			$filename = explode('/', $path);
			$filename = array_pop($filename);

			$uri = "public://tmp-download/{$filename}";

			$_SESSION['myfile'] = array(
				'path' => $uri,
				'name' => $response['original_file_name']
			);

			$file = url('ajax_ui/download');
			$filesToDelete = variable_get('filesToDelete', false);
			if (!empty($filesToDelete)) {
				$filesToDelete = unserialize($filesToDelete);
				$filesToDelete[$path] = time() + 60 * 60;
			}
			else
				$filesToDelete = array();

			variable_set('filesToDelete', serialize($filesToDelete));
		}
	}
	drupal_json_output(array('file' => $file));
}

function _ooyala_patches_render_prensa_download() {
	$http_headers = array(
		'Content-Type' => 'text/csv',
		'Content-Disposition' => 'attachment; filename="' . $_SESSION['myfile']['name'] . '"',
		'Content-Length' => filesize($_SESSION['myfile']['path']),
	);
	if (strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE')) {
		$http_headers['Cache-Control'] = 'must-revalidate, post-check=0, pre-check=0';
		$http_headers['Pragma'] = 'public';
	} else {
		$http_headers['Pragma'] = 'no-cache';
	}


	file_transfer($_SESSION['myfile']['path'], array('Content-Type' => 'application/octet-stream',
		'Content-Disposition' => 'attachment; filename="' . $_SESSION['myfile']['name'] . '"',
		'Content-Length' => filesize($_SESSION['myfile']['path'])));
}