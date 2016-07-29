<?php

// ------------------------------------------------------------------------

/**
 * Indicadores Class
 *
 * @package	DATA iFX
 * @subpackage	Libraries
 * @category	Libraries
 * @author	Javier Rojas (jrojas@dataifx.com)
 * @link        http://dataifx.com
 */
require_once 'fpdf/fpdf.php';

class PDFWriter extends FPDF {

    private $border;
    private $text;

    public function __construct() {
        $this->border->left = 35.56;
        $this->text->color->r = 101;
        $this->text->color->g = 98;
        $this->text->color->b = 99;
        $this->text->size = 9;
        $this->text->font = "Arial";

        parent::__construct('P', 'mm', 'letter');
    }

    public function setData($images, $content, $fecha) {
        $fecha = array(date('j', $fecha), 'de', t(date('F', $fecha)), 'de', date('Y', $fecha));

        foreach ($content['content'] as $pageTitle => $page) {
            $this->_newPage($images);
            $this->_header($content['title'] . (is_numeric($pageTitle) ? ' ' : " - {$pageTitle} ") . implode(' ', $fecha));
            $this->_content($page);
        }
    }

    public function render($fileName, $tipo) {
//		kpr("{$fileName}.pdf");
        $this->Close();
        $this->Output("{$fileName}.pdf", $tipo);
    }

    private function _newPage($images) {
        $this->AddPage();
        //imprime la plantilla
        $this->_membrete($images);
    }

    private function _membrete($imagenesMembrete) {
        $this->Image($imagenesMembrete['head'], 15, 20);

        $this->SetDrawColor(0, 158, 227);
        $this->SetFillColor(0, 158, 227);
        $this->Rect(13.213, 0, 0.51, 92.2, 'F');

        $this->SetDrawColor(38, 27, 99);
        $this->SetFillColor(38, 27, 99);
        $this->Rect(13.213, 92.2, 0.51, 92.2, 'F');

        $this->SetDrawColor(243, 146, 0);
        $this->SetFillColor(243, 146, 0);
        $this->Rect(13.213, 184.4, 0.51, 95, 'F');

        $this->Image($imagenesMembrete['foot'], 98.52, 260.2);
    }

    private function _header($titulo) {
        //Titulo del reporte   
        $this->SetTextColor(0, 173, 239);
        $this->SetFont($this->text->font, '', 16);
        $this->Text($this->border->left, 16, $this->_decode("Caracol Televisión S.A. (Millones de pesos)"));

        $this->SetTextColor(256, 256, 256);
        $this->SetFont($this->text->font, '', 16);
        $this->Text($this->border->left, 26, $this->_decode($titulo));
    }

    private function _content($rows) {
        $this->SetFillColor(256, 256, 256);
        $this->SetDrawColor($this->text->color->r, $this->text->color->g, $this->text->color->b);
        $this->SetTextColor($this->text->color->r, $this->text->color->g, $this->text->color->b);
        $this->SetFont($this->text->font, '', $this->text->size);
        $this->SetXY($this->border->left, 36.57);

        foreach ($rows as $row) {
            $this->SetX($this->border->left);
            $this->Cell(79.2, $this->text->size * 0.45, "\t\t\t\t\t\t\t\t" . $row['nombre'], 'B', 0, 'L');
            $this->Cell(50, $this->text->size * 0.45, $row['valor'] . "\t\t\t\t\t\t\t\t", 'B', 1, 'R');
        }
    }

    private function _decode($string) {
        $inputReplacement = array(
            'á' => chr(225),
            'é' => chr(233),
            'í' => chr(237),
            'ó' => chr(243),
            'ú' => chr(250),
            'ñ' => chr(241),
            'Á' => chr(193),
            'É' => chr(201),
            'Í' => chr(205),
            'Ó' => chr(211),
            'Ú' => chr(218),
            'Ñ' => chr(209),
            '¿' => chr(191),
        );
        return @strtr($string, $inputReplacement);
    }

}