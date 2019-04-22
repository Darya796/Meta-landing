$(function () { /*==============================================================================================*/
    $('.contacts__item-link--phone').attr("data-hrefTel", $('.contacts__item-link--phone').attr("href"));
    $('.page-header__phone').attr("data-hrefTel", $('.page-header__phone').attr("href"));

    var phone_href = $('.contacts__item-link--phone').attr("data-hrefTel");
    var header_phone_href = $('.page-header__phone').attr("data-hrefTel");

    var phones_href_changing = function () {
        if ($(window).outerWidth() > 767) {
            $('.contacts__item-link--phone').removeAttr("href");
            $('.page-header__phone').removeAttr("href");
        } else {
            $('.contacts__item-link--phone').attr("href", phone_href);
            $('.page-header__phone').attr("href", header_phone_href);
        }
    };

    $(window).on("load, resize", function () {
        phones_href_changing();
    });

    phones_href_changing();
    /*==============================================================================================*/
    $(document).on("click", ".js--scroll", function (event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();
        //забираем идентификатор бока с атрибута href
        var id = $(this).attr('href'),
            //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top;
        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: top}, 800);
    });
    /*==============================================================================================*/
    $('.page-header__phone').attr("data-hrefTel", $('.page-header__phone').attr("href"));
    var phone_href = $('.page-header__phone').attr("data-hrefTel");

    var phones_href_changing = function () {
        if ($(window).outerWidth() > 767) {
            $('.page-header__phone').removeAttr("href");
        } else {
            $('.page-header__phone').attr("href", phone_href);
        }
    };

    $(window).on("load, resize", function () {
        phones_href_changing();
    });

    phones_href_changing();


    $('.portfolio__slider-container:not(.slick-initialized)').slick({
        mobileFirst: true,
        touchThreshold: 20,
        // touchThreshold: 10,
        infinite: true,
        edgeFriction: 0,
        // edgeFriction: 0.05,
        draggable:false,
        centerMode: true,
        dots: true,
        appendArrows: $(".portfolio__slider-arrows-container"),
        // arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 0,
                settings: {
                    centerPadding: "40px"
                }
            },
            {
                breakpoint: 767,
                settings: {
                    centerPadding: "80px"
                }
            },
            {
                breakpoint: 1199,
                settings: {
                    centerPadding: "220px"
                }
            }
        ]
    });

    /*==================================*/
    var pages_value = $("#pages-value");

    $("#pages-slider").slider({
        animate: "fast",
        max: 60,
        min: 1,
        stop: function (event, ui) {
            $("#pages-value").val($("#pages-slider").slider("option", "value"));
            // var number = $("#pages-slider").slider("option", "value");
            // pages_counter(number);
            // total_counter();
        },
        slide: function (event, ui) {
            $("#pages-value").val($("#pages-slider").slider("option", "value"));
        }
    });

    pages_value.change(function () {
        var value1 = $("#pages-value").val();

        if (value1 < 61) {
            $("#pages-slider").slider("value", value1);
        } else {
            $("#pages-value").val(60);
            $("#pages-slider").slider("value", 60);
        }

        // pages_counter(value1);
        // total_counter();
    });


    // фильтрация ввода в поля
    $("#pages-value").on("keypress", function (event) {
        var key, keyChar;
        if (!event) {
            var event = window.event;
        }

        if (event.keyCode) {
            key = event.keyCode;
        } else if (event.which) {
            key = event.which;
        }

        if (key == null || key == 0 || key == 8 || key == 13 || key == 9 || key == 46 || key == 37 || key == 39) {
            return true;
        }
        keyChar = String.fromCharCode(key);

        if (!/\d/.test(keyChar)) {
            return false;
        }

    });

    /*===========timer==================*/
    function getTimeRemaining(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes
        };
    }

    function initializeClock(id, endtime) {
        var clock = document.getElementById(id);
        var daysSpan = clock.querySelector(".timer__days");
        var hoursSpan = clock.querySelector(".timer__hours");
        var minutesSpan = clock.querySelector(".timer__minutes");

        function updateClock() {
            var t = getTimeRemaining(endtime);

            if (t.total <= 0) {
                clearInterval(timeinterval);
                var deadline = new Date(Date.parse(new Date()) + 5 * 1000);
                initializeClock('timer__clock', deadline);
            }

            daysSpan.innerHTML = t.days;
            hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
            minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
        }

        updateClock();
        var timeinterval = setInterval(updateClock, 1000);
    }

    var deadline = "June 31 2019 00:00:00";
    initializeClock("timer__clock", deadline);

    /*==============================================================================================*/
    $(".portfolio__slider-preview").on("click",function () {
        var img = $(this);
        var src = img.data("src");
        $("body").append("<div class='popup__portfolio'>" +
            "<img src='" + src + "' class='popup__portfolio-img' />" + "</div>");
        $("body").addClass("unscrolled");
        $(".popup__portfolio").fadeIn(300);

        $(".popup__portfolio").click(function () {
            $("body").removeClass("unscrolled");
            $(".popup__portfolio").fadeOut(300);
            setTimeout(function () {
                $(".popup__portfolio").remove();
            }, 300);
        });
    });

    /*=================================================================*/
    var site_types = $(".js--site-type");
    var checkboxes = $(".js--prices-input");
    var site_type;
    var total_price = $(".prices__form-price-number");

    /*======================ОБХОД МАССИВА ТИПОВ САЙТА И ОПРЕДЕЛЕНИЕ ВВЫБРАННОГО ТИПА ПРИ ЗАГРУЗКЕ===================================*/
    jQuery.each(site_types, function () {
        if ($(this).attr('checked') && $(this).attr('id') === "site-card") {
            site_type = "site-card";
        } else if ($(this).attr('checked') && $(this).attr('id') === "landing") {
            site_type = "landing";
        } else if ($(this).attr('checked') && $(this).attr('id') === "corporate") {
            site_type = "corporate";
        } else if ($(this).attr('checked') && $(this).attr('id') === "e-store") {
            site_type = "e-store";
        } else if ($(this).attr('checked') && $(this).attr('id') === "other") {
            site_type = "other";
        }

        return site_type;
    });

    /*=============================================================================*/

    var checkbox_checked = 0;
    /*======================ПОЛУЧЕНИЕ ПЕРЕМЕННОЙ И ОПРЕДЕЛЕНИЕ ВВЫБРАННОГО ТИПА САЙТА===================================*/
    var site_type_detecting = function (variable) {
        var ext_variable = variable;

        if (ext_variable.attr('id') === "site-card") {
            site_type = "site-card";
        } else if (ext_variable.attr('id') === "landing") {
            site_type = "landing";
        } else if (ext_variable.attr('id') === "corporate") {
            site_type = "corporate";
        } else if (ext_variable.attr('id') === "e-store") {
            site_type = "e-store";
        } else if (ext_variable.attr('id') === "other") {
            site_type = "other";
        }

        checkbox_checked = 0;

        jQuery.each(checkboxes, function () {
            if ($(this).attr('checked') && site_type !== "other") {
                checkbox_checked += $(this).data(site_type);
                $(".prices__form-price-value--string").css("display", "none");
                $(".prices__form-price-value--number").css("display", "inline-block");
            }
            else if ($(this).attr('checked') && site_type === "other") {
                $(".prices__form-price-value--number").css("display", "none");
                $(".prices__form-price-value--string").css("display", "inline-block");
            }

            return checkbox_checked;
        });

        return site_type;

    };
    /*=============================================================================*/

    /*========================ОТЛОВ СОБЫТИЯ КЛИКА ПО ИНПУТУ ТИПА САЙТА И ЗАПУСК ФУНКЦИИ ОПРЕДЕЛЕНИЯ ТИПА===================================*/
    $(".js--site-type").on("click", function () {

        site_type_detecting($(this));
        total_price.html(checkbox_checked);
    });
    /*=============================================================================*/

    /*========================ПРОХОД МАССИВА ЧЕКБОКСОВ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ И ПОДСЧЕТ СУММЫ ВЫБРАННЫХ===================================*/

    jQuery.each(checkboxes, function () {
        if ($(this).attr('checked') && site_type !== "other") {

            $(".prices__form-price-value--string").css("display", "none");
            $(".prices__form-price-value--number").css("display", "inline-block");
            checkbox_checked += $(this).data(site_type);

        } else if ($(this).attr('checked') && site_type === "other") {
            $(".prices__form-price-value--number").css("display", "none");
            $(".prices__form-price-value--string").css("display", "inline-block");
        }

        return checkbox_checked;
    });
    total_price.html(checkbox_checked);


    checkboxes.on("click", function () {
        if ($(this).attr('checked')) {
            $(this).attr('checked', false);

            if (site_type !== "other") {
                checkbox_checked -= $(this).data(site_type);
                $(".prices__form-price-value--string").css("display", "none");
                $(".prices__form-price-value--number").css("display", "inline-block");
            }
        }

        else if(site_type === "other") {
            $(".prices__form-price-value--number").css("display", "none");
            $(".prices__form-price-value--string").css("display", "inline-block");
        }

        else {
            $(this).attr('checked', true);
            if (site_type !== "other") {
                checkbox_checked += $(this).data(site_type);
                $(".prices__form-price-value--string").css("display", "none");
                $(".prices__form-price-value--number").css("display", "inline-block");
            }
        }

        total_price.html(checkbox_checked);
    });

    /*============================================================*/
    $(".popup__form-link").on("click", function (e) {
        e.preventDefault();
        $(".popup").addClass("popup--showed");
        $("body").addClass("unscrolled");
        $(".popup__form-wrapper").css("display", "block");
    });

    $(".popup__close").on("click", function () {
        $(".popup").removeClass("popup--showed");
        $("body").removeClass("unscrolled");

        $(".popup__form-wrapper").css("display", "none");
    });

    $(".popup").on("click", function (e) {
        if ($(".popup").is(e.target) && $(".popup").has(e.target).length === 0) {
            $(".popup").removeClass("popup--showed");
            $("body").removeClass("unscrolled");

            $(".popup__form-wrapper").css("display", "none");
        }
    });

    $(".popup__submit").on("click", function () {
        $(".popup").removeClass("popup--showed");
        $("body").removeClass("unscrolled");

        $(".popup__form-wrapper").css("display", "none");
    });
});