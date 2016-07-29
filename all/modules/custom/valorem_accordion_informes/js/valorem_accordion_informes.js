(function($) {
  Drupal.behaviors.informacionFinancieraI = {
    attach : function(context, settings) {
      $(document).ready(function() 
      {
        $("#accordion").accordion();
        $("#accordion .view-content a").click(function(){
        		location.href = $(this).attr("href");
        		return false;        	
        });   
      });
	  }
  }
})
(jQuery);