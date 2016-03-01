(function ($) {
/************************************************************************
*************************************************************************
@Name :			QapTcha - jQuery Plugin
@Revison :		4.2
@Date : 		06/09/2012  - dd/mm/YYYY
@Author:	 	 ALPIXEL Agency - (www.myjqueryplugins.com - www.alpixel.fr)
@License :		 Open Source - MIT License : http://www.opensource.org/licenses/mit-license.php

**************************************************************************
*************************************************************************/
$.QapTcha = {
	build : function(options)
	{
		var defaults = {
			txtLock : 'Locked : form can\'t be submited',
			txtUnlock : 'Unlocked : form can be submited',
			disabledSubmit : true,
			autoRevert : true,
			PHPfile : 'php/Qaptcha.jquery.php',
			autoSubmit : false
		};

		if(this.length>0)
		return $(this).each(function(i) {
			/** Vars **/
			var
				opts = $.extend(defaults, options),
				$this = $(this),
				form = $('form').has($this),
				Clr = $('<div>',{'class':'clr'}),
				bgSlider = $('<div>',{'class':'bgSlider'}),
				Slider = $('<div>',{'class':'Slider'}),
				TxtStatus = $('<div>',{'class':' TxtStatus dropError',text:opts.txtLock}),
				inputQapTcha = $('<input>',{name:generatePass(32),value:generatePass(7),type:'hidden'});

			/** Disabled submit button **/
			if(opts.disabledSubmit) form.find('input[type=\'submit\']').attr('disabled','disabled');

			/** Construct DOM **/
			bgSlider.appendTo($this);
			Clr.insertAfter(bgSlider);
			TxtStatus.insertAfter(Clr);
			inputQapTcha.appendTo($this);
			Slider.appendTo(bgSlider);
			$this.show();

			Slider.draggable({
				revert: function(){
					if(opts.autoRevert)
					{
						if(parseInt(Slider.css("left")) > (bgSlider.width()-Slider.width()-10)) return false;
						else return true;
					}
				},
				containment: bgSlider,
				axis:'x',
				stop: function(event,ui){
					if(ui.position.left > (bgSlider.width()-Slider.width()-10))
					{
						// set the SESSION iQaptcha in PHP file
						$.post(opts.PHPfile,{
							action : 'qaptcha',
							qaptcha_key : inputQapTcha.attr('name')
						},
						function(data) {
							if(!data.error)
							{
								Slider.draggable('disable').css('cursor','default');
								inputQapTcha.val('');
								TxtStatus.text(opts.txtUnlock).addClass('dropSuccess').removeClass('dropError');
								form.find('input[type=\'submit\']').removeAttr('disabled');
								if(opts.autoSubmit) form.find('input[type=\'submit\']').trigger('click');

								if(form.attr('id') == "salesforce-form"){
									$('#salesforce-form .w2lsubmit input').css({"background-color":"#20a174","color":"#fff!important"});
								}else if(form.attr('id') == "salesforce-form-contact-page"){
									//$('#salesforce-form-contact-page .w2lsubmit input').css({"background-color":"#20a174!important","color":"#fff!important","border":"none!important"});
									$('#salesforce-form-contact-page .w2lsubmit input').addClass('change_submit_contact')
								}

							}
						},'json');
					}
				}
			});

			function generatePass(nb) {
				var chars = 'azertyupqsdfghjkmwxcvbn23456789AZERTYUPQSDFGHJKMWXCVBN_-#@';
				var pass = '';
				for(i=0;i<nb;i++){
					var wpos = Math.round(Math.random()*chars.length);
					pass += chars.substring(wpos,wpos+1);
				}
				return pass;
			}

		});
	}
}; $.fn.QapTcha = $.QapTcha.build;
})(jQuery);