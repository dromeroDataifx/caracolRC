/*
 * jQuery liquid carousel v1.0
 * http://www.nikolakis.net
 * 
 * Modification By jrojas@dataifx.com
 * http://50.57.36.147/emisores/sites/all/libraries/liquidcarousel/js/jquery.liquidcarousel.min.js
 *
 * Copyright 2010, John Nikolakis
 * Free to use under the GPL license.
 * http://www.gnu.org/licenses/gpl.html
 *
 */

(function($) {
	$.fn.liquidcarousel = function(options) {

		var defaults = {
			height: 150,
			duration: 100,
			hidearrows: true,
			auto: true,
			autoTime: 6000,
			parent: false,
			lisbymove: 3
		};
		var options = $.extend(defaults, options);

		return this.each(function() {
			var divobj = $(this);

			divobj.css('width', '100%');
			$(divobj).height(options.height);
			$(divobj).css('overflow', 'hidden');

			$('> .wrapper', divobj).height(options.height);
			$('> .wrapper', divobj).css('overflow', 'hidden');
			$('> .wrapper', divobj).css('float', 'left');

			$('> .wrapper > ul', divobj).height(options.height);
			$('> .wrapper > ul', divobj).css('float', 'left');
			$('> .wrapper > ul', divobj).css('margin', '0');
			$('> .wrapper > ul', divobj).css('padding', '0');
			$('> .wrapper > ul', divobj).css('display', 'block');

			$('> .wrapper > ul > li', divobj).height(options.height);
			$('> .wrapper > ul > li', divobj).css('display', 'block');
			$('> .wrapper > ul > li', divobj).css('float', 'left');


			var originalmarginright = parseInt($('> .wrapper > ul > li', divobj).css('marginRight'));
			var originalmarginleft = parseInt($('> .wrapper > ul > li', divobj).css('marginLeft'));
			var visiblelis = 0;
			var totallis = $('> .wrapper > ul > li', this).length;
			var currentposition = 0;
			var liwidth = $('> .wrapper > ul > li:first', divobj).outerWidth(true);
			var additionalmargin = 0;
			var totalwidth = liwidth + additionalmargin;
			var pause = false;
			var pages = 1;
			var fields = options.parent.find('.views-slideshow-controls-top .views-slideshow-pager-field-item');

			$(window).resize(function(e) {
				var divwidth = $(divobj).width();
				var availablewidth = (divwidth - $('> .previous', divobj).outerWidth(true) - $('> .next', divobj).outerWidth(true));

				var previousvisiblelis = visiblelis;
				visiblelis = Math.floor((availablewidth / liwidth));

				pages = Math.round((totallis - visiblelis) / options.lisbymove) + 1;
				fields.filter(':gt(' + (pages - 1) + ')').hide();

				var halfadditionalmargin = Math.floor(additionalmargin / 2);
				totalwidth = liwidth + additionalmargin;

				$('> .wrapper > ul > li', divobj).css('marginRight', originalmarginright + halfadditionalmargin);
				$('> .wrapper > ul > li', divobj).css('marginLeft', originalmarginleft + halfadditionalmargin);

				if (visiblelis > previousvisiblelis || totallis <= visiblelis) {
					currentposition -= (visiblelis - previousvisiblelis);
					if (currentposition < 0 || totallis <= visiblelis) {
						currentposition = 0;
					}
				}
				$('> .wrapper > ul', divobj).css('marginLeft', -(currentposition * totalwidth));

				if (visiblelis >= totallis || ((divwidth >= (totallis * liwidth)) && options.hidearrows)) {
					if (options.hidearrows) {
						$('> .previous', divobj).hide();
						$('> .next', divobj).hide();

						additionalmargin = Math.floor((divwidth - (totallis * liwidth)) / totallis);
						halfadditionalmargin = Math.floor(additionalmargin / 2);
						totalwidth = liwidth + additionalmargin;
						$('> .wrapper > ul > li', divobj).css('marginRight', originalmarginright + halfadditionalmargin);
						$('> .wrapper > ul > li', divobj).css('marginLeft', originalmarginleft + halfadditionalmargin);
					}
					$('> .wrapper', divobj).width(totallis * totalwidth);
					$('> ul', divobj).width(totallis * totalwidth);
					$('> .wrapper', divobj).css('marginLeft', 0);
					currentposition = 0;
				} else {
					$('> .previous', divobj).show();
					$('> .next', divobj).show();
					$('> .wrapper', divobj).width(visiblelis * totalwidth);
					$('> ul', divobj).width(visiblelis * totalwidth);
				}
				fields.removeClass('active');
				fields.filter(':visible:eq(' + currentposition + ')').addClass('active');
				pages = Math.round((totallis - visiblelis) / options.lisbymove) + 1;
			});

			$('> .next', divobj).click(function() {
				currentposition = (currentposition < pages - 1) ? currentposition + 1 : 0;
				fields.removeClass('active');
				fields.filter(':visible:eq(' + currentposition + ')').addClass('active');
				$('> .wrapper > ul', divobj).stop();
				$('> .wrapper > ul', divobj).animate({'marginLeft': -(currentposition * totalwidth * options.lisbymove)}, options.duration);
			});

			$('> .previous', divobj).click(function() {
				currentposition = (currentposition > 0) ? currentposition - 1 : pages - 1;
				fields.removeClass('active');
				fields.filter(':visible:eq(' + currentposition + ')').addClass('active');
				$('> .wrapper > ul', divobj).stop();
				$('> .wrapper > ul', divobj).animate({'marginLeft': -(currentposition * totalwidth * options.lisbymove)}, options.duration);
			});

			$('> .next', divobj).dblclick(function(e) {
				e.preventDefault();
				clearSelection();
			});

			$('> .previous', divobj).dblclick(function(e) {
				e.preventDefault();
				clearSelection();
			});

			$('> .wrapper > ul > li', divobj).bind({
				mouseenter: function(e) {
					e.preventDefault();
					pause = true;
				},
				mouseleave: function(e) {
					e.preventDefault();
					pause = false;
				}
			});
			fields.filter(':visible').click(function(e) {
				currentposition = $(this).index();
				$('> .wrapper > ul', divobj).stop();
				$('> .wrapper > ul', divobj).animate({'marginLeft': -(currentposition * totalwidth)}, options.duration);
			});
			if (options.auto) {
				setInterval(function() {
					if (!pause)
						$('> .next', divobj).trigger('click');
				}, options.autoTime);
			}
			function clearSelection() {
				if (document.selection && document.selection.empty) {
					document.selection.empty();
				} else if (window.getSelection) {
					var sel = window.getSelection();
					sel.removeAllRanges();
				}
			}

			$(window).resize();
		});
	};
})(jQuery);