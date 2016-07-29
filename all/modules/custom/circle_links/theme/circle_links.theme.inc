<?php

function template_preprocess_circle_links_block(&$args) {
    $args['circle_links_one_title'] = variable_get('circle_links_one_title');
    $args['circle_links_one_title'] = $args['circle_links_one_title']['value'];
    //$args['circle_links_one'] = variable_get('circle_links_one');

    $args['circle_links_two_title'] = variable_get('circle_links_two_title');
    $args['circle_links_two_title'] = $args['circle_links_two_title']['value'];
    //$args['circle_links_two'] = variable_get('circle_links_two');

    $args['circle_links_three_title'] = variable_get('circle_links_three_title');
    $args['circle_links_three_title'] = $args['circle_links_three_title']['value'];
    //$args['circle_links_three'] = variable_get('circle_links_three');

    $args['circle_links_four_title'] = variable_get('circle_links_four_title');
    $args['circle_links_four_title'] = $args['circle_links_four_title']['value'];
    //$args['circle_links_four'] = variable_get('circle_links_four');

    $args['circle_links_five_title'] = variable_get('circle_links_five_title');
    $args['circle_links_five_title'] = $args['circle_links_five_title']['value'];

    $args['circle_links_six1_title'] = variable_get('circle_links_six1_title');
    $args['circle_links_six1_title'] = $args['circle_links_six1_title']['value'];

    $args['circle_links_six2_title'] = variable_get('circle_links_six2_title');
    $args['circle_links_six2_title'] = $args['circle_links_six2_title']['value'];

    $args['circle_links_six3_title'] = variable_get('circle_links_six3_title');
    $args['circle_links_six3_title'] = $args['circle_links_six3_title']['value'];

    $args['circle_links_six4_title'] = variable_get('circle_links_six4_title');
    $args['circle_links_six4_title'] = $args['circle_links_six4_title']['value'];

    $args['circle_links_seven1_title'] = variable_get('circle_links_seven1_title');
    $args['circle_links_seven1_title'] = $args['circle_links_seven1_title']['value'];

    $args['circle_links_seven2_title'] = variable_get('circle_links_seven2_title');
    $args['circle_links_seven2_title'] = $args['circle_links_seven2_title']['value'];

    $args['circle_links_seven3_title'] = variable_get('circle_links_seven3_title');
    $args['circle_links_seven3_title'] = $args['circle_links_seven3_title']['value'];

    $args['circle_links_seven4_title'] = variable_get('circle_links_seven4_title');
    $args['circle_links_seven4_title'] = $args['circle_links_seven4_title']['value'];

    //$args['circle_links_five'] = variable_get('circle_links_five');

    $args['circle_links_eight_title'] = variable_get('circle_links_eight_title');
    $args['circle_links_eight_title'] = $args['circle_links_eight_title']['value'];

    //$args['circle_links_eight'] = variable_get('circle_links_eight');

   /* Enlaces como empresa */
    $query_medio = db_select('node', 'n');
	$query_medio->innerjoin('field_data_field_archivo', 'f', 'f.entity_id = n.nid');
	$query_medio->innerjoin('field_data_field_tipo_proyecto', 't', 't.entity_id = n.nid');
    $query_medio->fields('n', array('nid', 'type', 'status', 'created', 'changed', 'title'));
   $query_medio->condition('n.type', 'proyecto', '=')
         ->condition('n.status', '1', '=')
		 ->condition('t.field_tipo_proyecto_tid', '54', '=');
    $query_medio->orderBy('n.changed', 'DESC');
    $query_medio->range(0, 5);

    
    $result = $query_medio->execute();
	$i = 0;
    while($record = $result->fetchAssoc()) {
		$i = $i + 1;
		$args['title'.$i] = $record['title']; 
		$query = db_select('field_data_field_archivo', 'a');
		$query->innerjoin('file_managed', 'f', 'f.fid = a.field_archivo_fid');
		
		$query->fields('f', array('fid', 'uri'));
		$query->condition('a.bundle', 'proyecto', '=')
              ->condition('a.entity_type', 'node', '=')
			  ->condition('a.entity_id', $record['nid'], '=');
		$result2 = $query->execute();
		
		$record2 = $result2->fetchAssoc();
		
		$args['url'.$i] = file_create_url($record2['uri']);
		
		
		
        
		 
    }

     /* Enlaces como medio */
    $query_medio = db_select('node', 'n');
	$query_medio->innerjoin('field_data_field_archivo', 'f', 'f.entity_id = n.nid');
	$query_medio->innerjoin('field_data_field_tipo_proyecto', 't', 't.entity_id = n.nid');
    $query_medio->fields('n', array('nid', 'type', 'status', 'created', 'changed', 'title'));
   $query_medio->condition('n.type', 'proyecto', '=')
         ->condition('n.status', '1', '=')
		 ->condition('t.field_tipo_proyecto_tid', '55', '=');
    $query_medio->orderBy('n.changed', 'DESC');
    $query_medio->range(0, 5);

    
    $result = $query_medio->execute();
	$i = 0;
    while($record = $result->fetchAssoc()) {
		$i = $i + 1;
		$args['titlem'.$i] = $record['title']; 
		$query = db_select('field_data_field_archivo', 'a');
		$query->innerjoin('file_managed', 'f', 'f.fid = a.field_archivo_fid');
		
		$query->fields('f', array('fid', 'uri'));
		$query->condition('a.bundle', 'proyecto', '=')
              ->condition('a.entity_type', 'node', '=')
			  ->condition('a.entity_id', $record['nid'], '=');
		$result2 = $query->execute();
		
		$record2 = $result2->fetchAssoc();
		
		$args['urlm'.$i] = file_create_url($record2['uri']);
		
		
		
        
		 
    }
	
	
}


