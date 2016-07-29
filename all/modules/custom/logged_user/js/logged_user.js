(function($) {
//	Drupal.behaviors.chagePassword = {attach: function(context) {
//			var links = $('a.cambio-contrasena');
//			links.die();
//			links.live({
//				click: function(event) {
//					event.preventDefault();
//					var box = $('div#fake-box');
//					if (box.length < 1)
//						$('body').append('<div id="fake-box" style="display:none" title="Cerrar Ventana"></div>');
//					var box = $('div#fake-box');
//					$.get(Drupal.settings.logged_user.chagePassword, null, function(data) {
//						box.html(data.html);
//						box.css({position: 'absolute', left: "-9999pc", top: '-9999pc', display: 'block'});
//						setTimeout(function() {
//							box.removeAttr('style')
//									.hide()
//									.dialog({
//								modal: true,
//								resizable: false,
//								title: data.title,
//								width: 'auto',
//								height: 'auto'
//							});
//						}, 10);
//					}, 'json');
//				}
//			});
//		}
//	},
	Drupal.behaviors.chagePasswordSubmit = {attach: function(context) {
			var links = $('form#logged-user-user-pass-form');
			links.die();
			links.live({
				/*submit: function(event) {
					event.preventDefault();
					var box = $('div#fake-box');
					if (box.length < 1)
						$('body').append('<div id="fake-box" style="display:none" title="Cerrar Ventana"></div>');
					var box = $('div#fake-box');

					var postData = {};
					$(this).find('select,input').each(function(index, value) {
						postData[$(this).attr('name')] = $(this).val();
					});
					$.post($(this).attr('action'), postData, function(data) {
						box.html(data);
					}, 'html');
				}
			});*/
			});
		}
	},
	Drupal.behaviors.sticky = {
		attach: function(context) {
			var block = $("#zone-user");
			if (block.length)
				block.sticky({topSpacing: 0});
		}
	},
	Drupal.behaviors.profileFormAddons = {
		attach: function(context) {
			var medioSelect = false;
			var form = $('form#user-profile-form, form#user-register-form');
			var source = form.find('select#edit-profile-periodista-field-medio-und');
			var target = form.find('input#edit-fake-medio');
			var values = new Array();
			var selected = false;

			/*source.find('option').each(function(index, value) {
				var obj = {};
				obj['value'] = $(this).attr('value');
				obj['label'] = $(this).text();
				values.push(obj);
			});

			source.parent().hide();*/
			/*target.autocomplete({
				source: values,
				select: function(event, ui) {
					source.val(ui.item.value);
					selected = ui.item.label;
					medioSelect = true;
				},
				close: function(event, ui) {
					if (!medioSelect) {
						target.val('');
						selected = false;
					}
					else
						target.val(selected);
				}
			});*/
		}
	}
})(jQuery);