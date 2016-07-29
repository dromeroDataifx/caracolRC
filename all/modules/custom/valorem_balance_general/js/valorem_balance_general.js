(function($) {
  Drupal.behaviors.estadoResultados = {
  attach : function(context, settings) {
  var radios = jQuery("input[type='radio']");
  var nivel = radios.filter(":checked").attr('value');
  if (nivel == 2) {
    $('.nivel_3').hide();
    $('.nivel_4').hide();
  }
  /* Nivel */
  	$('#edit-nivel').once('balance-general', function() {
      $(this).change(function(e) {
        radios = jQuery("input[type='radio']");
        nivel = radios.filter(":checked").attr('value');
        if (nivel == 2) {
          $('.nivel_1').show();
          $('.nivel_2').show();
          $('.nivel_3').hide();
          $('.nivel_4').hide();  
        }
        if (nivel == 4) {
          $('.nivel_1').show();
          $('.nivel_2').show();
          $('.nivel_3').show();
          $('.nivel_4').hide();  
        }
        if (nivel == 6) {
          $('.nivel_1').show();
          $('.nivel_2').show();
          $('.nivel_3').show();
          $('.nivel_4').show();  
        }
      });
 		});
    $("#edit-nivel").buttonset();
  }
}
})(jQuery);