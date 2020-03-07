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

/* #나의 메뉴 (상단 더보기) { */
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
/* } #나의 메뉴 (상단 더보기) */

/* #피드 { */
function feedType(target) {
	var feed = $('.' + target);
	feed.each(function() {
		var feedSize = $(this).find('.box').length;
		if (feedSize == 3) {
			$(this).addClass('half');
		}
	});
}
function thumbnail() {
	var swiper = new Swiper('.thumb_slide', {
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		speed: 600,
		preventClicks: false,
		allowTouchMove: false,
	});
}
// 댓글 더보기 (미완)
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
/* #피드 { */

/* #레이어 팝업 { */
function addBtnClose() {
	var btnClose = '<button type="button" class="btn_close"><em class="snd_only">창 닫기</em></button>';
	$('.fstPop').prepend(btnClose);
}
function popUp() {
	var url = arguments[0];
	if (arguments.length == 0) {
		// <button>태그 (내부 컨텐츠)
		$('.fstPop').bPopup({
			positionStyle: 'fixed',
			closeClass: 'btn_close',
			onOpen: addBtnClose,
		});
	} else {
		// <a>태그 (외부 컨텐츠 로드)
		$('.fstPop').bPopup({
			positionStyle: 'fixed',
			closeClass: 'btn_close',
			contentContainer: '.fstPop',
			loadUrl: url,
		});
	}
}
/* } #레이어 팝업 */

// #하트
function btnLiked() {
	$('.btn_liked').on('click', function() {
		var liked = $(this).hasClass('act');
		if (liked) {
			$(this).removeClass('act');
		} else {
			$(this).addClass('act');
		}
	});
}
// #팔로잉
function btnFollow() {
	$('.btn_follow').on('click', function() {
		var following = $(this).hasClass('act');
		if (following) {
			$(this).removeClass('act').text('팔로우');
		} else {
			$(this).addClass('act').text('팔로잉');
		}
	});
}

// 신고하기-텍스트 입력
function writeReason() {
	var radio = $('input[name=rpReason]'),
		textBox = $('.txt_box'),
		target = $('#rpReason10');
		radio.on('change', function() {
		var checked = $(this).val();
		if (checked == '기타') {
			textBox.slideDown(150);
			target.focus();
		} else {
			textBox.hide();
			target.focusout();
		}
	});
}

$(document).ready(function() {	
	var topBtn = $('#btnTop');
	var userMenuBtn = $('#userMenu .btn_menu');
	var mylistBtn = $('#userMenu .btn_mylist');
	var popupBtn = $('.btn_pop');

	scrX();
	scrBar();
	thumbnail();
	commentOption();
	setMyList();

	// 맨 위로
	topBtn.on('click', function() {
		$('html, body').animate({scrollTop: '0'}, 500);
	});

	// 레이어팝업 (공통)
	popupBtn.on('click', function(e) {
		var url = $(this).attr('href');
		if (url == undefined) {
			// <button>태그 (내부 컨텐츠)
			popUp();
		} else {
			url += '.html';
			// <a>태그 (외부 컨텐츠 로드)
			e.preventDefault();
			popUp(url);
		}
	});

	// 나의 메뉴 (상단 더보기)
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

	// 나의 메뉴 (상단 더보기) - 목록
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

	// 하트
	btnLiked();
	// 팔로잉
	btnFollow();
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
		preventClicks: false,
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

/* 회원가입 */
function validation(form) {
	var result, label, value;
	var form = $('.'+form),
		input = {
			all: form.find('input').not(':input[type=radio]'),
			id: form.find('#userId'),
			name: form.find('#userName'),
			pw1: form.find('#userPw1'),
			pw2: form.find('#userPw2'),
			btd: form.find('#userBtd'),
			loc: form.find('#userLoc'),
			job: form.find('#userJob'),
			jnd: form.find('#userJndr')
		},
		select = {
			all: form.find('select'),
		},
		radio = form.find('input[type=radio]'),
		check = {};
	var msgs = {
		errNull: '필수 입력사항입니다.',
		errId: '올바른 형식의 아이디가 아닙니다.',
		errPw1: '8~13자 이내, 영문(대소문자), 숫자를 사용하세요.',
		errPw2: '비밀번호가 일치하지 않습니다.',
		errBtd: '생년월일을 올바르게 입력해주세요.',
	};

	// 필수입력
	input.all.on('change', function() {
		value = $(this).val();
		result = $(this).siblings('.f_message');
		label = $(this).siblings('label');
		if (value == '') {
			label.removeClass('size_s');
			result.text(msgs.errNull);
		} else {
			label.addClass('size_s');
		}
	});
	
	// 아이디 이메일형식
	input.id.on('change', function() {
		var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		if (value != '' && !re.test(value)) {
			result.text(msgs.errId);
		} else {
			result.text('');
		}
	});

	// 비밀번호 일치
	function password(pwThis, pwPair) {
		var pwThis = pwThis.val(),
			pwPair = pwPair.val();
		var result = input.pw2.siblings('.f_message');
		if (pwThis != '') {
			if (pwThis != pwPair) {
				result.text(msgs.errPw2);
			} else {
				result.text('');
			}
		}
	}
	input.pw1.on('change', function() {
		password(input.pw1, input.pw2);
	});
	input.pw2.on('change', function() {
		password(input.pw2, input.pw1);
	});

	// 셀렉트박스 효과
	function selectValue(select) {
		var text = select.find('option:checked').text();
		var label = select.siblings('.sel_label');
		label.text(text);
	}
	select.all.each(function() {
		selectValue($(this));
	});
	select.all.on('change', function() {
		selectValue($(this));
	});
}

/* 캠핑장 정보 (메인, 상세) { */
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
		preventClicks: false,
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
	var star = $('input[name=rtRate]');
	var margin = -20;
	star.on('change', function() {
		var length = 5 - $(this).val();
		var x = length * margin;
		target.css('background-position-x', x);
	});
}

function kakaoMap() {
	var address = $('#mapAddress').text();
    var imageSrc = '../images/ico/shp_marker.png',
        imageSize = new daum.maps.Size(27, 39),	// 39, 51
        imageOption = {offset: new daum.maps.Point(12, 40)};
    var kakaoMap = document.getElementById('map'),
        mapOption = {
            center: new daum.maps.LatLng(37.499460, 127.029250),
            level: 3,
            mapTypeId : daum.maps.MapTypeId.ROADMAP
        };
    var map = new daum.maps.Map(kakaoMap, mapOption);
    var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption);
    var mapTypeControl = new daum.maps.MapTypeControl();
    map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);    
    var zoomControl = new daum.maps.ZoomControl();
    map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);
    var geocoder = new daum.maps.services.Geocoder();
    geocoder.addressSearch(address, function(result, status) {
        if (status === daum.maps.services.Status.OK) {
            var coords = new daum.maps.LatLng(result[0].y, result[0].x);
            var marker = new daum.maps.Marker({
                map: map,
                position: coords,
                image: markerImage
            });
            map.setCenter(coords);
        }
    });
}

function campDetail() {
	campSlider();
	numbering('info_list');
	starRating();
	kakaoMap();
}
/* } 캠핑장 정보 (메인, 상세) */

/* 이미지/동영상 업로드 */
