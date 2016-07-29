(function($) {
	/**
	 * accordion
	 * */
	Drupal.behaviors.exportUsers = {attach: function(context) {
			var triggers = $('.button-user-export');
			triggers.die();
			triggers.live({
				click: function(event) {
					event.preventDefault();
					window.open(Drupal.settings.ajax_ui.path + '/user-export/' + $(this).data('format'));
				}
			});
		}
	}
})(jQuery);