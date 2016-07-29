<?php
/**
 * @file
 * Default simple view template to all the fields as a row.
 *
 * - $view: The view in use.
 * - $fields: an array of $field objects. Each one contains:
 *   - $field->content: The output of the field.
 *   - $field->raw: The raw data for the field, if it exists. This is NOT output safe.
 *   - $field->class: The safe class id to use.
 *   - $field->handler: The Views field handler object controlling this field. Do not use
 *     var_export to dump this object, as it can't handle the recursion.
 *   - $field->inline: Whether or not the field should be inline.
 *   - $field->inline_html: either div or span based on the above flag.
 *   - $field->wrapper_prefix: A complete wrapper containing the inline_html to use.
 *   - $field->wrapper_suffix: The closing tag for the wrapper.
 *   - $field->separator: an optional separator that may appear before a field.
 *   - $field->label: The wrap label text to use.
 *   - $field->label_html: The full HTML of the label to use including
 *     configured element type.
 * - $row: The raw result object from the query, with all data it fetched.
 *
 * @ingroup views_templates
 */
?>
<div class="colum column-0">
    <?php if (!empty($fields['field_vision']->separator)): ?>
        <?php print $fields['field_vision']->separator; ?>
    <?php endif; ?>

    <?php print $fields['field_vision']->wrapper_prefix; ?>
    <?php print $fields['field_vision']->label_html; ?>
    <?php print $fields['field_vision']->content; ?>
    <?php print $fields['field_vision']->wrapper_suffix; ?>

    <?php if (!empty($fields['field_mision']->separator)): ?>
        <?php print $fields['field_mision']->separator; ?>
    <?php endif; ?>

    <?php print $fields['field_mision']->wrapper_prefix; ?>
    <?php print $fields['field_mision']->label_html; ?>
    <?php print $fields['field_mision']->content; ?>
    <?php print $fields['field_mision']->wrapper_suffix; ?>
</div>
<div class="colum column-1">
    <?php if (!empty($fields['field_valores']->separator)): ?>
        <?php print $fields['field_valores']->separator; ?>
    <?php endif; ?>

    <?php print $fields['field_valores']->wrapper_prefix; ?>
    <?php print $fields['field_valores']->label_html; ?>
    <?php print $fields['field_valores']->content; ?>
    <?php print $fields['field_valores']->wrapper_suffix; ?>
</div>
<div class="colum column-2">
    <?php if (!empty($fields['field_imagen']->separator)): ?>
        <?php print $fields['field_imagen']->separator; ?>
    <?php endif; ?>

    <?php print $fields['field_imagen']->wrapper_prefix; ?>
    <?php print $fields['field_imagen']->label_html; ?>
    <?php print $fields['field_imagen']->content; ?>
    <?php print $fields['field_imagen']->wrapper_suffix; ?>
</div>