/* bPopup */
/*================================================================================
 * @name: bPopup - if you can't get it up, use bPopup
 * @author: (c)Bjoern Klinggaard (twitter@bklinggaard)
 * @demo: http://dinbror.dk/bpopup
 * @version: 0.11.0.min
 ================================================================================*/
 (function(c){c.fn.bPopup=function(A,E){function L(){a.contentContainer=c(a.contentContainer||b);switch(a.content){case "iframe":var d=c('<iframe class="b-iframe" '+a.iframeAttr+"></iframe>");d.appendTo(a.contentContainer);t=b.outerHeight(!0);u=b.outerWidth(!0);B();d.attr("src",a.loadUrl);l(a.loadCallback);break;case "image":B();c("<img />").load(function(){l(a.loadCallback);F(c(this))}).attr("src",a.loadUrl).hide().appendTo(a.contentContainer);break;default:B(),c('<div class="b-ajax-wrapper"></div>').load(a.loadUrl,a.loadData,function(d,b,e){l(a.loadCallback,b);F(c(this))}).hide().appendTo(a.contentContainer)}}function B(){a.modal&&c('<div class="b-modal '+e+'"></div>').css({backgroundColor:a.modalColor,position:"fixed",top:0,right:0,bottom:0,left:0,opacity:0,zIndex:a.zIndex+v}).appendTo(a.appendTo).fadeTo(a.speed,a.opacity);C();b.data("bPopup",a).data("id",e).css({left:"slideIn"==a.transition||"slideBack"==a.transition?"slideBack"==a.transition?f.scrollLeft()+w:-1*(x+u):m(!(!a.follow[0]&&n||g)),position:a.positionStyle||"absolute",top:"slideDown"==a.transition||"slideUp"==a.transition?"slideUp"==a.transition?f.scrollTop()+y:z+-1*t:p(!(!a.follow[1]&&q||g)),"z-index":a.zIndex+v+1}).each(function(){a.appending&&c(this).appendTo(a.appendTo)});G(!0)}function r(){a.modal&&c(".b-modal."+b.data("id")).fadeTo(a.speed,0,function(){c(this).remove()});a.scrollBar||c("html").css("overflow","auto");c(".b-modal."+e).unbind("click");f.unbind("keydown."+e);k.unbind("."+e).data("bPopup",0<k.data("bPopup")-1?k.data("bPopup")-1:null);b.undelegate(".bClose, ."+a.closeClass,"click."+e,r).data("bPopup",null);clearTimeout(H);G();return!1}function I(d){y=k.height();w=k.width();h=D();if(h.x||h.y)clearTimeout(J),J=setTimeout(function(){C();d=d||a.followSpeed;var e={};h.x&&(e.left=a.follow[0]?m(!0):"auto");h.y&&(e.top=a.follow[1]?p(!0):"auto");b.dequeue().each(function(){g?c(this).css({left:x,top:z}):c(this).animate(e,d,a.followEasing)})},50)}function F(d){var c=d.width(),e=d.height(),f={};a.contentContainer.css({height:e,width:c});e>=b.height()&&(f.height=b.height());c>=b.width()&&(f.width=b.width());t=b.outerHeight(!0);u=b.outerWidth(!0);C();a.contentContainer.css({height:"auto",width:"auto"});f.left=m(!(!a.follow[0]&&n||g));f.top=p(!(!a.follow[1]&&q||g));b.animate(f,250,function(){d.show();h=D()})}function M(){k.data("bPopup",v);b.delegate(".bClose, ."+a.closeClass,"click."+e,r);a.modalClose&&c(".b-modal."+e).css("cursor","pointer").bind("click",r);N||!a.follow[0]&&!a.follow[1]||k.bind("scroll."+e,function(){if(h.x||h.y){var d={};h.x&&(d.left=a.follow[0]?m(!g):"auto");h.y&&(d.top=a.follow[1]?p(!g):"auto");b.dequeue().animate(d,a.followSpeed,a.followEasing)}}).bind("resize."+e,function(){I()});a.escClose&&f.bind("keydown."+e,function(a){27==a.which&&r()})}function G(d){function c(e){b.css({display:"block",opacity:1}).animate(e,a.speed,a.easing,function(){K(d)})}switch(d?a.transition:a.transitionClose||a.transition){case "slideIn":c({left:d?m(!(!a.follow[0]&&n||g)):f.scrollLeft()-(u||b.outerWidth(!0))-200});break;case "slideBack":c({left:d?m(!(!a.follow[0]&&n||g)):f.scrollLeft()+w+200});break;case "slideDown":c({top:d?p(!(!a.follow[1]&&q||g)):f.scrollTop()-(t||b.outerHeight(!0))-200});break;case "slideUp":c({top:d?p(!(!a.follow[1]&&q||g)):f.scrollTop()+y+200});break;default:b.stop().fadeTo(a.speed,d?1:0,function(){K(d)})}}function K(d){d?(M(),l(E),a.autoClose&&(H=setTimeout(r,a.autoClose))):(b.hide(),l(a.onClose),a.loadUrl&&(a.contentContainer.empty(),b.css({height:"auto",width:"auto"})))}function m(a){return a?x+f.scrollLeft():x}function p(a){return a?z+f.scrollTop():z}function l(a,e){c.isFunction(a)&&a.call(b,e)}function C(){z=q?a.position[1]:Math.max(0,(y-b.outerHeight(!0))/2-a.amsl);x=n?a.position[0]:(w-b.outerWidth(!0))/2;h=D()}function D(){return{x:w>b.outerWidth(!0),y:y>b.outerHeight(!0)}}c.isFunction(A)&&(E=A,A=null);var a=c.extend({},c.fn.bPopup.defaults,A);a.scrollBar||c("html").css("overflow","hidden");var b=this,f=c(document),k=c(window),y=k.height(),w=k.width(),N=/OS 6(_\d)+/i.test(navigator.userAgent),v=0,e,h,q,n,g,z,x,t,u,J,H;b.close=function(){r()};b.reposition=function(a){I(a)};return b.each(function(){c(this).data("bPopup")||(l(a.onOpen),v=(k.data("bPopup")||0)+1,e="__b-popup"+v+"__",q="auto"!==a.position[1],n="auto"!==a.position[0],g="fixed"===a.positionStyle,t=b.outerHeight(!0),u=b.outerWidth(!0),a.loadUrl?L():B())})};c.fn.bPopup.defaults={amsl:50,appending:!0,appendTo:"body",autoClose:!1,closeClass:"b-close",content:"ajax",contentContainer:!1,easing:"swing",escClose:!0,follow:[!0,!0],followEasing:"swing",followSpeed:500,iframeAttr:'scrolling="no" frameborder="0"',loadCallback:!1,loadData:!1,loadUrl:!1,modal:!0,modalClose:!0,modalColor:"#000",onClose:!1,onOpen:!1,opacity:.7,position:["auto","auto"],positionStyle:"absolute",scrollBar:!0,speed:250,transition:"fadeIn",transitionClose:!1,zIndex:9997}})(jQuery);

 /* 뒤로가기 */
