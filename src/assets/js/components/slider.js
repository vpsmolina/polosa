let slider = $(".future__slider");

slider.slick({
    arrows: false,
    dots: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 3,
});

$(".future__arrow--prev").on("click", function (event) {
    event.preventDefault();
    slider.slick('slickPrev');
});

$(".future__arrow--next").on("click", function (event) {
    event.preventDefault();
    slider.slick('slickNext');
});
