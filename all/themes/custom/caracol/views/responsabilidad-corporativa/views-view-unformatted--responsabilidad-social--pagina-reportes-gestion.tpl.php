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
<div class="row">
  <?php foreach ($rows as $id => $row): ?>
    <?php if($id == 0):?>
      <div <?php if ($classes_array[$id]) { print ' class=" box col-sm-4 col-md-6 ' . $classes_array[$id] .'"';  } ?>>
        <div class="thumb featured dark-overlay">
          <div class="photo">
            <?php print $row; ?>
          </div>
        </div>
      </div>
    <?php else: ?>
      <div <?php if ($classes_array[$id]) { print ' class="box col-xs-6 col-sm-4 col-md-3 ' . $classes_array[$id] .'"';  } ?>>
        <div class="thumb dark-overlay">
          <div class="photo">
            <?php print $row; ?>
          </div>
        </div>
      </div>
    <?php endif?>
  <?php endforeach; ?>
</div>
