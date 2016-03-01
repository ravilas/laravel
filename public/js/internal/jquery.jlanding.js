/**
 * Author : Jegbagus
 * file name : jquery.jlanding.js
 */

/*** background parallax ***/

var functionsLoadQueue = [];
function addFunctionsToLoadQueue(f) {
    functionsLoadQueue.push(f);
}
function executeLoadQueue () {
    for(var i = 0, t = functionsLoadQueue.length; i < t; i++) {
        functionsLoadQueue[i]();
    }
}

/** heading parallax **/
(function ($) {
    "use strict";

    /** heading parallax **/
    $.fn.headingparallax = function () {
        var element = $(this);
        var toplimit = 0;
        var bottomlimit = 0;
        var topoffset = 0;
        var eleheight = 0;
        var scrollpos = 0;
        var turnzero = 0;
        var hh = $.jreducedtop();
        if ($(".bottomnav").length) {
            hh = 0;
        }

        var eleslideholder = $(element).find('.bgholder');
        var eletextholder = $(element).find('.parallaxtext');

        var resize_container = function () {
            topoffset = $(element).offset().top;
            eleheight = $(element).height();

            toplimit = topoffset + hh;
            bottomlimit = topoffset + eleheight - hh;
        };

        function scrolleffect() {
            if (scrollpos > toplimit && scrollpos < bottomlimit) {
                var ratio = 0;
                ratio = (scrollpos - topoffset - hh) / eleheight;

                // opacity
                $(eletextholder).css({ 'opacity': (1 - (ratio * 0.75)) });

                // centering
                var centering = (ratio * eleheight / 2);
                jpobj.doTranslate(eleslideholder, "0px", centering + "px");
                jpobj.doTranslate(eletextholder, "0px", centering + "px");
                turnzero = 1;
            } else {
                jpobj.doTranslate(eleslideholder, "0px", "0px");
                jpobj.doTranslate(eletextholder, "0px", "0px");
                $(eletextholder).css({ 'opacity': 1 });
                turnzero = 0;
            }
        }

        function scrollcallback() {
            scrollpos = jpobj.globaltop;
            scrolleffect();
        }

        function youtubefullscreen() {
            if(!joption.ismobile) {
                var youtubeurl = $(element).find('.youtubefullscreen').data('url');
                var youtubeid = $.youtube_parser(youtubeurl);
                var usestatic = $(element).find('.youtubefullscreen').data('static') === 1 ? true : false;
                $(element).find('.youtubefullscreen').tubular({
                    videoId: youtubeid,
                    attachtobody: usestatic
                });
                window.onPlayerReady = function(e) {
                    $('.video-fallback').show();
                    $('.youtubefullscreen').hide();
                    e.target.stopVideo();
                }

                $(".fslandingslider").bind('click', function () {
                    var videotype = $(this).parents('section').data('slider-type');
                    if(videotype === 'youtube') {
                        if(!$(this).hasClass('tubular-play')) {
                            $('.video-fallback').hide();
                            $('.text-slider').hide();
                            $('.youtubefullscreen').show();
                            $(this).addClass('tubular-play').removeClass('tubular-stop');
                            window.player.playVideo();
                        }
                        else {
                            $('.video-fallback').show();
                            $('.text-slider').show();
                            $('.youtubefullscreen').hide();
                            $(this).addClass('tubular-stop').removeClass('tubular-play');
                            window.player.stopVideo();
                        }
                    }
                });
            } else {
                $(element).find('.fslandingslider').wrap( "<a href='"+$(element).find('.youtubefullscreen').data('url')+"' target='_blank'></a>" );
                $(element).find('.video-fallback').show();
                $(element).find('.youtubefullscreen').hide();
                $(element).find('.video_toggle').hide();
            }
        }

        $(window).bind('load resize', resize_container);

        // check type
        var slidertype = $(element).data('slider-type');
        if(slidertype === 'youtube')  youtubefullscreen();

        if (!joption.ismobile && (jpobj.browser[0].toLowerCase() === 'chrome' || jpobj.browser[0].toLowerCase() === 'firefox')) {
            $(window).bind('jscroll', scrollcallback);
        }
    };

    /** full screen text slider ***/
    $.fn.fslandingslider = function () {
        $(this).each(function () {
            var ele = this;
            var ulwrapper = $("ul", this);
            var curidx = 0;
            var totalchild = $(".text-slider-wrap ul li", this).length;
            var slidespeed = $(ulwrapper).data('speed');
            var topposition = 0;

            // move the slider
            var moveslider = function (i) {
                var wrapheight = $(".text-slider-wrap", ele).height();
                $(ulwrapper).animate({
                    top: ( wrapheight * ( i % totalchild ) * -1)
                }, 400);
            };

            setInterval(function () {
                moveslider(++curidx);
            }, slidespeed);

            var videoUrlMob = $( ".fslandingslider" ).data( "video-url" );
            if(videoUrlMob) {
                $( ".fslandingslider" ).click(function(){
                    window.open(videoUrlMob, '_blank');
                });
            }
            // click event
            $(".callout", ele).bind('click', function () {
                var nextele;

                $(ele).parent().nextAll().each(function(){
                    if($(this).prop("tagName") === 'SECTION') {
                        nextele = this;
                        return false;
                    }
                });

                if ($(window).width() > 1024) {topposition = $(nextele).offset().top + $.jreducedtoplanding() + 1}
                else if ($(window).width() == 1024) {topposition = $(nextele).offset().top - 99;}
                else {topposition = $(nextele).offset().top - 73;}

                $('html, body').animate({
                    scrollTop: topposition
                }, 700, "easeInOutQuad");
                return false;
            });
            return this;
        });
    };

    $.landingslitslider = function (element) {
        $(".sliderloader").fadeIn();
        var Page = (function () {
            var $navArrows = $('#nav-arrows'),
                $nav = $('#nav-dots > span'),
                slitslider = $('#slider').slitslider({
                    onBeforeChange: function (slide, pos) {
                        $nav.removeClass('nav-dot-current');
                        $nav.eq(pos).addClass('nav-dot-current');
                    }
                }),
                init = function () {
                    initEvents();
                },
                initEvents = function () {
                    // add navigation events
                    $navArrows.children(':last').on('click', function () {
                        slitslider.next();
                        return false;
                    });

                    $navArrows.children(':first').on('click', function () {
                        slitslider.previous();
                        return false;
                    });

                    $nav.each(function (i) {
                        $(this).on('click', function (event) {
                            var $dot = $(this);
                            if (!slitslider.isActive()) {
                                $nav.removeClass('nav-dot-current');
                                $dot.addClass('nav-dot-current');
                            }
                            slitslider.jump(i + 1);
                            return false;
                        });
                    });
                };
            return { init: init };
        })();

        var done_loading = function () {
            $(".sl-slider-wrapper").fadeIn();
            $(".sliderloader").fadeOut();
            Page.init();
        };

        var load_background = function (i) {
            if ($('.sl-slide').length > i) {
                var bg = $($('.sl-slide').get(i)).find('.bg-img ').css('background-image');
                bg = bg.replace('url(', '').replace(')', '');
                bg = bg.replace('"', '').replace('"', '');
                var img = new Image();

                $(img).load(function () {
                    load_background(++i);
                }).attr('src', bg);
            } else {
                done_loading();
            }
        };

        load_background(0);

        /**
         * split slider parallax
         **/
        var toplimit = 0;
        var bottomlimit = 0;
        var topoffset = 0;
        var eleheight = 0;
        var scrollpos = 0;
        var turnzero = 0;
        var hh = $.jreducedtop();
        if ($(".bottomnav").length) {
            hh = 0;
        }
        var eleslideholder = $(element).find(".sl-slider-wrapper");

        var scrolleffect = function () {
            if (scrollpos > toplimit && scrollpos < bottomlimit) {
                var ratio = 0;
                ratio = (scrollpos - topoffset - hh) / eleheight;

                // centering
                var centering = (ratio * eleheight / 2);
                jpobj.doTranslate(eleslideholder, "0px", centering + "px");
                turnzero = 1;
            } else {
                jpobj.doTranslate(eleslideholder, "0px", "0px");
                turnzero = 0;
            }
        };

        var scrollcallback = function () {
            scrollpos = jpobj.globaltop;
            scrolleffect();
        };

        var resize_container = function () {
            topoffset = $(eleslideholder).offset().top;
            eleheight = $(eleslideholder).height();

            toplimit = topoffset + hh;
            bottomlimit = topoffset + eleheight - hh;
            console.log('resize container');
        };

        $(window).bind('resize', resize_container);
        $(eleslideholder).imagesLoaded({ background: true }, function() {
                resize_container();
            });

        if (!joption.ismobile && (jpobj.browser[0].toLowerCase() === 'chrome' || jpobj.browser[0].toLowerCase() === 'firefox')) {
            $(window).bind('jscroll', scrollcallback);
        }
    };

})(jQuery);

