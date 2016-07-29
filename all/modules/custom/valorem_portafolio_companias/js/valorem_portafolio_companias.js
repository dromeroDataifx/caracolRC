(function($) {
  $(document).ready(function() {
  	$('.imagen').hide();
  	$("#block-valorem-portafolio-companias-info4 .view-filters a").click(function(){
  		$('.imagen').hide();
  		$('.texto_inicial').hide();
  		$('.flecha a').removeClass("active");
  		$("."+$(this).addClass("active").attr("rel") ).show();
  		return false;
  	});
  		
  	$('.block-valorem-portafolio-companias-info .view-filters a').click(function() {
  		$('.flecha a').removeClass("active");
  		$("."+$(this).addClass("active").attr("rel") ).show();
  	});
  });

	/*jQuery(document).ready(function() {
	    alert('entro');
	    jQuery("#mycarousel").jcarousel({
	        scroll: 1,
	        initCallback: mycarousel_initCallback,
	    });
	});*/

})(jQuery);

/*function mycarousel_initCallback(carousel) {
  	
    jQuery('.jcarousel-control a').bind('click', function() {
      carousel.scroll(jQuery.jcarousel.intval(jQuery(this).text()));
        return false;
    });
};*/






