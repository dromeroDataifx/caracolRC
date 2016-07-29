<div id="cambio-contrasena-exitoso">
    <h2 class="title">cambio de contrase&ntilde;a</h2>
    <div class="content">
        <p>cambio de contrase&ntilde;a exitoso</p>
        <div>su nueva contrase&ntilde;a ha sido enviada al correo <?= $mail ?></div>
        <a class="button button-close" href=""><?= t("Acept") ?></a>
    </div>
</div>
<script>
    (function($) {
        $("a.button-close").click(function(event) {
            event.preventDefault();
            console.log('closing');
            $('div#fake-box').dialog('close');
        });
    })(jQuery);
</script>