(function ($) {
    "use strict";
    $.fn.jlanding = function () {
        var element = this;

        var slitslider = function () {
            if ($(".landingslider", element).length) {
                $.landingslitslider(element);
            }
        };

        function getTransform(el) {
            var matrix = $(el).css('-webkit-transform');
            if (matrix === undefined) var matrix = $(el).css('-o-transform');
            if (matrix === undefined) var matrix = $(el).css('-ms-transform');
            if (matrix === undefined) var matrix = $(el).css('-moz-transform');
            if (matrix === undefined) var matrix = $(el).css('transform');

            var values = matrix.match(/-?[0-9\.]+/g);
            return values[4];
        }

        var set_translate_position = function (slider) {
            $(slider).attr('data-position', getTransform($(slider).find('.slides')));
        };

        var productslider = function () {
            if ($(".product-slide", element).length) {
                $(".product-slide", element).each(function () {
                    var column = $(this).data('column') ? $(this).data('column') : 3;
                    $(this).owlCarousel({
                        items: column,
                        itemsDesktop: [1199, 3],
                        autoHeight: true,
                        itemsDesktopSmall: [979, 3]
                    });
                });
            }
        };

        var serviceslider = function () {
            if ($(".service-slide", element).length) {
                $(".service-slide", element).each(function () {
                    var number = $(this).data('number') ? $(this).data('number') : 3;
                    $(this).owlCarousel({
                        items: number,
                        itemsDesktop: [1199, 3],
                        autoHeight: true,
                        itemsDesktopSmall: [979, 3]
                    });
                });

            }
        };

        var testislider = function () {
            if ($(".testislide", element).length) {
                $(".testislide", element).owlCarousel({
                    navigation: false,
                    slideSpeed: 300,
                    paginationSpeed: 400,
                    autoHeight: true,
                    singleItem: true
                });
            }
        };

        var clientslider = function () {
            if ($(".clientslider", element).length) {
                $(".clientslider", element).each(function () {
                    var number = $(this).data('number') ? $(this).data('number') : 4;
                    $(this).owlCarousel({
                        // autoPlay: 5000,
                        items: number,
                        autoHeight: true,
                        itemsDesktop: [1199, 3],
                        itemsDesktopSmall: [979, 3]
                    });
                });
            }
        };

        var portfolioblock = function () {

            var resize_portfolioblock = function () {
                $(".landingmasonrywrapper .landingmasonryitem").each(function (i) {
                    var blockwidth = $(this).data('width').split('/');
                    var wrapwidth = $(".landingmasonryblock").width();
                    var thiswidth = wrapwidth * ( blockwidth[0] / blockwidth[1] );
                    $(this).width(Math.floor(thiswidth));
                    $(".landingmasonrywrapper").imagesLoaded( function() {
                        $(".landingmasonrywrapper").isotope('layout');
                    });

                });
                if(joption.ismobile) {
                    $(".landingportfolioitem").each(function (i) {
                        var infoheight = $(".info", this).height();
                        var itemheight = $(this).height() - ( $(this).height() * 4 / 100 );

                        $(".mask", this).css({
                            "height": infoheight+'px'
                        });
                    });
                }
            };

            if ($(".landingmasonryblock").length) {
                $(".landingmasonrywrapper").isotope({
                    itemSelector: ".landingmasonryitem",
                    masonry: { columnWidth: 1 }
                });

                $(window).bind('load resize', resize_portfolioblock);
            }
        };

        var movingbg = function () {
            if ($(".movingbg").length && !joption.ismobile) {
                $(".movingbg").each(function () {
                    var ele = $(this);
                    var curbgpos = $(ele).css('backgroundPosition').split(" ");
                    var direction = $(ele).data('direction');

                    var bgpos = 0;
                    var bgpos2 = 0;
                    var bgimage = $(this).css('background-image');
                    bgimage = /^url\((['"]?)(.*)\1\)$/.exec(bgimage);
                    bgimage = bgimage ? bgimage[2] : "";

                    var newimg = new Image();
                    newimg.src = bgimage;

                    var browser = $.jgetbrowser().toLowerCase();
                    $(newimg).load(function () {
                        var maxwidth = newimg.width;
                        var maxheight = newimg.height;

                        var bsmove = function () {

                            if (direction === 'horizontal') {
                                if (bgpos > maxwidth) {
                                    bgpos = 0;
                                }

                                if (browser === 'netscape' || browser === 'msie') {
                                    $(ele).css('background-position-x', bgpos++ + "px");
                                } else {
                                    $(ele).css('background-position', bgpos++ + "px " + curbgpos[1]);
                                }
                            } else if (direction === 'vertical') {
                                if (bgpos > maxheight) {
                                    bgpos = 0;
                                }

                                if (browser === 'netscape' || browser === 'msie') {
                                    $(ele).css('background-position-y', bgpos++ + "px");
                                } else {
                                    $(ele).css('background-position', curbgpos[0] + bgpos++ + "px ");
                                }
                            } else if (direction === 'diagonal') {
                                if (bgpos > maxwidth) {
                                    bgpos = 0;
                                }
                                if (bgpos2 > maxheight) {
                                    bgpos2 = 0;
                                }

                                if (browser === 'netscape' || browser === 'msie') {
                                    $(ele).css('background-position-x', bgpos++ + "px");
                                    $(ele).css('background-position-y', bgpos2++ + "px");
                                } else {
                                    $(ele).css('background-position', bgpos++ + "px " + bgpos2++ + "px ");
                                }
                            }

                            requestAnimationFrame(bsmove);
                        };
                        requestAnimationFrame(bsmove);
                    });
                });
            }
        };

        var fullscreenslider = function () {
            if ($(".fs-container").length) {
                $(".fs-container").fsfullheight(['.headermenu', '.responsiveheader', '.topnavigation', '.post-header']);
            }
        };

        var fslandingslider = function () {
            if ($(".fslandingslider").length) {
                $(".fslandingslider").fslandingslider();
            }
        };

        var imageanimwrap = function () {
            if ($(".imageanimwrap", element).length) {
                var set_imagewrapsize = function () {
                    $(".imageanimwrap", element).each(function () {
                        var thisheight = $($(this).find('img').get(0)).height();
                        $(this).height(thisheight);
                    });
                };

                $(window).bind('load resize', set_imagewrapsize);
            }
        };

        var pricingtable = function () {
            if ($(".pricing-table").length) {
                var resizepricingtable = function () {
                    $(".pricing-table").each(function () {
                        var maxheight = 0;
                        $(".pricing-list", this).each(function () {
                            if ($(this).height() > maxheight) {
                                maxheight = $(this).height();
                            }
                        });

                        $(".pricing-list", this).css({
                            'height': maxheight
                        });
                    });
                };

                $(window).bind('load resize', resizepricingtable);
            }
        };

        var landingnavigation = function () {
            if ($(".landing-navigator").length) {

                var landingNavPosition = function () {
                    var navheight = $(".landing-navigator").height();
                    /*$(".landing-navigator").css({
                        'top': ( $(window).height() - navheight ) / 2
                    }).fadeIn(2000);*/
                    $(".landing-navigator").fadeIn(2000);
                };
                $(window).bind('load resize', landingNavPosition);

                var readyNavigation = function () {

                    var sectionlist = [];
                    var scrollpos = 0;
                    var active = '';
                    var percentage = 0;

                    var listenMouseScroll = function () {
                        scrollpos = jpobj.globaltop;

                        for (var i = 0; i < sectionlist.length; i++) {
                            if (scrollpos < sectionlist[i].begin) {
                                $(".landing-navigator").find("li[data-for='" + sectionlist[i].id + "'] .navigator-block-fill").css({
                                    'height': "0%"
                                }).removeClass('active');
                            } else if (scrollpos > sectionlist[i].end) {
                                $(".landing-navigator").find("li[data-for='" + sectionlist[i].id + "'] .navigator-block-fill").css({
                                    'height': "100%"
                                }).addClass('active');
                            } else if (scrollpos >= sectionlist[i].begin && scrollpos <= sectionlist[i].end) {
                                percentage = Math.floor(( scrollpos - sectionlist[i].begin ) / ( sectionlist[i].end - sectionlist[i].begin ) * 100);
                                $(".landing-navigator").find("li[data-for='" + sectionlist[i].id + "'] .navigator-block-fill").css({
                                    'height': percentage + "%"
                                }).addClass('active');
                            }
                        }
                    };

                    var loadNavigator = function () {
                        sectionlist = [];
                        $(".landingpagewrapper section").each(function () {
                            var element = $(this);

                            if (element.data('title') !== '') {
                                var datasection = {
                                    'begin': Math.floor($(element).offset().top) + $.jreducedtoplanding(),
                                    'end': Math.floor($(element).offset().top) + $(element).outerHeight() + $.jreducedtoplanding(),
                                    'element': element,
                                    'id': $(element).attr('data-id')
                                };

                                sectionlist.push(datasection);
                            }
                        });

                        listenMouseScroll();
                        $(window).unbind('jscroll', listenMouseScroll);
                        $(window).bind('jscroll', listenMouseScroll);
                    };

                    var gotoNavigation = function () {
                        var thisid = $(this).data('for');
                        var section = $("section[data-id='" + thisid + "']");
                        $('html, body').animate({
                            scrollTop: $(section).offset().top + $.jreducedtoplanding() + 1
                        }, 700, "easeInOutQuad");
                    };

                    $(window).bind('resize', loadNavigator);
                    addFunctionsToLoadQueue(loadNavigator);
                    $(".landing-navigator li").bind('click', gotoNavigation).jtooltip({
                        holder: $(".landing-navigator"),
                        timeout: 2000
                    });
                };

                $(document).ready(readyNavigation);
            }
            /////////////////////////// btn in top images go to first section///////////////////////////////////
            if ($(".landing-navigator2").length) {

                var landingNavPosition = function () {
                    var navheight = $(".landing-navigator2").height();
                    $(".landing-navigator2").fadeIn(2000);
                };
                $(window).bind('load resize', landingNavPosition);

                var readyNavigation = function () {

                    var sectionlist = [];
                    var scrollpos = 0;
                    var active = '';
                    var percentage = 0;

                    var listenMouseScroll = function () {
                        scrollpos = jpobj.globaltop;

                        for (var i = 0; i < sectionlist.length; i++) {
                           if (scrollpos >= sectionlist[i].begin && scrollpos <= sectionlist[i].end) {
                                percentage = Math.floor(( scrollpos - sectionlist[i].begin ) / ( sectionlist[i].end - sectionlist[i].begin ) * 100);
                            }
                        }
                    };

                    var loadNavigator = function () {
                        sectionlist = [];
                        $(".landingpagewrapper section").each(function () {
                            var element = $(this);

                            if (element.data('title') !== '') {
                                var datasection = {
                                    'begin': Math.floor($(element).offset().top) + $.jreducedtoplanding(),
                                    'end': Math.floor($(element).offset().top) + $(element).outerHeight() + $.jreducedtoplanding(),
                                    'element': element,
                                    'id': $(element).attr('data-id')
                                };

                                sectionlist.push(datasection);
                            }
                        });

                        listenMouseScroll();
                        $(window).unbind('jscroll', listenMouseScroll);
                        $(window).bind('jscroll', listenMouseScroll);
                    };

                    var gotoNavigation = function () {
                        var thisid = $(this).data('for');
                        var section = $("section[data-id='" + thisid + "']");
                        $('html, body').animate({
                            scrollTop: $(section).offset().top + $.jreducedtoplanding() + 1
                        }, 700, "easeInOutQuad");
                    };

                    $(window).bind('resize', loadNavigator);
                    addFunctionsToLoadQueue(loadNavigator);
                    $(".landing-navigator2 li").bind('click', gotoNavigation)
                };

               $(document).ready(readyNavigation);
            }
            /////////////////////////// menu bookmarks///////////////////////////////////
            if ($("#menu-main-menu").length) {

                var landingNavPosition = function () {
                    var navheight = $("#menu-main-menu").height();
                    $("#menu-main-menu").fadeIn(2000);
                };
                $(window).bind('resize', landingNavPosition);
                $(document).ready(landingNavPosition);

                var readyNavigation = function () {

                    var sectionlist = [];
                    var scrollpos = 0;
                    var active = '';
                    var percentage = 0;

                    var listenMouseScroll = function () {
                        scrollpos = jpobj.globaltop;

                        for (var i = 0; i < sectionlist.length; i++) {
                           if (scrollpos >= sectionlist[i].begin && scrollpos <= sectionlist[i].end) {
                                percentage = Math.floor(( scrollpos - sectionlist[i].begin ) / ( sectionlist[i].end - sectionlist[i].begin ) * 100);
                            }
                        }
                    };

                    var loadNavigator = function () {
                        
                        sectionlist = [];
                        $(".landingpagewrapper section").each(function () {
                            var element = $(this);
                            if (element.data('title') !== '') {
                                var datasection = {
                                     'begin': Math.floor($(element).offset().top) + $.jreducedtoplanding(),
                                     'end': Math.floor($(element).offset().top) + $(element).outerHeight() + $.jreducedtoplanding(),
                                     'element': element,
                                     'id': $(element).attr('data-id')
                                    };

                                sectionlist.push(datasection);
                            }
                        });

                        listenMouseScroll();
                        $(window).unbind('jscroll', listenMouseScroll);
                        $(window).bind('jscroll', listenMouseScroll);
                    };

                    var gotoNavigation = function () {
                         var thisid = $(this).text().toLowerCase();
                         var section = $("section[data-id='" + thisid + "']");
                         $('html, body').animate({
                             scrollTop: $(section).offset().top + $.jreducedtoplanding() + 1
                         }, 700, "easeInOutQuad");
                      
                    };

                    $(window).bind('resize', loadNavigator);
                    addFunctionsToLoadQueue(loadNavigator);
                    $("#menu-main-menu li a[target='_blank']").bind('click', gotoNavigation)
                };

                $(document).ready(readyNavigation);
            }
        };

        var videobackground = function () {
            $(".video-wrap").jfullvideo();
            $(".video_toggle").bind('click', function () {

                var videotype = $(this).parents('section').data('slider-type');
                var video = $(this).parent().find('video');
                var videotoogle = $(this).data('toogle');
                var musicon = $(this).data('on');
                var musicoff = $(this).data('off');

                if (videotoogle === 'on') {
                    $(this).data('toogle', 'off');
                    $(this).find('i').removeClass(musicon).addClass(musicoff);

                    if(videotype === 'video') {
                        $(video).prop('muted', true);
                    } else if(videotype === 'youtube') {
                        window.player.mute();
                    }

                } else {
                    $(this).data('toogle', 'on');
                    $(this).find('i').removeClass(musicoff).addClass(musicon);

                    if(videotype === 'video') {
                        $(video).prop('muted', false);
                    } else if(videotype === 'youtube') {
                        window.player.unMute();
                    }
                }
            });
        };

        var stickyheading = function () {
            if ($(".bottomnav").length) {

                var stickposition = $(".landing-bottom-nav").position().top;
                var change_stickposition = function () {
                    stickposition = $(".landing-bottom-nav").position().top;
                };

                var do_check_sticky = function () {
                    if (jpobj.globaltop < stickposition) {
                        $(".landing-bottom-nav").removeClass('sticky');
                    } else {
                        $(".landing-bottom-nav").addClass('sticky');
                    }
                };

                $(window).bind('load resize', function () {
                    change_stickposition();
                    $(window).bind('jscroll', do_check_sticky);
                });

            }
        };

        var mobilemenu = function (element) {
            var role = "main-mobile-menu";
            $(".mobile-menu-trigger").removeClass('active');

            if ($('body').hasClass('menuopen')) {
                $('body').removeClass('menuopen').attr('role', '');
                $(".contentoverflow").hide();
            } else {
                $(element).addClass('active');
                $('body').addClass('menuopen').attr('role', role);
                $(".contentoverflow").show();
            }
        };

        var hashchangelisten = function () {
            $(window).bind('hashchange load', function (e) {
                if (window.location.hash) {
                    var scrollToSection = function(){
                        var hash = window.location.hash.substring(1);
                        var section = $("section[data-id='" + hash + "']");
                        if ($(section).length) {
                            $('html, body').animate({
                                scrollTop: $(section).offset().top + $.jreducedtoplanding() + 1
                            }, 700, "easeInOutQuad");
                        }
                    };

                    if($('body').hasClass('menuopen')) {
                        mobilemenu(null);
                        setTimeout(function(){
                            scrollToSection();
                        }, 200);
                    } else {
                        scrollToSection();
                    }
                }
            });
        };

        var fullwidthmap = function () {
            if ($(".fullwidthmapwrapper").length) {
                do_load_googlemap('landingmap');
            }
        };

        var initialize = function () {
            // slitslider
            slitslider();

            // service slider
            serviceslider();

            // service slider
            clientslider();

            // product slider
            productslider();

            // portfolio
            portfolioblock();

            // testi slider
            testislider();

            // moving bg
            movingbg();

            // fullscreen
            fullscreenslider();

            // fullscreen
            fslandingslider();

            // imagewrap
            imageanimwrap();

            // dot navigator
            landingnavigation();

            // pricing table
            pricingtable();

            // video background
            videobackground();

            // popup
            $.portfolio_popup();

            // jnpslider
            if ($(".jnpslider").length) {
                $(document).ready(function() {
                    $(".jnpslider").jnpslider();
                });
            }

            // heading parallax
            if ($(".headingparallax").length) {
                $(document).ready(function() {
                    $(".headingparallax").headingparallax();
                });
            }

            // data - typer
            $('[data-typer-targets]').typer();

            // stick heading
            stickyheading();

            // hash change listener
            hashchangelisten();

            // fullwidth map
            fullwidthmap();

            /*$('body').imagesLoaded({ background: true }, function() {
                    initExecutionUpdate({'type':'body imagesLoaded'});
                })
                .progress( function( instance, image ) {
                    if(!image.isLoaded && image.img.src != window.location.href) {
                        var result = image.isLoaded ? 'loaded' : 'broken';
                        console.log( 'image is ' + result + ' for ' + image.img.src );
                    }
                });*/
            $(window).load(function() {
                executeLoadQueue();
            });
            console.log($('body')[0].className);

        };

        initialize();

    };
})(jQuery);

(function ($) {
    "use strict";
    $.fn.jlandingmap = function () {
        return $(this).each(function () {
            var element = this;
            var elementid = $(this).find('.mapcontainer').attr('id');
            var zoomfactor = $(this).data('zoom');
            var address = [];
            
            // address[0] = {
            //     'element': 'Austin',
            //     'lat':  +30.26920,
            //     'lng':  -97.74360 
            // };
            // address[1] = {
            //     'element': 'San Jose',
            //     'lat': +9.95000 ,
            //     'lng': -84.08320 
            // };

            $(".maplist .infowindow", element).each(function (i) {
                var lat = $(this).data('lat').split(":");
                var lng = $(this).data('lng').split(":");
                for (i=0; i < lat.length; i++) {
                    address[i] = {
                       'element': this,
                       'lat': parseFloat(lat[i]),
                       'lng': parseFloat(lng[i]),
                   };
                }
            });

            /** initialize map **/
            var infoBubble = new Array();
            var marker = new Array();
            var mapcenter, mapzoom;

            if (google == undefined || google.maps.MapTypeId == undefined) return null;

            var myOptions = {
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true,
                scrollwheel: false,
                navigationControl: true,
                mapTypeControl: true,
                scaleControl: true,
                draggable: true,
                panControl: true,
                zoomControl: true,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL,
                    position: google.maps.ControlPosition.LEFT_BOTTOM
                }
            };

            var gmap = new google.maps.Map(document.getElementById(elementid), myOptions);
            var bounds = new google.maps.LatLngBounds();

            /** populate marker **/
            var addMarker = function (pos, maptomark, index) {
                return new google.maps.Marker({
                    position: pos,
                    map: maptomark,
                    zIndex: 10
                });
            };

            var AddInfoBubble = function (address, index, latLng) {

                var NewInfoBubble = new InfoBubble({
                    map: gmap,
                    content: address.element,
                    position: latLng,
                    shadowStyle: 0,
                    padding: 0,
                    backgroundColor: 'rgba(125, 125, 125, 0.1)',
                    borderRadius: 5,
                    arrowSize: 10,
                    borderWidth: 0.5,
                    borderColor: '#fff',
                    disableAutoPan: true,
                    hideCloseButton: true,
                    arrowPosition: 40,
                    backgroundClassName: 'infowindowbg',
                    arrowStyle: 2
                });


                google.maps.event.addListener(marker[index], 'click', function () {
                    closeAllInfoWindow();
                    NewInfoBubble.open(gmap, marker[index]);
                    NewInfoBubble.panToView();

                    /* attach info bubble **/
                    google.maps.event.addListenerOnce(infoBubble[index], 'domready', function () {
                        var selector = "#" + elementid + " .closeme";
                        $(selector).click(function () {
                            closeAllInfoWindow();
                        });
                    });
                });

                return NewInfoBubble;

            };

            var closeAllInfoWindow = function () {
                for (var i = 0; i < infoBubble.length; i++) {
                    infoBubble[i].close();
                }
            };

            var populateMarker = function () {
                for (var i = 0; i < address.length; i++) {
                    var latLng = new google.maps.LatLng(address[i].lat, address[i].lng);
                    marker[i] = addMarker(latLng, gmap, 10);
                    infoBubble[i] = AddInfoBubble(address[i], i, latLng);
                    bounds.extend(latLng);
                }
            };

            populateMarker();

            gmap.setCenter(bounds.getCenter());
            gmap.setZoom(zoomfactor);
            mapcenter = bounds.getCenter();
        });
    };
})(jQuery);

function landingmap () {
    jQuery(".fullwidthmapwrapper").jlandingmap();
}