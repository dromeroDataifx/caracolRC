<?php

/**
 * @file
 * This file is empty by default because the base theme chain (Alpha & Omega) provides
 * all the basic functionality. However, in case you wish to customize the output that Drupal
 * generates through Alpha & Omega this file is a good place to do so.
 * f
 * Alpha comes with a neat solution for keeping this file as clean as possible while the code
 * for your subtheme grows. Please read the README.txt in the /preprocess and /process subfolders
 * for more information on this topic.
 */
function caracol_preprocess_page(&$variables) {
    drupal_add_css('misc/ui/jquery.ui.dialog.css');

    drupal_add_library('system', 'ui.dialog');
    
    if($variables['theme_hook_suggestions'][0] == 'page__avances_de_la_semana'){
        unset($variables['page']['header']);
        
    }
    /* se agregan las librerias necesarias */
    drupal_add_js(libraries_get_path('corner') . '/jquery.corner.js');
    drupal_add_js(libraries_get_path('stickymenu') . '/jquery.sticky.js');
    drupal_add_js(libraries_get_path('customcontextual') . '/jquery.ccl.js');
}

function caracol_form_alter(&$form, &$form_state, $form_id) {
    switch ($form_id) {
        case 'simplenews_block_form_11':
            _caracol_alter_news_form($form, $form_state);
            break;
        case 'blog_node_form':
        case 'iniciativa_node_form':
        case 'evento_node_form':
        case 'article_node_form':
        case 'noticia_node_form':
        case 'proyecto_node_form':
        case 'quienes_somos_node_form':
        case 'portal_node_form':
        case 'avance_programacion_node_form':
            unset($form['revision_information']);
            unset($form['additional_settings']);
            unset($form['author']);
            unset($form['options']);
            break;
        case 'views_exposed_form':
            if (isset($form['tipo_multimedia'])) {
                $options = array();
                foreach ($form['tipo_multimedia']['#options'] as $key => $value) {
                    $label = explode(':', $value);
                    $options[$key] = $label[0];
                }
                $form['tipo_multimedia']['#options'] = $options;
            }
            switch ($form_state['view']->name) {
                case 'responsabilidad_social':
                    if ($form_state['view']->current_display == 'pagina_reportes')
                        _caracol_alter_exposed_filter_responsabilidad_social_form($form, $form_state);
                    break;
                case 'agencia_de_noticias_nodos':
                    if ($form_state['view']->current_display == 'pagina_agencia_subseccion' || $form_state['view']->current_display == 'page_2')
                        _caracol_alter_exposed_filter_agencia_de_noticias_form($form, $form_state);
                    break;
                case 'buscador':
                    if ($form_state['view']->current_display == 'prensa_resultados_busqueda')
                        _caracol_alter_exposed_filter_buscador_prensa_form($form, $form_state);
                    elseif ($form_state['view']->current_display == 'resultados_busqueda_general')
                        _caracol_alter_exposed_filter_buscador_general_form($form, $form_state);
                    break;
            }
            break;
        case 'user_pass';
            caracol_user_pass_alter($form, $form_state);
            break;
    }
}

function caracol_theme() {
    $path = drupal_get_path('theme', 'caracol');
    return array(
        'caracol_block_months_filter' => array(
            'path' => "{$path}/templates",
            'variables' => array('data' => NULL),
            'template' => "block-filter",
        )
    );
}

function caracol_user_pass_alter(&$form, &$form_state) {
    $form['registrados'] = array(
        '#type' => 'fieldset',
        '#title' => t('Registered Users'),
        '#collapsible' => false,
    );
    $form['registrados']['registrado'] = array(
        '#markup' => t("Forgot your password?, enter your email address and we'll send a new password")
    );
    $form['registrados']['name'] = $form['name'];
    $form['registrados']['name']['#title'] = t('Email');

    $form['registrados']['actions'] = $form['actions'];
    unset($form['name']);
    unset($form['actions']);

    
    $form['#validate'][0] = 'caracol_user_pass_validate';
    $form['#submit'][0] = 'caracol_user_pass_submit';
}

function caracol_user_pass_validate($form, &$form_state) {
    if (!valid_email_address(trim($form_state['values']['name'])))
        form_set_error('name', t('not valid email address'));
    else {
        $query = db_select('users', 'u');
        $query->fields('u');
        $query->where('u.mail=:mail', array(':mail' => $form_state['values']['name']));
        $result = $query->execute();
        if ($result->rowCount() < 1)
            form_set_error('name', t('sorry we don\'t know you, please correct you email'));
        else
            $form_state['values']['uid'] = $result->fetchObject()->uid;
    }
}

function caracol_user_pass_submit($form, &$form_state) {
    $user = user_load($form_state['values']['uid']);

    $edit['pass'] = user_password(5);
    $success = user_save($user, $edit);
    if ($success) {
        $params['name'] = $user->name;
        $params['pass'] = $edit['pass'];

        drupal_mail('logged_user', 'cambio_contrasena', $user->mail, user_preferred_language($user), $params);
        $_SESSION['passwordchange_flag'] = true;
    }
}

function caracol_preprocess_caracol_block_months_filter(&$args) {
    
    for ($i = 0; $i < 12; $i++) {
        $time = strtotime("-{$i} month");

        $min = date('m/d/Y', strtotime(implode('-', array(date('Y', $time), date('m', $time), "01"))));
        $max = date('m/d/Y', strtotime(implode('-', array(date('Y', $time), date('m', $time), date('t', $time)))));

        $args['meses'][] = l(t(date('F', $time))." ".date('Y', $time), current_path(), array('attributes' => array('data-min' => $min, 'data-max' => $max)));

    }
    $args['target'] = 'form-item-created-';
}

