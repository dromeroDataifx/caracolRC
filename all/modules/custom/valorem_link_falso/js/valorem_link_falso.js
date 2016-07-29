(function($) {

  Drupal.behaviors.valoremLinksFalsos = {
    attach: function(context, settings) {
      $('a[href="http://no.link"]').once('valorem-linksfalsos', function(){
        $(this).click(function(e) {
          e.preventDefault();
        })
      });
    }
  }

})(jQuery);