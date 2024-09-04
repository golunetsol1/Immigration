// bannerSlider //

function mainSlider() {

    var BasicSlider = $(".slider-active");

    BasicSlider.on("init", function (e, slick) {

        var $firstAnimatingElements = $(".single-slider:first-child").find(

            "[data-animation]"

        );

        doAnimations($firstAnimatingElements);

    });

    BasicSlider.on("beforeChange", function (e, slick, currentSlide, nextSlide) {

        var $animatingElements = $(

            '.single-slider[data-slick-index="' + nextSlide + '"]'

        ).find("[data-animation]");

        doAnimations($animatingElements);

    });

    BasicSlider.slick({

        autoplay: false,

        autoplaySpeed: 5000,

        dots: true,

        fade: true,

        arrows: true,

        prevArrow: "<button type='button' class='slick-prev pull-left'>prev</button>",

        nextArrow: "<button type='button' class='slick-next pull-right'>next</button>",

        responsive: [

            { breakpoint: 769, settings: { dots: true, arrows: false } }

        ]

    });



    function doAnimations(elements) {

        var animationEndEvents =

            "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";

        elements.each(function () {

            var $this = $(this);

            var $animationDelay = $this.data("delay");

            var $animationType = "animated " + $this.data("animation");

            $this.css({

                "animation-delay": $animationDelay,

                "-webkit-animation-delay": $animationDelay

            });

            $this.addClass($animationType).one(animationEndEvents, function () {

                $this.removeClass($animationType);

            });

        });

    }

}

mainSlider();