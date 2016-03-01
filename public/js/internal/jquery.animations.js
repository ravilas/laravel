// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
(function ($) {
    function initWaypoint(elW, offsetPercent, callbackReset, callbackTrigger) {
        var offsetPercentH = (elW.height()*offsetPercent/100);
        var waypointOffset = '';
        if(callbackTrigger.down) {
            waypointOffset = offsetPercent+'%';
            elW.waypoint(callbackTrigger.down,{
                offset: waypointOffset,
                triggerOnce: false,
                context: window
            });
        }
        if(callbackReset.up) {
            waypointOffset = '100%';
            elW.waypoint(callbackReset.up,{
                offset: waypointOffset,
                triggerOnce: false,
                context: window
            });
        }
        if(callbackTrigger.up) {
            waypointOffset = -elW.height()+offsetPercentH;
            elW.waypoint(callbackTrigger.up,{
                offset: waypointOffset,
                triggerOnce: false,
                context: window
            });
        }
        if(callbackReset.down) {
            waypointOffset = -elW.height();
            elW.waypoint(callbackReset.down,{
                offset: waypointOffset,
                triggerOnce: false,
                context: window
            });
        }
    }

    var item_animation = function () {
        var doanimation = function () {
            var startanimation = "janimate_start";
            var animationEnded = "animation_finished";
            var thisoffset = 65;

            var startanimationwpb = "wpb_start_animation";
            var startAnimationWpbTrigger = function (el, direction, animClass) {
                    setTimeout(function () {
                        el.addClass(animClass);//.css('background-color',direction=='up'?'green':'lime');
                    }, 1000*0.10);
                };
            var resetAnimationWpbTrigger = function (el, direction, animClass) {
                    el.removeClass(animClass);//.css('background-color',direction=='up'?'green':'lime');
                };
            if(joption.ismobile) {
                $('.wpb_animate_when_almost_visible').each(function () {
                    startAnimationWpbTrigger($(this), 0, startanimationwpb);
                });
            }
            else {
                $('.wpb_animate_when_almost_visible').each(function () {
                    var element = $(this);
                    initWaypoint(element, thisoffset
                        , {'up':function(direction) {
                                if(direction=='up') {
                                    resetAnimationWpbTrigger(element, direction, startanimationwpb);
                                }
                            }
                        }
                        , {'down':function(direction) {
                                if(direction=='down') {
                                    startAnimationWpbTrigger(element, direction, startanimationwpb);
                                }
                            }
                        });
                });
            }

            if ($(".jeg_animate_sequence").length) {
                $(".jeg_animate_sequence").each(function () {
                    var element = $(this);
                    var speed = 1000/5;//$(element).data('speed');
                    var thisoffset = 65;//( $(element).data('offset') == undefined ) ? defaultoffset : $(element).data('offset');

                    var startAnimateSequence = function (el, direction, animClass, endAnimClass) {
                        var animele = el.find('.jeg_do_animate');
                        var iFinish = -1;
                        $(animele).each(function (i) {
                            var animatedelement = this;
                            if(!$(animatedelement).hasClass(animClass)) {
                                setTimeout(function () {
                                    $(animatedelement).addClass(animClass);
                                }, i * speed);
                                iFinish = i+1;
                            }
                        });

                        if(iFinish != -1) {
                            $(animele).each(function () {
                                var animatedelement = this;
                                if(!$(animatedelement).hasClass(endAnimClass)) {
                                    setTimeout(function () {
                                        $(animatedelement).addClass(endAnimClass);//.css('background-color',direction=='up'?'red':'rgb(255, 145, 145)');
                                    }, iFinish * speed);
                                }
                            });
                        }
                    };
                    var resetAnimateSequence = function (el, direction, animClass, endAnimClass) {
                        var animele = el.find('.jeg_do_animate');
                        $(animele).each(function () {
                            $(this).removeClass(animClass).removeClass(endAnimClass);//.css('background-color',direction=='up'?'red':'rgb(255, 145, 145)');
                        });
                    };

                    if(joption.ismobile) {
                        startAnimateSequence($(this), 0, startanimation, animationEnded);
                    }
                    else {
                        initWaypoint(element, thisoffset
                            , {'up':function(direction) {
                                    if(direction=='up') {
                                        resetAnimateSequence(element, direction, startanimation, animationEnded);
                                    }
                                }
                            }
                            , {'down':function(direction) {
                                    if(direction=='down') {
                                        startAnimateSequence(element, direction, startanimation, animationEnded);
                                    }
                                }
                            });
                    }
                });
            }

            if ($(".jeg_animate_random").length) {
                $(".jeg_animate_random").each(function () {
                    var element = $(this);
                    var thisoffset = 65;//( $(element).data('offset') == undefined ) ? defaultoffset : $(element).data('offset');
                    var speed = 1000/getRandomArbitrary(2,6);//$(element).data('speed');

                    var startAnimateSequenceRandom = function (el, direction, animClass, endAnimClass) {
                            var animele = el.find('.jeg_do_animate');
                            var iFinish = -1;
                            $(animele).each(function (i) {
                                var animatedelement = this;
                                if(!$(animatedelement).hasClass(animClass)) {
                                    var randomA = getRandomArbitrary(2,11)*10, currSpeed = speed*randomA/100;
                                    setTimeout(function () {
                                        $(animatedelement).addClass(animClass);
                                    }, currSpeed);
                                    if(currSpeed>iFinish) iFinish = currSpeed;
                                }
                            });

                            if(iFinish != -1) {
                                $(animele).each(function () {
                                    var animatedelement = this;
                                    if(!$(animatedelement).hasClass(endAnimClass)) {
                                        setTimeout(function () {
                                            $(animatedelement).addClass(endAnimClass);//.css('background-color',direction=='up'?'yellow':'orange');
                                        }, iFinish+(speed*0.25));
                                    }
                                });
                            }
                        };
                    var resetAnimateSequenceRandom = function (el, direction, animClass, endAnimClass) {
                            var animele = el.find('.jeg_do_animate');
                            $(animele).each(function () {
                                $(this).removeClass(animClass).removeClass(endAnimClass);//.css('background-color',direction=='up'?'yellow':'orange'); 
                            });
                        };
                    $(element).each(function () {
                        var animele = $(this);
                        if ($(this).position().left === 0) {
                            $(this).attr('data-position', 'janimpos-left');
                        } else if (($(this).parent().width() - 50) < ($(this).position().left + $(this).width())) {
                            $(this).attr('data-position', 'janimpos-right');
                        }

                        if(joption.ismobile) {
                            startAnimateSequenceRandom(animele, 0, startanimation, animationEnded);
                        }
                        else {
                            initWaypoint(element, thisoffset
                                , {'up':function(direction) {
                                        if(direction=='up') {
                                            resetAnimateSequenceRandom(animele, direction, startanimation, animationEnded);
                                        }
                                    }
                                }
                                , {'down':function(direction) {
                                        if(direction=='down') {
                                            startAnimateSequenceRandom(animele, direction, startanimation, animationEnded);
                                        }
                                    }
                                });
                        }
                    });
                });
            }

            if ($(".jeg_animate_single").length) {
                $(".jeg_animate_single").each(function () {
                    var element = $(this);
                    var thisoffset = 65;//( $(element).data('offset') == undefined ) ? defaultoffset : $(element).data('offset');
                    var speed = 1000/4;//$(element).data('speed');//$(element).data('speed');

                    var startAnimateSingle = function (el, direction, animClass) {
                            setTimeout(function () {
                                el.addClass(animClass);//.css('background-color',direction=='up'?'blue':'light-blue'); 
                            }, speed);
                        };
                    var resetAnimateSingle = function (el, direction, animClass) {
                            $(this).removeClass(animClass);//.css('background-color',direction=='up'?'black':'pink'); 
                        };

                    if(joption.ismobile) {
                        startAnimateSingle(element, 0, startanimation);
                    }
                    else {
                        initWaypoint(element, thisoffset
                            , {'up':function(direction) {
                                    if(direction=='up') {
                                        resetAnimateSingle(element, direction, startanimation);
                                    }
                                }
                            }
                            , {'down':function(direction) {
                                    if(direction=='down') {
                                        startAnimateSingle(element, direction, startanimation);
                                    }
                                }
                            });
                    }
                });
            }

            var startanimationAnimated = 'zoomIn';
            var endAnimationAnimated = 'zoomOut';
            if ($(".animated").length) {
                $(".animated").each(function () {
                    var element = $(this);
                    var thisoffset = 65;//( $(element).data('offset') == undefined ) ? defaultoffset : $(element).data('offset');
                    var speed = 1000/10;//$(element).data('speed');

                    var startAnimateSingle = function (el, direction, animClass, endAnimClass) {
                            setTimeout(function () {
                                el.addClass(animClass).removeClass(endAnimClass);//.css('background-color',direction=='up'?'red':'rgb(255, 145, 145)');
                            }, speed);
                        };
                    var resetAnimateSingle = function (el, direction, animClass, endAnimClass) {
                            el.removeClass(animClass).addClass(endAnimClass);//.css('background-color',direction=='up'?'green':'lime');
                        };

                    if(joption.ismobile) {
                        startAnimateSingle(element, 0, startanimation, endAnimationAnimated);
                    }
                    else {
                        resetAnimateSingle(element, 0, startanimation, endAnimationAnimated);
                        initWaypoint(element, thisoffset
                            , {'up':function(direction) {
                                    if(direction=='up') {
                                        resetAnimateSingle(element, direction, startanimationAnimated, endAnimationAnimated);
                                    }
                                }
                            }
                            , {'down':function(direction) {
                                    if(direction=='down') {
                                        startAnimateSingle(element, direction, startanimationAnimated, endAnimationAnimated);
                                    }
                                }
                            });
                    }
                });
            }

            if ($(".counter-wrapper").length) {
                $(".counter-wrapper").each(function () {
                    var element = $(this);
                    var thisoffset = 65;
                    var speed = 1000/4;
                    var startAnimateOdometer = function (el, direction) {
                            el.find(".odometer").each(function (i) {
                                var number = $(this).attr('data-number');
                                var counterelement = $(this);

                                setTimeout(function () {
                                    $(counterelement).html(number);
                                }, i * speed);
                            });
                        };
                    var resetAnimateOdometer = function (el, direction) {
                            el.find(".odometer").each(function () {
                                $(this).html(0);
                            });
                        };

                    $(element).each(function () {
                        var animele = $(this);
                        if(joption.ismobile) {
                            startAnimateOdometer($(element));
                        }
                        else {
                            initWaypoint(animele, thisoffset
                                , {'up':function(direction) {
                                        if(direction=='up') {
                                            resetAnimateOdometer($(element), direction);
                                        }
                                    }
                                }
                                , {'down':function(direction) {
                                        if(direction=='down') {
                                            startAnimateOdometer($(element), direction);
                                        }
                                    }
                                });
                        }
                    });
                });
            }
        };

        $(window).bind('load resize', doanimation);
    };

    item_animation();
})(jQuery);
