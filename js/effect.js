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
		$('#bulb_yellow').addClass('bulb-glow-yellow');
		$('#bulb_red').addClass('bulb-glow-red');
		$('#bulb_blue').addClass('bulb-glow-blue');
		$('#bulb_green').addClass('bulb-glow-green');
		$('#bulb_pink').addClass('bulb-glow-pink');
		$('#bulb_orange').addClass('bulb-glow-orange');
		$('body').addClass('peach');
		$(this).fadeOut('slow').delay(4000).promise().done(function () {
			$('#play').fadeIn('slow');
		});
	});
	$('#play').click(function () {
		var audio = $('.song')[0];
		audio.play();
		$('#bulb_yellow').addClass('bulb-glow-yellow-after');
		$('#bulb_red').addClass('bulb-glow-red-after');
		$('#bulb_blue').addClass('bulb-glow-blue-after');
		$('#bulb_green').addClass('bulb-glow-green-after');
		$('#bulb_pink').addClass('bulb-glow-pink-after');
		$('#bulb_orange').addClass('bulb-glow-orange-after');
		$('body').css('backgroud-color', '#FFF');
		$('body').addClass('peach-after');
		$(this).fadeOut('slow').delay(5000).promise().done(function () {
			$('#bannar_coming').fadeIn('slow');
		});
	});

	$('#bannar_coming').click(function () {
		$('.bannar').addClass('bannar-come');

		$(this).fadeOut('slow').delay(5000).promise().done(function () {
			$('#balloons_flying').fadeIn('slow');

			// Show the album photos
			$('.album-photo').fadeIn('slow');

			$('.can-zoom').fadeIn('slow');

		});
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
		$('.balloon-border').animate({ top: -500 }, 8000);

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
		$(this).fadeOut('slow').promise().done(function () {
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