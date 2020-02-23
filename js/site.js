/*
---------------------------------------------------------------
*
* common
*
---------------------------------------------------------------
*/

function scrX(){
	$(window).on('scroll', function(){
		var supportPageOffset = (window.pageXOffset !== undefined),
			Xaxis = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
		var scrX = $('.scrX');
		scrX.css({left: -Xaxis});
    });
}

$(document).ready(function() {
	scrX();
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
	mainSlider();

	setTimeout(function(){
		$('.visual_area').removeClass('off');
	}, 300);

	$(window).on('scroll', function(){
		var scrTop = $(window).scrollTop();

		headerBg(scrTop);
		scrEffect(scrTop);
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