function _caracol_alter_exposed_filter_responsabilidad_social_form(&$form, &$form_state) {
    $form['new-filter-block']['#markup'] = theme('caracol_block_months_filter', array('title' => 'Últimos 12 Meses'));
}

function _caracol_alter_exposed_filter_agencia_de_noticias_form(&$form, &$form_state) {
    $form['new-filter-block']['#markup'] = theme('caracol_block_months_filter', array('title' => 'Últimos 12 Meses'));
}

function _caracol_alter_exposed_filter_buscador_prensa_form(&$form, &$form_state) {
    $vocabulary = taxonomy_get_tree(15);
    $markup_select = "<div id = 'select_producciones'>Producciones <select id='all_productions_select'>";
    $markup_select = $markup_select . "<option value='0'>- Seleccione -</option>";
    foreach ($vocabulary as &$valor) {
        $markup_select =  $markup_select . "<option value=".$valor->tid. ">".$valor->name."</option>";
    }
    $markup_select =  $markup_select . "</select></div>";
    $form['#suffix'] = $markup_select;
    $form['submit']['#value'] = t('Search');
}

function _caracol_alter_exposed_filter_buscador_general_form(&$form, &$form_state) {
    //ninguna alteracion por ahora
}

/* internal functions */

function _caracol_alter_news_form(&$form, &$form_state) {
    if ($form['mail'] && $form['mail']['#type'] == 'textfield')
        $form['mail']['#placeholder'] = $form['mail']['#title'];
}

/**
 * Output breadcrumb as an unorderd list with unique and first/last classes
 */
function caracol_breadcrumb($variables) {
    $html="";
    if (drupal_get_title() == "Interna Lanzamiento"){
         $html .= '<h2 class="element-invisible">' . t('You are here') . '</h2>';
            $html .= '<div class="breadcrumbs clearfix">';
            $atributos['class'] = "breadcrumb-item breadcrumb-item-1 seccion";
            $newBreadCrumb[0] = '<div ' . drupal_attributes($atributos) . "><a href='/prensa/agencia-de-noticias-periodistas/comunicados-de-lanzamiento'>" . "Comunicados de Lanzamiento" . '</a></div>';  
            $html .= $newBreadCrumb[0]. '</div>';
            drupal_add_js(array('caracol' => array('variables' => $variables['breadcrumb'] )), 'setting');
            drupal_add_js(array('caracol' => array('first' => $item )), 'setting');
            return $html;
    }else{
    if (drupal_get_title() != "Avances"){
    $sepadador = '<div class="breadcrumb-separador">/</div>';
    $breadcrumb = $variables['breadcrumb'];
 
    drupal_add_js(array('caracol' => array('variables' => $variables['breadcrumb'] )), 'setting');
    $html = '';
    if (!empty($breadcrumb)) {
       
        $html .= '<h2 class="element-invisible">' . t('You are here') . '</h2>';
        $html .= '<div class="breadcrumbs clearfix">';
        $n = count($breadcrumb);

        if ($n == 4) {
            array_pop($breadcrumb);
            array_pop($breadcrumb);
        }
        if ($n == 3)
            array_pop($breadcrumb);
        

        $breadcrumb[] = l(htmlspecialchars_decode(drupal_get_title()), current_path());
      
        $newBreadCrumb = array();
        foreach ($breadcrumb as $key => $item) {
            /* clases estra */
            $clases = array();
            if ($key == 0){
                $clases[] = 'first';
            drupal_add_js(array('caracol' => array('first' => $item )), 'setting');
            }
            if ($key == 1){
                $clases[] = 'seccion';
            drupal_add_js(array('caracol' => array('seccion' => $item )), 'setting');
           }
            elseif ($key == 2){
                $clases[] = 'subseccion';
                drupal_add_js(array('caracol' => array('subseccion' => $item )), 'setting');
            }
            elseif ($key > 2)
                $clases[] = 'disabled';

            if ($key == 3){
                $clases[] = 'seccion_tres';
            drupal_add_js(array('caracol' => array('seccion_tres' => $item )), 'setting');
           }

            if ($key == $n - 1)
                $clases[] = 'last';
            
            if(drupal_get_title() == "Portafolio de Compañias" && $item == '<a href="/prensa">Prensa</a>' ){
                $item = "<a href='/compania'>Compañia</a>";

            }

            $atributos['class'] = "breadcrumb-item breadcrumb-item-{$key} " . implode(' ', $clases);
            $newBreadCrumb[] = '<div ' . drupal_attributes($atributos) . '>' . $item . '</div>';            
        }
        $first = array_shift($newBreadCrumb);

        $html .=$first . implode($sepadador, $newBreadCrumb) . '</div>';

       }

        return $html;
    }
    }
}

function caracol_preprocess_search_results(&$variables) {
//	drupal_set_message(kpr($variables, true), 'warning');
}

function caracol_is_parent($tid, $parent_tid) {
    $query = db_select('taxonomy_term_hierarchy', 't');
    $query->addField('t', 'tid');
    $query->condition('t.tid', $tid);
    $query->condition('t.parent', $parent_tid);
    return count($query->execute()->fetchCol()) > 0;
}


/**
 * Process variables to format email messages.
 *
 * @see htmlmail.tpl.php
 */
function caracol_preprocess_htmlmail(&$variables) {
  // Run the default preprocess function.
  template_preprocess_htmlmail($variables);

  // Use the 'HTML Email' text format for the message body.
  $variables['body'] = check_markup($variables['body'], 'html_email');
}
