var body_var,
    heroSlider,
    taskSlider,
    displaySlider,
    clientSlider,
    $callback_popup,
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

    body_var.delegate('.task_unit .caption_v1', 'click', function () {
        console.log($(this).parent().attr('data-slick-index'));
        if (taskSlider) {
            taskSlider.slick('slickGoTo', $(this).parent().attr('data-slick-index'));
        }
    });

    heroSlider = $('.heroSlider').slick({
        dots: false,
        infinite: true,
        arrows: true,
        // autoplay: true,
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
        infinite: false,
        arrows: false,
        vertical: true,
        // autoplay: true,
        //variableWidth: true,
        speed: 600,
        autoplaySpeed: 5000,
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
        .on('beforeChange', function (event, sld) {

        })
        .slick({
            dots: false,
            infinite: true,
            arrows: false,
            fade: true,
            // autoplay: true,
            //variableWidth: true,
            speed: 600,
            autoplaySpeed: 5000,
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
        dialogClass: 'dialog_g_size_1',
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

    $('.openJoinPopup').on('click', function () {
        $callback_popup.dialog('open');
        return false;
    });

    initMask();

    initValidation();

    all_dialog_close();

});


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
            autoHideDelay: 2000,
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