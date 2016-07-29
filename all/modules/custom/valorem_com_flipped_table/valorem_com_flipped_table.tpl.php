<?php

  // Flip the table.
  $row = array();
  foreach ($rows as $col){
    foreach ($col as $ltr => $value){
      $row[$ltr][] = $value;
    }
  }
  $first = isset($row['title']);
  $zebra = 'odd';
?>

<table <?php if ($classes) { print 'class="'. $classes . '" '; } ?><?php print $attributes; ?>>
  <?php if (!empty($title)) : ?>
    <caption><?php print t($title); ?></caption>
  <?php endif; ?>

  <?php if ($first) : ?>
  <thead>
    <tr class="<?php echo $zebra; ?>">
      <th>
      </th>
      <?php foreach ($row['title'] as $count => $title) : ?>
      <th <?php print 'class="'. implode(' ', $row_classes[$count]) . '" '; ?>>
      <?php echo t($title); ?>
      </th>
      <?php endforeach; ?>
    </tr>
  </thead>
  <?php  
    $first = FALSE;
    endif; //$first
    $zebra = 'even';
  ?>
  <tbody>
    <?php foreach ($row as $field => $rowname) : ?>
      <?php if ($field != 'title') : ?>
      <tr class="<?php print $zebra; ?>">
        <th>
          <?php echo t($header[$field]); ?>
        </th>
      <?php foreach ($rowname as $count => $item): ?>
        <td <?php if ($field_classes[$field][$count]) { print 'class="'. $field_classes[$field][$count] . ' ' . implode(' ', $row_classes[$count]) . '" '; } ?><?php print drupal_attributes($field_attributes[$field][$count]); ?>>
          <?php echo t($item); ?>
        </td>
      <?php endforeach; ?>
      </tr>
      <?php
        if ($zebra == 'odd'){
          $zebra = 'even';
        } else {
          $zebra = 'odd';
        }
      ?>
      <?php endif; // field != title ?>
    <?php endforeach; ?>
  </tbody>
</table>

