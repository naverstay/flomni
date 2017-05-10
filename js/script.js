var body_var,
    msgTimer,
    heroSlider,
    taskSlider,
    displaySlider,
    clientSlider,
    $callback_popup,
    $thanks_popup,
    global_window_Height,
    inputMaskEvents = {
        "oncomplete": function (ev) {
            // console.log(ev, this);
            $(this).addClass('_complete').removeClass('_incomplete');

        },
        "onincomplete": function (ev) {
            // console.log(ev, this);
            $(this).addClass('_incomplete').removeClass('_complete');
        },
        "oncleared": function (ev) {
            // console.log(ev, this);
            $(this).removeClass('_complete');
        }
    };

$(function ($) {

    body_var = $('body');
    global_window_Height = $(window).height();

    var header = $('.header');

    $('#bgvid').on('canplay', function () {
        this.play();
    });

    body_var
        .delegate('.openJoinPopup', 'click', function () {
            $callback_popup.dialog('open');
            return false;
        })
        .delegate('.openThanksPopup', 'click', function () {
            if ($callback_popup.find('form').validationEngine('validate')) {
                checkGoal('connect_form_send');
                $callback_popup.dialog('close');
                $thanks_popup.dialog('open');
            } else {
                checkGoal('connect_form_error');
            }

            return false;
        })
        .delegate('.task_unit', 'click', function () {
            if (taskSlider) {
                taskSlider.slick('slickGoTo', $(this).attr('data-slick-index'));
            }
        })
        .delegate('.scrollTo', 'click', function () {
            var target = $($(this).attr('href'));

            if (target.length) {
                docScrollTo(target.offset().top, 1000);
            }

            return false;
        });

    heroSlider = $('.heroSlider').slick({
        dots: false,
        infinite: true,
        arrows: true,
        autoplay: true,
        //variableWidth: true,
        speed: 600,
        autoplaySpeed: 3000,
        zIndex: 1,
        initialSlide: 0,
        //centerPadding: '0',
        slide: '.heroSlider .slide',
        prevArrow: '.heroSliderPrev',
        nextArrow: '.heroSliderNext',
        //appendDots: sld.parent().find('.slider_dots'),
        slidesToShow: 1,
        touchThreshold: 10

    });

    taskSlider = $('.taskSlider').slick({
        dots: false,
        infinite: true,
        arrows: false,
        vertical: true,
        autoplay: false,
        //variableWidth: true,
        speed: 600,
        // autoplaySpeed: 20000,
        zIndex: 1,
        initialSlide: 0,
        //centerPadding: '0',
        slide: '.taskSlider .task_unit',
        // prevArrow: '.heroSliderPrev',
        // nextArrow: '.heroSliderNext',
        //appendDots: sld.parent().find('.slider_dots'),
        slidesToShow: 1,
        touchThreshold: 10,
        asNavFor: '.displaySlider'
    });

    displaySlider = $('.displaySlider')
        .on('init', function (event, sld) {
            startMsg(sld);

            $('.display_slide').each(function (ind) {
                $(this).mCustomScrollbar({
                    documentTouchScroll: true,
                    theme: "dark",
                    scrollEasing: "linear",
                    mouseWheel: {preventDefault: true}
                });
            });
        })
        .on('afterChange', function (event, sld) {
            startMsg(sld);
        })
        .on('beforeChange', function (event, sld) {
            clearTimeout(msgTimer);
            $(sld.$slides[sld.currentSlide]).find('._active').removeClass('_active').hide();
            $('.msg_dot').remove();
        })
        .slick({
            dots: false,
            swipe: false,
            infinite: true,
            arrows: false,
            fade: true,
            autoplay: false,
            //variableWidth: true,
            speed: 600,
            // autoplaySpeed: 5000,
            zIndex: 1,
            initialSlide: 0,
            //centerPadding: '0',
            slide: '.displaySlider .display_slide',
            // prevArrow: '.heroSliderPrev',
            // nextArrow: '.heroSliderNext',
            //appendDots: sld.parent().find('.slider_dots'),
            slidesToShow: 1,
            touchThreshold: 10
        });

    clientSlider = $('.clientSlider').slick({
        dots: false,
        infinite: true,
        arrows: true,
        // autoplay: true,
        //variableWidth: true,
        speed: 600,
        autoplaySpeed: 5000,
        zIndex: 1,
        initialSlide: 0,
        //centerPadding: '0',
        slide: '.clientSlider .slide',
        prevArrow: '.clientSliderPrev',
        nextArrow: '.clientSliderNext',
        //appendDots: sld.parent().find('.slider_dots'),
        slidesToShow: 1,
        touchThreshold: 10
    });

    $callback_popup = $('#callback_popup').dialog({
        autoOpen: false,
        modal: true,
        closeOnEscape: true,
        closeText: '',
        dialogClass: 'dialog_g_size_1 dialog_close_butt_mod_1',
        //appendTo: '.wrapper',
        width: 540,
        draggable: true,
        collision: "fit",
        position: {my: "top center", at: "top center", of: window},
        open: function (event, ui) {

        },
        close: function (event, ui) {
            $callback_popup.find('form')[0].reset();
        }
    });

    $thanks_popup = $('#thanks_popup').dialog({
        autoOpen: false,
        modal: true,
        closeOnEscape: true,
        closeText: '',
        dialogClass: 'dialog_g_size_1 dialog_close_butt_mod_1',
        //appendTo: '.wrapper',
        width: 540,
        draggable: true,
        collision: "fit",
        position: {my: "top center", at: "top center", of: window},
        open: function (event, ui) {

        },
        close: function (event, ui) {

        }
    });

    initMask();

    initValidation();

    all_dialog_close();

});

