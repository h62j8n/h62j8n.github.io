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
// 댓글-더보기 버튼 (미완)
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
/* } #피드 */

var layerCnt = 0;
/* #레이어 팝업 { */
function btnPop(button) {
	var layer;
	var closeBtn = '<button type="button" class="btn_close"><em class="snd_only">창 닫기</em></button>';
	var spiner = '<p id="fstLoad"><i class="xi-spinner-5 xi-spin"></i></p>';
	$('.'+button).on('click', function(e) {
		layerCnt++;
		console.log(layerCnt);
		var url = $(this).attr('href');
		if (url == undefined) {
			var content = $(this).data('content');
			layer = $('.'+content).parent('.fstPop');
			layer.addClass('pop'+layerCnt);
			// <button>태그 (내부 컨텐츠)
			layer.bPopup({
				positionStyle: 'fixed',
				closeClass: 'btn_close',
				opacity: 0.6,
				onOpen: function() {
					$('#fstLoad').remove();
					$(this).append(closeBtn);
					layerCnt--;
				},
			}, function() {
				$('#fstLoad').remove();
			});
		} else {
			url += '.html';
			layer = '<div class="fstPop pop'+layerCnt+'"></div>';
			// <a>태그 (외부 컨텐츠 로드)
			e.preventDefault();
			$(layer).bPopup({
				positionStyle: 'fixed',
				closeClass: 'btn_close',
				opacity: 0.6,
				loadUrl: url,
				onOpen: function() {
					$(this).append(spiner);
				},
				onClose: function() {
					$(this).remove();
					layerCnt--;
				},
			}, function() {
				$('#fstLoad').remove();
			});
		}
	});
}
/* } #레이어 팝업 */

// #하트 CSS
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
// #팔로잉 CSS
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

$(document).ready(function() {	
	var topBtn = $('#btnTop');
	var userMenuBtn = $('#userMenu .btn_menu');
	var mylistBtn = $('#userMenu .btn_mylist');

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
	btnPop('btn_pop');

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

	// 하트 CSS
	btnLiked();
	// 팔로잉 CSS
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
function headerBg(scrTop) {
	var visualH = $('.visual_area').height(),
		headerH = $('#header').height();
	if (scrTop > visualH-headerH) {
		$('#header').removeClass('bg');
	} else {
		$('#header').addClass('bg');
	}
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
	});
}

/*
---------------------------------------------------------------
*
* sub
*
---------------------------------------------------------------
*/

/* 폼 { */
var form, input, inputT, inputR, inputC, inputF, select, textarea, label, submit;
var value, result, required;

var formTags = function(formTag) {
	form = $('.'+formTag);
	inputT = form.find('input[type=text], input[type=email], input[type=password]');
	inputR = form.find('input[type=radio]');
	inputC = form.find('input[type=checkbox]');
	inputF = form.find('input[type=file]');
	select = form.find('select');
	textarea = form.find('textarea');
	submit = form.find('.comm_btn.sbm[type=button]');
};

var labelSet = function(target, value) {
	label = target.siblings('.comm_label');
	if (value == '') {
		label.removeClass('size_s');
	} else {
		label.addClass('size_s');
	}
}
var selectCss = function(target, value) {
	var println = target.siblings('.comm_sel_label');
	println.text(value);
}
// 하나의 값만 받는 폼의 버튼 처리
var submitBtnActive1 = function(value) {
	if (value != '') {
		submit.attr('type', 'submit');
	} else {
		submit.attr('type', 'button');
	}
}
// 회원가입 폼 CSS
function joinFormCss() {
	formTags('comm_form');
	
	inputT.on('change', function() {
		value = $(this).val();
		labelSet($(this), value);
	});
	select.on('change', function() {
		value = $(this).val();
		labelSet($(this), value);
		selectCss($(this), value);
	});
}
// 그룹가입 폼 CSS + 유효성검사
function groupForm() {
	formTags('comm_form');
	
	inputT.on('change', function() {
		value = $(this).val();
		labelSet($(this), value);
	});
	inputT.on('focusout', function() {
		submitBtnActive1($(this), value);
	});
}
// 신고하기 폼 CSS + 유효성검사
function reportForm() {
	formTags('report_form');
	var textBtn = 'rpReasonMore';
	var textBox = $('.txt_box');
	var reason = $('.report_form [name=rpReason]');
	reason.on('change', function() {
		value = $(this).val();
		var id = $(this).attr('id');
		if (id != 'rpReason10') {
			textBox.slideUp(150);
			textarea.val('');
		}
		if (id == textBtn) {
			textBox.slideDown(150);
			textarea.focus();
		}
		submitBtnActive1(value);
	});
}
// 톱니바퀴 폼 CSS
function setFormCss() {
	formTags('set_form');
	select.on('change', function() {
		value = $(this).val();
		labelSet($(this), value);
		selectCss($(this), value);
	});
	addInputs();
}
function addInputs() {
	var field, tag,
		num = 1;
	$('#btnAddInput').on('click', function() {
		var container = $(this).siblings('ul');
		field = $(this).data('field');
		num++;
		tag = '<li><input type="text" id="'+field+num+'" name="'+field+num+'"></li>';
		if (num == 7) {
			$(this).hide();
		}
		if (num <= 7) {
			$(tag).appendTo(container);
		}
	});
}

