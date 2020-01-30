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

function next(url) {
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

	/* 약관/방침 동의 */
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
});