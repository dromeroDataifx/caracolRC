<h2 class="title"><?= $title ?></h2>
<div class="content">
    <ul class="fecha-filter" data-target="<?= $target ?>">
        <? foreach ($meses as $mes):?>
            <li><?= $mes ?></li>
        <? endforeach; ?>
    </ul>
</div>