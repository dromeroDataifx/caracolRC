<?php

function template_preprocess_cambio_contrasena_exitoso(&$args) {
    
}

function template_preprocess_logged_user_hello(&$args) {
    global $user;
    $args['username'] = $user->name;
}

function template_preprocess_logged_user_links(&$args) {
    $block = module_invoke('menu', 'block_view', 'menu-user-options');
    $args['html'] = render($block['content']);
}

function template_preprocess_main_logged_user_links(&$args) {
    global $user;
    $args['links'][] = l(t("Welcome :username", array(':username' => $user->name)), "user/{$user->uid}/edit/periodista", array('attributes' => array('title' => t('My Name'), 'class' => array('my-name disabled')), 'html' => true));
    $args['links'][] = l(t('My Account'), "user/{$user->uid}", array('attributes' => array('title' => t('My Account'), 'class' => array('my-account'))));
    $args['links'][] = l(t('log out'), "user/logout", array('attributes' => array('title' => t('log out'), 'class' => array('logout'))));
}