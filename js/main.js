

$(function () {
    var
    sections = $('.section'),
    display = $('.main'),
    screen = 0,
    inscroll = false;

    sections.filter(':first-child').addClass('active');

    var scrollToSection = function (sectionEq) {
        var position = 0;

        if (!inscroll) {
            inscroll = true;

            position = (sections.eq(sectionEq).index() * -100) + '%';

            sections.eq(sectionEq).addClass('active')
            .siblings().removeClass('active');

            display.css({
                'transform' :  'translate3d(0,' + position + ', 0)'
            });

            setTimeout(function () {
                inscroll = false;

                $('.fixed-menu__item').eq(sectionEq).addClass('active')
                .siblings().removeClass('active');
            }, 1300)
        }
    }

    document.querySelector('.wrapper')
    .addEventListener('wheel', function (e) {

        var activeSection = sections.filter('.active');

        if (!inscroll) {

                if (e.deltaY > 0) { //скроллим вниз
                    if (activeSection.next().length) {
                        screen = activeSection.next().index();
                    }
                }

                if (e.deltaY < 0) { //спроллим вверх
                    if (activeSection.prev().length) {
                        screen = activeSection.prev().index()
                    }
                }

                scrollToSection(screen);
            }
        });

    $('.first__sparrow').on('click', function(e){
        e.preventDefault();   //отменяем дефолтное действие при нажании на ссылку

        scrollToSection(1);
    });

    $('.top__menu__link, .fixed-menu__link, .btn_slider, .btn_order')
    .on('click', function(e){
            e.preventDefault();   //отменяем дефолтное действие при нажании на ссылку

            scrollToSection(parseInt($(this).attr('href')));
        });
});


//----CAROUSEL

$(document).ready(function(){
  var burgerCarousel = $('.owl-carousel').owlCarousel({
    items : 1,
    loop : true
});

  $('.burger_slider__btn_next').on('click', function(e){
    e.preventDefault();   //отменяем дефолтное действие при нажании на ссылку
    burgerCarousel.trigger('next.owl.carousel');

});

  $('.burger_slider__btn_prev').on('click', function(e){
    e.preventDefault();   //отменяем дефолтное действие при нажании на ссылку
    burgerCarousel.trigger('prev.owl.carousel');

});

//---ACCORDION TEAM

$('.team__trigger').on('click', function(e){
    e.preventDefault();   //отменяем дефолтное действие при нажании на ссылку

    var $this = $(this),
    item = $this.closest('.team__item'),
    container = $this.closest('.team-accordion'),
    items = container.find('.team__item'),
    content = item.find('.team__desc'),
    otherContent = container.find('.team__desc');


    if (!item.hasClass("team__item_active")) {  ///если у айтема нет класса эктив, то откроем
        items.removeClass('team__item_active');  // у всех блоков удалим активный класс
        item.addClass('team__item_active');   //добавим выбранному блоку нужный класс
        // otherContent.slideUp();    //Перед тем как открыть выбранный контент, весь остальной контент скроем
        content.slideDown(1000);   //показываем выбранный контент

    } else {
        item.removeClass('team__item_active'); //удаляем класс
        content.slideUp();    //скрываем выбранный контент
    }
});



//-----Меню Аккордеон

$(function(){
    $('.menu-acco__trigger').on('click', function(e){
        e.preventDefault();  //отменяем дефолтное действие при нажании на ссылку

        var $this = $(this),
        container = $this.closest('.menu-acco');
        item = $this.closest('.menu-acco__item');
        items = container.find('.menu-acco__item');
        activeItem = items.filter('.menu-acco__item_active');
        content = item.find('.menu-acco__content');
        activeContent = activeItem.find('.menu-acco__content');

        if (!item.hasClass('menu-acco__item_active')) {

            items.removeClass('menu-acco__item_active');
            item.addClass("menu-acco__item_active");

                // activeContent.animate({  //Скрываем активный контент
                //     "width" : "0px"
                // });

                // content.animate({
                //     "width" : "540px"
                // });

            } else {
                item.removeClass("menu-acco__item_active");
                // content.animate({
                //     "width" :"0px"
                // });
            }
        });

    $(document).on('click', function(e){
        var $this = e.target
    })
});


// input mask

$(function(){

    $('.phone-mask').inputmask('+7 (999) 999 99 99')

});

//---FANCY BOX


$(function(){
    $('.btn_reviews').fancybox({
        type : 'inline',
        maxWidth : 460,
        fitToView : false,
        padding : 0
    });

    $('.full-review__close').on('click', function(e){
        e.preventDefault();

        $.fancybox.close();

    });
});



//----MAIL



$(function(){
    $('#order-form').on('submit', function(e){
        e.preventDefault();

        var
            form = $(this),
            formData = form.serialize();

        $.post('../mail.php', formData, function (data) {
            var popup = data.status ? '#success' : '#error';

            $.fancybox.open([
                { href: popup }
            ], {
                type: 'inline',
                maxWidth : 250,
                fitToView : false,
                padding : 0,
                afterClose : function () {
                    form.trigger('reset');
                }
            });
        });
    });
    
    $('.status-popup__close').on('click', function(e){
        e.preventDefault();
        $.fancybox.close();
    });
}());




$(function () {
    ymaps.ready(init);
    var myMap;

    function init(){
        myMap = new ymaps.Map("map", {
            center: [59.93916998692174,30.309015096732622],
            zoom: 11,
            controls : [],
        });

        var coords = [
                [59.94554327989287,30.38935262114668],
                [59.91142323563909,30.50024587065841],
                [59.88693161784606,30.319658102103713],
                [59.97033574821672,30.315194906302924],
            ],
            myCollection = new ymaps.GeoObjectCollection({}, {
                draggable: false,
                iconLayout: 'default#image',
                iconImageHref: '../img/icons/map-marker.svg',
                iconImageSize: [46, 57],
                iconImageOffset: [-26, -52]
            });

        for (var i = 0; i < coords.length; i++) {
            myCollection.add(new ymaps.Placemark(coords[i]));
        }

        myMap.geoObjects.add(myCollection);

        myMap.behaviors.disable('scrollZoom');
    }
});



});