function startMsg(sld, question) {
    var dot = $('<span class="msg_dot"/>'),
        ind = sld.currentSlide, slide = $(sld.$slides[ind]),
        next_question, answer;

    if (question) {
        next_question = slide.find('.taskQuestion').eq(question);
    } else {
        question = 0;
        next_question = slide.find('.taskQuestion').first();
    }

    next_question.closest('.task_msg').show();

    msgTimer = setTimeout(function () {

        slide.mCustomScrollbar("scrollTo", "bottom", {
            scrollInertia: 500
        });

        answer = next_question.closest('.task_msg').addClass('_active').next('.taskAnswer');

        next_question.append(dot);

        msgTimer = setTimeout(function () {
            answer.show();

            dot.animate({left: '25px'}, 800, function () {

                slide.mCustomScrollbar("scrollTo", "bottom", {
                    scrollInertia: 500
                });

                dot.addClass('_clicked');

                msgTimer = setTimeout(function () {
                    dot.removeClass('_clicked');

                    answer.addClass('_active');

                    if (question == slide.find('.taskQuestion').length) {
                        taskSlider.slick('slickNext');
                    } else {
                        startMsg(sld, question + 1);
                    }

                }, 500);
            });
        }, 1000);
    }, 1200);
}

function checkGoal(goal) {
    if (yaCounter44475754) yaCounter44475754.reachGoal(goal);
}

function docScrollTo(pos, speed, callback) {

    $('html,body').animate({'scrollTop': pos}, speed, function () {
        if (typeof(callback) == 'function') {
            callback();
        }
    });
}

function initValidation() {
    $('.validateMe').each(function (ind) {
        var f = $(this);

        f.validationEngine({
            //binded                   : false,
            scroll: false,
            showPrompts: true,
            showArrow: false,
            addSuccessCssClassToField: 'success',
            addFailureCssClassToField: 'error',
            // parentFieldClass: '.form_cell',
            // parentFormClass: '.order_block',
            promptPosition: "centerRight",
            //doNotShowAllErrosOnSubmit: true,
            //focusFirstField          : false,
            autoHidePrompt: true,
            autoHideDelay: 3000,
            autoPositionUpdate: false,
            prettySelect: true,
            //useSuffix                : "_VE_field",
            addPromptClass: 'relative_mode one_msg',
            showOneMessage: false
        });
    });
}

function initMask() {

    $("input").each(function (i, el) {
        var inp = $(el), param = inputMaskEvents;

        if (inp.attr('data-inputmask-custom') != void 0) {
            inp.inputmask(JSON.parse('{' + inp.attr('data-inputmask-custom').replace(/'/g, '"') + '}'));
        }

        if (inp.attr('data-inputmask') != void 0) {
            inp.inputmask();
        }

        if (inp.attr('data-inputmask-email') != void 0) {
            param.regex = inp.attr('data-inputmask-email');
            param.placeholder = '_';

            inp.inputmask('Regex', param);
        }

        if (inp.attr('data-inputmask-regex') != void 0) {
            inp.inputmask('Regex', inputMaskEvents);
        }
    });
}

function all_dialog_close() {
    body_var.on('click', '.ui-widget-overlay', all_dialog_close_gl);
}

function all_dialog_close_gl() {
    $(".ui-dialog-content").each(function () {
        var $this = $(this);
        if (!$this.parent().hasClass('always_open')) {
            $this.dialog("close");
        }
    });
}

$(window).resize(function () {

}).load(function () {

    s = skrollr.init({
        //forceHeight: false
    });

});
