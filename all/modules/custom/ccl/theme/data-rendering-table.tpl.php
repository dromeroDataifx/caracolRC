<div class="accordion">
	<? foreach ($data as $items): ?>
		<div class="accordion-row">
			<h3><?= $items['label']; ?></h3>
			<div class="accordion-content">
				<table class="market-data-category market-data-category-<?= strtolower(str_replace(' ', '-', $items['label'])); ?>">
					<thead>
						<tr>
							<th><?= t('Name') ?></th>
							<th><?= t('Value') ?></th>
							<th><?= t('Change') ?></th>
							<th><?= t('% Change') ?></th>
						</tr>
					</thead>
					<tbody>
						<? foreach ($items['elements'] as $key => $row): ?>
							<tr class="<?= $key; ?> market-data-trend dataifx_<?=$key;?>_trend">
								<th class="market-data-name"><?= $row['label']; ?></th>
								<td class="market-data-value dataifx_<?=$key;?>_value"  <?= isset($row['prefix']) ? 'data-prefix="' . $row['prefix'] . '"' : ''; ?> <?= isset($row['suffix']) ? 'data-suffix="' . $row['suffix'] . '"' : ''; ?>></td>
								<td class="market-data-absolute-variation dataifx_<?=$key;?>_varvalue" <?= isset($row['prefix']) ? 'data-prefix="' . $row['prefix'] . '"' : ''; ?> <?= isset($row['suffix']) ? 'data-suffix="' . $row['suffix'] . '"' : ''; ?>></td>
								<td class="market-data-relative-variation dataifx_<?=$key;?>_varperc" data-suffix="%"></td>
							</tr>
						<? endforeach; ?>
					</tbody>
				</table>
				<?= l(t('see :category in real time', array(':category' => $items['label'])), $items['link'], array('attributes' => array('class' => 'button', 'target' => '_blank'), 'html' => true)); ?>
			</div>
		</div>    
	<? endforeach; ?>
</div>
<div class="disclaimer">*<?= t('Registered data the previous business day.') ?></div>
<div class="sponsor">
    <span class="name"><?= t('Integrated by') ?></span>
	<?= l($image, 'http://dataifx.com', array('attributes' => array('title' => 'dataifx', 'class' => 'dataifx-logo', 'target' => '_blank'), 'html' => true)); ?>
</div>