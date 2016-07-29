<html>
	<head>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
		<? if ($renderType == 'gallery'): ?>
			<script src="<?= file_create_url(drupal_get_path('module', 'dataifx_gallery') . '/js/dataifx_gallery.js') ?>"></script>
		<? endif; ?>
		<script>
			$(document).ready(function() {
				$('html').css({
					display: "block",
					float: "left",
					height: '100%', //$('body').outerHeight(true),
					width: '100%'//$('body').outerWidth(true)
				});
			});
		</script>
		<style media="all" type="text/css">@import url("<?= file_create_url(drupal_get_path('theme', 'caracol') . '/css/global.css') ?>");</style>
		<style media="all" type="text/css">@import url("<?= file_create_url(drupal_get_path('module', 'dataifx_gallery') . '/css/dataifx_gallery.css') ?>");</style>
	</head>
	<body  style="display:block;float: left;"><? //kpr() ?>
		<div class="prensa-render-content"><?= $content; ?></div>
		<? if ($renderType != 'gallery'): ?>
			<div class="buttons"><?= l(t('download'), $link['url'], array('attributes' => array('class' => array('button button-download'), 'target' => '_blank'))); ?></div>
		<? endif; ?>
		<? if ($link['ajaxRequest']): ?>
			<span class="messages"></span>
			<script>
				$(document).ready(function() {
					var block = false;
					$('a.button-download').click(function(event) {
						event.preventDefault();
						if (!block) {
							block = true;
							var messages = $('.messages');
							messages.html('su video pronto comenzara a descargarse, por favor sea paciente...');
							$.get($(this).attr('href'), null, function(data) {
								if (data.file) {
									messages.html('por favor habilite popups para comezar la descarga');
									setTimeout(function() {
										messages.html('');
									}, 10000);
									window.open(data.file);
									messages.html('');
								} else {
									messages.html('hubo un error con la descarga, por favor vuelva a interntarlo');
								}
								block = false;
							}, 'json');
						}
					});
				});
			</script>
		<? endif; ?>
	</body>
</html>