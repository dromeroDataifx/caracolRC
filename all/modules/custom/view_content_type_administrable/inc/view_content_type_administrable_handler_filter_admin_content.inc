<?php
/**
* Implementation of hook_views_handlers() to register all of the basic handlers
* views uses.
*/
class view_content_type_administrable_handler_filter_admin_content extends views_handler_filter {

  
  function query() {
    // make sure base table is included in the query
    $this->ensure_my_table();

    $table = 'node';
    $type_node = variable_get('view_content_type_administrable_contentype', ''); 
 
    $this->query->add_where(
    $this->options['group'],
    db_and()
    ->condition($table.'.type', $type_node, '=')
    );
  
}
}
