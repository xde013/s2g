function bootstrapAnimatedLayer() {
	function doAnimations(elems) {
		var animEndEv = 'webkitAnimationEnd animationend';
		elems.each(function() {
			var $this = $(this),
    		$animationType = $this.data('animation');
			$this.addClass($animationType).one(animEndEv, function() {
			    $this.removeClass($animationType);
		    });
		});
	}

	var $myCarousel = $('#main-carousel'),
	$firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");
	$myCarousel.carousel({
		interval: 7000
	});
	doAnimations($firstAnimatingElems);
	$myCarousel.carousel('pause');
	$myCarousel.on('slide.bs.carousel', function(e) {
		var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
		doAnimations($animatingElems);
	});
}

function mainmenu() {
	if($('.main-menu li.dropdown ul').length){
		$('.main-menu li.dropdown').append('<div class="dropdown-btn"><i class="fa fa-plus"></i></div>');
		$('.main-menu li.dropdown .dropdown-btn').on('click', function() {
			$(this).prev('ul').slideToggle(500);
		});
	}

}

function counter_number() {
	var timer = $('.timer');
	if(timer.length) {
		timer.appear(function () {
			timer.countTo();
		})
	}
}

function stickyHeader() {
    var window_top = $(window).scrollTop();
    var div_top = $('#sticky-anchor').offset().top;
    if (window_top > div_top ) {
         $('.stricky').addClass('stricky-fixed');
         $('#main-carousel').css({'margin-top' : '57px'});
    } else {
         $('.stricky').removeClass('stricky-fixed');
        $('#main-carousel').css({'margin-top' : '0px'});
    };
}

function scrollToTop() {
    if ($('.scroll-to-target').length) {
        $(".scroll-to-target").on('click', function() {
            var target = $(this).attr('data-target');
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 1000);

        });
    }
}

function accordion() {
    if($('.accordion-box').length){
        $('.accordion-box').on('click', '.accord-btn', function() {
            if ($(this).hasClass('active')) {
                $(this).parent('.accordion-block').removeClass('active');
                $(this).removeClass('active');
                $(this).next('.accord-content').slideUp(500);
            } else {
                $('.accordion').each(function(i, obj) {
                    $(this).children('.accord-btn').removeClass('active');
                    $(this).removeClass('active');
                });
                $(this).addClass('active');
                $(this).parent('.accordion-block').addClass('active');
                $('.accordion .accord-content').slideUp(500);
                $(this).next('.accord-content').slideDown(500);	
            }
        });	
    }
}

function partnerCarousel () {
    if ($('.partner').length) {
        $('.partner').owlCarousel({
            dots: false,
            loop:true,
            margin:20,
            nav:true,
            navText: [
                '<i class="fa fa-angle-left"></i>',
                '<i class="fa fa-angle-right"></i>'
            ],
            autoplayHoverPause: false,
            autoplay: 6000,
            smartSpeed: 1000,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                800:{
                    items:3
                },
                1024:{
                    items:4
                }
            }
        });    		
    }
}

function serviceCarousel () {
    if($('.owl-carousel-grid-four').length){
        $('.owl-carousel-grid-four').owlCarousel({
            dots: false,
            loop:true,
            margin:20,
            nav:true,
            navText: [
                '<i class="fa fa-angle-left"></i>',
                '<i class="fa fa-angle-right"></i>'
            ],
            autoplayHoverPause: false,
            autoplay: 6000,
            smartSpeed: 1000,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                800:{
                    items:3
                },
                1024:{
                    items:4
                }
            }
        })
    }
}

function galleryMasonaryLayout() {
    if ($('.masonary-layout').length) {
        $('.masonary-layout').isotope({
            layoutMode: 'masonry'
        });
    }

    if ($('.post-filter').length) {
        $('.post-filter li').children('span').on('click', function() {
            var Self = $(this);
            var selector = Self.parent().attr('data-filter');
            $('.post-filter li').children('span').parent().removeClass('active');
            Self.parent().addClass('active');
            $('.filter-layout').isotope({
                filter: selector,
                animationOptions: {
                    duration: 500,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });
    }

    if ($('.post-filter.has-dynamic-filter-counter').length) {
        var activeFilterItem = $('.post-filter.has-dynamic-filter-counter').find('li');
        activeFilterItem.each(function() {
            var filterElement = $(this).data('filter');
            console.log(filterElement);
            var count = $('.gallery-content').find(filterElement).length;
            $(this).children('span').append('<span class="count"><b>' + count + '</b></span>');
        });
    };
}

function projectCarousel () {
    if ($('.project-images .image-carousel').length && $('.project-images .thumbs-carousel').length) {

		var $sync1 = $(".project-images .image-carousel"),
			$sync2 = $(".project-images .thumbs-carousel"),
			flag = false,
            duration = 500;
            
		$sync1.owlCarousel({
			loop:false,
			items: 1,
			margin: 0,
			nav: false,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
			dots: false,
			autoplay: true,
			autoplayTimeout: 5000
		})
        .on('changed.owl.carousel', function (e) {
			if (!flag) {
				flag = false;
				$sync2.trigger('to.owl.carousel', [e.item.index, duration, true]);
				flag = false;
            }
        });

		$sync2.owlCarousel({
			loop:false,
			margin: 20,
			items: 1,
			nav: true,
			navText: [ '<span class="fa fa-long-arrow-left"></span>', '<span class="fa fa-long-arrow-right"></span>' ],
			dots: false,
			center: false,
			autoplay: true,
			autoplayTimeout: 5000,
			responsive: {
				0:{
				    items:2,
			        autoWidth: false
			    },
				400:{
				    items:2,
			        autoWidth: false
			    },
				600:{
				    items:3,
			        autoWidth: false
			    },
				900:{
				    items:5,
			        autoWidth: false
				},
				1000:{
			        items:4,
			        autoWidth: false
				}
			},
		})		
		.on('click', '.owl-item', function () {
		    $sync1.trigger('to.owl.carousel', [$(this).index(), duration, true]);
		})
        .on('changed.owl.carousel', function (e) {
            if (!flag) {
                flag = true;		
                $sync1.trigger('to.owl.carousel', [e.item.index, duration, true]);
                flag = false;
            }
        });
	}
}

function enableNav () {
    var carousel = $('.project-images .thumbs-carousel');
    if (carousel.length) {
        carousel.find('.owl-nav').removeClass('disabled');
        carousel.find('.owl-prev').removeClass('disabled');
        carousel.find('.owl-next').removeClass('disabled');;
    }
}

$(document).ready(function() {
	bootstrapAnimatedLayer();
	partnerCarousel();
	serviceCarousel();
	projectCarousel();
    scrollToTop();
    mainmenu();
    counter_number();
    accordion();
    galleryMasonaryLayout();
    enableNav();
});

jQuery(window).on('scroll', function(){
	(function ($) {
	    stickyHeader()
	})(jQuery);
});