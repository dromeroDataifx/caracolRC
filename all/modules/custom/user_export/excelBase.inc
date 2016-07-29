<?php

abstract class ExcelBase {

	public function __construct() {
		require_once "{$_SERVER['DOCUMENT_ROOT']}/PHPExcel/Classes/PHPExcel.php";
		require_once "{$_SERVER['DOCUMENT_ROOT']}/PHPExcel/Classes/PHPExcel/IOFactory.php";
	}

}