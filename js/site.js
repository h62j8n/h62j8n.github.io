/*
---------------------------------------------------------------
*
* common
*
---------------------------------------------------------------
*/

function scrX() {
	$(window).on('scroll', function(){
		var supportPageOffset = (window.pageXOffset !== undefined),
			Xaxis = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
		var scrX = $('.scrX');
		scrX.css({left: -Xaxis});
    });
}

function userMenu() {
	var btn = $('#userMenu').find('.btn_menu'),
		box = $('#userMenu').find('.menu_box');
		$('.btn_menu').on('click', function() {
		if (box.is(':visible')) {
			box.hide();
		} else {
			box.fadeIn(300);
		}
	});
}

$(document).ready(function() {
	scrX();
	userMenu();
});



/*
---------------------------------------------------------------
*
* main
*
---------------------------------------------------------------
*/

function mainSlider() {
	var swiper = new Swiper('.place_area .slide_box', {
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		slidesPerView: 2,
		slidesPerColumn: 2,
		slidesPerGroup: 4,
		spaceBetween: 40,
		speed: 600,
		autoplay: {
			delay: 5000,
		},
		// loop: true,
	});
}

function main() {
	$('#header').addClass('bg');
	mainSlider();

	setTimeout(function(){
		$('.visual_area').removeClass('off');
	}, 300);

	headerBg($(window).scrollTop());
	$(window).on('scroll', function(){
		headerBg($(window).scrollTop());
		// scrEffect(scrTop);
	});
}

function headerBg(scrTop) {
	var visualH = $('.visual_area').height(),
		headerH = $('#header').height();
	if (scrTop > visualH-headerH) {
		$('#header').removeClass('bg');
	} else {
		$('#header').addClass('bg');
	}
}

function scrEffect(scrTop){
	var wdwMid = $(window).height() / 2,
		eftStart = scrTop + wdwMid;
		object = $('section.off');
	object.each(function(){
		var objTop = $(this).offset().top;
		if (eftStart > objTop) {
			$(this).removeClass('off');
		}
	});
}

/*
---------------------------------------------------------------
*
* sub
*
---------------------------------------------------------------
*/


/* delete */
$(document).ready(function () {
	w3.includeHTML();
});