/*function initExecutionUpdate(e) {
	initExecution++;
	console.log('exec', e&&e.type?e.type:'', initExecution);
}*/
(function ($) {
$(document).ready(function(){
	var intervalo_close;
	$('#tab_title_wrap').after('<div id="img_tab_slide_link"></div>');
	$('#img_tab_slide_link').after('<div id="preload_img1"></div>');

	$('.submit,button,.btn,.uji-pop-link,.searchsubmit,#feedcat-box,#searchsubmit').css({ transition: "all .2s ease-in-out"});
	$(".submit,button,.btn,.uji-pop-link,.searchsubmit,#feedcat-box,#searchsubmit").mouseenter(function() {
		$(this).css({transform: "scale(1.05)"});
	});
	$(".submit, button,.btn,.uji-pop-link,.searchsubmit,#feedcat-box,#searchsubmit").mouseleave(function(){
		$(this).css({transform: "scale(1.0)"});
	});
	$("#menu-mobile .menu").css({"display":"none"});

	$('.QapTcha').QapTcha({
		autoSubmit : false,
		autoRevert : true,
		PHPfile : urlQapTchaPHPfile
	});
	var video = document.getElementById('video_gapSite');
	//var intervalRewind;
	$('#play_video_gap, .fslandingslider').click(function(){
		$('#video_gapSite')[0].play();
		video.playbackRate = 1.0;
		//clearInterval(intervalRewind);
	});
	$('#stop_video').click(function(){
		$('#video_gapSite')[0].pause();
		video.currentTime = 0;
		//clearInterval(intervalRewind);
	});

	$('#pause_video_gap, .fslandingslider').click(function(){
		$('#video_gapSite')[0].pause();
		video.playbackRate = 1.0;
		//clearInterval(intervalRewind);
	});
	$('.landing-navigator').css({"display":"none"});
	$('div#ujipopup-4207 .btn-info , div#ujipopup-4207 .close-modal,#ujipopup-1368 .close-modal').click(function(){
		$('#ujipopup-4207').hide();
		$('#ujipopup-1368').hide();
		clearInterval(intervalo_close);
	});
	$(".Here .modal-container .uji-pop-link").click(function(){
		$("#popup").css("top", ( $(window).height()-$("#popup").height() ) / 2+$(window).scrollTop() + "px");
		$("html, body").animate({ scrollTop: 0 }, "slow");
	})

});

var basePxRWD = 18;
var doResizeFonts = function() {
	$('#opt-main-page-css').txtRWDScale({ basePX: basePxRWD,
	elementsRules:['body, section, ol, ul, tr, form, h2 p, li > div, .row, .fluid-row']});
};
$(document).ready(doResizeFonts);
$(window).bind('resize',doResizeFonts);

$('#custom_load').css({'height': $(window).height() + 'px'
						,'background-position': '50% 50%'});

$(document).ready(function() {
	$(document).delegate(".blockScroll", "scrollstart", false);
});
$(window).load(function() {
	if($('#custom_load')[0]) {
		$('.hide_web_projects').fadeOut();
		$('#custom_load').fadeOut();
	} else console.log('custom_load not set');

	$('html, body').removeClass('blockScroll');
});

// $(window).load(function() {
	/*var itvExecuteTriggerResize = setInterval(function(){
		console.log(initExecution);
		if(initExecution>4) {*/
			/*setTimeout(function() {
				// fix anything that needs resize
				$(window).trigger('resize');
			}, 1000*2);*/

			/*clearInterval(itvExecuteTriggerResize);
		}
	}, 1000*0.25);*/
// });

// remove subdomain of current site's url and setup regex
var internal = location.host.replace("www.", "");
internal = new RegExp(internal, "i");

var a = document.getElementsByTagName('a'); // then, grab every link on the page
for (var i = 0; i < a.length; i++) {
	var href = a[i].host; // set the host of each link
	if( !internal.test(href) ) { // make sure the href doesn't contain current site's host
		a[i].setAttribute('target', '_blank'); // if it doesn't, set attributes
	}
};
// salesforce with ajax
$(document).ready(function(){
	$("#salesforce-form").validate({
		rules:
		{
			Email: {
				required: true,
				email: true
			},
			FirstName: {
				required: true
			},
			Website: {
				required: true
			}
		},
		submitHandler: function()
		{
			$('.w2linput.submit').css("pointer-events", "none");
			$.post(urlFrmSalesforce, {
				action: 'submit_contact',
				FirstName: $("#salesforce-form #FirstName").val(),
				Email: $("#salesforce-form #Email").val(),
				Company: $("#salesforce-form #Company").val(),
				Website: $("#salesforce-form #Website").val(),
				Description: $("#salesforce-form #Description").val(),
				Web: $("#salesforce-form #sf_Web__c").is(':checked') ? 1 : 0,
				Mobile: $("#salesforce-form #sf_Mobile__c").is(':checked') ? 1 : 0,
				QA: $("#salesforce-form #sf_QA__c").is(':checked') ? 1 : 0,
				UI: $("#salesforce-form #sf_UI_UX__c").is(':checked') ? 1 : 0,
				Other:$("#salesforce-form #sf_Other__c").is(':checked') ? 1 : 0,
				Suscribe:$("#salesforce-form #sf_subscription__c").is(':checked') ? 1 : 0
			}, function(resp){
				$("#salesforce-form").trigger("reset");
				$("#thank-you-contact").fadeIn();
				$('.w2linput.submit').css("pointer-events", "all");
			});
		}
	});
	// End Form
	$("#salesforce-form-contact-page").validate({
		rules:
		{
			Email: {
				required: true,
				email: true
			}

		},
		submitHandler: function()
		{
			$('.w2linput.submit').css("pointer-events", "none");
			$.post(urlFrmSalesforce, {
				action: 'submit_contact',
				FirstName: $("#salesforce-form-contact-page #FirstName").val(),
				Email: $("#salesforce-form-contact-page #Email").val(),
				Company: $("#salesforce-form-contact-page #Company").val(),
				Website: $("#salesforce-form-contact-page #Website").val(),
				Web: $("#salesforce-form #Web__c").is(':checked') ? 1 : 0,
				Mobile: $("#salesforce-form #Mobile__c").is(':checked') ? 1 : 0,
				Description: $("#salesforce-form-contact-page #Description").val(),
				QA: $("#salesforce-form-contact-page #QA__c").is(':checked') ? 1 : 0,
				UI: $("#salesforce-form-contact-page #UI_UX__c").is(':checked') ? 1 : 0,
				Other:$("#salesforce-form-contact-page #sf_Other__c").is(':checked') ? 1 : 0,
				Suscribe: $("#salesforce-form-contact-page #sf_subscription__c").val()
			}, function(resp){
				$("#salesforce-form-contact-page").trigger("reset");
				$("#thank-you-contact-page").fadeIn();
				$('.w2linput.submit').css("pointer-events", "all");
			});
		}
	});
	// End Form
	$("#salesforce-form-career").validate({
		rules:
		{
			Email: {
				required: true,
				email: true
			},
			FirstName: {
				required: true
			},
			LastName: {
				required: true
			},
			Mayor: {
				required: true
			},
			Status: {
				required: true
			}

		},
		submitHandler: function()
		{
			$('.w2linput.submit').css("pointer-events", "none");
			$.post(urlFrmSalesforce, {
				action: 'submit_contact',
				Position: $("#salesforce-form-career #sf_position option:selected").text(),
				FirstName: $("#salesforce-form-career #FirstName").val(),
				LastName: $("#salesforce-form-career #sf_last_name").val(),
				Country: $( "#salesforce-form-career #sf_country option:selected" ).text(),
				Email: $("#salesforce-form-career #Email").val(),
				Phone: $("#salesforce-form-career #sf_phone").val(),
				Skype: $("#salesforce-form-career #sf_skype_ID").val(),
				English: $( "#salesforce-form-career #sf_english_level option:selected" ).text(),
				Experience: $("#salesforce-form-career #sf_experience").val(),
				Mayor: $("#salesforce-form-career #sf_mayor__c").val(),
				Status: $( "#salesforce-form-career #sf_status__c option:selected" ).text(),
				Mayor1: $("#salesforce-form-career #sf_mayor1__c").val(),
				Status1: $( "#salesforce-form-career #sf_status1__c option:selected" ).text(),
				Ruby: $("#salesforce-form-career #sf_Ruby__c").is(':checked') ? 1 : 0,
				level: $( "#salesforce-form-career #sf_level option:selected" ).text(),
				Java: $("#salesforce-form-career #sf_Java__c").is(':checked') ? 1 : 0,
				level2: $( "#salesforce-form-career #sf_level2 option:selected" ).text(),
				Net: $("#salesforce-form-career #sf_Net__c").is(':checked') ? 1 : 0,
				level3: $( "#salesforce-form-career #sf_level3 option:selected" ).text(),
				PHP: $("#salesforce-form-career #sf_PHP__c").is(':checked') ? 1 : 0,
				level4: $( "#salesforce-form-career #sf_level4 option:selected" ).text(),
				Python: $("#salesforce-form-career #sf_Python__c").is(':checked') ? 1 : 0,
				level5: $( "#salesforce-form-career #sf_level5 option:selected" ).text(),
				Javascript: $("#salesforce-form-career #sf_Javascript__c").is(':checked') ? 1 : 0,
				level6: $( "#salesforce-form-career #sf_level6 option:selected" ).text(),
				QA: $("#salesforce-form-career #sf_QA_automation__c").is(':checked') ? 1 : 0,
				level7: $( "#salesforce-form-career #sf_level7 option:selected" ).text(),
				QAW: $("#salesforce-form-career #sf_QA_Web__c").is(':checked') ? 1 : 0,
				level8: $( "#salesforce-form-career #sf_level8 option:selected" ).text(),
				QAM: $("#salesforce-form-career #sf_Mobile_QA__c").is(':checked') ? 1 : 0,
				level9: $( "#salesforce-form-career #sf_level9 option:selected" ).text(),
				iOS: $("#salesforce-form-career #sf_ios__c").is(':checked') ? 1 : 0,
				level10: $( "#salesforce-form-career #sf_level10 option:selected" ).text(),
				Android: $("#salesforce-form-career #sf_Android__c").is(':checked') ? 1 : 0,
				level11: $( "#salesforce-form-career #sf_level11 option:selected" ).text(),
				Other: $("#salesforce-form-career #sf_Other_skill__c").is(':checked') ? 1 : 0,
				OtherInput: $("#salesforce-form-career #sf_other2").val(),
				level12: $( "#salesforce-form-career #sf_level12 option:selected" ).text(),
				Other1: $("#salesforce-form-career #sf_Other_skill1__c").is(':checked') ? 1 : 0,
				OtherInput1: $("#salesforce-form-career #sf_other3").val(),
				level13: $( "#salesforce-form-career #sf_level13 option:selected" ).text(),
				Other2: $("#salesforce-form-career #sf_Other_skill2__c").is(':checked') ? 1 : 0,
				OtherInput1: $("#salesforce-form-career #sf_other4").val(),
				level14: $( "#salesforce-form-career #sf_level14 option:selected" ).text(),
				Other3: $("#salesforce-form-career #sf_Other_skill3__c").is(':checked') ? 1 : 0,
				OtherInput5: $("#salesforce-form-career #sf_other5").val(),
				level15: $( "#salesforce-form-career #sf_level15 option:selected" ).text(),
			}, function(resp){
				$("div#ujipopup-4207 .close-modal, div#ujipopup-4207 .btn-info ").click(function () {
					clearInterval(intervalo_close);
					$("#ujipopup-4207").hide();
					$("#ujipopup-4207").css("display","none");
				});
				$('.Here').click(function(){

					intervalo_close=setInterval(function () {
						$('#ujipopup-1368 .close-modal').on("click", function () {
							$('#ujipopup-1368').hide();
							clearInterval(intervalo_close);
						});
					},100);
				});
				$('.jquery-modal.blocker').addClass("modalz-index");
				$('.uji-pop-link').click();
				$("#salesforce-form-career").trigger("reset");
				$('div#ujipopup-1368').css("display","none");
				$('div#ujipopup-1368').hide();
				$('.w2linput.submit').css("pointer-events", "all");
			});
		}
	});
$('div#ujipopup-4207 .btn-info , div#ujipopup-4207 .close-modal').click(function(){
	$('div#ujipopup-1368').css("display","none");
	$('div#ujipopup-1368').hide();
	$('div#ujipopup-4207').css("display","none");
	$('.jquery-modal.blocker').remove();
	$('.Slider.ui-draggable').removeClass('ui-draggable-disabled');

});

	// End Form
	$("#sf_form_salesforce_w2l_lead_6").validate({
		rules:
		{
			Email: {
				required: true,
				email: true
			}

		},
		submitHandler: function()
		{
			$('.w2linput.submit').css("pointer-events", "none");
			$.post(urlFrmSalesforce, {
				action: 'submit_contact',
				Email: $("#sf_form_salesforce_w2l_lead_6 #sf_email").val(),
				FirstName: $("#sf_form_salesforce_w2l_lead_6 #sf_email").val(),
				Suscribe: 1
			}, function(resp){

			$('#sf_form_salesforce_w2l_lead_6').trigger("reset");
			$("#thank-you-subscribe").fadeIn();
			$('.w2linput.submit').css("pointer-events", "all");
			});
		}
	});
	// End Form
	$("#guidelines_form").validate({
		rules:
		{
			Email: {
				required: true,
				email: true
			}

		},
		submitHandler: function()
		{
			$('.w2linput.submit').css("pointer-events", "none");
			$.post(urlFrmSalesforce, {
				action: 'submit_contact',
				FirstName: $("#guidelines_form #FirstName").val(),
				Email: $("#guidelines_form #sf_email").val(),
				Position: $("#guidelines_form #sf_industry option:selected").text(),
				Suscribe: 1
			}, function(resp){
				$("form#guidelines_form input.w2linput.submit").attr("disabled", "disabled").delay(10000).attr("disabled", false); 
				$('#guidelines_form').trigger("reset");
				var url= $("#thank-you-guideline").attr('href');
				var link = document.createElement('a');
				link.setAttribute('download', null);
				link.style.display = 'none';
				document.body.appendChild(link);
				link.setAttribute('href',url);
				link.click();
				document.body.removeChild(link);
				$('#thank-you-guideline').fadeIn();
				$('.w2linput.submit').css("pointer-events", "all");
			});
		}
	});
	// End Form
	$( ".apply-modal .uji-pop-link" ).click(function() {

		$("#popup").css("top", ( $(window).height()-$("#popup").height() ) / 2+$(window).scrollTop() + "px");

		$("html, body").animate({ scrollTop: 0 }, "slow");

	});

});

//<!--MenuMobile-->
$(".arrowcollapse").toggle();
$(".arrow, .arrowcollapse").click(function(event) {
	event.preventDefault || event.stopPropagation();
	var target = $( event.target );
	var menu= target.closest('.menu-item-has-children').next('.menu');
	menu.toggle();
	return false;

});
$(".arrow").click(function(event) {
	event.preventDefault || event.stopPropagation();
	var target = $(event.target);
	target.hide();

	target.next('.arrowcollapse').show();
	return false;
});
$(".arrowcollapse").click(function(event) {
	event.preventDefault || event.stopPropagation();
	var target = $(event.target);
	target.hide();

	target.prev('.arrow').show();
	return false;
});
//<!--End MenuMobile-->

/*$(document).ready(initExecutionUpdate);
$(document).bind('ready', initExecutionUpdate);
$(window).load(initExecutionUpdate);*/
})(jQuery);

//initExecutionUpdate({'type':'end document'});