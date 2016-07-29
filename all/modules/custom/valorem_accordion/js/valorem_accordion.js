(function($) {
  Drupal.behaviors.informacionFinanciera = {
    attach : function(context, settings) {
      $(document).ready(function() 
      {
      	//$(".views-field-field-archivo-pdf");
      $("#accordion").accordion();
			$("#accordion p").click(function() {
        });
        $("#accordion .view-content a").click(function() {
          location.href = $(this).attr("href");
          return false;        	
        });   
      });
	  }
  }
})
(jQuery);