// 댓글입력/채팅입력 CSS
function shortMessage() {
	formTags('message_form');
	textarea.on('keydown', function(e) {
		var scrHeight = textarea.prop('scrollHeight');
		// textarea.css('height', scrHeight);
		// console.log(scrHeight);
		// console.log(e.which);
		// if (e.which == )
	});
	// textarea.keypress(function(e) {
	// 	console.log(e.which);
	// });
};

// 채팅창 접속자 정보 CSS
function userInform() {
	var target = $('.pf_label');
	var text, textW;
	$('.pf_name').on('mouseover', function() {
		text = $(this).text();
		target.text(text).show();
		textW = target.outerWidth();
	});
	$('.pf_name').on('mousemove', function(e) {
		target.css({
			'top': e.pageY+5,
			'left': e.pageX-textW+5,
		});
	});
	$('.pf_name').on('mouseout', function() {
		target.hide().text();
	});
}

function feedMaker() {
	var file = document.getElementsByName(name);
	$(file).on('change', upload);
	
	function upload(e) {
		var files;
		var images = [],
			imagesLength = 0;

		files = e.target.files;

		var imgFile, vdoFile, fileSize;
		var megabyte5 = 5242880;
		for (var i=0; i<files.length; i++) {
			imgFile = files[i].type.match('image.*');
			vdoFile = files[i].type.match('video.*');
			fileSize = files[i].size;
			
			if (fileSize == megabyte5) {
				continue;
			} else {
				if ((imgFile || vdoFile) && (imagesLength < 5)) {
					imagesLength++;
					images.push(files[i]);
				}
			}
		}
	
		function imgTag(e) {
			var src = e.target.result;
			var container = $('.wr_thumb ul');
			var tag = '<li><img src="'+src+'" alt=""></li>';
			container.append(tag);
		}
		
		for (var i=0; i<images.length; i++) {
			console.log(images[i]);
			var fileReader = new FileReader();
			fileReader.onload = imgTag;
			fileReader.readAsDataURL(images[i]);
		}
	}
}

function validation() {
	var label, result;
	var value, required;
	var form = $('.comm_form'),
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
		result = $(this).siblings('.f_message');
		required = $(this).attr('required');

		if (value == '' && required == 'required') {
			result.text(msgs.errNull);
		}
	});
	
	// 아이디 이메일형식
	input.id.on('change', function() {
		var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		if (value != '') {
			if (!re.test(value)) {
				result.text(msgs.errId);
			} else {
				result.text('');
			}
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
}
/* } 폼 */



/* 캠핑장 정보 (메인, 상세) { */
function campDetail() {
	campSlider();
	numbering('info_list');
	starRating();
	kakaoMap();
}
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
// 시설안내 CSS
function numbering(target) {
	var list = $('.' + target),
		li = list.find('li:not(".fstEmpty")');
	for (var i=0; i<li.length; i++) {
		var l = li.eq(i);
		l.prepend('<span>' + (i+1) + '</span>');
	}
}
// 별점 CSS
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
/* } 캠핑장 정보 (메인, 상세) */

/* 이미지/동영상 업로드 */

/* API */

// 카카오 맵API
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
// 카카오 주소API
function kakaoAddr() {
	var searchWrap = document.getElementById('kkoAddr');
	var searchBtn = $('#btnKkoAddr'),
		text = $('.kko_addr1').attr('id'),
		next = $('.kko_addr2').attr('id'),
		closeBtn = $('.kko_close');

	$('#'+text).on('click', api);
	searchBtn.on('click', api);

	closeBtn.on('click', function() {
		searchWrap.style.display = 'none';
	});

	function api() {
		new daum.Postcode({
			oncomplete : function(data) {
				var addr = '';
				if (data.userSelectedType === 'R') { 
					addr = data.roadAddress;
				} else {
					addr = data.jibunAddress;
				}
				document.getElementById(text).value = addr;
				document.getElementById(next).focus();
				searchWrap.style.display = 'none';
			},
			onresize : function(size) {
				searchWrap.style.height = size.height + 'px';
			},
			width : '100%',
			height : '100%'
		}).embed(searchWrap);
		searchWrap.style.display = 'block';
	}
}