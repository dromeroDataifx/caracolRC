<?php

function template_preprocess_estado_resultados(&$args) {
	$uri = 'public://generated-pdf';
	$wrapper = file_stream_wrapper_get_instance_by_uri($uri);
	$destinationPath = $wrapper->realpath();

	$list = file_scan_directory($destinationPath, '(estado_de_resultados)');
	foreach ($list as $file) {
		$segments = explode('/', $file->uri);
		$n = count($segments);

		$dateSegments = array();
		$dateSegments[] = substr($segments[$n - 2], 0, 4);
		$dateSegments[] = substr($segments[$n - 2], 4, 2);
		$dateSegments[] = substr($segments[$n - 2], 6, 2);

		$time = strtotime(implode('-', $dateSegments) . ' 00:00:00');
		$date = date('Y-m-j', $time);
		$files[] = array(
			'filename' => $file->filename,
			'uri' => "{$uri}/{$segments[$n - 2]}/{$file->filename}",
			'description' => "Estado de Resultados " . $date,
			'time' => $time
		);
	}
	uasort($files, '_valorem_informacion_financiera_sort');
	$files = array_chunk($files, 4);
	$args['files'] = $files[0];
}

function template_preprocess_balance_general(&$args) {
	$uri = 'public://generated-pdf';
	$wrapper = file_stream_wrapper_get_instance_by_uri($uri);
	$destinationPath = $wrapper->realpath();

	$list = file_scan_directory($destinationPath, '(balance_general)');
	foreach ($list as $file) {
		$segments = explode('/', $file->uri);
		$n = count($segments);

		$dateSegments = array();
		$dateSegments[] = substr($segments[$n - 2], 0, 4);
		$dateSegments[] = substr($segments[$n - 2], 4, 2);
		$dateSegments[] = substr($segments[$n - 2], 6, 2);

		$time = strtotime(implode('-', $dateSegments) . ' 00:00:00');
		$date = date('Y-m-j', $time);
		$files[] = array(
			'filename' => $file->filename,
			'uri' => "{$uri}/{$segments[$n - 2]}/{$file->filename}",
			'description' => "Balance General " . $date,
			'time' => $time
		);
	}
	uasort($files, '_valorem_informacion_financiera_sort');
	$files = array_chunk($files, 4);
	$args['files'] = $files[0];
}

function template_preprocess_render_tablas(&$args) {
	
}

function _valorem_informacion_financiera_sort($a, $b) {
	return $b['time'] - $a['time'];
}