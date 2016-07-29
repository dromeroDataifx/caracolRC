(function($) {
	Drupal.behaviors.addUserAutocomplete = {
		attach : function() {
			var a = $('#user-login #edit-name').autocomplete({ 
				serviceUrl:'ajax/users',
				minChars:2, 
				maxHeight:400,
				width:300,
				zIndex: 9999,
				deferRequestBy: 0, //miliseconds
				params: { country:'Yes' }, //aditional parameters
				noCache: false, //default is false, set to true to disable caching
				// callback function:
				onSelect: function(value, data){
					//$("#edit-documento").attr("disabled",'true');
				}
			});
			
			$("#edit-name").change(function() {
				console.log($("#edit-name").val());
				if( isNumber($.trim(   $("#edit-name").val()   )) ) {
					$("#edit-documento").val(  $("#edit-name").val()  );
				} else {
					
				}
				
			});
			
			
		}
	}
})(jQuery);


function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}