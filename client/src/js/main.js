jQuery(document).ready(function ($) {
    "use strict";

    $('a[href=\\#]').on('click', function (e) {
        e.preventDefault();
    })

    $('#myTab a').on('click', function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	})

	/* Page scroll Bottom To Top */
    if ($(".scroll-wrap").length) {
        var progressPath = document.querySelector('.scroll-wrap path');
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
        var updateProgress = function() {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength / height);
            progressPath.style.strokeDashoffset = progress;
        }
        updateProgress();
        $(window).scroll(updateProgress);
        var offset = 50;
        var duration = 550;
        jQuery(window).on('scroll', function() {
            if (jQuery(this).scrollTop() > offset) {
                jQuery('.scroll-wrap').addClass('active-scroll');
            } else {
                jQuery('.scroll-wrap').removeClass('active-scroll');
            }
        });
        jQuery('.scroll-wrap').on('click', function(event) {
            event.preventDefault();
            jQuery('html, body').animate({
                scrollTop: 0
            }, duration);
            return false;
        })
    }

    $(window).on('scroll', scrollFunction);
    function scrollFunction() {
        var target = $('#contentHolder');
        
        if ( target.length > 0 ) {
            var contentHeight = target.outerHeight();
            var documentScrollTop = $(document).scrollTop();
            var targetScrollTop = target.offset().top;
            var scrolled = documentScrollTop - targetScrollTop;
            
            if (0 <= scrolled) {
                var scrolledPercentage = (scrolled / contentHeight) * 100;
                if (scrolledPercentage >= 0 && scrolledPercentage <= 100) {
                    scrolledPercentage = scrolledPercentage >= 90 ? 100 : scrolledPercentage;
                    $("#radiusBar").css({
                        width: scrolledPercentage + "%"
                    });
                }
            } else {
                $("#radiusBar").css({
                    width: "0%"
                });
            }
        }
    }
    /* offer popup */
    $('.rt-offer-popup .popup').on('click', function(){
        $(this).next().slideToggle();
        $(this).toggleClass( 'open');
    });

    /* Search Box */
    $(".search-box-area").on('click', '.search-button, .search-close', function (event) {
        event.preventDefault();
        if ($('.search-text').hasClass('active')) {
            $('.search-text, .search-close').removeClass('active');
        } else {
            $('.search-text, .search-close').addClass('active');
        }
        return false;
    });

    /* Header Search */
    $('a[href="#header-search"]').on("click", function (event) {
        event.preventDefault();
        $("#header-search").addClass("open");
        $('#header-search > form > input[type="search"]').focus();
    });

    $("#header-search, #header-search button.close").on("click keyup", function (event) {
        if (
            event.target === this ||
            event.target.className === "close" ||
            event.keyCode === 27
        ) {
            $(this).removeClass("open");
        }
    });

    /*-------------------------------------
    MeanMenu activation code
    --------------------------------------*/
    var a = $('.offscreen-navigation .menu');

    if (a.length) {
        a.children("li").addClass("menu-item-parent");
        a.find(".menu-item-has-children > a").on("click", function (e) {
            e.preventDefault();
            $(this).toggleClass("opened");
            var n = $(this).next(".sub-menu"),
                s = $(this).closest(".menu-item-parent").find(".sub-menu");
            a.find(".sub-menu").not(s).slideUp(250).prev('a').removeClass('opened'), n.slideToggle(250)
        });
        a.find('.menu-item:not(.menu-item-has-children) > a').on('click', function (e) {
            $('.rt-slide-nav').slideUp();
            $('body').removeClass('slidemenuon');
        });
    }

    $('.mean-bar .sidebarBtn').on('click', function (e) {
        e.preventDefault();
        if ($('.rt-slide-nav').is(":visible")) {
            $('.rt-slide-nav').slideUp();
            $('body').removeClass('slidemenuon');
        } else {
            $('.rt-slide-nav').slideDown();
            $('body').addClass('slidemenuon');
        }

    });

    /*Header and mobile menu stick*/
    $(window).on('scroll', function () {
        if ($('body').hasClass('sticky-header')) {
            // Sticky header
            var stickyPlaceHolder = $("#sticky-placeholder"),
                menu = $("#header-menu"),
                menuH = menu.outerHeight(),
                topHeaderH = $('#tophead').outerHeight() || 0,
                middleHeaderH = $('#header-middlebar').outerHeight() || 0,
                targrtScroll = topHeaderH + middleHeaderH;
            if ($(window).scrollTop() > menuH) {
                menu.addClass('rt-sticky');
                stickyPlaceHolder.height(menuH);
            } else {
                menu.removeClass('rt-sticky');
                stickyPlaceHolder.height(0);
            }

            // Sticky mobile header
            var stickyPlaceHolder = $("#mobile-sticky-placeholder"),
                menu = $(".mean-container"),
                menuH = menu.outerHeight(),
                topHeaderH = $('#mobile-top-fix').outerHeight() || 0,
                topAdminH = $('#wpadminbar').outerHeight() || 0,
                targrtScroll = topHeaderH + topAdminH;
            if ($(window).scrollTop() > targrtScroll) {
                menu.addClass('mobile-sticky');
               stickyPlaceHolder.height(menuH);
            } else {
                menu.removeClass('mobile-sticky');
                stickyPlaceHolder.height(0);
            }
        }
    });
});

