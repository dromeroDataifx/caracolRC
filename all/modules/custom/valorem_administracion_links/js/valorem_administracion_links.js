(function($) {
	Drupal.behaviors.sitiosInteres = {
    attach : function(context, settings) { 	
  	  	$('.sitios').hide();
  	  		jQuery('.interes').hover(
	  	  	function() {
	  	    	$('.sitios').show();
	  	  	}, 
	  	  	function() {
	  	  		$('.sitios').hide();
  	      }); 
		}
	}
})(jQuery);