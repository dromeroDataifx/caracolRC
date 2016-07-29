<?php
/**
 * @file
 * Profile Complete controller class for Profile 2 support.
 */

class Profile2CompleteProfileController implements CompleteProfileControllerInterface {
  public static function hasEmptyRequiredFields($account) {
    $profiles = profile2_complete_profile_load_editable_by_user($account);
   foreach ($profiles as $profile) {
      if (EntityCompleteProfileController::hasEmptyRequiredFields('profile2', $profile)) {
        return TRUE;
      }
    }
    return FALSE;
  }
  public static function getFieldsForm($account, array &$form_state) {
    $form = array();
    $profiles = profile2_complete_profile_load_editable_by_user($account);
    $form_state['profiles'] = $profiles;
    profile2_attach_form($form, $form_state);
    // Determine if each profile field should actually be shown or not.
    foreach ($profiles as $profile) {
      list(, , $bundle) = entity_extract_ids('profile2', $profile);
      $instances = field_info_instances('profile2', $bundle);
      $form_fields_present = FALSE;
      foreach ($instances as $instance) {
        // Only check required and empty fields.
       $field = field_info_field($instance['field_name']);
        if (empty($instance['required']) || !EntityCompleteProfileController::isFieldEmpty('profile2', $profile, $field)) {
          $form['profile_' . $profile->type][$instance['field_name']]['#access'] = FALSE;
        }
        else {
          $form_fields_present = TRUE;
        }
      }
      if ($form_fields_present) {
        $form['profile_' . $profile->type]['#type'] = 'fieldset';
        $form['profile_' . $profile->type]['#title'] = $profile->label;
        $form['profile_' . $profile->type]['#collapsible'] = TRUE;
      }
    }
    return $form;
  }
}