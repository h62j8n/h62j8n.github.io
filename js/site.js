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

function scrBar() {
	$('.scrBar').mCustomScrollbar();
}

function layerOff() {
	$(window).one('click', function(e) {
		var result = 0;
		var target = $(e.target),
		classes = target.parents();
		classes.push(target);
		for (var i=0; i<classes.length; i++) {
			var c = $(classes[i]);
			if (c.hasClass('fstLyr')) {
				result++;
			}
		}
		if (result < 1) {
			$('.fstLyr').removeClass('act');
		}
		userMenu();
	});
}

function userMenu() {
	var menu = $('#userMenu'),
		box = menu.find('.menu_box');
	box.on('focusin', function() {
		menu.addClass('act');
		box.fadeIn(300);
	});
	box.on('focusout', function() {
		menu.removeClass('act');
		box.hide();
	});
	if (menu.hasClass('act')) {
		box.focusin();
	} else {
		myListOff();
		box.focusout();
	}
}

function setMyList() {
	var list = $('.my_list');
	var listH,
		height = 45,
		margin = 15;
	list.each(function() {
		var li = $(this).find('li'),
			i = li.length;
		if (i < 3) {
			listH = (height * i) + (margin * --i);
			$(this).height(listH);
		} else {
			$(this).mCustomScrollbar();
		}
	});
}

function myList() {
	var btn = $('.btn_mylist'),
		list = $('.my_list');
	btn.each(function() {
		var clicked = $(this);
		if (clicked.hasClass('act')) {
			clicked.siblings(list).slideDown(300);
		} else {
			clicked.siblings(list).slideUp(300);
		}
	});
}
function myListOff() {
	var btn = $('.btn_mylist'),
		list = $('.my_list');
	btn.removeClass('act');
	list.hide();
}

function post() {
	postType();
	postThumbnail();
}

function postType() {
	var post = $('.post_wrap');
	post.each(function() {
		var postSize = $(this).find('.box').length;
		if (postSize == 3) {
			$(this).addClass('half');
		}
	});
}

function postThumbnail() {
	var swiper = new Swiper('.post_wrap .thumb.box', {
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		speed: 600,
		allowTouchMove: false,
	});
}

function commentOption() {
	var btnMore = $('.cmt_btn_option');
	var optionBox = '<ul class="cmt_options fstLyr"></ul>';
	var btnReport = '<li><button class="btn_report"><em class="snd_only">신고</em></button></li>',
		btnDelete = '<li><button class="btn_delete"><em class="snd_only">삭제</em></button></li>';
	btnMore.on('click', function() {
		var viewBox = $(this).parent();
		viewBox.append(optionBox);
		optionBox = viewBox.find('.cmt_options');
		// if (관계 없는 사용자) {
			optionBox.append(btnReport);
		// } else (해당 댓글 작성자) {
			optionBox.append(btnDelete);
		// } else () {
			// 해당 피드 작성자는 버튼 모두 출력
		// }
		optionBox.show();
	});
}

function innerPop() {
	$('.fstPop').bPopup({
		closeClass: 'btn_close',
		positionStyle: 'fixed'
	});
}
function outerPop(url) {
	$('.fstPop').bPopup({
		closeClass: 'btn_close',
		positionStyle: 'fixed',
		contentContainer: '.fstPop',
		loadUrl: url+'.html',
	});
}

$(document).ready(function() {	
	var userMenuBtn = $('#userMenu .btn_menu');
	var mylistBtn = $('#userMenu .btn_mylist'),
		mylist = $('#userMenu .my_list');
	var popupBtn = $('.btn_popup');
	var loginBtn = $('.btn_login');

	scrX();
	scrBar();
	postType();
	postThumbnail();
	commentOption();
	setMyList();
	
	popupBtn.on('click', innerPop);
	loginBtn.on('click', function() {
		outerPop('member/login');
	});
	userMenuBtn.on('click', function() {
		var menu = $('#userMenu');
		if (menu.hasClass('act')) {
			menu.removeClass('act');
		} else {
			menu.addClass('act');
			setTimeout(layerOff, 150);
		}
		userMenu();
	});
	mylistBtn.on('click', function() {
		var clicked = $(this);
		if (clicked.hasClass('act')) {
			mylistBtn.removeClass('act');
		} else {
			mylistBtn.not(clicked).removeClass('act');
			clicked.addClass('act');
		}
		myList();
	});
});



/*
---------------------------------------------------------------
*
* main
*
---------------------------------------------------------------
*/

function mainSlider() {
	var swiper = new Swiper('.camp_area .slide_box', {
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
		allowTouchMove: false,
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

function campSlider() {
	var swiper = new Swiper('.camp_slide > div', {
		navigation: {
			prevEl: '.swiper-prev',
			nextEl: '.swiper-next',
		},
		slidesPerView: 3,
		spaceBetween: 27,
		speed: 600,
		autoplay: {
			delay: 5000,
		},
		allowTouchMove: false,
	});
}

function numbering(target) {
	var list = $('.' + target),
		li = list.find('li:not(".fstEmpty")');
	for (var i=0; i<li.length; i++) {
		var l = li.eq(i);
		l.prepend('<span>' + (i+1) + '</span>');
	}
}

function starRating() {
	var target = $('.rt_rates');
	var star = $('input[name=rt_rate]');
	var margin = -20;
	star.on('change', function() {
		var length = 5 - $(this).val();
		var x = length * margin;
		target.css('background-position-x', x);
	});
}

function kakaoMap() {
	var body = $('body');
	var apiKey = '<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=5cfc35a8b294b4c43bcdc32bf0f84eaa"></script>';
	// body.prepend(apiKey);
}

/* delete */
$(document).ready(function () {
	w3.includeHTML();
});