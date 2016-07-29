<?php

require_once 'excelBase.inc';

class XLSReader extends ExcelBase {

    public $file;
    public $meta;

    public function __construct($file, $meta) {
        parent::__construct();

        $this->file = $file;
        $this->meta = $meta;
    }

    public function getSheetsContent() {
        /**  Identify the type of $inputFileName  * */
        $path = file_stream_wrapper_get_instance_by_uri($this->file->uri)->realpath();
        $inputFileType = PHPExcel_IOFactory::identify($path);
        /**  Create a new Reader of the type that has been identified  * */
        $objReader = PHPExcel_IOFactory::createReader($inputFileType);
        /**  Load $inputFileName to a PHPExcel Object  * */
        $objPHPExcel = $objReader->load($path);
        $limits = $objPHPExcel->getSheet()->getHighestRowAndColumn();
        $rows = false;
        for ($i = 1; $i <= $limits['row']; $i++)
            foreach (range('A', $limits['column']) as $j => $column) {
                $value = $objPHPExcel->getSheet()->getCell("{$column}{$i}")->getValue();

                if (is_object($value))
                    $value = $value->getPlainText();

                if ($column == "A") {
                    if (empty($value)) {
                        drupal_set_message("la fila {$i} no fue agregada porque el campo email esta vacio", 'warning');
                        break;
                    } else
                        $rows[$i][$this->meta['columnNames'][$j]] = $value;
                } else
                    $rows[$i][$this->meta['columnNames'][$j]] = $value;
            }
//		drupal_set_message(kpr($rows, true), 'warning');
        return $rows;
    }

}
