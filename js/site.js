/* bPopup */
/*================================================================================
 * @name: bPopup - if you can't get it up, use bPopup
 * @author: (c)Bjoern Klinggaard (twitter@bklinggaard)
 * @demo: http://dinbror.dk/bpopup
 * @version: 0.11.0.min
 ================================================================================*/
 (function(c){c.fn.bPopup=function(A,E){function L(){a.contentContainer=c(a.contentContainer||b);switch(a.content){case "iframe":var d=c('<iframe class="b-iframe" '+a.iframeAttr+"></iframe>");d.appendTo(a.contentContainer);t=b.outerHeight(!0);u=b.outerWidth(!0);B();d.attr("src",a.loadUrl);l(a.loadCallback);break;case "image":B();c("<img />").load(function(){l(a.loadCallback);F(c(this))}).attr("src",a.loadUrl).hide().appendTo(a.contentContainer);break;default:B(),c('<div class="b-ajax-wrapper"></div>').load(a.loadUrl,a.loadData,function(d,b,e){l(a.loadCallback,b);F(c(this))}).hide().appendTo(a.contentContainer)}}function B(){a.modal&&c('<div class="b-modal '+e+'"></div>').css({backgroundColor:a.modalColor,position:"fixed",top:0,right:0,bottom:0,left:0,opacity:0,zIndex:a.zIndex+v}).appendTo(a.appendTo).fadeTo(a.speed,a.opacity);C();b.data("bPopup",a).data("id",e).css({left:"slideIn"==a.transition||"slideBack"==a.transition?"slideBack"==a.transition?f.scrollLeft()+w:-1*(x+u):m(!(!a.follow[0]&&n||g)),position:a.positionStyle||"absolute",top:"slideDown"==a.transition||"slideUp"==a.transition?"slideUp"==a.transition?f.scrollTop()+y:z+-1*t:p(!(!a.follow[1]&&q||g)),"z-index":a.zIndex+v+1}).each(function(){a.appending&&c(this).appendTo(a.appendTo)});G(!0)}function r(){a.modal&&c(".b-modal."+b.data("id")).fadeTo(a.speed,0,function(){c(this).remove()});a.scrollBar||c("html").css("overflow","auto");c(".b-modal."+e).unbind("click");f.unbind("keydown."+e);k.unbind("."+e).data("bPopup",0<k.data("bPopup")-1?k.data("bPopup")-1:null);b.undelegate(".bClose, ."+a.closeClass,"click."+e,r).data("bPopup",null);clearTimeout(H);G();return!1}function I(d){y=k.height();w=k.width();h=D();if(h.x||h.y)clearTimeout(J),J=setTimeout(function(){C();d=d||a.followSpeed;var e={};h.x&&(e.left=a.follow[0]?m(!0):"auto");h.y&&(e.top=a.follow[1]?p(!0):"auto");b.dequeue().each(function(){g?c(this).css({left:x,top:z}):c(this).animate(e,d,a.followEasing)})},50)}function F(d){var c=d.width(),e=d.height(),f={};a.contentContainer.css({height:e,width:c});e>=b.height()&&(f.height=b.height());c>=b.width()&&(f.width=b.width());t=b.outerHeight(!0);u=b.outerWidth(!0);C();a.contentContainer.css({height:"auto",width:"auto"});f.left=m(!(!a.follow[0]&&n||g));f.top=p(!(!a.follow[1]&&q||g));b.animate(f,250,function(){d.show();h=D()})}function M(){k.data("bPopup",v);b.delegate(".bClose, ."+a.closeClass,"click."+e,r);a.modalClose&&c(".b-modal."+e).css("cursor","pointer").bind("click",r);N||!a.follow[0]&&!a.follow[1]||k.bind("scroll."+e,function(){if(h.x||h.y){var d={};h.x&&(d.left=a.follow[0]?m(!g):"auto");h.y&&(d.top=a.follow[1]?p(!g):"auto");b.dequeue().animate(d,a.followSpeed,a.followEasing)}}).bind("resize."+e,function(){I()});a.escClose&&f.bind("keydown."+e,function(a){27==a.which&&r()})}function G(d){function c(e){b.css({display:"block",opacity:1}).animate(e,a.speed,a.easing,function(){K(d)})}switch(d?a.transition:a.transitionClose||a.transition){case "slideIn":c({left:d?m(!(!a.follow[0]&&n||g)):f.scrollLeft()-(u||b.outerWidth(!0))-200});break;case "slideBack":c({left:d?m(!(!a.follow[0]&&n||g)):f.scrollLeft()+w+200});break;case "slideDown":c({top:d?p(!(!a.follow[1]&&q||g)):f.scrollTop()-(t||b.outerHeight(!0))-200});break;case "slideUp":c({top:d?p(!(!a.follow[1]&&q||g)):f.scrollTop()+y+200});break;default:b.stop().fadeTo(a.speed,d?1:0,function(){K(d)})}}function K(d){d?(M(),l(E),a.autoClose&&(H=setTimeout(r,a.autoClose))):(b.hide(),l(a.onClose),a.loadUrl&&(a.contentContainer.empty(),b.css({height:"auto",width:"auto"})))}function m(a){return a?x+f.scrollLeft():x}function p(a){return a?z+f.scrollTop():z}function l(a,e){c.isFunction(a)&&a.call(b,e)}function C(){z=q?a.position[1]:Math.max(0,(y-b.outerHeight(!0))/2-a.amsl);x=n?a.position[0]:(w-b.outerWidth(!0))/2;h=D()}function D(){return{x:w>b.outerWidth(!0),y:y>b.outerHeight(!0)}}c.isFunction(A)&&(E=A,A=null);var a=c.extend({},c.fn.bPopup.defaults,A);a.scrollBar||c("html").css("overflow","hidden");var b=this,f=c(document),k=c(window),y=k.height(),w=k.width(),N=/OS 6(_\d)+/i.test(navigator.userAgent),v=0,e,h,q,n,g,z,x,t,u,J,H;b.close=function(){r()};b.reposition=function(a){I(a)};return b.each(function(){c(this).data("bPopup")||(l(a.onOpen),v=(k.data("bPopup")||0)+1,e="__b-popup"+v+"__",q="auto"!==a.position[1],n="auto"!==a.position[0],g="fixed"===a.positionStyle,t=b.outerHeight(!0),u=b.outerWidth(!0),a.loadUrl?L():B())})};c.fn.bPopup.defaults={amsl:50,appending:!0,appendTo:"body",autoClose:!1,closeClass:"b-close",content:"ajax",contentContainer:!1,easing:"swing",escClose:!0,follow:[!0,!0],followEasing:"swing",followSpeed:500,iframeAttr:'scrolling="no" frameborder="0"',loadCallback:!1,loadData:!1,loadUrl:!1,modal:!0,modalClose:!0,modalColor:"#000",onClose:!1,onOpen:!1,opacity:.7,position:["auto","auto"],positionStyle:"absolute",scrollBar:!0,speed:250,transition:"fadeIn",transitionClose:!1,zIndex:9997}})(jQuery);

