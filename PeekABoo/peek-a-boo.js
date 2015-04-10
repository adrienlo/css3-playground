var PopIn = PopIn || {};

;(function($) {
	'use strict';

	var ANIMATION_CLASS = 'peek-a-boo',
		ALIGNMENT = [ 'top-left', 'top-right', 'bottom-left', 'bottom-right'],
		DELAY = 5,
		ITEMS_PER_ROW = 6;

	// Add sprites to rows
	// Random interval of forward class 'forward'
	// Random interval of backward class 'backward'

	PopIn.PeekABoo = function() {
		function addSprite() {
			var current,
				alignment,
				last,
				item,
				totalSlots = [],
				slots,
				i = 1,
				timer;

			for(i = 1; i <= ITEMS_PER_ROW; i++) {
				totalSlots.push(i);
			}

			$('ul.row').each(function() {
				var $row = $(this),
					$item;
				slots = totalSlots.slice(0);
				if(last) {
					slots.splice(last, 1);
				}
				current = getRandom(1, slots.length) - 1;
				alignment = getRandom(1, ALIGNMENT.length) - 1;

				last = slots[current] - 1;

				item = $(this).children()[slots[current] - 1];

				if(item) {
					$item = $(item);
					timer = getRandom(500, 2000);
					setTimeout(function() {
						$item
							.addClass(ANIMATION_CLASS)
							.addClass(ALIGNMENT[alignment])
							.addClass('forward');

						reset();
					}, timer);
				}
			});
		}

		function reset() {

		}
		addSprite();

		function getRandom(a, b) {
			return a + Math.floor(Math.random() * (b - a)) + 1;
		}

		function pattern() {
			var canvas = document.getElementById('background-pattern');

			if (canvas.getContext){
				var i,
					width = 25,
					height = 800,
					ctx = canvas.getContext('2d');

				for (i=0; i < 100; i++) {
					ctx.beginPath();
					if(i % 2) {
						ctx.fillStyle = '#fff';
					} else {
						ctx.fillStyle = '#9c2542';
					}
					ctx.fillRect(i * width, 0, width, height);
					ctx.fill();
					ctx.closePath();
				}

				ctx.save();
				ctx.rotate(0.30);
				ctx.translate(0, height/2);
				for (i=0; i < 100; i++) {
					ctx.beginPath();
					if(i % 2) {
						ctx.fillStyle = '#fff';
					} else {
						ctx.fillStyle = '#9c2542';
					}
					ctx.fillRect(i * width, 0, width, height);
					ctx.fill();
					ctx.closePath();
				}
				ctx.restore();

				ctx.save();
				ctx.translate(0, height/2);
				ctx.rotate(-0.70);
				for (i=0; i < 100; i++) {
					ctx.beginPath();
					if(i % 2) {
						ctx.fillStyle = '#fff';
					} else {
						ctx.fillStyle = '#9c2542';
					}
					ctx.fillRect(i * width, 0, width, height);
					ctx.fill();
					ctx.closePath();
				}
				ctx.restore();
			}

			//document.body.style.backgroundImage = "url(" + canvas.toDataURL() + ")";
		}
	};
}(jQuery));
