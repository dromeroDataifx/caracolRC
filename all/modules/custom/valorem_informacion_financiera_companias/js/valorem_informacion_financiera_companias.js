(function($) {
  Drupal.behaviors.informacionFinancieraCompanias = {
  attach : function(context, settings) {

		var ano = ''; 
		var nom = '';
		if ($("#edit-field-compania-und").val() != "_none") {
			nom = $("#edit-field-compania-und option:selected").text();	
		}
		if ($("#edit-field-compania-und").val() != "_none") {
			ano = $("#edit-field-ano-und option:selected").text();
		}
		$('#edit-field-compania-und').once('Informacion_financiera_companias1', function() {
	    $(this).change(function(e) {
	     	if ($("#edit-field-compania-und").val() != "_none") {
	     		nom = $("#edit-field-compania-und option:selected").text();
	     		$('#edit-title').val(nom+'-'+ano);
	     	}
	    }); 
	  });
	  $('#edit-field-ano-und').once('Informacion_financiera_companias1', function() {
	    $(this).change(function(e) {
	     	if ($("#edit-field-compania-und").val() != "_none") {
	     		ano = $("#edit-field-ano-und option:selected").text();
					$('#edit-title').val(nom+'-'+ano);
	     	}
	    }); 
	  });
  }
}
})(jQuery);