function mainSlider() {
  var swiper = new Swiper('.swiper-container', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 5000,
    },
    loop: true,
  });
}

function mainGnb() {
	var gnb = $("#gnb > li");
	gnb.on("mouseenter", function() {
		var list = $(this).find("ul");
		list.stop(true, true).slideDown(250);
	});
	gnb.on("mouseleave", function() {
		var list = $(this).find("ul");
		list.stop(true, true).slideUp(250);
	});
}

function historyBack() {
	$("#btnHistoryBack").on("click", function() {
		history.back();
	});
}

function nextStep(url) {
	var checkbox = $("input[type=checkbox]:not('#logTermsAll')"),
		check1 = $("#logTerms1"),
		check2 = $("#logTerms2"),
		checkAll = $("#logTermsAll");
	if (check1.is(":checked") && check2.is(":checked")) {
		location.href = url;
	} else {
		$(".msg_err").text("이용약관, 개인정보처리방침에 모두 동의해주세요.");
		$(".msg_err").css("opacity", 1);
	}
}

/* 약관/방침 동의 */
function termsAgree() {
	var checkbox = $("input[type=checkbox]:not('#logTermsAll')"),
		check1 = $("#logTerms1"),
		check2 = $("#logTerms2"),
		checkAll = $("#logTermsAll");
	checkbox.on("change", function() {
		if (check1.is(":checked") && check2.is(":checked")) {
			checkAll.prop("checked", true);
		} else {
			checkAll.prop("checked", false);
		}
	});
	checkAll.on("change", function() {
		if ($(this).is(":checked")) {
			checkbox.prop("checked", true);
		} else {
			checkbox.prop("checked", false);
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
		var tooltip = $(this).siblings(".msg_err");
		var value = $(this).val();
		if (value == "") {
			tooltip.text("필수 입력사항입니다.");
			tooltip.css("opacity", 1);
		}
	});
	/* 이메일 주소 */
	id.on("change", function() {
		var tooltip = $(this).siblings(".msg_err");
		var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
			value = $(this).val();
		if (value != "" && !re.test(value)) {
			tooltip.text("이메일주소 형식이 올바르지 않습니다.");
			tooltip.css("opacity", 1);
		} else {
			msgInit(tooltip);
		}
	});
	/* 비밀번호 일치 */
	pwAll.on("change", function() {
		var tooltip = $(this).siblings(".msg_err");
		var value1 = pw1.val(),
			value2 = pw2.val(),
			re = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
		if ($(this).attr("id") == "logPw1" && value1 != "" && !re.test(value1)) {
			tooltip.text("8자 이상 20자 이하의 영문 및 숫자를 사용하세요.");
			tooltip.css("opacity", 1);
		} else {
			msgInit(tooltip);
			tooltip.css("opacity", 0);
		}
		if (value1 != value2) {
			tooltip.text("비밀번호가 일치하지 않습니다.");
			tooltip.css("opacity", 1);
		} else {
			msgInit(tooltip);
			tooltip.css("opacity", 0);
		}
	});
}

function addCommMsg(msg) {
	var commMsg = $(".msg_err");
	$(".btn_temp").on("click", function() {
		commMsg.text(msg);
		commMsg.css("opacity", 1);
	});
}

/*function placeholder() {
	var target = $("input"),
		label;
	target.each(function() {
		target.on("focusin", function() {
			label = $(this).siblings("label");
			label.addClass("out");
		});
		target.on("focusout", function() {
			label = $(this).siblings("label");
			if ($(this).val() == "") {
				label.removeClass("out");
			}
		});
	});
}*/

$(document).ready(function() {
	mainGnb();
	historyBack();


});