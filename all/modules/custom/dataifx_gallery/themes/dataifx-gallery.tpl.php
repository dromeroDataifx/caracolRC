<script>
    (function($) {
        $(document).ready(function() {
            $(".cargando").append("<p>Cargando Galeria de Imagenes...</p>");
            $('.dataifx-gallery #<?= $variables['gallery_id'] ?>').build({
                configUrl: '<?= $variables['gallery_xml_path'] ?>',
                containerId: '<?= $variables['gallery_id'] ?>',
                params: <?= drupal_json_encode($variables['params']) ?>,
                galleryWidth: '<?= check_plain($variables['settings']['jlib_galleryWidth']) ?>',
                galleryHeight: '<?= check_plain($variables['settings']['jlib_galleryHeight']) ?>'
            });
        });
    })(jQuery);
</script>
<div class="cargando"></div>
<div class="dataifx-gallery<?= $custom_classes ?>">
    <div id="<?= $variables['gallery_id'] ?>" class="dataifx_gallery-container">
        <div class="dataifx_gallery-main-area">
            <div class="dataifx_gallery-control-icon dataifx_gallery-main-control-previous"></div>
            <div class="dataifx_gallery-main-image">
                <div class="dataifx_gallery-main-image-content">
                    <div class="dataifx_gallery-main-image-title"><span class="field-content"></span></div>
                    <div class="dataifx_gallery-main-image-picture"></div>
                    <span class="dataifx_gallery-main-image-description"><span class="field-content"></span></span>
                    <?php if ($variables['settings']['downloadEnable']): ?>
                    <div class="dataifx_gallery-control-icon dataifx_gallery-main-image-download" style="display:none">Descargar</div>
                    <?php endif; ?>
                </div>
                <div class="dataifx_gallery-main-chached"></div>
            </div>
             <div class="dataifx_gallery-control-icon dataifx_gallery-main-control-next"></div>
        </div>
        <div class="dataifx_gallery-thumb-area">
            <div class="dataifx_gallery-control-icon dataifx_gallery-thumb-control-previous"></div>
            <div class="dataifx_gallery-thumb-images">
                <div class="dataifx_gallery-thumb-images-content"></div>
            </div>
            <div class="dataifx_gallery-control-icon dataifx_gallery-thumb-control-next"></div>
        </div>
    </div>
</div>