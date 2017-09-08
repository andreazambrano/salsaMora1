$(function() {
	/* ------------------------------------------------------------------

	SMOOTH SCROLL

	------------------------------------------------------------------ */
	smoothScroll.init();

	var $window = $(window);    //Window object

  	var scrollTime = .6;      //Scroll time
  	var scrollDistance = 400;   //Distance. Use smaller value for shorter scroll and greater value for longer scroll

  	$window.on("mousewheel DOMMouseScroll", function(event){

  		event.preventDefault(); 

  		var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
  		var scrollTop = $window.scrollTop();
  		var finalScroll = scrollTop - parseInt(delta*scrollDistance);

  		TweenMax.to($window, scrollTime, {
  			scrollTo : { y: finalScroll, autoKill:true },
        ease: Power1.easeOut, //For more easing functions see http://api.greensock.com/js/com/greensock/easing/package-detail.html
        autoKill: false,
        overwrite: 5              
    });

  	});

	/* ----------------------------------------------------------------

	Hover state on div - for iOS

	---------------------------------------------------------------- */
	if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
		$(".masonry-overlay").on('click', function() {  // Update class to point at the head of the list
		});
	}

	/* ------------------------------------------------------------------

	TWEETIE - Display latest tweets

	------------------------------------------------------------------ */
	$('.twitter-feed').twittie({
		username: 'CraftedPixels_',
		count: 5,
		dateFormat: '%d %B %Y',
		template: '{{tweet}} <div class="twitter-date"><a href="{{url}}" target="_blank">{{date}}</a> <span class="twitter-user">@{{user_name}}</span></div>',
		apiPath: 'twitter/api/tweet.php'
	},
	function() {
		var ticker = $('.twitter-feed ul');
		ticker.children('li:first').show().siblings().hide();
		setInterval(function() {
			ticker.find('li:visible').fadeOut(500, function() {
				$(this).appendTo(ticker);
				ticker.children('li:first').fadeIn(500);
			});
		}, 5000);
	});
});

$(document).ready(function() {

	NProgress.start();

	/* ------------------------------------------------------------------

	BXSLIDER

	------------------------------------------------------------------ */
	$('.bxslider').bxSlider({
		pager: false
	});

	/* ------------------------------------------------------------------

	MAGNIFIC POPUP

	------------------------------------------------------------------ */
	$('.image-mp').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		},
		image: {
			// options for image content type
			titleSrc: 'title'
		}
	});

	/* ------------------------------------------------------------------

	CONTACT FORM

	------------------------------------------------------------------ */
	$("#ajax-contact-form").on('submit', function() {
		var str = $(this).serialize();
			$.ajax({
				type: "post",
				url: "contact-form/contact.php",
				data: str,
				success: function(msg) {
					// Message Sent
					if (msg == 'OK') {
						result = '<div class="alert alert-success">Your message has been sent. Thank you!</div>';
						//option to hide the form fields after sending
					} else {
						result = msg;
					}
					$('#note').html(result);
				}
		});
		return false;
	});

	/* ------------------------------------------------------------------

	RESERVATION FORM

	------------------------------------------------------------------ */
	$("#ajax-reservation-form").on('submit', function() {
		var str = $(this).serialize();
		$.ajax({
			type: "post",
			url: "reservation-form/reservation.php",
			data: str,
			success: function(msg) {
				// Message Sent
				if (msg == 'OK') {
					result = '<div class="alert alert-success">Your reservation has been sent. Thank you!</div>';
					//option to hide the form fields after sending
				} else {
					result = msg;
				}
				$('#reservation-note').html(result);
			}
		});
		return false;
	});

	/* ------------------------------------------------------------------

	MAIN NAV TRANSFORM ICON

	------------------------------------------------------------------ */
	$("#nav-toggle").on('click', function(e) {
		$(this).toggleClass("active");
		e.preventDefault();
		return false;
	});

});

$(window).on('load', function() {

	NProgress.done();

	/* ------------------------------------------------------------------

	WAYPOINTS

	------------------------------------------------------------------ */
	$('.wp1').waypoint(function() {
		$('.wp1').addClass('animated fadeInDown');
	}, {
		offset: '75%'
	});
	$('.wp2').waypoint(function() {
		$('.wp2').addClass('animated fadeInDown');
	}, {
		offset: '75%'
	});
	$('.wp3').waypoint(function() {
		$('.wp3').addClass('animated fadeInDown');
	}, {
		offset: '75%'
	});
	$('.wp4').waypoint(function() {
		$('.wp4').addClass('animated fadeInDown');
	}, {
		offset: '75%'
	});
	$('.wp5').waypoint(function() {
		$('.wp5').addClass('animated fadeInDown');
	}, {
		offset: '75%'
	});
	$('.wp6').waypoint(function() {
		$('.wp6').addClass('animated fadeInDown');
	}, {
		offset: '75%'
	});
	$('.wp7').waypoint(function() {
		$('.wp7').addClass('animated fadeInDown');
	}, {
		offset: '75%'
	});
	$('.wp8').waypoint(function() {
		$('.wp8').addClass('animated fadeInUp');
	}, {
		offset: '75%'
	});
	$('.wp9').waypoint(function() {
		$('.wp9').addClass('animated fadeInDown');
	}, {
		offset: '75%'
	});


	/* ------------------------------------------------------------------

	MAIN NAV

	------------------------------------------------------------------ */
	$('.nav-slide-button').on('click', function() {
		$('.pull').slideToggle();
	});

	/**
	* Makes menu close when clicking a link inside the menu
	*/
	$('.top-nav > li > a').on('click', function() {
		$('.pull').slideToggle();
		$("#nav-toggle").toggleClass("active");
	});

	/* ------------------------------------------------------------------

	ISOTOPE

	------------------------------------------------------------------ */
	//Define your containers and option sets
	var $container = [$('#journal-masonry'), $('#gallery-masonry')], $optionSets = [$('#options-journal .option-set'), $('#options-gallery .option-set')];

	//Initialize isotope on each container
	$('#gallery-masonry').isotope({
		itemSelector: '.masonry-item',
		getSortData: {
			name: '.name',
			category: '[data-category]'
		}
	});
	$('#journal-masonry').isotope({
		itemSelector: '.masonry-item',
		getSortData: {
			name: '.name',
			category: '[data-category]'
		}
	});

	//Initialize filter links for each option set
	jQuery.each($optionSets, function(index, object) {

		var $optionLinks = object.find('a');

		$optionLinks.on('click', function() {
			var $this = $(this), $optionSet = $this.parents('.option-set'), options = {},
			key = $optionSet.attr('data-option-key'),
			value = $this.attr('data-option-value');
			// don't proceed if already selected
			if ($this.hasClass('selected')) {
				return false;
			}

			$optionSet.find('.selected').removeClass('selected');
			$this.addClass('selected');

			// make option object dynamically, i.e. { filter: '.my-filter-class' }

			// parse 'false' as false boolean
			value = value === 'false' ? false : value;
			options[key] = value;
			if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
			// changes in layout modes need extra logic
			changeLayoutMode($this, options);
		} else {
			// otherwise, apply new options

			$container[index].isotope(options);
		}

		return false;
	});
	
});
});