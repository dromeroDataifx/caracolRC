<div class="general-search-form-filters" data-target="<? if (isset($target)) echo $target; else echo"";  ?>">
	<ul class="resource-types">
		<? $params = drupal_get_query_parameters(); ?>
		<? foreach ($resourceTypes as $type => $label): ?>
			<? $params[$filterBy] = $type; ?>
			<li><?= l($label['value'], current_path(), array('query' => $params, 'attributes' => array('data-filter-type' => 'filter', 'data-filter-field' => $filterBy, 'data-filter-argument' => implode(',', $label['arguments'])))) ?></li>
		<? endforeach; ?>
	</ul>
</div>