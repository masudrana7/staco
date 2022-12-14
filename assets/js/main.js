/*-----------------------------------------------------------------------------
Theme Name: staco
Author: uigigs
Author URL: https://themeforest.net/user/uigigs/portfolio
-----------------------------------------------------------------------------*/
(function ($) {
    ("use strict");

    /*-- sticky header scripts start --*/
    function stacoScroll() {
        let lastScroll = 0;
        $(window).on("scroll", function () {
            let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            let diffScroll = currentScroll - lastScroll;
            if (diffScroll > 0 || currentScroll == 0) {
                $(".header-section").removeClass("sticky");
                $(".header-section.v2").removeClass("sticky");
                $("body").removeClass("nav-expanded");
            } else {
                $(".header-section").addClass("sticky");
                $(".header-section.v2").addClass("sticky");
            }
            lastScroll = currentScroll;
        });
    }

    stacoScroll();
    /*-- sticky header scripts end --*/

    /*-- menu responsive dropdown scripts start --*/
    $(".main-menu > li").on("click", function () {
        if ($(this).find(".submenu")) {
            $(this).find(".submenu").toggleClass("show");
        }
    });
    /*-- menu responsive dropdown scripts end --*/

    /*-- canvas menu scripts start --*/
    var navexpander = $("#nav-expander");
    if (navexpander.length) {
        $("#nav-expander").on("click", function (e) {
            e.preventDefault();
            $("body").toggleClass("nav-expanded");
        });
    }

    $(".mobile-navbar-menu a").each(function () {
        var href = $(this).attr("href");
        if ((href = "#")) {
            $(this).addClass("hash");
        } else {
            $(this).removeClass("hash");
        }
    });

    $.fn.menumaker = function (options) {
        var mobile_menu = $(this),
            settings = $.extend(
                {
                    format: "dropdown",
                    sticky: false,
                },
                options
            );

        return this.each(function () {
            mobile_menu.find("li ul").parent().addClass("has-sub");
            var multiTg = function () {
                mobile_menu.find(".has-sub").prepend('<span class="submenu-button"><em></em></span>');
                mobile_menu.find(".hash").parent().addClass("hash-has-sub");
                mobile_menu.find(".submenu-button").on("click", function () {
                    if ($(this).parent().siblings("li").hasClass("active")) {
                        $(this).parent().siblings("li").removeClass("active");
                        $(this).parent().siblings("li").find(".submenu-button").removeClass("submenu-opened");
                        $(this).parent().addClass("active");
                        $(this).addClass("submenu-opened");
                        if (
                            $(this).parent().siblings("li").find(".submenu-button").siblings("ul").hasClass("open-sub")
                        ) {
                            $(this)
                                .parent()
                                .siblings("li")
                                .find(".submenu-button")
                                .siblings("ul")
                                .removeClass("open-sub")
                                .hide("fadeIn");
                            $(this).parent().siblings("li").find(".submenu-button").siblings("ul").hide("fadeIn");
                        } else {
                            $(this)
                                .parent()
                                .siblings("li")
                                .find(".submenu-button")
                                .siblings("ul")
                                .addClass("open-sub")
                                .hide("fadeIn");
                            $(this)
                                .parent()
                                .siblings("li")
                                .find(".submenu-button")
                                .siblings("ul")
                                .slideToggle()
                                .show("fadeIn");
                        }

                        if ($(this).siblings("ul").hasClass("open-sub")) {
                            $(this).siblings("ul").removeClass("open-sub").hide("fadeIn");
                            $(this).siblings("ul").hide("fadeIn");
                            $(this).parent().removeClass("active");
                            $(this).removeClass("submenu-opened");
                        } else {
                            $(this).siblings("ul").addClass("open-sub").hide("fadeIn");
                            $(this).siblings("ul").slideToggle().show("fadeIn");
                        }
                    } else {
                        $(this).parent().addClass("active");
                        $(this).addClass("submenu-opened");
                        if ($(this).siblings("ul").hasClass("open-sub")) {
                            $(this).siblings("ul").removeClass("open-sub").hide("fadeIn");
                            $(this).siblings("ul").hide("fadeIn");
                            $(this).parent().removeClass("active");
                            $(this).removeClass("submenu-opened");
                        } else {
                            $(this).siblings("ul").addClass("open-sub").hide("fadeIn");
                            $(this).siblings("ul").slideToggle().show("fadeIn");
                        }
                    }
                });
            };

            if (settings.format === "multitoggle") multiTg();
            else mobile_menu.addClass("dropdown");
            if (settings.sticky === true) mobile_menu.css("position", "fixed");
            var resizeFix = function () {
                if ($(window).width() > 991) {
                    mobile_menu.find("ul").show("fadeIn");
                    mobile_menu.find("ul.sub-menu").hide("fadeIn");
                }
            };
            resizeFix();
            return $(window).on("resize", resizeFix);
        });
    };

    $(document).ready(function () {
        $("#mobile-navbar-menu").menumaker({
            format: "multitoggle",
        });
    });
    /*-- canvas menu scripts end --*/

    /*-- staco scroll top scripts start --*/
    var stacoScrollTop = document.querySelector(".staco-scroll-top");
    if (stacoScrollTop != null) {
        var scrollProgressPatch = document.querySelector(".staco-scroll-top path");
        var pathLength = scrollProgressPatch.getTotalLength();
        var offset = 50;
        scrollProgressPatch.style.transition = scrollProgressPatch.style.WebkitTransition = "none";
        scrollProgressPatch.style.strokeDasharray = pathLength + " " + pathLength;
        scrollProgressPatch.style.strokeDashoffset = pathLength;
        scrollProgressPatch.getBoundingClientRect();
        scrollProgressPatch.style.transition = scrollProgressPatch.style.WebkitTransition =
            "stroke-dashoffset 10ms linear";
        window.addEventListener("scroll", function (event) {
            var scroll = document.body.scrollTop || document.documentElement.scrollTop;
            var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var progress = pathLength - (scroll * pathLength) / height;
            scrollProgressPatch.style.strokeDashoffset = progress;
            var scrollElementPos = document.body.scrollTop || document.documentElement.scrollTop;
            if (scrollElementPos >= offset) {
                stacoScrollTop.classList.add("progress-done");
            } else {
                stacoScrollTop.classList.remove("progress-done");
            }
        });
        stacoScrollTop.addEventListener("click", function (e) {
            e.preventDefault();
            window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
        });
    }
    /*-- staco scroll top scripts end --*/

    /*-- venobox start --*/
    var myVideoLink = $(".my-video-links");
    if (myVideoLink.length) {
        new VenoBox({
            selector: ".my-video-links",
        });
    }
    /*-- venobox end --*/

    /*-- image rotate when scrolling scripts start --*/
    var rotateIconSection = $(".rotate-icon-btn");
    if (rotateIconSection.length) {
        $(window).on("scroll", function () {
            var rotateIconBtn = $(".rotate-icon-btn");
            var y = window.scrollY;
            var x;
            var rotateIcon;
            rotateIconBtn.each(function (i, item) {
                x = item.offsetTop;
                rotateIcon = $(this).find(".rotate-icon");
                x = x - 400;
                if (y > x) {
                    rotateIcon.css("transform", "rotate(-45deg)");
                } else {
                    rotateIcon.css("transform", "rotate(0deg)");
                }
            });
        });
    }
    /*-- image rotate when scrolling scripts end --*/

    /*-- usability slider start --*/
    var usabilitySliderFor = $(".usability-slider-for");
    if (usabilitySliderFor.length) {
        $(".usability-slider-for").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            asNavFor: ".usability-slider-nav",
            autoplay: true,
            fade: true,
            autoplaySpeed: 6000,
            infinite: true,
            pauseOnHover: false,
            pauseOnFocus: false,
        });
    }

    var usabilitySliderNav = $(".usability-slider-nav");
    if (usabilitySliderNav.length) {
        $(".usability-slider-nav").slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: ".usability-slider-for",
            dots: false,
            centerMode: true,
            focusOnSelect: true,
        });
    }
    /*-- usability slider end --*/

    /*-- v6 quote slider Start --*/
    var sliderQuoteFor = $(".slider-quote-for");
    if (sliderQuoteFor.length) {
        $(".slider-quote-for").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            autoplay: true,
            autoplaySpeed: 2000,
            infinite: true,
            asNavFor: ".slider-quote-nav",
        });
    }

    var sliderQuoteNav = $(".slider-quote-nav");
    if (sliderQuoteNav.length) {
        $(".slider-quote-nav").slick({
            slidesToShow: 5,
            slidesToScroll: false,
            dots: false,
            arrows: false,
            centerMode: true,
            focusOnSelect: true,
            infinite: true,
            asNavFor: ".slider-quote-for",
        });
    }
    /*-- v6 quote slider End --*/

    /*-- v6 benefits slider Start --*/
    var sliderbenefitsFor = $(".slider-benefits-for");
    if (sliderbenefitsFor.length) {
        $(".slider-benefits-for").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            autoplay: true,
            autoplaySpeed: 3000,
            infinite: true,
            asNavFor: ".slider-benefits-nav",
            pauseOnHover: false,
            pauseOnFocus: false,
        });
    }

    var sliderbenefitsNav = $(".slider-benefits-nav");
    if (sliderbenefitsNav.length) {
        $(".slider-benefits-nav").slick({
            slidesToShow: 4,
            slidesToScroll: false,
            dots: false,
            arrows: false,
            centerMode: true,
            focusOnSelect: true,
            infinite: true,
            asNavFor: ".slider-benefits-for",
        });
    }
    /*-- v6 benefits slider End --*/

    /*-- v8 weOffering slider Start --*/
    var offeringSlider = $(".we-offering-slider");
    if (offeringSlider.length) {
        $(".we-offering-slider").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            autoplay: true,
            autoplaySpeed: 3000,
            infinite: true,
            asNavFor: ".we-offering-slider-nav",
            pauseOnHover: false,
            pauseOnFocus: false,
        });
    }

    var offeringSlider = $(".we-offering-slider-nav");
    if (offeringSlider.length) {
        $(".we-offering-slider-nav").slick({
            slidesToShow: 5,
            slidesToScroll: false,
            dots: false,
            arrows: false,
            centerMode: true,
            focusOnSelect: true,
            autoplay: true,
            infinite: true,
            asNavFor: ".we-offering-slider",
        });
    }
    /*-- v8 weOffering slider End --*/

    /*-- marketingImg counter scroll effect start --*/
    var marketingImg = $(".marketing-img.v2");
    if (marketingImg.length) {
        let isAnimated = 0;
        function counterEffect() {
            if (isAnimated == 0) {
                const counterItem = document.querySelectorAll(".counter");
                counterItem.forEach((item) => {
                    var counterText = item.innerText;
                    item.innerText = "0";
                    const updateCounter = () => {
                        let dataTarget = +item.getAttribute("data-target");
                        if (dataTarget > 999) {
                            dataTarget = dataTarget / 1000;
                        }
                        counterText = +item.innerText;
                        let increment = dataTarget / 1000;
                        if (counterText < dataTarget) {
                            item.innerText = `${Math.ceil(counterText + increment)}`;
                            setTimeout(updateCounter, 1);
                        }
                    };
                    updateCounter();
                });
            }
        }
        $(window).on("scroll", function () {
            var counterItem = $(".marketing-img.v2");
            var y = window.scrollY;
            var x = counterItem.offset().top;
            x = x - 400;

            if (y > x && y < x - 400 + screen.height) {
                counterEffect();
                isAnimated++;
            } else {
                isAnimated = 0;
            }
        });
    }
    /*-- marketingImg counter scroll effect end --*/

    /*-- circular progress start --*/
    var pieProgress = $(".pie_progress");
    if (pieProgress.length) {
        $(".pie_progress").asPieProgress({
            namespace: "pie_progress",
            goal: 100,
            min: 0,
            max: 100,
            speed: 15,
            barcolor: "#00CEC9",
            barsize: "10",
            trackcolor: "#00CEC933",
            easing: "linear",
        });
        $(".pie_progress").asPieProgress("start");
    }
    /*-- circular progress end --*/

    /*-- Testimonial slider scripts start --*/
    var testimonialSliderNav = $(".testimonial-slider-nav");
    if (testimonialSliderNav.length) {
        $(".testimonial-slider-nav").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: ".testimonial-slider-for",
            dots: false,
            arrows: false,
            centerMode: true,
            focusOnSelect: true,
        });
    }

    var testimonialSliderFor = $(".testimonial-slider-for");
    if (testimonialSliderFor.length) {
        $(".testimonial-slider-for").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            asNavFor: ".testimonial-slider-nav",
            autoplay: true,
            autoplaySpeed: 5000,
            infinite: true,
            pauseOnHover: false,
            pauseOnFocus: false,
        });

        var sliderInfoContainer = document.createElement("div");
        sliderInfoContainer.classList.add("slider-info");
        sliderInfoContainer.innerHTML =
            '<div class="slider-arrow left"><span class="iconify" data-icon="bi:arrow-left"></span></div><div class="slider-counter"><p></p></div><div class="slider-arrow right"><span class="iconify" data-icon="bi:arrow-right"></span></div>';
        testimonialSliderFor.append(sliderInfoContainer);

        var sliderCounter = sliderInfoContainer.querySelector(".slider-counter p");
        sliderCounter.innerHTML = "1/5";

        var updateSliderCounter = function (slick, currentIndex) {
            currentSlide = slick.slickCurrentSlide() + 1;
            slidesCount = slick.slideCount;
            sliderCounter.innerHTML = currentSlide + "/" + slidesCount;
        };

        testimonialSliderFor.on("init", function (event, slick) {
            updateSliderCounter(slick);
        });

        testimonialSliderFor.on("afterChange", function (event, slick, currentSlide) {
            updateSliderCounter(slick, currentSlide);
        });

        var sliderArrowLeft = $(".slider-arrow.left");
        sliderArrowLeft.on("click", function () {
            $(".testimonial-slider-for").slick("slickPrev");
        });
        var sliderArrowRight = $(".slider-arrow.right");
        sliderArrowRight.on("click", function () {
            $(".testimonial-slider-for").slick("slickNext");
        });
    }

    var testimonialCardLeft = $(".testimonial-card-left .img-4");
    if (testimonialCardLeft.length) {
        $(window).on("scroll", function () {
            var testimonialCard = $(".testimonial-card-left .img-4");
            var y = window.scrollY;
            var x = testimonialCard.offset().top;
            var rotateIcon = testimonialCard.find(".rotate-icon");
            x = x - 400;
            if (y > x) {
                rotateIcon.css("transform", "rotate(-45deg)");
            } else {
                rotateIcon.css("transform", "rotate(0deg)");
            }
        });
    }
    /*-- Testimonial slider scripts end --*/

    /*-- compare price icon scripts start --*/
    var comparePriceCardIcon = $(".compare-price-card-icon");
    if (comparePriceCardIcon.length) {
        $(window).on("scroll", function () {
            var comparePriceIcon = $(".compare-price-card-icon");
            var y = window.scrollY;
            var x = comparePriceIcon.offset().top;
            var rotateIcon = comparePriceIcon.find(".rotate-icon");
            x = x - 400;
            if (y > x) {
                rotateIcon.css("transform", "rotate(90deg)");
            } else {
                rotateIcon.css("transform", "rotate(0deg)");
            }
        });
    }
    /*-- compare price icon scripts end --*/

    /*-- index2-statistics-content section start --*/
    var index2StatisticsContent = $(".index2-statistics-content");
    if (index2StatisticsContent.length) {
        let isAnimated = 0;
        function counterEffect() {
            if (isAnimated == 0) {
                const counterItem = document.querySelectorAll(".counter");
                counterItem.forEach((item) => {
                    var counterText = item.innerText;
                    item.innerText = "0";
                    const updateCounter = () => {
                        let dataTarget = +item.getAttribute("data-target");
                        if (dataTarget > 999) {
                            dataTarget = dataTarget / 1000;
                        }
                        counterText = +item.innerText;
                        let increment = dataTarget / 1000;
                        if (counterText < dataTarget) {
                            item.innerText = `${Math.ceil(counterText + increment)}`;
                            setTimeout(updateCounter, 1);
                        }
                    };
                    updateCounter();
                });
            }
        }
        $(window).on("scroll", function () {
            var counterItem = $(".index2-statistics-content");
            var y = window.scrollY;
            var x = counterItem.offset().top;
            x = x - 400;

            if (y > x && y < x - 400 + screen.height) {
                counterEffect();
                isAnimated++;
            } else {
                isAnimated = 0;
            }
        });
    }
    /*-- index2-statistics-content section end --*/

    /*-- about feature section start --*/
    var aboutFeatureSliderFor = $(".about-feature-slider-for");
    if (aboutFeatureSliderFor.length) {
        $(".about-feature-slider-for").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            asNavFor: ".about-feature-slider-nav",
            autoplay: true,
            autoplaySpeed: 6000,
            infinite: true,
            pauseOnHover: false,
            pauseOnFocus: false,
        });
    }

    var aboutFeatureSliderNav = $(".about-feature-slider-nav");
    if (aboutFeatureSliderNav.length) {
        $(".about-feature-slider-nav").slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: ".about-feature-slider-for",
            dots: false,
            centerMode: true,
            focusOnSelect: true,
        });
    }

    var aboutFeatureImg = $(".about-feature-img");
    if (aboutFeatureImg.length) {
        let isAnimated = 0;
        function counterEffect() {
            if (isAnimated == 0) {
                const counterItem = document.querySelectorAll(".counter");
                counterItem.forEach((item) => {
                    var counterText = item.innerText;
                    item.innerText = "0";
                    const updateCounter = () => {
                        let dataTarget = +item.getAttribute("data-target");
                        if (dataTarget > 999) {
                            dataTarget = dataTarget / 1000;
                        }
                        counterText = +item.innerText;
                        let increment = dataTarget / 1000;
                        if (counterText < dataTarget) {
                            item.innerText = `${Math.ceil(counterText + increment)}`;
                            setTimeout(updateCounter, 1);
                        }
                    };
                    updateCounter();
                });
            }
        }
        $(window).on("scroll", function () {
            var counterItem = $(".about-feature-img");
            var y = window.scrollY;
            var x = counterItem.offset().top;
            x = x - 400;

            if (y > x && y < x - 400 + screen.height) {
                counterEffect();
                isAnimated++;
            } else {
                isAnimated = 0;
            }
        });
    }
    /*-- about feature section end --*/

    /*-- pricing selector scripts start --*/
    var pricingSelector = $(".pricing-selector");
    if (pricingSelector.length) {
        $(".pricing-monthly-btn").on("click", function () {
            $("#pricing-selector").prop("checked", false);
            $(".pricing-monthly").css("display", "block");
            $(".pricing-yearly").css("display", "none");
        });

        $(".pricing-yearly-btn").on("click", function () {
            $("#pricing-selector").prop("checked", true);
            $(".pricing-monthly").css("display", "none");
            $(".pricing-yearly").css("display", "block");
        });

        $("#pricing-selector").on("change", function () {
            if (this.checked) {
                $(".pricing-monthly").css("display", "none");
                $(".pricing-yearly").css("display", "block");
            } else {
                $(".pricing-monthly").css("display", "block");
                $(".pricing-yearly").css("display", "none");
            }
        });
    }
    /*-- pricing selector scripts end --*/

    /*-- feature card scripts start --*/
    var featureCard = $(".feature-card");
    if (featureCard.length) {
        $(".feature-card").hover(
            function () {
                $(this).addClass("active");
                $(".feature-card.card-active").removeClass("active");
            },
            function () {
                $(this).removeClass("active");
                $(".feature-card.card-active").addClass("active");
            }
        );
    }
    /*-- feature card scripts start --*/

    /*-- best pricing selector scripts start --*/
    var bestPricingSelector = $(".best-pricing-selector");
    if (bestPricingSelector.length) {
        $(".best-pricing-monthly-btn").on("click", function () {
            $("#best-pricing-selector").prop("checked", false);
            $(".best-pricing-grid.monthly").css("display", "flex");
            $(".best-pricing-grid.yearly").css("display", "none");
            $(".best-pricing-monthly-btn").addClass("active");
            $(".best-pricing-yearly-btn").removeClass("active");
        });

        $(".best-pricing-yearly-btn").on("click", function () {
            $("#best-pricing-selector").prop("checked", true);
            $(".best-pricing-grid.monthly").css("display", "none");
            $(".best-pricing-grid.yearly").css("display", "flex");
            $(".best-pricing-monthly-btn").removeClass("active");
            $(".best-pricing-yearly-btn").addClass("active");
        });

        $("#best-pricing-selector").on("change", function () {
            if (this.checked) {
                $(".best-pricing-grid.monthly").css("display", "none");
                $(".best-pricing-grid.yearly").css("display", "flex");
                $(".best-pricing-monthly-btn").removeClass("active");
                $(".best-pricing-yearly-btn").addClass("active");
            } else {
                $(".best-pricing-grid.monthly").css("display", "flex");
                $(".best-pricing-grid.yearly").css("display", "none");
                $(".best-pricing-monthly-btn").addClass("active");
                $(".best-pricing-yearly-btn").removeClass("active");
            }
        });
    }
    /*-- best pricing selector scripts end --*/

    /*-- useful-feature section start --*/
    var usefulFeatureSliderFor = $(".useful-feature-slider-for");
    if (usefulFeatureSliderFor.length) {
        $(".useful-feature-slider-for").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            asNavFor: ".useful-feature-slider-nav",
            autoplay: true,
            autoplaySpeed: 6000,
            infinite: true,
            pauseOnHover: false,
            pauseOnFocus: false,
        });
    }

    var usefulFeatureSliderNav = $(".useful-feature-slider-nav");
    if (usefulFeatureSliderNav.length) {
        $(".useful-feature-slider-nav").slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: ".useful-feature-slider-for",
            dots: false,
            centerMode: true,
            focusOnSelect: true,
        });
    }
    /*-- useful-feature section end --*/

    /*-- compare price card start --*/
    var comparePriceCard = $(".compare-price-card");
    if (comparePriceCard.length) {
        var selectComparePrice = comparePriceCard.find("#select-compare-price");
        var basicPrice = comparePriceCard.find(".basic-price");
        var premiumPrice = comparePriceCard.find(".premium-price");
        var professionalPrice = comparePriceCard.find(".professional-price");

        selectComparePrice.on("change", function () {
            var $option = $(this).find("option:selected");
            var value = $option.val();
            if (value == "basic") {
                basicPrice.css("display", "block");
                premiumPrice.css("display", "none");
                professionalPrice.css("display", "none");
            } else if (value == "premium") {
                basicPrice.css("display", "none");
                premiumPrice.css("display", "block");
                professionalPrice.css("display", "none");
            } else if (value == "professional") {
                basicPrice.css("display", "none");
                premiumPrice.css("display", "none");
                professionalPrice.css("display", "block");
            } else {
                basicPrice.css("display", "block");
                premiumPrice.css("display", "none");
                professionalPrice.css("display", "none");
            }
        });
    }
    /*-- compare price card end --*/

    /*-- counter scrolling effect start --*/
    var counterCard = $(".counter-card");
    if (counterCard.length) {
        let isAnimated = 0;
        function counterEffect() {
            if (isAnimated == 0) {
                const counterItem = document.querySelectorAll(".counter");
                counterItem.forEach((item) => {
                    var counterText = item.innerText;
                    item.innerText = "0";
                    const updateCounter = () => {
                        let dataTarget = +item.getAttribute("data-target");
                        if (dataTarget > 999) {
                            dataTarget = dataTarget / 1000;
                        }
                        counterText = +item.innerText;
                        let increment = dataTarget / 1000;
                        if (counterText < dataTarget) {
                            item.innerText = `${Math.ceil(counterText + increment)}`;
                            setTimeout(updateCounter, 1);
                        }
                    };
                    updateCounter();
                });
            }
        }
        $(window).on("scroll", function () {
            var counterItem = $(".counter-card");
            var y = window.scrollY;
            var x = counterItem.offset().top;
            x = x - 400;

            if (y > x && y < x - 400 + screen.height) {
                counterEffect();
                isAnimated++;
            } else {
                isAnimated = 0;
            }
        });
    }
    /*-- counter scrolling effect end --*/

    /*-- hero Section 3 content scripts start --*/
    var heroSection3Content = $(".hero-section-3-content");
    if (heroSection3Content.length) {
        $(window).on("scroll", function () {
            var y = window.scrollY;
            var x = heroSection3Content.offset().top;
            x = x - 400;
            var item = document.querySelectorAll(".hero-section-3-content .item");
            var z = y / 15;
            if (y > x) {
                item[0].style.transform = "translate(-" + z + "px)";
                item[1].style.transform = "translate(-" + z / 2 + "px)";
                item[3].style.transform = "translate(" + z / 2 + "px)";
                item[4].style.transform = "translate(" + z + "px)";
                console.log(z);
            }
        });
    }
    /*-- hero Section 3 content scripts end --*/

    /*-- why choose scroll trigger start --*/
    var whyChooseContainer = $(".why-choose-container");
    if (whyChooseContainer.length) {
        gsap.registerPlugin(ScrollTrigger);

        const sections = gsap.utils.toArray(".section");
        let maxWidth = 0;
        let extraWidth = 0;

        const getMaxWidth = () => {
            maxWidth = 0;
            sections.forEach((section) => {
                maxWidth += section.offsetWidth;
                extraWidth = section.offsetWidth;
            });
            maxWidth += extraWidth / 2;
        };
        getMaxWidth();
        ScrollTrigger.addEventListener("refreshInit", getMaxWidth);

        gsap.to(sections, {
            x: () => `-${maxWidth - window.innerWidth}`,
            ease: "none",
            scrollTrigger: {
                trigger: ".wrapper",
                pin: true,
                scrub: true,
                end: () => `+=${maxWidth}`,
                invalidateOnRefresh: true,
            },
        });

        sections.forEach((sct, i) => {
            ScrollTrigger.create({
                trigger: sct,
                start: () =>
                    "top top-=" +
                    (sct.offsetLeft - window.innerWidth / 2) * (maxWidth / (maxWidth - window.innerWidth)),
                end: () => "+=" + 1170 + sct.offsetWidth * (maxWidth / (maxWidth - window.innerWidth)),
                toggleClass: { targets: sct, className: "active" },
            });
        });

        ScrollTrigger.refresh();

        gsap.registerPlugin(ScrollTrigger);
        gsap.to("progress", {
            value: 100,
            ease: "none",
            scrollTrigger: { scrub: 0.4 },
        });

        $(window).on("scroll", function () {
            var sect = $(".why-choose-section");
            var y = window.scrollY;
            var x = sect.offset().top;
            var sliderItem = sect.find(".section");
            var currentSliderItem = 0;
            if (y > x) {
                sliderItem.each(function (i, item) {
                    if ($(this).hasClass("active")) {
                        currentSliderItem = i;
                    }
                });
            }

            var whyChooseTab = $(".why-choose-tab");
            var tabBtn = whyChooseTab.find(".tab-btn");
            tabBtn.each(function (i, item) {
                if (i == currentSliderItem) {
                    $(this).addClass("active");
                } else {
                    $(this).removeClass("active");
                }
            });
        });
    }
    /*-- why choose scroll trigger end --*/

    /*-- Timer scripts start --*/
    var timerContent = $(".timer");
    if (timerContent.length) {
        function makeTimer() {
            var endTime = new Date("jan 15, 2023 02:15:13");
            var endTime = Date.parse(endTime) / 1000;
            var now = new Date();
            var now = Date.parse(now) / 1000;
            var timeLeft = endTime - now;
            var days = Math.floor(timeLeft / 86400);
            var hours = Math.floor((timeLeft - days * 86400) / 3600);
            var Xmas95 = new Date("December 25, 2022 23:15:30");
            var hour = Xmas95.getHours();
            var minutes = Math.floor((timeLeft - days * 86400 - hours * 3600) / 60);
            var seconds = Math.floor(timeLeft - days * 86400 - hours * 3600 - minutes * 60);
            if (hours < "10") {
                hours = "0" + hours;
            }
            if (minutes < "10") {
                minutes = "0" + minutes;
            }
            if (seconds < "10") {
                seconds = "0" + seconds;
            }
            $(".timer .days").html(days + "<span>d</span>");
            $(".timer .hours").html(hours + "<span>h</span>");
            $(".timer .minutes").html(minutes + "<span>m</span>");
            $(".timer .seconds").html(seconds + "<span>s</span>");
        }
        setInterval(function () {
            makeTimer();
        }, 1000);
    }
    /*-- Timer scripts end --*/

    /*-- index5 img effect when scrolling scripts start --*/
    var hero5 = $(".hero-section-index5");
    if (hero5.length) {
        $(window).on("scroll", function () {
            var indexVImg = $(".hero-section-index5");
            var y = window.scrollY;
            var x;
            var heroVImg;
            x = indexVImg.offset().top;
            heroVImg = indexVImg.find(".index5-hero-img img");
            x = x + 400;

            if (y > x) {
                heroVImg.css("transform", `rotateX(0deg)`);
            } else {
                heroVImg.css("transform", `rotateX(40deg)`);
            }

            var scrollSlider = $(".index5-scroll-carousel-section");
            var z = scrollSlider.offset().top;
            z = z - 500;
            var val = (-1 * y) / 4;
            var val2 = y / 4;
            if (y > z) {
                $(".slide-left").css("transform", `translateX(${val}px)`);
                $(".slide-right").css("transform", `translateX(${val2}px)`);
            }
        });
    }
    /*-- index5 img effect when scrolling scripts end --*/

    /*-- timeline start --*/
    var powerfullTemplateContent = $(".powerfull-template-content");
    if (powerfullTemplateContent.length) {
        $(window).on("scroll", function () {
            fnOnScroll();
        });

        $(window).on("resize", function () {
            fnOnResize();
        });

        var timelineListArea = $(".powerfull-template-content"),
            timelineInnerline = $(".timeline-innerline"),
            timelineProgress = $(".timeline-progress"),
            listItem = $(".powerfull-template-row"),
            agOuterHeight = $(window).outerHeight(),
            agHeight = $(window).height(),
            f = -1,
            agFlag = false;

        function fnOnScroll() {
            agPosY = $(window).scrollTop();

            fnUpdateFrame();
        }

        function fnOnResize() {
            agPosY = $(window).scrollTop();
            agHeight = $(window).height();

            fnUpdateFrame();
        }

        function fnUpdateWindow() {
            agFlag = false;

            f !== agPosY && ((f = agPosY), agHeight, fnUpdateProgress());
        }

        function fnUpdateProgress() {
            var agTop = listItem.last().offset().top;

            i = agTop + agPosY - $(window).scrollTop();

            a = timelineProgress.offset().top + agPosY - $(window).scrollTop();

            n = agPosY - a + agOuterHeight / 2;
            i <= agPosY + agOuterHeight / 2 && (n = i - a);
            timelineProgress.css({ height: n + "px" });

            listItem.each(function () {
                var agTop = $(this).offset().top;

                agTop + agPosY - $(window).scrollTop() < agPosY + 0.5 * agOuterHeight
                    ? $(this).addClass("active")
                    : $(this).removeClass("active");
            });
        }

        function fnUpdateFrame() {
            agFlag || requestAnimationFrame(fnUpdateWindow);
            agFlag = true;
        }
    }
    /*-- timeline end --*/

    /*-- happy customer slider start --*/
    var happyCustomerSliderFor = $(".happy-customer-slider-for");
    if (happyCustomerSliderFor.length) {
        $(".happy-customer-slider-for").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            prevArrow: "<img class='slick-prev' src='./assets/images/icons/arrow-left-black.svg' alt='prev'>",
            nextArrow: "<img class='slick-next' src='./assets/images/icons/arrow-right-black.svg' alt='next'>",
            asNavFor: ".happy-customer-slider-nav",
            autoplay: true,
            autoplaySpeed: 6000,
            infinite: true,
            pauseOnHover: false,
            pauseOnFocus: false,
        });

        var sliderCounter = document.createElement("div");
        sliderCounter.classList.add("slider-counter");
        happyCustomerSliderFor.append(sliderCounter);
        sliderCounter.innerHTML = "1/4";

        var updateSliderCounter = function (slick, currentIndex) {
            currentSlide = slick.slickCurrentSlide() + 1;
            slidesCount = slick.slideCount;
            sliderCounter.innerHTML = currentSlide + "/" + slidesCount;
        };

        happyCustomerSliderFor.on("init", function (event, slick) {
            updateSliderCounter(slick);
        });

        happyCustomerSliderFor.on("afterChange", function (event, slick, currentSlide) {
            updateSliderCounter(slick, currentSlide);
        });
    }

    var happyCustomerSliderNav = $(".happy-customer-slider-nav");
    if (happyCustomerSliderNav.length) {
        $(".happy-customer-slider-nav").slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: ".happy-customer-slider-for",
            dots: false,
            centerMode: true,
            focusOnSelect: true,
        });
    }
    /*-- happy customer slider end --*/

    /*-- feature team  slider start--*/
    var featureTeamSliderFor = $(".feature-team-slider-for");
    if (featureTeamSliderFor.length) {
        $(".feature-team-slider-for").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            asNavFor: ".feature-team-slider-nav",
            autoplay: true,
            autoplaySpeed: 6000,
            infinite: true,
            pauseOnHover: false,
            pauseOnFocus: false,
        });
    }

    var featureTeamSliderNav = $(".feature-team-slider-nav");
    if (featureTeamSliderNav.length) {
        $(".feature-team-slider-nav").slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: true,
            prevArrow: "<img class='slick-prev' src='./assets/images/icons/arrow-left-black.svg' alt='prev'>",
            nextArrow: "<img class='slick-next' src='./assets/images/icons/arrow-right-black.svg' alt='next'>",
            asNavFor: ".feature-team-slider-for",
            dots: false,
            centerMode: true,
            focusOnSelect: true,
        });
    }
    /*-- feature team  slider end --*/

    /*-- portfolio gallery start --*/
    var portfolioGallery = $(".portfolio-gallery");
    if (portfolioGallery.length) {
        $(window).on("scroll", function () {
            var container = $(".portfolio-gallery");
            var y = window.scrollY;
            var x;
            x = container.offset().top;
            x = x - 400;
            var val = (-1 * y) / 4;
            console.log(y);
            console.log(x);
            if (y > x) {
                container.css("transform", `translateX(${val}px)`);
            }
        });
    }
    /*-- portfolio gallery end --*/

    /*-- video start --*/
    var v6BannerImg = $(".v6-banner-img");
    if (v6BannerImg.length) {
        let stacoH6Video = document.getElementById("staco-h6-video");
        let stacoH6VideoControl = document.getElementById("staco-h6-video-control");
        stacoH6VideoControl.addEventListener("click", () => {
            if (stacoH6Video.paused) {
                stacoH6Video.play();
                stacoH6VideoControl.classList.remove("active");
            } else {
                stacoH6Video.pause();
                stacoH6VideoControl.classList.add("active");
            }
        });
    }
    /*-- video end --*/

    /*-- contact map start --*/
    var contactMap = $(".contact-map");
    if (contactMap.length) {
        function initialize() {
            $(".contact-map").each(function (index) {
                //Taking data attribute from map wrapper
                var mapLat = parseFloat($(this).data("lat"));
                var mapLng = parseFloat($(this).data("lng"));
                var mapZoom = parseInt($(this).data("zoom"));
                var mapType = $(this).data("maptype");

                //Processing wrapper data attribute to coordinate
                var mapOptions = {
                    center: {
                        lat: mapLat,
                        lng: mapLng,
                    },
                    zoom: mapZoom,
                    mapTypeId: mapType,
                    scrollwheel: false,
                };

                //Initiating map
                var map = new google.maps.Map(this, mapOptions);

                //Map Marker
                var marker = new google.maps.Marker({
                    position: {
                        lat: 40.713355,
                        lng: -74.005535,
                    },
                    map: map,
                    icon: "./assets/images/icons/map-marker.svg",
                });
            });
        }
        google.maps.event.addDomListener(window, "load", initialize);
        initialize();
    }
    /*-- contact map end --*/

    /*-- v7 Banner text slider Start--*/
    var sliderQuoteFor = $(".banner-text-slider-content");
    if (sliderQuoteFor.length) {
        $(".banner-text-slider-content").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: false,
            autoplay: true,
            autoplaySpeed: 1500,
            infinite: true,
            lazyLoad: "ondemand",
            fade: true,
            asNavFor: ".banner-text-slider",
        });
    }

    var sliderQuoteNav = $(".banner-text-slider");
    if (sliderQuoteNav.length) {
        $(".banner-text-slider").slick({
            slidesToShow: 3,
            slidesToScroll: false,
            dots: false,
            arrows: false,
            centerMode: true,
            focusOnSelect: true,
            infinite: true,
            lazyLoad: "ondemand",
            asNavFor: ".banner-text-slider-content",
        });
    }
    /*-- v7 Banner text slider End--*/

    /*--  Side Bar Sticky js Start--*/
    var sidebarSticky = $(".sidebar");
    if (sidebarSticky.length) {
        var sidebar = new StickySidebar(".sidebar", {
            topSpacing: 20,
            bottomSpacing: 20,
            containerSelector: ".main-content",
            innerWrapperSelector: ".sidebar__inner",
        });
    }
    /*--  Side Bar Sticky js End --*/

    /*-- compare plan js start --*/
    var comparePlansContent = $(".compare-plans-content");
    if (comparePlansContent.length) {
        if ($(window).innerWidth() <= 991) {
            function openTab(evt, tabName) {
                var i, tabcontent, tablinks;
                tabcontent = document.getElementsByClassName("pricingPlanTabcontent");
                for (i = 0; i < tabcontent.length; i++) {
                    tabcontent[i].style.display = "none";
                }
                tablinks = document.getElementsByClassName("pricingPlanTablinks");
                for (i = 0; i < tablinks.length; i++) {
                    tablinks[i].className = tablinks[i].className.replace(" active", "");
                }
                document.getElementById(tabName).style.display = "block";
                evt.currentTarget.className += " active";
            }

            // Get the element with id="defaultOpen" and click on it
            document.getElementById("pricingPlanTabDefaultOpen").click();
        }
    }
    /*-- compare plan js End --*/

    /*-- pricing Card Js Start --*/
    var pricingPlanSection = $(".pricing-plan-section");
    if (pricingPlanSection.length) {
        $(".pricing-plan-show-btn1").click(function () {
            $(".pricing-plan-show-btn1").toggleClass("active");
            $(".free-card").toggleClass("active");
        });

        $(".pricing-plan-show-btn2").click(function () {
            $(".pricing-plan-show-btn2").toggleClass("active");
            $(".growth-card").toggleClass("active");
        });

        $(".pricing-plan-show-btn3").click(function () {
            $(".pricing-plan-show-btn3").toggleClass("active");
            $(".business-card").toggleClass("active");
        });

        $(".pricing-plan-show-btn4").click(function () {
            $(".pricing-plan-show-btn4").toggleClass("active");
            $(".enterprise-card").toggleClass("active");
        });
    }
    /*-- pricing Card Js End --*/

    /*-- h6-bottom-section scripts start --*/
    var h6BottomSection = $(".h6-bottom-section");
    if (h6BottomSection.length) {
        $(window).on("scroll", function () {
            var item = $(".disclaimer-section");
            var y = window.scrollY;
            var x = h6BottomSection.offset().top;
            x = x - 400;

            if (y > x) {
                item.css("position", "sticky");
                item.css("bottom", "0");
                item.css("z-index", "-1");
            } else {
                item.css("position", "unset");
            }
        });
    }
    /*-- h6-bottom-section scripts end --*/

    /*-- footer area mouse move scripts start --*/
    var v7FooterArea = $(".v7-footer-area");
    if (v7FooterArea.length) {
        v7FooterArea.on("mousemove", function (e) {
            var x = e.screenX + "px";
            var y = e.screenY + "px";

            $(".footer-section-mash-gard").css({
                left: x,
                top: y,
            });
        });
    }
    /*-- footer area mouse move scripts end --*/
})(jQuery);
