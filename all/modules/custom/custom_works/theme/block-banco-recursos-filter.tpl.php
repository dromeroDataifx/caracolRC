<ul>
	<? foreach ($links as $link): ?>
		<li class="<?= $sw ? 'odd' : 'even' ?><?= ($i == 0 ? ' first' : (($i == $n - 1) ? ' last' : '')) ?>"><?= $link ?></li>
		<? $sw = !$sw; ?>
		<? $i++; ?>
	<? endforeach; ?>
</ul>