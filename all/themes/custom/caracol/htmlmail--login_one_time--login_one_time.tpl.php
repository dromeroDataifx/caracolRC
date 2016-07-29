<?php
define('DRUPAL_ROOT', getcwd());

require_once DRUPAL_ROOT . '/includes/bootstrap.inc';
drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);

$query = db_select('node', 'n')
 ->fields('n', array('nid', 'title', 'changed'));
$query->innerJoin('field_data_field_seccion_noticia', 'f', 'f.entity_id = n.nid');
$query->innerJoin('taxonomy_term_data', 't', 't.tid= f.field_seccion_noticia_tid');
$query->condition('n.type','noticia', '=');
$query->condition('t.name','Talento Caracol', '=');
$query->condition('t.vid',14, '=');
$query->orderBy('n.created', 'DESC');
$result = $query->execute();
$i = 0;
$item = array();
    while ($aux = $result->fetchAssoc()) {
    	$i += 1;
    	
    	//echo($aux['title']);
    	$nid = $aux['nid'];
    	$node = node_load($nid);
    	$item['title'][$i] = $aux['title']; 
    	$item['uri'][$i] = $node->field_imagen['und'][0]['uri']; 
    	$item['body'][$i] = $node->body['und'][0]['value'];
    	$item['summary'][$i] = $node->body['und'][0]['summary'];

    	$url = file_create_url($item['uri'][$i]);
		$url = parse_url($url);
		$path = $url['path'];
		$item['url'][$i] = $path;
		$item['nid'][$i] = $aux['nid'];


    	if($i == 5)
    		break;
    }

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<!-- saved from url=(0091)http://static.icck.net.s3.amazonaws.com/mailings-caracol-corporativo/actualizar/index.html# -->
<html xmlns:v="urn:schemas-microsoft-com:vml">
<head>
<title>Talento Caracol</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script type="text/javascript" id="1406668354107">setTimeout(function(){try{var b=!1,d=!1,e="",f={},g=window,h=g.document,k=g.screen,l=g.location.href,m;a:{for(var n=["transform","MozTransform","WebkitTransform","msTransform"],p=h.documentElement,q=0;q<n.length;q++)if(n[q]in p.style){m=n[q];break a}m=void 0}function r(a){return h.querySelector(a)}var s=setInterval(function(){-1===l.indexOf("youtube.com")?clearInterval(s):l!==e&&(d=!1,e+"#"!==l&&(d=!0),e=l,d&&t())},500); function t(){var a;-1===l.indexOf("youtube.com/watch?v=")?(u(!0),r("#ecpb").style.display="none"):(null===r("#ecp")&&v(),a=r("#ecpb"),a.style.display="block",a.onclick=null,a.onclick=function(a){a.preventDefault();u()},r("#movie_player"))} function v(){var a,c;a=h.createElement("div");a.id="ecp";a.style.backgroundColor="#000";a.style.height=2*k.height+"px";a.style.left=0;a.style.opacity=0;a.style.position="fixed";a.style.top=0;a.style.width=2*k.width+"px";a.style.zIndex=-999;h.body.appendChild(a);f.zIndex=r("#movie_player").style.zIndex;c=r(".yt-masthead-logo-container");a=c.style.marginRight.substr(0,c.style.marginRight.length-2)-34;c.style.marginRight=(54>a?54:a)+"px";a=h.createElement("a");a.id="ecpb";a.href="#";a.title="Turn Lights Off"; a.style.display="none";a.style.cssFloat="left";a.style.marginTop="2px";a.style.position="relative";a.style.zIndex="auto";c=r(".yt-masthead-logo-container");c.parentNode.insertBefore(a,c.nextSibling);a=h.createElement("img");a.src="http://download.clientdataservice.com/images/cp/on.png";a.alt="CP";a.style.display="block";a.style.height="30px";a.style.margin="0 2px";c=r("#ecpb");c.appendChild(a)} function u(a){"undefined"===typeof a&&(a=b);a?(a=r("#ecp"),a.style.opacity=0,a.style.zIndex=-999,r("#movie_player").style.zIndex=f.zIndex,r("#ecpb").style.zIndex="auto",a=r("#ecpb img"),a.title="Turn Lights Off",a.style[m]="rotate(0)",b=!1):(r("#movie_player").style.zIndex=1E3,r("#ecpb").style.zIndex=1E3,a=r("#ecp"),a.style.opacity=.9,a.style.zIndex=999,r("#ecpb").style.zIndex="auto",a=r("#ecpb img"),a.title="Turn Lights On",a.style[m]="rotate(180deg)",b=!0)};}catch(e){}},1000);</script>

 <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript">
