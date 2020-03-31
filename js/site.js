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
/* #썸네일슬라이드 { */
function commSlider() {
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
/* } #썸네일슬라이드 */
/* #피드 { */
function feedType(target) {
	var feed = $('.' + target);
	feed.each(function() {
		var feedSize = $(this).find('.box').length;
		if (feedSize == 3) {
			$(this).addClass('half');
		}
	});
	commSlider(290);
}
/* } #피드 */

var layerCnt = 0;
var popCloseBtn = '<button type="button" class="btn_close"><em class="snd_only">창 닫기</em></button>';
var popSpiner = '<p id="fstLoad"><i class="xi-spinner-5 xi-spin"></i></p>';
function refresh() {
	location.reload();
}
function none() {}
/* #레이어 팝업 { */
function btnPop(button) {
	$(document).on('click', '.'+button, function(e) {
		var url = $(this).attr('href');
		if (url == undefined) {
			// <button>태그 (내부 컨텐츠)
			var layer = $(this).data('layer');
			openPop(layer);
		} else {
			openLayer(e, url);
		}
	});
}
function openPop(layer, open, close, content) {
	var methods3 = arguments.length == 3;
	var methods4 = arguments.length == 4;
	layerCnt++;
	var layer = $('#'+layer);
	layer.addClass('pop'+layerCnt);
	layer.bPopup({
		positionStyle: 'fixed',
		closeClass: 'btn_close',
		opacity: 0.6,
		onOpen: function() {
			$('#fstLoad').remove();
			$(this).append(popCloseBtn);
			if (methods3) open();
		},
		onClose: function() {
			layer.removeClass('pop'+layerCnt);
			layerCnt--;
			if (methods3) close();
		},
	}, function() {
		popSquare();
		$('#fstLoad').remove();
		if (methods4) content();
	});
}
function openLayer(e, url, open, close, content) {
	var methods4 = arguments.length == 4;
	var methods5 = arguments.length == 5;
	e.preventDefault();
	layerCnt++;
	var url = url;
	// var url = url + '.html';
	var layer = '<div class="fstPop pop'+layerCnt+'"></div>';
	$(layer).bPopup({
		positionStyle: 'fixed',
		closeClass: 'btn_close',
		opacity: 0.6,
		loadUrl: url,
		onOpen: function() {
			$(this).append(popSpiner);
			if (methods4) open();
		},
		onClose: function() {
			$(this).remove();
			layerCnt--;
			if (methods4) close();
		},
	}, function() {
		popSquare();
		$('#fstLoad').remove();
		if (methods5) content();
	});
}
// 라디오버튼 클릭 시
function rdoPop() {
	var radio = $('.rdo_pop');
	var url = radio.data('url'); /* + '.html'*/
	radio.on('change', function(e) {
		openLayer(e, url, none, rdoProp)
	});
	function rdoProp() {
		var radio = $('.rdo_pop');
		radio.prop('checked', false);
	}
}
/* } #레이어 팝업 */

// #하트, 북마크 CSS
function btnToggle(target) {
	$(document).on('click', '.'+target, function() {
		var active = $(this).hasClass('act');
		if (active) {
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

// #로그인 CSS
function loginMove() {
	var section = $('.login_wrap section');
	$('.btn_move').on('click', function() {
		section.removeClass('act');
		var layer = $(this).data('layer');
		if (layer == undefined) {
			$('#log1').addClass('act');
		} else {
			$('#'+layer).addClass('act');
		}
	});
}

$(document).ready(function() {
	var topBtn = $('#btnTop');
	var userMenuBtn = $('#userMenu .btn_menu');
	var mylistBtn = $('#userMenu .btn_mylist');

	scrX();
	scrBar();
	setMyList();
	square();

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

	formTagCss();

	// 하트 CSS
	btnToggle('btn_liked');
	// 북마크 CSS
	btnToggle('btn_bookmark');
	// 팔로잉 CSS
	btnFollow();
});

function square() {
	var commSquare = {
		30: [
			$('.comment_list .pf_picture'),
		],
		45: [
			$('.my_list'),
		],
		55: [
			$('.feed_maker .pf_picture'),
			$('.feed_viewer .tit .pf_picture'),
			$('.rcmm_list .rc_thumb'),
		],
		80: [
			$('.rate_list .pf_picture'),
		],
		110: [
			$('#main .gp_thumb'),
		],
		120: [
			$('.profile_area .pf_picture'),
		],
	};
	squareArrTrim(commSquare);
}
function popSquare() {
	console.log('popSquare');
	var popSquare = {
		30: [
			$('.comment_list .pf_picture'),
		],
		50: [
			$('.follow_wrap .pf_picture'),
		],
		55: [
			$('.feed_maker .pf_picture'),
			$('.feed_viewer .tit .pf_picture'),
		],
		80: [
			$('.feed_maker .ft_thumb'),
		],
	};
	squareArrTrim(popSquare);
}
function squareTrim(img, size) {
	img.each(function() {
		var w = $(this).width(),
			h = $(this).height();
		if (w > h) {
			$(this).height(size);
		} else {
			$(this).width(size);
		}
	});
}
function squareArrTrim(arrays) {
	var size = Object.keys(arrays),
		square = Object.values(arrays);
	for (var i=0; i<square.length; i++) {
		var mySize = size[i];
		for (var j=0; j<square[i].length; j++) {
			var img = $(square[i][j]).find('img');
			squareTrim(img, mySize);
		}
	}
}
function rectangleArrTrim() {
	var rectangle = [
		[$('#main .camp_area'), 492, 223],
		[$('.camp_list'), 320, 180],
		[$('.thumb_slide'), 720, 380],
	];
	for (var i=0; i<rectangle.length; i++) {
		var img = $(rectangle[i][0]).find('img');
		img.each(function() {
			var w = rectangle[i][1],
				h = rectangle[i][2];
			var myW = $(this).width(),
				myH = $(this).height();
			var testH = (myH * w) / myW;
			// console.log(testH, testH < h);
			if (testH < h) {
				$(this).height(h);
			} else {
				$(this).width(w);
			}
		});
	}
}

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
	rectangleArrTrim();
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

	setTimeout(function(){
		$('.visual_area').removeClass('off');
	}, 300);

	headerBg($(window).scrollTop());
	$(window).on('scroll', function(){
		headerBg($(window).scrollTop());
	});
	
	mainSlider();
}

/*
---------------------------------------------------------------
*
* sub
*
---------------------------------------------------------------
*/

/* 폼 { */
// 공통 폼 CSS
function formTagCss() {
	var inputT = $('input[type=text], input[type=email], input[type=password]');
	var select = $('.comm_sel');
	
	var labelSet = function(target, value) {
		label = target.siblings('.comm_label');
		if (value == '') {
			label.removeClass('size_s');
		} else {
			label.addClass('size_s');
		}
	}
	var selectCss = function(target, value) {
		var name = target.attr('name');
		var label = target.siblings('.comm_sel_label');
		if (value == '') {
			value = $('select[name='+name+'] option:selected').text();
		}
		label.text(value);
	}

	// 작은라벨 CSS
	inputT.on('change', function() {
		value = $(this).val();
		labelSet($(this), value);
	});

	// 셀렉박스 CSS
	select.each(function() {
		value = $(this).val();
		labelSet($(this), value);
		selectCss($(this), value);
	});
	select.on('change', function() {
		value = $(this).val();
		labelSet($(this), value);
		selectCss($(this), value);
	});

	// 전체선택 기능
	inputAllChecked();
}
// 신고 폼 CSS
function reportForm() {
	var form = $('.comm_form'),
		inputR = form.find('input[type=radio]'),
		textarea = form.find('textarea');
	var target = textarea.parent('.txt_box');
	inputR.on('change', function() {
		var value = $(this).val();
		if (value == '기타') {
			target.slideDown(250);
			textarea.focus();
		} else {
			target.hide();
		}
	});
}
// 전체선택 기능
function inputAllChecked() {
	var form = $('.comm_form, .set_form'),
		inputChk = form.find('input[type=checkbox]'),
		inputAll = form.find('input[name=allChecked]');
	var chkSize = inputChk.length - 1,
		chkTrue = 0;
	inputChk.on('change', function() {
		var name = $(this).attr('name');
		var checked = $(this).prop('checked');
		if (name == 'allChecked') {
			if (checked) {
				inputChk.prop('checked', true);
			} else {
				inputChk.prop('checked', false);
			}
		} else {
			if (checked) {
				chkTrue++;
			} else {
				chkTrue--;
			}
			if (chkTrue == chkSize) {
				inputAll.prop('checked', true);
			} else {
				inputAll.prop('checked', false);
			}
		}
	});
}

// 필수값 유효성검사
function formRequired(form) {
	var form = $('.'+form);
	var submit = form.find('button[type=submit]');
	var required = [],
		all = [];
	all.push(
		form.find('input'),
		form.find('select'),
		form.find('textarea')
	);
	for (var i=0; i<all.length; i++) {
		for (var j=0; j<all[i].length; j++) {
			var target = all[i][j];
			if ($(target).prop('required')) {
				required.push(target);
			}
		}
	}
	for (var i=0; i<required.length; i++) {
		var target = required[i];
		var msgBox,
			msg = '필수 입력사항입니다.';
		$(target).on('change', function() {
			var value = $(this).val();
			msgBox = $(this).siblings('.f_message');
			if (value == '') {
				msgBox.text(msg);
			} else {
				msgBox.text();
			}
		});
	}
	// $(submit).on('click', function() {});
}



// 유저관리-캠핑장 시설안내 추가
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

// 파일 업로드 시 파일명 출력
function fileName() {
	var name;
	var inputF = $('.fl_name'),
		label = inputF.siblings('.txt_hf');
	var resetText = label.html();
	inputF.on('change', function(e) {
		var file = e.target.files;
		if (file.length == 0) {
			name = resetText;
			label.addClass('plc_holder');
		} else {
			name = file[0].name;
			label.removeClass('plc_holder');
		}
		label.html(name);
	});
}
function fileRemove() {
	var my = $(this),
		file = my.siblings('input[type=file]'),
		hidden = my.siblings('input[type=hidden]'),
		img = my.siblings('img'),
		box = my.parent('li'),
		container = my.parents('.file_thumbnail');
	box.attr('class', 'ft_btn');
	file.val('');
	hidden.remove();
	img.removeAttr('src').removeAttr('alt');
	fileBoxControll(container);
}
function profileRemove() {
	var container = $('.set_file1'),
		file = container.find('input[type=file]'),
		hidden = container.find('input[type=hidden]'),
		img = container.find('.pf_picture img');
	var noImg = '/festa/resources/images/thumb/no_profile.png';
	file.val('');
	hidden.remove();
	img.attr('src', noImg).removeAttr('alt');
}
function fileUpload() {
	var my = $(this),
		img = my.siblings('img'),
		box = my.parent('li'),
		container = my.parents('.file_thumbnail'),
		feed = container.length > 0;
	var noImg = '/festa/resources/images/thumb/no_profile.png';
	var f = this.files[0];
	var limit = 5242880,	// 5MB
		imgFile = f.type.match('image.*'),
		vdoFile = f.type.match('video.*');
	if ((f.size < limit) && imgFile || vdoFile) {
		if (feed) {
			fileThumbnail(f, img, 80);
			setTimeout(function() {squareTrim(img, 80)}, 150);
			box.attr('class', 'ft_thumb');
			fileBoxControll(container);
		} else {
			fileThumbnail(f, img, 140);
			setTimeout(function() {squareTrim(img, 140)}, 150);
		}
	} else {
		if (feed) {
			img.removeAttr('src').removeAttr('alt');
		} else {
			img.attr('src', noImg).removeAttr('alt');
		}
		this.value = '';
	}
}
function fileThumbnail(file, img, size) {
	var fileReader = new FileReader();
	fileReader.onload = function(e) {
		var src = e.target.result;
		img.attr('src', src).attr('alt', file.name);
	};
	fileReader.readAsDataURL(file);
}
function setFile() {
	var container, file, cancleBtn;
	var pop = $('.fstPop').is(':visible');
	if (pop) {
		container = $('.fstPop').find('.file_thumbnail');
		file = container.find('input[type=file]');
		cancleBtn = container.find('.btn_cancle');
	} else {
		container = $('#wrap').find('.file_thumbnail');
		file = container.find('input[type=file]');
		cancleBtn = container.find('.btn_cancle');
	}
	fileBoxControll(container);
	$(file).on('change', fileUpload);
	$(cancleBtn).on('click', fileRemove);
}
function setOneFile() {
	var container = $('.set_file1'),
		file = container.find('input[type=file]'),
		cancleBtn = container.find('.btn_cancle');
	var img = container.find('img');
	$(cancleBtn).on('click', profileRemove);
	$(file).on('change', fileUpload);
	squareTrim(img, 140);
}

function fileBoxControll(container) {
	var ul = container.find('ul'),
		thumbBoxes = container.find('.ft_thumb'),
		lastThumbBox = thumbBoxes.last(),
		btnBoxes = container.find('.ft_btn'),
		firstBtnBox = btnBoxes.first();
	var commLabel = container.siblings('.mk_bottom').find('.btn_file'),
		fileId = firstBtnBox.find('input[type=file]').attr('id');
	
	var feed = $('.maker_form').length > 0;
		if (feed) {
		if (thumbBoxes.length > 0) {
			container.show();
		} else {
			container.hide();
		}
		if (thumbBoxes.length == 5) {
			commLabel.removeAttr('for');
		}
	} else {
		if (thumbBoxes.length == 0) {
			firstBtnBox.show();
		}
	}
	commLabel.attr('for', fileId);
	lastThumbBox.appendTo(ul).after(btnBoxes);
}
/* } 폼 */
function oirginImgTrim(tag, max) {
	var rectangle = arguments[2];
	var tagName = $(tag).prop('tagName');
	var img;
	if (tagName == 'IMG') {
		img = $(tag);
	} else {
		img = $(tag).find('img');
	}
	img.each(function() {
		var imgW = $(this).width(),
			imgH = $(this).height();
		if (rectangle == undefined) {
			if (imgW > imgH) {
				$(this).height(max);
			} else {
				$(this).width(max);
			}
		} else {
			$(this).width(max);
		}
	});
}

// 댓글입력/채팅입력 CSS
function shortMessage() {};

/* 캠핑장 정보 (메인, 상세) { */
function campDetail() {
	campSlider();
	numbering('info_list');
	starRating();
	kakaoMap();
	commSlider();
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
	rectangleArrTrim();
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
	var star = target.find('input[type=radio]');
	var margin = -20;
	star.on('change', function() {
		var length = 5 - $(this).val();
		var x = length * margin;
		target.css('background-position-x', x);
	});
}
/* } 캠핑장 정보 (메인, 상세) */

/* 이미지/동영상 업로드 */

/* 채팅창 { */
// 접속자 정보 CSS
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
/* } 채팅창 */

/* 관리자 대시보드 { */
function dashboard() {
	var timeTag = $('.tt_time').find('span');
	var date = new Date(),
		current = date.getFullYear() + '년 ' + (date.getMonth() + 1) + '월 ' + date.getDate() + '일 '
		+ date.getHours() + '시 ' + date.getMinutes() + '분 ' + date.getSeconds() + '초 ';
	timeTag.text(current);
	chart();
}
function chart() {
	var colors = {
		green: 'rgba(7, 161, 131, 1)',
		greenBg: 'rgba(170, 255, 238, .5)',
		mint: 'rgba(30, 220, 184, 1)',
		pink: 'rgba(255, 128, 185, 1)',
		skyblue: 'rgba(34, 209, 246, 1)',
		mustard: 'rgba(246, 185, 37, 1)',
		coral: 'rgba(255, 146, 128, 1)',
		shadow: 'rgba(0, 0, 0, 0.2)',
	};

	var newChart = document.getElementById('newChart').getContext('2d');
	var newList = $('#newData li');
	var newLabels = [],
		newValue = [];
	for (var i=0; i<newList.length; i++) {
		var l = newList[i].getAttribute('data-label');
		var v = newList[i].innerText;
		newLabels.push(l);
		newValue.push(v);
	}
	var chart1 = new Chart(newChart, {
		type: 'line',
		data: {
			labels: newLabels,
			datasets: [{
				data: newValue,
				backgroundColor: [colors.greenBg],
				borderColor: [colors.green],
				borderWidth: 1,
				pointBackgroundColor: [
					colors.green,
					colors.green,
					colors.green,
					colors.green,
					colors.green,
					colors.green,
					colors.green,
				],
			}],
		},
		options: {
			elements: {
				line: {
					tension: 0,
				}
			},
			legend: {
				display: false,
			}
		},
	});

	var ageChart = document.getElementById('ageChart').getContext('2d');
	var ageDt = $('#ageData dt'),
		ageDd = $('#ageData dd');
	var ageLabels = [],
		ageValue = [];
	for (var i=0; i<ageDt.length; i++) {
		var l = ageDt[i].innerText;
		var v = ageDd[i].innerText;
		ageLabels.push(l);
		ageValue.push(v);
	}
	var chart2 = new Chart(ageChart, {
		type: 'doughnut',
		data: {
			labels: ageLabels,
			datasets: [{
				data: ageValue,
				backgroundColor: [
					colors.mint,
					colors.pink,
					colors.skyblue,
					colors.mustard,
					colors.coral,
				],
			}],
		},
		options: {
			legend: {
				display: false,
			}
		},
	});

	var locationChart = document.getElementById('locationChart').getContext('2d');
	var locationDt = $('#locationData dt'),
		locationDd = $('#locationData dd');
	var locationLabels = [],
		locationValue = [];
	for (var i=0; i<locationDt.length; i++) {
		var l = locationDt[i].innerText;
		var v = locationDd[i].innerText;
		locationLabels.push(l);
		locationValue.push(v);
	}
	var chart3 = new Chart(locationChart, {
		type: 'horizontalBar',
		data: {
			labels: locationLabels,
			datasets: [{
				data: locationValue,
				backgroundColor: [
					colors.mint,
					colors.pink,
					colors.pink,
					colors.pink,
					colors.pink,
				],
			}],
		},
		options: {
			scales: {
				xAxes: [{
					gridLines: {
						display: false,
					},
					ticks: {
						display: false,
					}
				}],
				yAxes: [{
					gridLines: {
						display: false,
					},
					ticks: {
						fontSize: 14,
						fontColor: '#222',
						fontFamily: 'noto-sans-scott-r',
					}
				}]
			},
			legend: {
				display: false,
			}
		},
	});
}
/* } 관리자 대시보드 */

/* API { */
// 카카오 맵API
function kakaoMap() {
	var address = $('#mapAddress').text();
	var imageSrc = '/festa/resources/images/ico/shp_marker.png',
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
/* } API */