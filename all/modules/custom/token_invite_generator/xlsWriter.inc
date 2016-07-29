<?php

require_once 'excelBase.inc';

class XLSWriter extends ExcelBase {

	private $meta;

	public function __construct($meta) {
		parent::__construct();
		$this->meta = $meta;
	}

	public function write($rows, $filename) {
		$objPHPExcel = new PHPExcel();

		$objPHPExcel->getProperties()->setCreator("Maarten Balliauw")
				->setLastModifiedBy("Maarten Balliauw")
				->setTitle("Office 2007 XLSX Test Document")
				->setSubject("Office 2007 XLSX Test Document")
				->setDescription("Test document for Office 2007 XLSX, generated using PHP classes.")
				->setKeywords("office 2007 openxml php")
				->setCategory("Test result file");


		$sheet = $objPHPExcel->setActiveSheetIndex(0);

		foreach ($this->meta['columnNames'] as $i => $value)
			$sheet->setCellValueExplicitByColumnAndRow($i, 1, t($value));

		/* escribe el cotenido del archivo */
		foreach ($rows as $i => $row) {
			$j = 0;
			foreach ($row as $value)
				$sheet->setCellValueExplicitByColumnAndRow($j++, ($i + 2), $value);
		}

		$objPHPExcel->getActiveSheet()->setTitle('To Invite');
		$objPHPExcel->setActiveSheetIndex(0);

		header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
		header('Content-Disposition: attachment;filename="' . $filename . '.xlsx"');
		header('Cache-Control: max-age=0');

		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
		$objWriter->save('php://output');
		exit;
	}
}