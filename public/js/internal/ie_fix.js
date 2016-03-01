(function ($) {
$(window).load(function() {
	if(navigator.userAgent.match(/Trident.*rv:11\./)) {
		$('#tab_toggle').addClass('fix_ie11');
	}
	if(navigator.userAgent.match(/Trident/)) {
		window.addEventListener('mousewheel', function (evt) {
			var wd = evt.wheelDelta;
			var csp = window.pageYOffset;
			this.scrollTo(0, csp - wd);
			evt.preventDefault();
		}, false);
	}
});
})(jQuery);