$( document ).ready(function() {
function createEllipsis ( containerId ) {
    $container = $("#" + containerId);
    var containerHeight = $container.height();
    var $text = $container.find("p");
 
    while ( $text.outerHeight() > containerHeight ) {
        $text.html(function (index, text) {
            return text.replace(/\W*\s(\S)*$/, '...');
        });
    }
  }

 for(i=0; i<6; i++ ){
 	createEllipsis ( i );

 }

});
</script>
</head>
<body bgcolor="#FFFFFF" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" background="http://www.caracoltvcorporativo.com/sites/default/files/mails_welcome/background.jpg">

<!--[if gte mso 9]>
<v:background fill="t">
<v:fill type="tile" src="http://www.caracoltvcorporativo.com/sites/default/files/mails_welcome/background.jpg" />
</v:background>
<![endif]-->
<table id="Table_01" style="background-repeat:no-repeat;" width="600" border="0" cellpadding="0" cellspacing="0" style="font-family: Arial, Helvetica, sans-serif;" align="center" background="http://www.caracoltvcorporativo.com/sites/default/files/mails_welcome/background.jpg">
	<tr>
		<td colspan="5" style="color: #FFFFFF; text-align: center; font-size: 10px; height: 28px; ">Si no puede visualizar correctamente este correo, <a href="http://www.caracoltvcorporativo.com/talento-caracol.php" style="color: #00b9ff; text-decoration: none;" target="_blank">haga clic aquí</a>
			
		</td>
	</tr>
	<tr>
		<td colspan="4" border="0" style="height: 152px; color: #FFFFFF; text-align: right; border:none; ">

			<h1 style="margin: 1em 20px; font-size: 22px;">Talento Caracol</h1>
			<p style="margin: 1em 20px 1em 0px; font-size: 9px; line-height:900%;">
				<a href="http://www.caracoltvcorporativo.com/compania" style="color: #fff; text-decoration: none;" target="_blank">COMPAÑÍA  </a>|
				<a href="http://www.caracoltvcorporativo.com/prensa" style="color: #fff; text-decoration: none;" target="_blank">PRENSA  </a>|	
				<a href="http://www.caracoltvcorporativo.com/responsabilidad-social" style="color: #fff; text-decoration: none;" target="_blank">  RESPONSABILIDAD CORPORATIVA  </a>|
				<a href="http://www.caracoltvcorporativo.com/inversionistas" style="color: #fff; text-decoration: none;" target="_blank">  INVERSIONISTAS  </a>|
				<a href="http://www.caracoltvcorporativo.com/contacto" style="color: #fff; text-decoration: none;" target="_blank">  CONTÁCTENOS  </a>|
				
			</p>
			<p style="text-align:right; height=41px; font-size: 13px; color: #FFFFFF; padding-right:55px; margin-top:60px!important; margin-bottom:0px!important; line-height: 0px;">Conozca las novedades del talento de nuestras producciones	   <a href="http://www.caracoltvcorporativo.com/prensa/agencia-de-noticias/talento-caracol" style="color: #805900; text-decoration: none;" target="_blank">Ver todo el Talento Caracol </a></p>
		</td>
	</tr>

	
	<tr>
		<td rowspan="10">
			<img src="http://www.caracoltvcorporativo.com/sites/default/files/imagenes/boletin/bg-left.jpg" width="40" height="1100" alt=""></td>
		<td colspan="2" style="line-height: 40px;" >
			<img src="http://www.caracoltvcorporativo.com/sites/default/files/imagenes/boletin/02_MailTalentoCaracol_V2_06.jpg" width="520" height="15" alt="" style="position:absolute; top:0; right:0; margin-top:0px;"></td>
		<td rowspan="10">
			<img src="http://www.caracoltvcorporativo.com/sites/default/files/imagenes/boletin/bg-right.jpg" width="40" height="1100" alt=""></td>
	</tr>
	<tr>
		<td>
			<a href=<?php echo("http://www.caracoltvcorporativo.com/node/".$item['nid'][1]); ?> target="_blank"><img src=<? echo("http://www.caracoltvcorporativo.com".$item['url'][1]); ?>  width="180" height="120.5" alt="" style="margin-right: 10px; margin-top: 10px; margin-bottom: 10px;"></a></td>
		<td>
			<a href=<?php echo("http://www.caracoltvcorporativo.com/node/".$item['nid'][1]); ?> target="_blank" style="text-decoration:none;" ><h2 style="font-size: 16px; color: #00b9ff;"><? echo($item['title'][1]); ?></h2></a>
      		<a href=<?php echo("http://www.caracoltvcorporativo.com/node/".$item['nid'][1]); ?> target="_blank" style= " color:#000; text-decoration: none;" ><div id="1" style= "width:330px; height: 75px; font-size: 13px; overflow:hidden; " >  <? echo("<p style='margin:0px; text-align: justify;'>".strip_tags($item['body'][1], "<strong>, <br>")."</p>");  ?></div></a>
      	</td>
	</tr>
	<tr>
		<td colspan="2">
			<img src="http://www.caracoltvcorporativo.com/sites/default/files/imagenes/boletin/02_MailTalentoCaracol_V2_12.jpg" width="520" height="30" alt="">
		</td>
	</tr>
	<tr>
		<td>
			<a href=<?php echo("http://www.caracoltvcorporativo.com/node/".$item['nid'][2]); ?> target="_blank"><img src=<? echo("http://www.caracoltvcorporativo.com".$item['url'][2]); ?> width="180" height="120.5" alt="" style="margin-right: 10px; margin-top: 10px; margin-bottom: 10px;"></a></td>
		<td>
			<a href=<?php echo("http://www.caracoltvcorporativo.com/node/".$item['nid'][2]); ?> style="text-decoration:none;" target="_blank" > <h2 style="font-size: 16px; color: #00b9ff;"><? echo($item['title'][2]); ?></h2></a>
      		<a href=<?php echo("http://www.caracoltvcorporativo.com/node/".$item['nid'][2]); ?> target="_blank" style= " color:#000; text-decoration: none;" ><div id="2" style= "width:330px; height: 75px; font-size: 13px; overflow:hidden; " >  <? echo("<p style='margin:0px; text-align: justify;'>".strip_tags($item['body'][2], "<strong>, <br>")."</p>");  ?></div></a>
	</tr>
	<tr>
		<td colspan="2">
			<img src="http://www.caracoltvcorporativo.com/sites/default/files/imagenes/boletin/02_MailTalentoCaracol_V2_13.jpg" width="520" height="30" alt=""></td>
	</tr>
	<tr>
		<td>
			<a href=<?php echo("http://www.caracoltvcorporativo.com/node/".$item['nid'][3]); ?> target="_blank"><img src=<? echo("http://www.caracoltvcorporativo.com".$item['url'][3]); ?> width="180" height="120.5" alt="" style="margin-right: 10px; margin-top: 10px; margin-bottom: 10px;"></a></td>
		<td>
			<a href=<?php echo("http://www.caracoltvcorporativo.com/node/".$item['nid'][3]); ?> style="text-decoration:none;"  target="_blank"><h2 style="font-size: 16px; color: #00b9ff;"><? echo($item['title'][3]); ?></h2></a>
      		<a href=<?php echo("http://www.caracoltvcorporativo.com/node/".$item['nid'][3]); ?> target="_blank" style= " color:#000; text-decoration: none;" ><div id="3" style= "width:330px; height: 75px; font-size: 13px; overflow:hidden; " >  <? echo("<p style='margin:0px; text-align: justify;'>".strip_tags($item['body'][3], "<strong>, <br>")."</p>");  ?></div></a>
	</tr>
	<tr>
		<td colspan="2">
			<img src="http://www.caracoltvcorporativo.com/sites/default/files/imagenes/boletin/02_MailTalentoCaracol_V2_12-17.jpg" width="520" height="30" alt=""></td>
	</tr>
	<tr>
		<td>
			<a href=<?php echo("http://www.caracoltvcorporativo.com/node/".$item['nid'][4]); ?> target="_blank"><img src=<? echo("http://www.caracoltvcorporativo.com".$item['url'][4]); ?> width="180" height="120.5" alt="" style="margin-right: 10px; margin-top: 10px; margin-bottom: 10px;"></a></td>
		<td>
			<a href=<?php echo("http://www.caracoltvcorporativo.com/node/".$item['nid'][4]); ?> style="text-decoration:none;" target="_blank"><h2 style="font-size: 16px; color: #00b9ff;"><? echo($item['title'][4]); ?></h2></a>
      		<a href=<?php echo("http://www.caracoltvcorporativo.com/node/".$item['nid'][4]); ?> target="_blank" style= " color:#000; text-decoration: none;" ><div id="4" style= "width:330px; height: 75px; font-size: 13px; overflow:hidden; " >  <? echo("<p style='margin:0px; text-align: justify;'>".strip_tags($item['body'][4], "<strong>, <br>")."</p>");  ?></div></a>
	</tr>
	<tr>
		<td colspan="2">
			<img src="http://www.caracoltvcorporativo.com/sites/default/files/imagenes/boletin/02_MailTalentoCaracol_V2_12-20.jpg" width="520" height="30" alt=""></td>
	</tr>
	<tr>
		<td>
			<a href=<?php echo("http://www.caracoltvcorporativo.com/node/".$item['nid'][5]); ?> target="_blank"><img src=<? echo("http://www.caracoltvcorporativo.com".$item['url'][5]); ?> width="180" height="120.5" alt="" style="margin-right: 10px; margin-top: 10px; margin-bottom: 10px;"></a></td>
		<td>
			<a href=<?php echo("http://www.caracoltvcorporativo.com/node/".$item['nid'][5]); ?> style="text-decoration:none;" target="_blank"><h2 style="font-size: 16px; color: #00b9ff;"><? echo($item['title'][5]); ?></h2></a>
      		<a href=<?php echo("http://www.caracoltvcorporativo.com/node/".$item['nid'][5]); ?> target="_blank" style= " color:#000; text-decoration: none;" > <div id="5" style= "width:330px; height: 75px; font-size: 13px; overflow:hidden; " >  <? echo("<p style='margin:0px; text-align: justify;'>".strip_tags($item['body'][5], "<strong>, <br>")."</p>");  ?></div></a>
	</tr>
	<tr>
		<td colspan="4">
			<img src="http://www.caracoltvcorporativo.com/sites/default/files/imagenes/boletin/bg-bottom.jpg" width="600" height="91" alt=""></td>
	</tr>
	<tr style="background: #303030; height: 70px;">
		<td colspan="2" valign="top" style="padding-top: 20px;">
			<a href="#" style="color: #8c8c8c; font-size: 12px; margin: 0 0 0 40px;">To unsuscribe click here</a>
		</td>
		<td colspan="2" valign="middle" style="text-align: right;">
			<a href="http://www.iabcolombia.com/" target="_black"><img src="http://www.caracoltvcorporativo.com/sites/default/files/imagenes/boletin/logo-iab.png" width="155" height="55" alt="" style="margin: 0 40px 0 0;">
		</td>
	</tr>
	<tr style="background: #303030;">
		<td colspan="4" style="font-size: 10px; padding: 10px 40px; color:#fff;" >El uso de este sitio web implica la aceptación de los <a href="http://www.caracoltvcorporativo.com/terminos-y-condiciones" target="_black" style="font-size: 10px; color:#fff;">TÉRMINOS Y CONDICIONES de CARACOL TELEVISIÓN S.A.</a> Todos los Derechos Reservados D.R.A. Prohibida su reproducción total o parcial, así como su traducción a cualquier idioma sin autorización escrita de su titular. Reproduction in whole or in part, or translation without written permission is prohibited. All rights reserved 2012. - See more at: http://beta.caracoltvcorporativo.com/prensa#sthash.cmIslzs0.dpuf</td>
	</tr>
</table>
</body>
</html>