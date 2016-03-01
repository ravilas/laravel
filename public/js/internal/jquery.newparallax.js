
(function ($) {
    "use strict";
    $.fn.jparallax = function () {

        $(this).each(function () {
            var element, elepos, dpos, bgpos, initpos, centerelement, bgfpos, movespeed, parent, scrollpos, ratio;
            var percentmove = 100;

            element = $(this);

            if ($(element).prop("tagName") === 'SECTION') {
                parent = element;
            } else {
                parent = $(this).parent();
            }

            bgpos = $(element).css('backgroundPosition').split(" ");
            bgfpos = $(this).data('position');
            movespeed = $(this).data('speed');

            var init_position = function () {
                var calcpos = function () {
                    var minpos = elepos.top - $(window).height();
                    var maxpos = $(parent).next().position().top;

                    return {
                        'min': minpos,
                        'max': maxpos,
                        'diff': (maxpos - minpos)
                    };
                };

                elepos = $(parent).position();
                dpos = calcpos();
            };

            function fixedbackground(ratio, scrollpos, dpos) {
                var bgposresult = -1 * (ratio * movespeed);
                var newposition = bgfpos + " " + bgposresult + "px";
                $(element).css('background-position', newposition);
            }

            var doparallax = function () {
                if (dpos !== undefined) {
                    scrollpos = jpobj.globaltop;
                    ratio = null;

                    if (scrollpos >= dpos.min && scrollpos <= dpos.max) {
                        ratio = (scrollpos - dpos.min) / dpos.diff;
                        fixedbackground(ratio, scrollpos, dpos);
                    }
                }
            };

            if (!joption.ismobile) {
                init_position();
                doparallax();
                $(window).bind('jscroll', doparallax);
            }
        });
    };
})(jQuery);

/** new parallax **/
(function ($) {
    "use strict";
    $.fn.jnewparallax = function () {
        var element, parent, bgpos, sizemode, speed, dpos, elesize, scrollpos, ratio, bgtoppos, scrolldiff;
        element = this;
        parent = $(this).parent();
        bgpos = $(this).data('position');
        sizemode = $(this).data('sizemode');
        speed = $(this).data('speed');

        var init_position = function () {
            var calcpos = function () {
                var minpos = $(parent).position().top - $(window).height();
                var maxpos = $(parent).position().top + $(parent).outerHeight();

                return {
                    'min': minpos,
                    'max': maxpos,
                    'diff': (maxpos - minpos),
                    'wh': $(window).height()
                };
            };

            var calcresize = function () {
                $(element).attr('style', '');

                var eleresizer = null;
                var toppos = 0;
                var leftpos = 0;

                if (sizemode === 'nostretch') {
                    eleresizer = {
                        'elewidth': $(element).width(),
                        'eleheight': $(element).height(),
                        'containerwidth': $(parent).outerWidth(),
                        'containerheight': $(parent).outerHeight()
                    };
                } else {
                    var imagesize = $.new_get_image_container_size($(element), $(window), 'zoom');
                    $(element).css({
                        'height': imagesize[0],
                        'width': imagesize[1]
                    });

                    eleresizer = {
                        'eleheight': imagesize[0],
                        'elewidth': imagesize[1],
                        'containerwidth': $(parent).outerWidth(),
                        'containerheight': $(parent).outerHeight()
                    };
                }

                // initial position
                toppos = ( eleresizer.containerheight - eleresizer.eleheight ) / 2;
                if (bgpos === 'center') {
                    leftpos = ( eleresizer.containerwidth - eleresizer.elewidth ) / 2;
                } else if (bgpos === 'left') {
                    leftpos = 0;
                } else if (bgpos === 'right') {
                    leftpos = eleresizer.containerwidth - eleresizer.elewidth;
                }

                jpobj.doTranslate(element, leftpos + "px", toppos + "px");
                eleresizer.leftpos = leftpos;

                return eleresizer;
            };

            dpos = calcpos();
            elesize = calcresize();
        };

        var fixedbackground = function (scrollpos, ratio, scrolldiff) {
            // ( elesize.eleheight - ( elesize.eleheight - dpos.wh ) ) -> biar posisi patokan nya tetap di top
            // speed * ( dpos.wh / dpos.diff ) -> posisi teratas image terlihat
            // scrolldiff -> agar posisi  nya tetap ditengah (saat 0)
            // ( ratio * speed ) -> parallax effect
            bgtoppos = -1 * ( ( elesize.eleheight - ( elesize.eleheight - dpos.wh ) ) - ( speed * ( dpos.wh / dpos.diff ) ) - scrolldiff + ( ratio * speed ) );
            jpobj.doTranslate(element, elesize.leftpos + "px", Math.floor(bgtoppos) + "px");
        };

        var do_parallax = function () {
            if (dpos !== undefined) {
                ratio = null;
                scrollpos = $(window).scrollTop();

                if (scrollpos >= dpos.min && scrollpos <= dpos.max) {
                    scrolldiff = scrollpos - dpos.min;
                    ratio = scrolldiff / dpos.diff;
                    fixedbackground(scrollpos, ratio, scrolldiff);
                }
            }
        };

        if (!joption.ismobile) {
            init_position();
            do_parallax();
            $(window).bind('scroll', do_parallax);
        }
    };
})(jQuery);

(function ($) {
    "use strict";
    var initialize = function () {
        var newparallax = function () {
            if($(".newparallax").length) {
                $(".newparallax").each(function () {
                    $(this).jnewparallax();
                });
            }
        };

        var bgparallax = function () {
            if ($(".parallaxbackground").length) {
                $(".parallaxbackground").each(function () {
                    $(this).jparallax();
                });
            }
        };
        $(window).bind('load resize', bgparallax);
        $(window).bind('load resize', newparallax);
    };

    initialize();
})(jQuery);
