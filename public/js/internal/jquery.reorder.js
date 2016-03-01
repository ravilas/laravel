(function ($) {
    function reverseItems(parentEl, breakpoint, windowW) {
        if(parentEl.length) {
            var doReverseItems = 0;
            if(!$(parentEl).hasClass('inverted') && windowW <= breakpoint) {
                $(parentEl).addClass('inverted');
                doReverseItems = 1;
            }
            else if($(parentEl).hasClass('inverted') && windowW > breakpoint){
                $(parentEl).removeClass('inverted');
                doReverseItems = 1;
            }
            if(!breakpoint) doReverseItems = 1;
            if(doReverseItems) {
                var listItems = parentEl.children();
                parentEl.append(listItems.get().reverse());
            }
        }
    }
    function setVerticalAlignChild() {
        if($(window).width() > 1024) {
            //desktop only
            $('.verticalAlignChild').each(function(){
                var parentHeight = $(this).parent().height();
                $(this).height(parentHeight);
            });
        }
    }

    function setVerticalAlignMarginMobileChild(el, breakpoint, isPortrait, windowW) {
        var cssA = {height:'', 'min-height':'', 'max-height':'', margin:''};
        $(el).css(cssA);
        var parent = $(el).parent(), encloseRow = true;
        if($(parent).hasClass('rowVA')) {
            parent = $(parent).parent();
            encloseRow = false;
        }
        $(parent).removeClass('verticalAlignChild');
        $(el).removeClass('columnTop');
        if(windowW < breakpoint && isPortrait) {
            //mobile
            if($(parent).height()>$(el).height()) {
                if(!$(el).data('iniHeight')) $(el).data('iniHeight', $(el).height());
                cssA['min-height'] = $(el).height();
                cssA['max-height'] = $(parent).height();
                cssA.height = $(parent).height()-$(el).height();
                cssA.margin = 0;
                $(parent).addClass('verticalAlignChild');
            }
        }
        if(cssA.height && encloseRow) {
            $(el).wrap( "<div></div>" );
            $(parent).children().each(function(){
                $(this).addClass('rowVA');
            });
        }
        $(el).css(cssA);
        $(el).addClass('columnTop');
    }   

    function reverseItemsCallOnce() {
        var windowWidthRWD = $(window).width();
        if($('.page-id-37')[0]) {
            reverseItems($('section[data-id="dont-live-in-costa-rica"] .hotspots-interaction'), windowWidthRWD);
        }
    }

    function reverseItemsCallResponsive() {
        if($('.page-id-32')[0]) {
            reverseItems($('section[data-id="work_ethic"] .row-fluid'), 1024);
        }
        else if($('.page-id-47')[0]) {
            reverseItems($('section[data-id="digital-content"] .row-fluid'), 1024);
        }
        else if($('.page-id-55')[0]) {
            reverseItems($('section[data-id="stress-performance"] .sectioncontainer .row-fluid'), 1024);
        }
        else if($('.page-id-17')[0]) {
            reverseItems($('section[data-id="our-history"] .our-history'), 1023);
            reverseItems($('section[data-id="nearshore"] .row-fluid'), 1023);
        }
        else if($('.page-id-37')[0]) {
            reverseItems($('section[data-id="our-essence"] .row-fluid'), 767);
        }
        else if($('.page-id-57')[0]) {
            reverseItems($('section[data-id="gap-web-development"] .row-fluid'), 767);
            reverseItems($('section[data-id="java-web-app"] .row-fluid'), 767);
        }
        else if($('.page-id-49')[0]) {
            reverseItems($('section[data-id="mobile-app-dev"] .row-fluid'), 767);
            reverseItems($('section[data-id="ios-app-dev"] .row-fluid'), 767);
        }
    }

    function verticalAlignMobileInit() {
        var windowWidthRWD = $(window).width(), isPortrait = windowWidthRWD<$(window).height();
        if($('.page-id-55')[0]) {
            setVerticalAlignMarginMobileChild($('section[data-id="functional-testing"] .span5 h2')[0], 768, isPortrait, windowWidthRWD);
            setVerticalAlignMarginMobileChild($('section[data-id="stress-performance"] .span5 h2')[0], 768, isPortrait, windowWidthRWD);
        }
        else if($('.page-id-47')[0]) {
            setVerticalAlignMarginMobileChild($('section[data-id="user-experience"] .span5 h2')[0], 768, isPortrait, windowWidthRWD);
            setVerticalAlignMarginMobileChild($('section[data-id="digital-content"] .span5 h2')[0], 768, isPortrait, windowWidthRWD);
        }
        else if($('.page-id-32')[0]) {
            setVerticalAlignMarginMobileChild($('section[data-id="work_ethic"] .span5 h2')[0], 768, isPortrait, windowWidthRWD);
            setVerticalAlignMarginMobileChild($('section[data-id="constant"] .span5 h2')[0], 768, isPortrait, windowWidthRWD);
        }
    }

    $(document).ready(reverseItemsCallOnce);
    $(window).bind('resize', reverseItemsCallResponsive);
    $(document).ready(reverseItemsCallResponsive);
    $(window).bind('load resize', setVerticalAlignChild);
    $(window).bind('load resize', verticalAlignMobileInit);
})(jQuery);