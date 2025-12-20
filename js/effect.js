$(window).load(function () {
	$('.loading').fadeOut('fast');
	$('.container').fadeIn('fast');
});
$('document').ready(function () {
	var vw;
	$(window).resize(function () {
		vw = $(window).width() / 2;
		// If balloons have established position (ids changed to b101 etc, simple check: b1 doesn't exist)
		if ($('#b1').length == 0) {
			var totalBalloons = 17;
			var spacing = (vw < 384) ? 20 : 65; // 384 is approx half of 768. Actual width is 2*vw. So if width < 768, vw < 384.
			// Let's use direct window width for clarity
			if ($(window).width() < 768) {
				spacing = 20;
			}
			var start = vw - ((totalBalloons - 1) * spacing) / 2;
			for (var i = 1; i <= totalBalloons; i++) {
				$('#b' + (i + 100)).stop().animate({ top: 240, left: start + (i - 1) * spacing }, 500);
			}
		}
	});

	$('#turn_on').click(function () {
		$('.spotlight').fadeIn('slow');
		$(this).fadeOut('slow').delay(3000).promise().done(function () {
			$('#play').fadeIn('slow');
		});
	});
	$('#play').click(function () {
		var audio = $('.song')[0];
		audio.play();
		$('.spotlight').fadeOut(2000);
		$('body').css('background-color', '#FFF5EE');

		setTimeout(function () {
			$('body').addClass('peach-after');
		}, 2000);

		$(this).fadeOut('slow').delay(3000).promise().done(function () {
			$('#bannar_coming').fadeIn('slow');
		});
	});

	$('#bannar_coming').click(function () {
		setTimeout(function () {
			$('.bannar').addClass('bannar-come');
		}, 2000);

		$(this).fadeOut('slow').delay(4000).promise().done(function () {
			$('.album-photo').fadeIn('slow');
			$('.can-zoom').fadeIn('slow');
		});
		setTimeout(function () {
			$('#balloons_flying').fadeIn('slow');
		}, 6000);
	});

	// Generic balloon loop functions
	function loopBalloon(i) {
		var randleft = 1000 * Math.random();
		var randtop = 500 * Math.random();
		$('#b' + i).animate({ left: randleft, bottom: randtop }, 10000, function () {
			loopBalloon(i);
		});
	}

	$('#balloons_flying').click(function () {
		// Generate random balloons
		var colors = ['#D4AF37', '#E6Aac4', '#4169E1', '#50C878', '#800080', '#FFA500', '#00BFFF', '#FF69B4', '#32CD32', '#FF4500', '#9370DB', '#FFD700', '#1E90FF'];
		var balloonContainer = $('.balloon-border');

		for (var j = 0; j < 60; j++) {
			var color = colors[Math.floor(Math.random() * colors.length)];
			var left = Math.random() * 95; // 0 to 95%
			var duration = 6 + Math.random() * 5; // 6 to 11s
			var delay = Math.random() * 4; // 0 to 4s start delay
			var scale = 0.5 + Math.random() * 0.8; // 0.5 to 1.3 scale

			// Check if this is one of the last 10 balloons
			var isPersistent = j >= 45;
			// If persistent, use floatStick, otherwise floatUp (default in css is floatUp, but we can override or set explicit)
			var animationName = isPersistent ? 'floatStick' : 'floatUp';
			var endPos = (85 + Math.random() * 10) + 'vh'; // Random top position for sticking balloons

			var svg = `
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 70" width="100%" height="100%" style="fill: ${color};">
					<path d="M25,0 C11.2,0 0,9.2 0,20.5 C0,34.5 20,48 24,50 C24.5,50.3 25.5,50.3 26,50 C30,48 50,34.5 50,20.5 C50,9.2 38.8,0 25,0 Z" />
					<line x1="25" y1="50" x2="25" y2="70" stroke="${color}" stroke-width="2" />
				</svg>
			`;

			var $balloon = $('<div class="generated-balloon"></div>').html(svg).css({
				left: left + '%',
				width: (50 * scale) + 'px',
				height: (70 * scale) + 'px',
				animationDuration: duration + 's',
				animationDelay: delay + 's',
				animationName: animationName,
				'--end-pos': endPos // CSS variable for the sticking height
			});

			balloonContainer.append($balloon);
		}

		var totalBalloons = 17;
		for (var i = 1; i <= totalBalloons; i++) {
			var randomClass = (i % 2 === 0) ? 'balloons-rotate-behaviour-two' : 'balloons-rotate-behaviour-one';
			$('#b' + i).addClass(randomClass);
			loopBalloon(i);
		}

		$(this).fadeOut('slow').delay(4000).promise().done(function () {
			$('#cake_fadein').fadeIn('slow');
		});
	});

	$('#cake_fadein').click(function () {
		$('.cake').fadeIn('slow');
		$(this).fadeOut('slow').delay(3000).promise().done(function () {
			$('#light_candle').fadeIn('slow');
		});
	});

	$('#light_candle').click(function () {
		$('.fuego').fadeIn('slow');
		$(this).fadeOut('slow').delay(3000).promise().done(function () {
			$('#wish_message').fadeIn('slow');
		});
	});


	$('#wish_message').click(function () {
		vw = $(window).width() / 2;

		$('.balloons').stop();

		var totalBalloons = 17;
		var spacing = 65;
		if ($(window).width() < 768) {
			spacing = 20;
		}
		var start = vw - ((totalBalloons - 1) * spacing) / 2;

		for (var i = 1; i <= totalBalloons; i++) {
			var oldId = 'b' + i;
			var newId = 'b' + (i + 100);
			$('#' + oldId).attr('id', newId);
			$('#' + newId).animate({ top: 240, left: start + (i - 1) * spacing }, 500);
		}

		$('.balloons').css('opacity', '0.9');
		$('.balloons h2').fadeIn(3000);
		$(this).fadeOut('slow').delay(3000).promise().done(function () {
			$('#story').fadeIn('slow');
		});
	});

	$('#story').click(function () {
		$(this).fadeOut('slow');
		$('.cake').fadeOut('fast').promise().done(function () {
			$('.message').fadeIn('slow');
		});

		var $messages = $(".message p");   // only inside .message
		var totalMessages = $messages.length;

		function msgLoop(i) {
			if (i < totalMessages - 1) {
				$messages.eq(i).fadeIn('slow').delay(1500).fadeOut('slow').promise().done(function () {
					msgLoop(i + 1);
				});
			} else {
				// Last message stays + cake comes back
				$messages.eq(i).fadeIn('slow').promise().done(function () {
					$('.cake').fadeIn('fast');
				});
			}
		}

		msgLoop(0);
	});

});

// Zoom (lightbox) feature
$('.album-photo').click(function () {
	var src = $(this).attr('src');
	$('#lightbox img').attr('src', src);

	// Force flex only when showing
	$('#lightbox').css('display', 'flex').hide().fadeIn('fast');
});

// Close when clicking outside image
$('#lightbox').click(function (e) {
	if (e.target !== this) return; // only close if background clicked
	$('#lightbox').fadeOut('fast');
});