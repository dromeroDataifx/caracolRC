<?php


/**
 * @file
 * Hooks provided by the dataifx_gallery module.
 */


/**
 * Allow modules to alter the data that's used to to build a dataifx_gallery gallery
 * and XML.
 *
 * @param array $data
 *   An associative array containing all the content and configuration data that
 *   will be used to render a dataifx_gallery gallery and XML. This includes:
 *   - jlib_options: An associative array of dataifx_gallery configuration options
 *     (these will be added as attributes to the "dataifx_gallery" element of the XML).
 *   - images: An indexed array of image data (this will be used to construct
 *     the attributes of each "image" element of the XML, along with the "title"
 *     and "caption" elements nested within).
 * @param array $settings
 *   An associative array of raw settings for the gallery. Provided for context.
 * @param array $source_info
 *   An associative array that provides source infomation for the gallery.
 *   Provided for context. This includes:
 *   - xml_path: The path for the gallery's XML which can also be used as an
 *     unique ID for the gallery. The pieces of this path also describe the
 *     data components from the source that are used to build the gallery.
 *   - source: The source object that was used for the XML data. If $xml_path
 *     starts with "dataifx_gallery/xml/view" this will be a rendered view object. If
 *     $xml_path starts with "dataifx_gallery/xml/entity" this will be an entity object
 *     (such as a node), etc.
 */
function hook_dataifx_gallery_gallery_data_alter(&$data, $settings, $source_info) {
  // See if this is a gallery sourced from a view.
  if (strpos($source_info['xml_path'], 'dataifx_gallery/xml/view') === 0) {
    $view = $source_info['source'];
    // Assume we have a view called "galleries" and a page called "page_1" that
    // structures galleries based on a taxonomy term contextual filter. We want
    // the dataifx_gallery "galleryDescription" option to be the term description, but
    // because this term description is dynamic (based on contextual filter) we
    // can't statically define it in the view's dataifx_gallery settings. This hook
    // let's us do the job dynamically.
    if ($view->name == 'galleries' && $view->current_display == 'page_1') {
      if (!empty($view->args)) {
        $term = taxonomy_term_load($view->args[0]);
        if (!empty($term->description)) {
          $data['jlib_options']['galleryDescription'] = strip_tags($term->description);
        }
      }
    }
  }
}
