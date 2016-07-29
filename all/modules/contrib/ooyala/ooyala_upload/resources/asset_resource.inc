<?php

/**
 * Services callback to create a new asset.
 *
 * @param $requestAsset
 *   The asset array that was sent by the client. Note that objects and
 *   associative arrays are the same in JSON, but Services is standardized on
 *   on using arrays.
 *
 * @return
 *   An asset object containing the embed code.
 */
function ooyala_upload_asset_create($requestAsset) {
  module_load_include('inc', 'ooyala', 'includes/ooyala.api');

  $asset = new stdClass();
  // Only allow the following properties to be passed to Ooyala.
  $properties = array(
    'name',
    'description',
    'file_name',
    'file_size',
    'asset_type',
  );
  foreach ($properties as $property) {
    if (!isset($requestAsset[$property])) {
      return services_error("Missing asset attribute $property", 406);
    }
    $asset->{$property} = $requestAsset[$property];
  }
  if (isset($requestAsset['chunk_size'])) {
    $asset->chunk_size = $requestAsset['chunk_size'];
  }

  $asset = ooyala_api_asset_add($asset);

  // Build our response to the client. We return any properties set by the
  // client that might have been modified.
  $response = new stdClass();
  foreach ($properties as $property) {
    if (isset($asset->{$property})) {
      $response->{$property} = $asset->{$property};
    }
  }
  $response->embed_code = $asset->embed_code;

  return $response;
}

/**
 * Load an Ooyala asset from the Ooyala backlot.
 *
 * Due to the way the Ingestion library works, we have to include the
 * $uploading_urls parameter here so we can return something completely
 * different if it's set.
 *
 * @param string $embed_code
 *   The embed code of the asset to load.
 * @param string $uploading_urls
 *   Optional parameter indicating to load uploading URLs instead. Set to
 *   'uploading_urls' to return them instead of the asset object.
 *
 * @return mixed
 *   An Asset object, or an array of uploading URLs.
 */
function ooyala_upload_asset_load($embed_code, $uploading_urls = FALSE) {
  module_load_include('inc', 'ooyala', 'includes/ooyala.api');
  $asset = ooyala_api_video_load($embed_code);
  $asset = (object) $asset;

  if ($uploading_urls) {
    $urls = ooyala_api_asset_uploading_urls($asset);
    return $urls;
  }

  return $asset;
}

/**
 * Services callback to mark an asset as uploaded.
 *
 * @param $embed_code
 *   The embed code of the asset to mark as uploaded.
 * @param $requestAsset
 *   The asset array that was sent by the client. Note that objects and
 *   associative arrays are the same in JSON, but Services is standardized on
 *   on using arrays.
 *
 * @return
 *   An object containing the upload status of the asset.
 */
function ooyala_upload_asset_upload_complete($embed_code, $requestAsset) {
  module_load_include('inc', 'ooyala', 'includes/ooyala.api');

  $asset = new stdClass();
  // Only allow the following properties to be passed to Ooyala.
  $properties = array(
    'status',
  );
  foreach ($properties as $property) {
    if (!isset($requestAsset[$property])) {
      return services_error("Missing asset attribute $property", 406);
    }
    $asset->{$property} = $requestAsset[$property];
  }

  $asset->embed_code = $embed_code;

  if (!$asset->status == 'uploaded') {
    return services_error("Missing asset attribute status set to 'uploaded'", 406);
  }

  $asset = ooyala_api_asset_uploaded($asset);
  $response = new stdClass();
  $response->embed_code = $asset->embed_code;
  $response->status = $asset->status;

  return $response;
}