function historyBack() {
	$(".btn_back").on("click", function() {
		history.back();
	});
}

/* 약관/방침 보기 */
function termsView() {
	var button = $(".list_chks button");
	button.on("click", function() {
		var terms = $(this).siblings("textarea"),
			span = $(this).find("span");
		if (terms.is(":visible")) {
			terms.slideUp(300);
			span.text("보기");
		} else {
			terms.slideDown(300);
			span.text("닫기");
		}
	});
}

/* 유효성검사 */
function validation() {
	var id = $("#logId"),
		pwAll = $("input[type=password]");
		pw1 = $("#logPw1"),
		pw2 = $("#logPw2");
	
	function msgInit(tooltip) {
		tooltip.text("");
		tooltip.css("opacity", 0);
	}
	/* 공란 */
	$("input").on("focusout", function() {
		var tooltip = $(this).siblings(".msg");
		var value = $(this).val();
		if (value == "") {
			tooltip.text("필수 입력사항입니다.");
			tooltip.css("opacity", 1);
		}
	});
	/* 이메일 주소 */
	id.on("change", function() {
		var tooltip = $(this).siblings(".msg");
		var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
			value = $(this).val();
		if (value != "" && !re.test(value)) {
			tooltip.text("이메일주소 형식이 올바르지 않습니다.");
			tooltip.css("opacity", 1);
		} else {
			msgInit(tooltip);
		}
	});
}

