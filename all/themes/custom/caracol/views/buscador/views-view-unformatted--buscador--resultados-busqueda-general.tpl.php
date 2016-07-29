<?php
/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>
<?php if (!empty($title)): ?>
	<h3><?php print $title; ?></h3>
<?php endif; ?>
<?php foreach ($rows as $id => $row): ?>
	<div<?if ($classes_array[$id]) {
		if(!isset($row->type)){
			print ' class="' . $classes_array[$id] . '"';
		}else{
			print ' class="' . $classes_array[$id] . ' ' . $row->type . '"';
		}
	} ?>>
	<?php print $row; ?>
	</div>
<?php endforeach; ?>