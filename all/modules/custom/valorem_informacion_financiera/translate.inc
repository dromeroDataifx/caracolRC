<?php

  require_once('puc_english_po.inc');
  
  global $translate_puc_language;  
  $posicionIngles = strpos(request_uri(),'en-gb');
  if ($posicionIngles>=0 && is_numeric($posicionIngles) ) {
    $translate_puc_language = 'translate_puc_english';
  } else {
	$translate_puc_language = 'translate_puc_spanish';
  }

  function _t($phrase, $spanishVersion = null) {
  
    global $translate_puc_language; 	
	return $translate_puc_language($phrase,$spanishVersion);
    
  }
  
  function translate_puc_english($phrase,$spanishVersion='') {
  
    global $puc_english_po;
    return (ISSET($puc_english_po[$phrase])?$puc_english_po[$phrase]:$spanishVersion);
  
  }
  
  function translate_puc_spanish($phrase,$spanishVersion) {
  
    if($spanishVersion!=null) return $spanishVersion;  
    return $phrase;
  
  }