/* 임시 (완료 후 삭제 예정) { */
function addCommMsg(msg) {
	var commMsg = $(".msg");
	$(".btn_temp").on("click", function() {
		commMsg.text(msg);
		commMsg.css("opacity", 1);
	});
}
function step2() {
	$(".step2").slideDown(300);
	$("#logId").addClass("block").prop("readonly", true);
}
function step3() {
	$(".step2").slideUp(300);
	$(".step3").slideDown(300);
}
/* } 임시 (완료 후 삭제 예정=) */

/* 레이어팝업 */
function popup() {
	$("#popup").bPopup({
		closeClass: "btn_off",
		modalClose: false,
		positionStyle: 'fixed'
	});
}

/* 메인 { */
function progress() {
	var bar = $(".progress b");
	bar.each(function() {
		var percent = $(this).parents("li").children("span").text() / 100;
		var width = $(this).parents("p").width();
		var total = percent * width;
		var times = 1000;
		$(this).stop().animate({left: total}, times);
	});
}
function count() {
	var count = $(".stats span");
	count.counterUp({
		delay: 30,
		time: 1000
	});
}
/* } 메인 */

$(document).ready(function() {
	/* 레이어팝업 */
	$(".btn_pop").on("click", function() {
		popup();
	});
	$(".btn_logout").on("click", function() {
		popLogout();
		popup();
	});
	historyBack();
});

/* datepicker */
function datepick() {
	$(".btn_date").datepicker({
		dateFormat: "yy-mm-dd"
	});
}

/* member */
function ref() {
	$(".mb_curriculum").each(function() {
		var tooltip = $(this).find("span"),
			text = $(this).text();
		tooltip.text(text);
		$(this).on("mouseenter", function() {
			tooltip.css("opacity", 1);
		});
		$(this).on("mouseleave", function() {
			tooltip.css("opacity", 0);
		});
	});
}

/* 로그아웃 팝업 */
function popLogout() {
	var questBox = $("#popup .alert"),
		quest = "로그아웃 하시겠습니까?";
	var btnBox = $("#popup .btns"),
		yes = '<button type="button" class="yes">확인</button>',
		no = '<button type="button" class="btn_off no">취소</button>';
	questBox.html(quest);
	btnBox.html(yes);
	btnBox.append(no);
}

/* 숫자포멧 */
function pad(n, width) {
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

/* 출결관리 팝업 */
function popAttend() {
	// 버튼 기능 체크
	var btnIn = $("#btnAttend").hasClass("in"),
		btnOut = $("#btnAttend").hasClass("out");
	var status;
	if (btnIn) {
		status = "입실";
	} else if (btnOut) {
		status = "퇴실";
	}
	// 현재 시간
	var day = new Date(),
		year = day.getFullYear(),
		month = pad(day.getMonth()+1, 2),
		date = pad(day.getDate(), 2),
		hours = pad(day.getHours(), 2),
		minutes = pad(day.getMinutes(), 2);
	var times = year+"년 "+month+"월 "+date+"일 "+hours+"시 "+minutes+"분";

	// 인풋 값
	var dateVal = year+"/"+month+"/"+date,
		statusVal = status;
	$("#atDate").val(dateVal);
	$("#atStatus").val(statusVal);

	// 팝업 세팅
	var questBox = $("#popup .alert"),
		btnBox = $("#popup .btns");
	var yes = '<button type="button" class="btn_off yes">확인</button>',
		no = '<button type="button" class="btn_off no">취소</button>';
	var quest = "["+times+"]<br>";
	// 입/퇴실 팝업창
	if (btnIn || btnOut) {
		quest += status+" 기록을 체크하시겠습니까?<br>※ 한 번 처리된 기록은 수정할 수 없습니다.";
		questBox.html(quest);
		btnBox.html(yes);
		btnBox.append(no);
	} else {
		quest += "지금은 출결관리 시간이 아닙니다.";
		questBox.html(quest);
		btnBox.html(yes);
	}

	$(".yes").on("click", function() {
		if (btnIn) {
			$("#btnAttend").removeClass("in").addClass("out");
			$("#atForm").submit();
		}
		if (btnOut) {
			$("#btnAttend").removeClass("out");
			$("#atForm").submit();
		}
	});
}