//function Load
function radiustheme_content_load_scripts() {
    
    var $ = jQuery;
    // Preloader
    $('#preloader').fadeOut('slow', function () {
        $(this).remove();
    });

    /* animate headline */
    if ($('.rt-hero-item')) {
        $('.rt-hero-item').animatedHeadline({
            animationType: 'clip'
        });
    }

    var windowWidth = $(window).width();
	
    /* Swiper slider */
    $('.rt-swiper-slider').each(function() {
        var $this = $(this);
        var settings = $this.data('xld');
        var autoplayconditon= settings['auto'];
        var $pagination = $this.find('.swiper-pagination')[0];
        var $next = $this.find('.swiper-button-next')[0];
        var $prev = $this.find('.swiper-button-prev')[0];
        var swiper = new Swiper( this, {
                autoplay:   autoplayconditon,
                autoplayTimeout: settings['autoplay']['delay'],
                speed: settings['speed'],
                loop:  settings['loop'],
                pauseOnMouseEnter :true,
                slidesPerView: settings['slidesPerView'],
                spaceBetween:  settings['spaceBetween'],
                centeredSlides:  settings['centeredSlides'], 
                slidesPerGroup: settings['slidesPerGroup'],
                pagination: {
                    el: $pagination,
                    clickable: true,
                    type: 'bullets',
                },
                navigation: {
                    nextEl: $next,
                    prevEl: $prev,
                },
                breakpoints: {
                0: {
                    slidesPerView: settings['breakpoints']['0']['slidesPerView'],
                },
                375: {
                    slidesPerView: settings['breakpoints']['375']['slidesPerView'],
                },
                576: {
                    slidesPerView: settings['breakpoints']['576']['slidesPerView'],
                },
                768: {
                    slidesPerView: settings['breakpoints']['768']['slidesPerView'],
                },
                992: {
                    slidesPerView: settings['breakpoints']['992']['slidesPerView'],
                },
                1200: {
                    slidesPerView:  settings['breakpoints']['1200']['slidesPerView'],
                },
                1600: {
                    slidesPerView: settings['breakpoints']['1600']['slidesPerView'],
                },
            },
        });
        swiper.init();
    });

}

(function ($) {
    "use strict";

    // Window Load+Resize
    $(window).on('load resize', function () {

        // Define the maximum height for mobile menu
        var wHeight = $(window).height();
        wHeight = wHeight - 50;
        $('.mean-nav > ul').css('max-height', wHeight + 'px');

        // Elementor Frontend Load
        $(window).on('elementor/frontend/init', function () {
            if (elementorFrontend.isEditMode()) {
                elementorFrontend.hooks.addAction('frontend/element_ready/widget', function () {
                    radiustheme_content_load_scripts();
                });
            }
        });

    });

    // Window Load
    $(window).on('load', function () {
        radiustheme_content_load_scripts();
    });


})(jQuery);
