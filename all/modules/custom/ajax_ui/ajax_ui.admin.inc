<?

/**
 * Settings form.
 */
function ajax_ui_admin(&$form_state) {
    drupal_set_message(t("no config yet"), 'warning');
    $form['aviso'] = array(
        '#type' => 'markup',
        '#value' => ''
    );
    return $form;
}

?>