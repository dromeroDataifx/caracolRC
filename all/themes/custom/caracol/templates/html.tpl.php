<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML+RDFa 1.0//EN"
  "http://www.w3.org/MarkUp/DTD/xhtml-rdfa-1.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language; ?>" version="XHTML+RDFa 1.0" dir="<?php print $language->dir; ?>"<?php print $rdf_namespaces; ?>>
<head profile="<?php print $grddl_profile; ?>">
  <!-- Begin comScore Tag -->
<script> var _comscore = _comscore || []; _comscore.push({ c1: "2", c2: "7109911" }); (function() { var s = document.createElement("script"), el = document.getElementsByTagName("script")[0]; s.async = true; s.src = (document.location.protocol == "https:" ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js"; el.parentNode.insertBefore(s, el); })();
</script>
<noscript> <img src="http://b.scorecardresearch.com/p?c1=2&c2=7109911&cv=2.0&cj=1" /> </noscript>
<!-- End comScore Tag -->

  <?php 
  print $head; ?>
  <title><?php print $head_title; ?></title>
  <?php print $styles; ?>
  <?php print $scripts; ?>
</head>
<body<?php print $attributes;?>>
<?php 
    global $user;
    $profile_authorization = 0 ;
    $profile_id = 0;
    $query = db_select('profile', 'p');
    $query->join('users', 'u', 'p.uid = u.uid');
    $query->fields('p',array('pid'))//SELECT the fields from node
    ->condition('u.uid', $user->uid,'=');
    $result = $query->execute();
    while($record = $result->fetchAssoc()) {
        $profile_id = $record['pid'];
    }
    if($profile_id != 0){
      $query2 = db_select('field_data_field_autorizacion_datos_2015', 'a');
      $query2->fields('a',array('entity_id', 'field_autorizacion_datos_2015_value'))//SELECT the fields from node
      ->condition('a.entity_id', $profile_id ,'=');
      $result2 = $query2->execute();
      while($record = $result2->fetchAssoc()) {
          $profile_authorization = $record['field_autorizacion_datos_2015_value'];
      }
    }

  if($profile_authorization != 0 || $user->uid == 0){
    
?>
  <div id="skip-link">
    <a href="#main-content" class="element-invisible element-focusable"><?php print t('Skip to main content'); ?></a>
  </div>
  <?php print $page_top; ?>
  <?php print $page; ?>
  <?php print $page_bottom; }
  else {
    $node = node_load(7341);
    print drupal_render(node_view($node));
    }
  ?>
  <div id="sombralogin"></div>
</body>
</html>