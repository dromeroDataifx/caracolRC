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
if (!empty($row->field_field_informes))
	foreach ($row->field_field_informes as $i => $file) {
		$matches = false;
		preg_match('/(?<=\.)(\w*)$/i', $file['raw']['filename'], $matches);
		$clases = (isset($matches[0]) && !empty($matches[0])) ? "icons-extension extension-{$matches[0]}" : "";

		$title = !empty($file['raw']['description']) ? $file['raw']['description'] : $file['raw']['filename'];

		print l($title, file_create_url($file['raw']['uri']), array('attributes' => array('class' => array("$clases file file-{$i}"), 'title' => $title, 'target' => '_blank')));
	}





