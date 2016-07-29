// Dataifx Gallery Plugin v1.0.0 for jQuery
// =============
// Author: Javier Rojas
// Created: 19/11/2013
// Date: 19/11/2013
(function($) {
	$.fn.build = function(settings) {

		var defaults = {
			height: 150,
			duration: 100,
			auto: true,
			autoTime: 6000
		};
		var settings = $.extend(defaults, settings);
		return this.each(function() {
			var currentImage = 0;
			var currentPage = 0;
			var gallery = $(this);
			var content = {};
			$.get(settings.configUrl, settings.params, function(response) {
				if (response) {
					content = response;
					beginBuild();
				}
			});
			function beginBuild() {
				buildMainImage(content);
				buildThumbNails(content);
				addListeners(content);
			}
			function buildMainImage(content) {
				var mainImageContainer = gallery.find(".dataifx_gallery-main-image-content");
				mainImageContainer.find(".dataifx_gallery-main-image-picture").append('<img src="' + content.images[0].image_src + '" title="' + content.images[0].title + '" data-image-index="0"/>');
				mainImageContainer.find(".dataifx_gallery-main-image-title .field-content").html(content.images[0].title);
				mainImageContainer.find(".dataifx_gallery-main-image-description .field-content").html(content.images[0].caption);

				var cachedImages = content.images.slice(currentImage, content.images.length - 1);
				var cacheContainer = mainImageContainer.parent().find(".dataifx_gallery-main-chached");
				for (var i in cachedImages)
					cacheContainer.append('<img class="dataifx_gallery-cached-image" src="' + cachedImages[i].image_src + '" title="' + cachedImages[i].title + '" data-image-index="' + i + '"/>');
				var imagesCached = cacheContainer.parent().find('img');

				var imagesCachedCounter = 0;
				imagesCached.load(function() {
					imagesCachedCounter++;
					if (imagesCachedCounter >= imagesCached.length)
						gallery.trigger($.Event("mainImagesLoaded"));
				});
				
				
						
			
				$(".dataifx-gallery").css( "height", "540px" );
				$(".dataifx_gallery-main-area").css( "height", "540px" );
	
				setTimeout(function() {
      				// Do something after 5 seconds
				}, 9000);
				$(".dataifx-gallery").show();
	
				$(".cargando").hide();
		

			}
			function buildThumbNails(content) {
				var thumbnailsContainer = gallery.find(".dataifx_gallery-thumb-images-content");
				for (var i in content.images)
					thumbnailsContainer.append('<img src="' + content.images[i].thumb_src + '" title="' + content.images[i].title + '" data-thumbnail-index="' + i + '"/>');

				var thumbnails = thumbnailsContainer.find('img');
				var thumbnailsCounter = 0;

				thumbnails.load(function() {
					thumbnailsCounter++;
					if (thumbnailsCounter >= thumbnails.length) {
						gallery.trigger($.Event("thumbnailsLoaded"));
					}
				});
			}
			function addListeners() {
				/*internal*/
				var isThumbnailsLoaded = false;
				var isMainImagesLoaded = false;
				gallery.bind({
					mainImagesLoaded: function() {
						isMainImagesLoaded = true;
						mainImagesLoaded();
						if (isThumbnailsLoaded && isMainImagesLoaded)
							gallery.trigger($.Event("buildFinished"));
					},
					thumbnailsLoaded: function() {
						isThumbnailsLoaded = true;
						thumbnailsLoaded();
						if (isThumbnailsLoaded && isMainImagesLoaded)
							gallery.trigger($.Event("buildFinished"));
					},
					buildFinished: buildFinished
				});
				/*listeners para los controles principales*/
				var mainArea = gallery.find('.dataifx_gallery-main-area');
				var previousMainButton = mainArea.find('.dataifx_gallery-main-control-previous');
				var nextMainButton = mainArea.find('.dataifx_gallery-main-control-next');
				var downloadButton = mainArea.find('.dataifx_gallery-main-image-download');

				previousMainButton.bind({click: previousImageListener});

				nextMainButton.bind({click: nextImageListener});
				downloadButton.bind({click: downloadListener});

				/*listeners para los controles de los thumbnails*/
				var thumbnailsArea = gallery.find('.dataifx_gallery-thumb-area');
				var previousButton = thumbnailsArea.find('.dataifx_gallery-thumb-control-previous');
				var nextButton = thumbnailsArea.find('.dataifx_gallery-thumb-control-next');

				previousButton.bind({click: previousThumbnailPageListener});

				nextButton.bind({click: nextThumbnailPageListener});

				/*listeners para los thumbnails*/
				var thumbnails = gallery.find(".dataifx_gallery-thumb-images-content img");
				thumbnails.bind({click: moveToListener});
			}
			/*listeners*/

			function mainImagesLoaded(event) {
				var images = gallery.find('.dataifx_gallery-main-image img');
				var prevButton = gallery.find('.dataifx_gallery-main-control-previous');
				var nextButton = gallery.find('.dataifx_gallery-main-control-next');
				var maxMainImageWidth = 0;
				var maxMainImageHeight = 0;
				images.each(function(index, value) {
					maxMainImageWidth = maxMainImageWidth < $(this).outerWidth(true) ? $(this).outerWidth(true) : maxMainImageWidth;
					maxMainImageHeight = maxMainImageHeight < $(this).outerHeight(true) ? $(this).outerHeight(true) : maxMainImageHeight;
				});
				gallery.find(".dataifx_gallery-main-image-content").css({
					height: maxMainImageHeight,
					width: maxMainImageWidth
				});
				gallery.find('.dataifx_gallery-main-area').css({
					width: gallery.find('.dataifx_gallery-main-image').outerWidth(true) + prevButton.outerWidth(true) + nextButton.outerWidth(true),
					height: gallery.find('.dataifx_gallery-main-image').outerHeight(true)
				});
				gallery.find(".dataifx_gallery-main-image-content .dataifx_gallery-main-image-description .field-content").css({
					paddingRight: gallery.find('.dataifx_gallery-main-image-download').outerWidth()
				});
				
				var thumbnailsArea = gallery.find('.dataifx_gallery-thumb-area');
				var thumbnailsWrapper = thumbnailsArea.find('.dataifx_gallery-thumb-images');
				var previousButtonThumbnail = thumbnailsArea.find('.dataifx_gallery-thumb-control-previous');
				var nextButtonThumbnail = thumbnailsArea.find('.dataifx_gallery-thumb-control-next');
				thumbnailsWrapper.css({
					width: gallery.find('.dataifx_gallery-main-area').outerWidth() - (previousButtonThumbnail.outerWidth(true) + nextButtonThumbnail.outerWidth(true) + 20)
				});
			}
			function thumbnailsLoaded() {
				var thumbnailsContainer = gallery.find(".dataifx_gallery-thumb-images-content");
				var thumbnails = thumbnailsContainer.find('img');
				var thumbnailsArea = gallery.find('.dataifx_gallery-thumb-area');
				var thumbnailsWrapper = thumbnailsArea.find('.dataifx_gallery-thumb-images');
				var totalWidth = 0;
				var totalHeight = 0;
				thumbnails.each(function(index, value) {
					totalWidth += $(this).outerWidth(true);
					totalHeight = totalHeight < $(this).outerHeight(true) ? $(this).outerHeight(true) : totalHeight;
				});
				thumbnailsContainer.css({width: totalWidth !== 0 ? totalWidth : 'auto'});
				thumbnailsWrapper.css({
					height: totalHeight
				});
				thumbnailsArea.css({
					height: totalHeight
				});

				/*se organizan los thumbnails en paginas*/
				var currentPageCounter = 0;
				var tmpWidth = 0;
				var visibleWidth = thumbnailsWrapper.outerWidth();
				var ini = 0;
				thumbnails.each(function(index, value) {
					tmpWidth += $(this).outerWidth(true);
					if (tmpWidth > visibleWidth || index >= thumbnails.length - 1) {
						var filtered = null;

						if (index >= thumbnails.length - 1)
							filtered = thumbnails.filter(':gt(' + (ini - 1) + ')');
						else {
							filtered = thumbnails.filter(':lt(' + (index) + ')');

							if (ini > 0)
								filtered = filtered.filter(':gt(' + (ini - 1) + ')');
						}
						filtered.wrapAll('<div class="thumbnail-page thumbnail-page-' + currentPageCounter + '" data-thumbnail-page="' + currentPageCounter + '">');
						ini = index;
						tmpWidth = 0;
						currentPageCounter++;
					}
				});
				movePageTo(0);
			}
			function buildFinished(event) {
				var thumbnailsArea = gallery.find('.dataifx_gallery-thumb-area');
				gallery.parent().css({
					width: gallery.find('.dataifx_gallery-main-area').outerWidth(true),
					height: gallery.find('.dataifx_gallery-main-area').outerHeight(true) + thumbnailsArea.outerHeight(true)
				});
			}
			function moveToListener(event) {
				moveTo($(event.target).data('thumbnail-index'));
			}
			function previousThumbnailPageListener(event) {
				previousPage();
			}
			function nextThumbnailPageListener(event) {
				nextPage();
			}
			function previousImageListener(event) {
				previousImage();
			}
			function nextImageListener(event) {
				nextImage();
			}
			function downloadListener(event) {
				window.open(content.images[currentImage].image_link_src, '_blank');
			}
			/*actions*/
			function moveTo(index) {
				var thumbnails = gallery.find(".dataifx_gallery-thumb-images-content img");
				var lastIndex = thumbnails.length - 1;

				if (index > lastIndex)
					index = 0;

				if (index < 0)
					index = lastIndex;

				var selectedThumbnail = thumbnails.filter('[data-thumbnail-index=' + index + ']');

				/*select the correct thumbnail*/
				thumbnails.removeClass('dataifx-gallery-thumbnail-selected');
				selectedThumbnail.addClass('dataifx-gallery-thumbnail-selected');

				/*change the main image*/
				var mainImageContainer = gallery.find(".dataifx_gallery-main-image-content");
				var mainImage = mainImageContainer.find(".dataifx_gallery-main-image-picture img");

				mainImage.attr({src: content.images[index].image_src, title: content.images[index].title, 'data-image-index': index});
				mainImageContainer.find(".dataifx_gallery-main-image-title .field-content").html(content.images[index].title);
				mainImageContainer.find(".dataifx_gallery-main-image-description .field-content").html(content.images[index].caption);

				currentImage = index;
			}
			function movePageTo(index) {
				var thumbnailsPages = gallery.find(".thumbnail-page");
				var lastIndex = thumbnailsPages.length - 1;

				if (index > lastIndex)
					index = 0;

				if (index < 0)
					index = lastIndex;

				var selectedThumbnailPage = thumbnailsPages.filter('[data-thumbnail-page=' + index + ']');

				/*select the correct thumbnail*/
				thumbnailsPages.removeClass('dataifx-gallery-thumbnail-page-selected').hide();
				selectedThumbnailPage.addClass('dataifx-gallery-thumbnail-page-selected').show();

				currentPage = index;
			}
			function previousImage(event) {
				moveTo(currentImage - 1);
			}
			function nextImage(event) {
				moveTo(currentImage + 1);
			}
			function previousPage(event) {
				movePageTo(currentPage - 1);
			}
			function nextPage(event) {
				movePageTo(currentPage + 1);
			}
			function setInitialState() {
			}
		});
	};
})(jQuery);