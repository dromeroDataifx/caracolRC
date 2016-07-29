<?php

function view_content_type_administrable_contentype_form($form, &$form_state) {
  $types_node = node_type_get_types();
  $machine_name_types_node = array_keys(node_type_get_types());
  $options = array();
  foreach ($machine_name_types_node as $key => $value) {
  	$options[$value] = $types_node[$value]->name;
  }
   /*$form['view_content_type_administrable_title'] = array(
    '#title' => t('Type the title of the box.'),
    '#type' => 'textfield',
    '#required' => TRUE,
    '#default_value' => variable_get('view_content_type_administrable_title', ''),    

  );*/

  $form['view_content_type_administrable_contentype'] = array(
    '#title' => t('Select the type of content that will display the view.'),
    '#type' => 'select',
    '#required' => TRUE,
    '#default_value' => variable_get('view_content_type_administrable_contentype', ''),
    '#options' => $options,

  );


  
  return system_settings_form($form);
 
}


