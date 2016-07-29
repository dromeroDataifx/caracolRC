<?php

/**
 * @file
 * This template is used to print a single field in a view.
 *
 * It is not actually used in default Views, as this is registered as a theme
 * function which has better performance. For single overrides, the template is
 * perfectly okay.
 *
 * Variables available:
 * - $view: The view object
 * - $field: The field handler object that can process the input
 * - $row: The raw SQL result that can be used
 * - $output: The processed output that will normally be used.
 *
 * When fetching output from the $row, this construct should be used:
 * $data = $row->{$field->field_alias}
 *
 * The above will guarantee that you'll always get the correct data,
 * regardless of any changes in the aliasing that might happen if
 * the view is modified.
 */
$matches = false;
preg_match('/(?<=\.)(\w*)$/i', $row->field_field_archivo_formato_pdf_1[0]['raw']['uri'], $matches);
$clases = (isset($matches[0]) && !empty($matches[0])) ? "icons-extension extension-{$matches[0]}" : "";
$name = !empty($row->field_field_archivo_formato_pdf_1[0]['raw']['description']) ?$row->field_field_archivo_formato_pdf_1[0]['raw']['description'] : $row->node_title;
?>
<?php print l($name, file_create_url($row->field_field_archivo_formato_pdf_1[0]['raw']['uri']), array('attributes' => array('class' => array($clases), 'title' => $name, 'target' => '_blank'))); ?>