<?php

function user_export_ajax_keys_process() {
	$keys = array();
	$keys['user-export']['callback'] = '_user_export_export';
	return $keys;
}

function _user_export_export($args) {
	$rows = user_export_getUsersIdByRole(4);
	$uids = false;
	if ($rows)
		foreach ($rows as $row)
			$uids[$row->uid] = $row->uid;

	$users = false;
	if ($uids) {
		$users = user_load_multiple($uids);
		foreach ($users as $user)
			$user->profiles = profile2_load_by_user($user);

		$fieldsInfo = user_export_getFieldsInfo(current($user->profiles));

		/* se cargan las etiquetas de las columnas */
		$ContentRows[0][] = 'username';
		$ContentRows[0][] = 'e-mail';
		$ContentRows[0][] = 'Perfil';
		foreach ($fieldsInfo as $field)
			$ContentRows[0][] = $field['label'];
		$ContentRows[0][] = 'Creado en';
		$ContentRows[0][] = 'Actualizado';
		$ContentRows[0][] = 'Último Acceso';

		/* se cargan los valores de */
		foreach ($users as $i => $user) {
			$profile = current($user->profiles);
			$j = 0;
			$ContentRows[$i][$j++] = $user->name;
			$ContentRows[$i][$j++] = $user->mail;
			$ContentRows[$i][$j++] = $profile->label;
			foreach ($fieldsInfo as $field => $fieldInfo) {
				$itemValue = array();
				foreach ($profile->{$field}['und'] as $value)
					$itemValue[] = $value['value'];

				$ContentRows[$i][$j++] = implode(',', $itemValue);
			}
			$ContentRows[$i][$j++] = date('Y-m-d H:i:s', $user->created);
			$ContentRows[$i][$j++] = date('Y-m-d H:i:s', $profile->changed);
			$ContentRows[$i][$j++] = date('Y-m-d H:i:s', $user->access);
		}
		require_once 'xlsWriter.inc';
		$writer = new XLSWriter();
		$writer->write($ContentRows, 'users');
	}
}
