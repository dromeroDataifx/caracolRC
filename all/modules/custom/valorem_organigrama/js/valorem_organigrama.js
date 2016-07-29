(function($) {
	/*Drupal.behaviors.organigrama = {
    attach : function(context, settings) { 	
  	  	jQuery(".google-visualization-orgchart-node")
  	  	//ESTA CHAMBONADA ES TEMPORAL, MIENTRAS SE ENCUENTRA LA MANERA DE EJECUTAR EL JS UNA VEZ HALLA CARGADO TODA LA PAGINA
  	  	setTimeout("jQuery('.google-visualization-orgchart-node').hover(function(){jQuery('#texto_organigrama').text(jQuery(this).text());}, function(){jQuery('#texto_organigrama').text('');});", 2000);
		}
	}*/
	
	$(document).ready(function() {
    jQuery(document).ready(function() {
        $("#org").jOrgChart({
			chartElement : '#chart'
		});
		
		/* Extra Code */
		$("#show-list").click(function(e){
			e.preventDefault();
			
			$('#list-html').toggle('fast', function(){
				if($(this).is(':visible')){
					$('#show-list').text('Hide underlying list.');
					$(".topbar").fadeTo('fast',0.9);
				}else{
					$('#show-list').text('Show underlying list.');
					$(".topbar").fadeTo('fast',1);					
				}
			});
		});
    });
  });   
})(jQuery);