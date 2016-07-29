<?php

function valorem_informacion_financiera_pucupdate_posprocess($data) {
	$listaFechasReportes = $data->reportslist->result;
	$tablas = array();
	foreach ($listaFechasReportes as $fecha) {
		$fechaId = str_replace('-', '', $fecha->date);

		/* formateo de los valores */
		$tmp = build_balance_activo($fechaId);
		foreach ($tmp as $i => $item)
			$tmp[$i]['valor'] = number_format($tmp[$i]['valor'] / 1000000, 2);
		$tablas[$fecha->date]['Balance General']['Activos'] = $tmp;

		$tmp = build_balance_pasivopatrimonio($fechaId);
		foreach ($tmp as $i => $item)
			$tmp[$i]['valor'] = number_format($tmp[$i]['valor'] / 1000000, 2);
		$tablas[$fecha->date]['Balance General']['Pasivos y Patrimonio'] = $tmp;

		$tmp = build_balance_estadoresultados($fechaId);
		foreach ($tmp as $i => $item)
			$tmp[$i]['valor'] = number_format($tmp[$i]['valor'] / 1000000, 2);
		$tablas[$fecha->date]['Estado de Resultados'][] = $tmp;
	}

	require_once 'pdfwriter.php';
	$path = drupal_get_path('module', 'valorem_informacion_financiera');
	$uri = 'public://generated-pdf';
	$wrapper = file_stream_wrapper_get_instance_by_uri($uri);
	$destinationPath = $wrapper->realpath();

	$images = array('head' => "{$path}/images/pdf/bg_title.png", 'foot' => "{$path}/images/pdf/Logo.png");

	foreach ($tablas as $fecha => $files) {
		$fecha = strtotime("$fecha 00:00:00");
		$path = "{$destinationPath}/" . date('Ymd', $fecha);
		foreach ($files as $title => $pages) {
			$pdf = new PDFWriter();
			$pdf->setData($images, array('title' => $title, 'content' => $pages), $fecha);
			$filename = preg_replace("/\W/", '_', strtolower($title));
			if (file_prepare_directory($path, FILE_CREATE_DIRECTORY)) {
				$pdf->render("{$path}/{$filename}", 'F');
			}
			unset($pdf);
		}
	}
}

function deleteDir($dirPath) {
	if (!is_dir($dirPath)) {
		throw new InvalidArgumentException("$dirPath must be a directory");
	}
	if (substr($dirPath, strlen($dirPath) - 1, 1) != '/') {
		$dirPath .= '/';
	}
	$files = glob($dirPath . '*', GLOB_MARK);
	foreach ($files as $file) {
		if (is_dir($file)) {
			self::deleteDir($file);
		} else {
			unlink($file);
		}
	}
	rmdir($dirPath);
}