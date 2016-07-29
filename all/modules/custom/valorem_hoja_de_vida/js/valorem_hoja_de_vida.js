(function($) {

  $(document).ready(function() {
  	$('.bodys').hide();
  	$('.bodys2').hide();
  	
  	
  	//Representantes legales
    $('.lista_representantes .lista a').click(function(e){
    	$('.bodys').hide();
    	e.preventDefault();
		var idToDisplay = $(this).attr('href');
		$('div .lista_representantes a').removeClass("active");
		$('div .'+idToDisplay.substring(1,6)+' a').addClass("active");
		representante = $('.'+idToDisplay.substring(1,6));
		representante.show();
    });
        
    // Junta Directiva
    $('.lista-junta_directiva .lista a').click(function(e){
    	$('.bodys2').hide();
    	e.preventDefault();
		var idToDisplay = $(this).attr('href');
  if(idToDisplay != null){
		$('div .lista-junta_directiva a').removeClass("active");
		$('div .'+idToDisplay.substring(1,6)+' a').addClass("active");
		junta = '.'+idToDisplay.substring(1,6);
		$(junta).show();
  }
    });
	
	$('.lista_representantes .lista:first a').click();
	$('.lista-junta_directiva .lista:first a').click();
	
	
  }); 
})(jQuery);