<?php

function user_export_getUsersIdByRole($rol) {
	$query = db_select('users', 'u');
	$query->innerJoin('users_roles', 'ur', 'u.uid = ur.uid AND ur.rid ' . (is_array($rol) ? 'IN (' . implode(',', $rol) . ')' : '=' . $rol));
	$query->addField('u', 'uid');
	$query->addField('ur', 'rid');
	$query->orderBy('u.uid');

//	$sql = str_replace(array_keys($query->getArguments()), array_values($query->getArguments()), $query->__toString());
//	kpr($sql);

	$result = $query->execute();

	return $result->rowCount() > 0 ? $result->fetchAll() : false;
}

function user_export_getFieldsInfo($profile) {
	$fieldsInfo = array();
	foreach ($profile as $field => $value) {
		if (stristr($field, 'field_') === FALSE)
			continue;
		$fieldsInfo[$field] = field_info_instance('profile2', $field, $profile->type);
	}
	return $fieldsInfo;
}
