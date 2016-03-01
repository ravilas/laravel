/** jquery.jnpslider.js **/
(function ($) {
    "use strict";

    $.fn.jnpslider = function () {
        return $(this).each(function (i) {
            var element = $(this);
            var prevslideid = null;
            var curslideid = 0;
            var maxslide = ( $(element).find('.bgslider-holder > .bgslider').length - 1 );
            var slidelock = false;
            var toplimit = 0;
            var bottomlimit = 0;
            var topoffset = 0;
            var eleheight = 0;
            var scrollpos = 0;
            var turnzero = 0;
            var hh = $.jreducedtop();
            var advancetimeout = null;

            var options = {
                timeout: parseInt($(this).attr('data-timeout'), 10),
                autoplay: parseInt($(this).attr('data-autoplay'), 10),
                elemovespeed: 300
            };
            options.autoplay = (maxslide == 0) ? false : options.autoplay;


            // cache element
            var eleslideholder = $(element).find('.bgslider-holder');
            var eletextholder = $(element).find('.text-holder');
            var eleslidebg = $(eleslideholder).find('.bgslider');
            var eleslidetext = $(eletextholder).find('.text-wrapper');
            var slidearrow = $(element).find('.navigation > span');
            var slidenav = $(element).find('.nav-dots span');
            var sidenavwrapper = $(element).find('.nav-dots');

            function advanceslider() {
                advance_id(curslideid, curslideid + 1);
                switch_slider();
            }

            function autoplay() {
                if (!joption.ismobile && ( scrollpos >= toplimit && scrollpos <= bottomlimit)) {
                    clearTimeout(advancetimeout);
                    advancetimeout = setTimeout(advanceslider, options.timeout);
                }
            }

            function advance_id(prev, cur) {
                var checkid = function (newid) {
                    if (newid > maxslide) {
                        return 0;
                    } else if (newid < 0) {
                        return maxslide;
                    } else {
                        return newid;
                    }
                };

                prevslideid = checkid(prev);
                curslideid = checkid(cur);
            }


            function pullelement(ele) {
                var arrele = [];

                if ($(".slider-video", ele).length) {
                    arrele.push($(".slider-video", ele));
                }

                if ($(".slider-header", ele).length) {
                    arrele.push($(".slider-header", ele));
                }

                if ($(".slider-alternate", ele).length) {
                    arrele.push($(".slider-alternate", ele));
                }

                if ($(".slider-button", ele).length) {
                    arrele.push($(".slider-button", ele));
                }

                return arrele;
            }

            function centeringtextelement() {
                $(eleslidetext).each(function (i) {
                    $(this).css('top', (eleheight - $(this).height()) / 2);
                });
            }

            function getBackgroundImageDimension(idEl) {
                var imageSrc = idEl.style.backgroundImage
                                   .replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];

                var image = new Image();
                image.src = imageSrc;

                var dimension = {
                    width: image.width,
                    height: image.height,
                    wwidth: $(window).width(),
                    wheight: $(window).height(),
                    sheight: $(window).width()*image.height/image.width
                };

                return dimension;
            }

            function resize_container() {
                var jnpsliderHeightMax = $(window).height() + hh - $(".post-header").height();
                topoffset = $(element).offset().top;
                eleheight = $(element).height();
                centeringtextelement();

                toplimit = topoffset + hh;
                bottomlimit = topoffset + eleheight;

                var jnpsliderHeightMin = 0;
                $('[data-title="Top"] .text-wrapper').each(function(index, el) {
                    if(jnpsliderHeightMin<$(el).height()) jnpsliderHeightMin = $(el).height();
                });
                if(jnpsliderHeightMin<jnpsliderHeightMax) jnpsliderHeightMin = jnpsliderHeightMax;
                $(element).height(jnpsliderHeightMin);
                $('[data-title="Top"] .text-wrapper').each(function(index, el) {
                    $(el).css('top', (jnpsliderHeightMin-$(el).height())/2);
                });
                /*
                var bgDimensions = getBackgroundImageDimension($('[data-title="Top"] .bgslider')[0]);
                jnpsliderHeightMin += bgDimensions.sheight/2;

                if($(element).height()<jnpsliderHeightMin && $(window).width()<900) {
                    $(element).height(jnpsliderHeightMin);
                    var topTW = 0;
                    if($(window).width()<$(window).height()) topTW = bgDimensions.sheight/3;
                    else topTW = bgDimensions.sheight/4;
                    $('[data-title="Top"] .text-wrapper').css('top', topTW);
                }
                }*/
            }

            function switch_slider() {
                // lock animation
                slidelock = true;

                // animation speed
                var fadespeed = 100;
                var fadeelespeed = fadespeed + 100;
                // ---
                var imageslidefade = 1000;
                var imageslideshow = 600;
                // ---
                var showspeed = 200;
                // ---

                // slider background
                var previousbgslider = $(eleslidebg).get(prevslideid);
                var currentbgslideid = $(eleslidebg).get(curslideid);

                // slider element
                var previouseleslider = $(eleslidetext).get(prevslideid);
                var currenteleslider = $(eleslidetext).get(curslideid);

                // element inside text element
                var previoustextelement = pullelement(previouseleslider);
                var currenttextelement = pullelement(currenteleslider);

                // jika prev slider nya null
                if (prevslideid === null) {
                    $(currentbgslideid).css({
                        'z-index': 2,
                        'opacity': 1
                    });
                }

                // reset current element text property
                $(currenttextelement).each(function (i) {
                    $(this).css({
                        'opacity': 0,
                        'top': 20
                    });
                });

                $($(previoustextelement).get().reverse()).each(function (i) {
                    var prevelement = this;
                    setTimeout(function () {
                        $(prevelement).animate({
                            'opacity': 0
                        }, fadespeed);
                    }, fadespeed * i);
                });

                setTimeout(function () {
                    if (prevslideid !== null) {
                        $(previousbgslider).css('z-index', 1);
                        $(previouseleslider).hide();
                    }

                    $(currentbgslideid).css('z-index', 2).animate({
                        'opacity': 1
                    }, imageslideshow, function () {
                        if (prevslideid !== null) {
                            $(previousbgslider).css('opacity', 0);
                        }
                    });

                    $(currenteleslider).show();
                    $(currenttextelement).each(function (i) {
                        var textelement = this;
                        setTimeout(function () {
                            if (( $(currenttextelement).length - 1 ) === i) {
                                slidelock = false;
                            }

                            $(textelement).animate({
                                'opacity': 1,
                                'top': 0
                            }, fadeelespeed);
                        }, ((showspeed * i) + imageslidefade));
                    });
                }, (previoustextelement.length) * fadespeed);

                move_active_nav();
                if (options.autoplay) {
                    autoplay();
                }
            }


            function move_active_nav() {
                $($(slidenav).get(prevslideid)).removeClass('nav-dot-current');
                $($(slidenav).get(curslideid)).addClass('nav-dot-current');
            }

            function move_slide(e) {
                if (slidelock === false) {
                    clearTimeout(advancetimeout);
                    var ele = e.currentTarget;
                    if ($(ele).hasClass('next-slide')) {
                        advance_id(curslideid, curslideid + 1);
                    } else {
                        advance_id(curslideid, curslideid - 1);
                    }
                    switch_slider();
                } else {
                }
            }

            function move_active(e) {
                if (slidelock === false) {
                    var ele = e.currentTarget;
                    var moveid = parseInt($(ele).attr('data-id'), 10);
                    if (moveid !== curslideid) {
                        clearTimeout(advancetimeout);
                        advance_id(curslideid, moveid);
                        switch_slider();
                    }
                }
            }

            function bind_video() {
                var musictimeout = null;
                $('.slider-video, .additional-slider-video').magnificPopup({
                    type: 'iframe',
                    delegate: 'a',
                    mainClass: 'mfp-fade',
                    removalDelay: 160,
                    preloader: false,
                    gallery: {enabled: true},
                    callbacks: {
                        elementParse: function (item) {
                            clearTimeout(advancetimeout);
                            if ($(item.el).data('video-type') === 'html5video') {
                                item.type = 'inline';

                                // video type
                                var dummyvideotest = "<video></video>";
                                var canplaymp4 = $(dummyvideotest).get(0).canPlayType("video/mp4");
                                var canplaywebm = $(dummyvideotest).get(0).canPlayType("video/webm");
                                var canplayogg = $(dummyvideotest).get(0).canPlayType("video/ogg");

                                // options
                                options = {
                                    videoWidth: '100%',
                                    videoHeight: '100%'
                                };

                                // option video player (force to use flash)
                                if (!joption.ismobile && ((canplaymp4 === 'maybe' || canplaymp4 === '') && (canplaywebm === 'maybe' || canplaywebm === '') && (canplayogg === 'maybe' || canplayogg === ''))) {
                                    options.mode = 'shim';
                                }

                                // option feature
                                options.features = ['playpause', 'progress', 'current', 'duration', 'tracks', 'volume', 'fullscreen'];

                                // option success
                                options.success = function (mediaElement, domObject) {
                                    if (mediaElement.pluginType == 'flash') {
                                        mediaElement.addEventListener('canplay', function () {
                                            mediaElement.play();
                                        }, false);
                                    } else {
                                        mediaElement.play();
                                    }
                                };

                                $(".html5popup-wrapper video").mediaelementplayer(options);
                            } else {
                                item.type = 'iframe';
                            }
                            // give music timeout
                            window.clearTimeout(musictimeout);
                            musictimeout = window.setTimeout(function(){
                                $(window).trigger('jmusicstop');
                            }, 200);
                        },
                        close: function () {
                            if (options.autoplay) {
                                autoplay();
                            }
                            $(window).trigger('jmusicstart');
                        }
                    }
                });
            }

            function turntozero() {
                jpobj.doTranslate(eleslideholder, "0px 0px");
            }

            function jpslider_scroll() {
                if (options.autoplay) {
                    autoplay();
                }
                if (scrollpos > toplimit && scrollpos < bottomlimit) {
                    var ratio = 0;

                    if ($(".bottomnav").length) {
                        ratio = (scrollpos - topoffset) / eleheight;
                    } else {
                        ratio = (scrollpos - topoffset - hh) / eleheight;
                    }

                    // opacity
                    $(eletextholder, sidenavwrapper).css({ 'opacity': (1 - (ratio * 1.5)) });
                    $(sidenavwrapper).css({ 'opacity': (1 - (ratio * 1.5)) });

                    // centering
                    var centering = (ratio * eleheight / 2);
                    jpobj.doTranslate(eleslideholder, "0px", centering + "px");
                    jpobj.doTranslate(eletextholder, "0px", centering + "px");
                    turnzero = 1;
                } else {
                    // opacity
                    $(eletextholder).css({ 'opacity': 1 });
                    $(sidenavwrapper).css({ 'opacity': 1 });

                    jpobj.doTranslate(eleslideholder, "0px", "0px");
                    jpobj.doTranslate(eletextholder, "0px", "0px");

                    turnzero = 0;
                }
            }

            function scrollcallback() {
                scrollpos = jpobj.globaltop;
                jpslider_scroll();
            }

            function execute() {
                $(window).bind('resize', resize_container);
                $(document).bind('ready', function () {
                    switch_slider();
                });
                $(window).bind('load', function () {
                    resize_container();
                });

                $(slidearrow).bind('click', move_slide);
                $(slidenav).bind('click', move_active);
                bind_video();

                if (!joption.ismobile && (jpobj.browser[0].toLowerCase() === 'chrome' || jpobj.browser[0].toLowerCase() === 'firefox')) {
                    $(window).bind('jscroll', scrollcallback);
                }
            }

            execute();
        });
    };
})(jQuery);