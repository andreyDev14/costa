$(function () {

	// проекты на карте 
	$('.clients-map__item-icon').on('click', function () {
		$('.popup-clients .clients-projects__item-title').text($(this).parent().find('.clients-projects__item-title').text());
		$('.popup-clients .clients-projects__item-subtitle').text($(this).parent().find('.clients-projects__item-subtitle').text());

		let k = 0;
		if ($(this).parent().attr('data-group')) {
			let a = $(this).parent().attr('class');


			$('.clients-map__item').each(function (i, elem) {
				if ($(elem).hasClass(a)) {
					$('.popup-clients .clients-projects__item').first().clone().appendTo($('.popup-clients .popup__content'));
					$('.popup-clients .clients-projects__item').eq(k).find('.clients-projects__item-title').text($(this).find('.clients-projects__item-title').text());
					$('.popup-clients .clients-projects__item').eq(k).find('.clients-projects__item-subtitle').text($(this).find('.clients-projects__item-subtitle').text());
					k++;
				}
			})
			$('.popup-clients .clients-projects__item:last-child').remove();
		} else {
			$('.popup-clients .clients-projects__item').not('.popup-clients .clients-projects__item:last-child').remove();
		}
	})

	// Лайк
	$('.article__item-like').on('click', function (e) {
		e.preventDefault();
		if ($(this).hasClass('article__item-like_active')) {
			$(this).find('span').text(+$(this).find('span').text() - 1);
			$(this).toggleClass('article__item-like_active');
		} else {
			$(this).find('span').text(+$(this).find('span').text() + 1);
			$(this).toggleClass('article__item-like_active');
		}
	})

	// плавная прокрутка
	$('.scroll').click(function () {
		var scroll_el = $(this).attr('href');
		if ($(scroll_el).length != 0) {
			$('html, body').animate({
				scrollTop: $(scroll_el).offset().top - 160
			}, 800);
			$('.header__bottom').removeClass('header__bottom_active');
			$('.menu-link').removeClass('menu-link_active');
		}
		return false;
	});

	// Мобильное меню
	let link = $('.menu-link'),
		menu = $('.header__bottom');

	link.on('click', function (e) {
		e.preventDefault();
		link.toggleClass('menu-link_active');
		menu.toggleClass('header__bottom_active');
	});

	// Слайдер главная
	var headerSlider = new Swiper('.header-container', {
		loop: true,
		// autoplay: {
		// 	delay: 3500
		// },
		navigation: {
			nextEl: '.slide-next',
			prevEl: '.slide-prev',
		},
		slidesPerView: 1,
		speed: 600,
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		},
	})

	// Слайдер отзывов
	var feedbackSlider = new Swiper('.feedback-container', {
		loop: true,
		navigation: {
			nextEl: '.feedback-next-arrow',
			prevEl: '.feedback-prev-arrow',
		},
		speed: 600
	})

	// счетчик слайдеров
	let allSlide = $('.feedback__slider .swiper-slide').not('.swiper-slide-duplicate');
	$('.all-slide').text($(allSlide).length);
	feedbackSlider.on('slideChange', function () {
		$('.current-slide').text(feedbackSlider.realIndex + 1);
	});

	// Слайдер проектов
	var projectsSlider = new Swiper('.projects-container', {
		loop: true,
		navigation: {
			nextEl: '.slide-next-projects',
			prevEl: '.slide-prev-projects',
		},
		pagination: {
			el: '.swiper-pagination, swiper-pagination-projects',
			type: 'bullets',
			clickable: true
		},
		slidesPerView: 2,
		speed: 600,
		breakpoints: {
			300: {
				slidesPerView: 1
			},
			768: {
				slidesPerView: 2
			}
		}
	})

	// Слайдер клиентов
	var clientsSlider = new Swiper('.clients-container', {
		loop: true,
		navigation: {
			nextEl: '.slide-next-clients',
			prevEl: '.slide-prev-clients',
		},
		pagination: {
			el: '.swiper-pagination, swiper-pagination-clients',
			type: 'bullets',
			clickable: true
		},
		slidesPerView: 3,
		speed: 600,
		breakpoints: {
			300: {
				slidesPerView: 1
			},
			768: {
				slidesPerView: 2
			},
			992: {
				slidesPerView: 3
			}
		}
	})

	// выпадающее меню в мобильной версии 
	$(".menu-item-has-children span").append('<div class="carret"></div>');

	$('.carret').on('click', function (e) {
		e.preventDefault();

		$('.sub-menu').not($(this).parent().parent().parent().find('.sub-menu')).removeClass('sub-menu_active');
		$(this).parent().parent().parent().find('.sub-menu').toggleClass('sub-menu_active');

		$('.carret').not($(this).parent().find('.carret')).removeClass('carret_active');
		$(this).parent().find('.carret').toggleClass('carret_active')
	})

	// Фиксированное меню
	function fixedMenu() {
		if ($(window).width() > 991) {
			let s = $(window).scrollTop();
			if (s > 10) {
				$('.header__top-wrapper').addClass('header__top-wrapper_fixed');
				$(".header__right-top").after($(".header__bottom"));
			} else {
				$('.header__top-wrapper').removeClass('header__top-wrapper_fixed');
				$(".header__bottom-wrapper .container").append($(".header__bottom"));
			}
		}

		// карта
		if ($(window).width() < 1200) {
			$('.clients-map').addClass('clients-map-mobile');
			// $('.clients-map .clients-map__item').hide();

			$('.clients-map__item').addClass('clients-projects__item');
			$('.clients-projects-wrapper>a').attr('data-target', 'tab-3');
			$('.clients-projects-wrapper>a').hide();
			$('.clients-projects-wrapper>a').addClass('clients-map__item');
			$('.clients-projects-wrapper>*').appendTo('.clients-map');

			$('.clients-map .clients-map__item').hide();
			let tab = $('.clients-map__tabs .active').attr('data-tab');
			let elem = $('.clients-map-mobile .clients-map__item[data-target=' + tab + ']');
			elem.css({
				display: 'flex'
			});
		} else {
			$('.clients-map').removeClass('clients-map-mobile');
			$('.clients-map .clients-map__item').css({
				display: 'flex'
			});
			$('.clients-map__item').removeClass('clients-projects__item');

			$('.clients-map').find('a[data-target="tab-3"]').appendTo('.clients-projects-wrapper');
			$('.clients-projects-wrapper>a').show();
			// $('.clients-projects-wrapper a').removeClass('clients-map__item');
			$('.clients-projects-wrapper a').addClass('clients-projects__item');
			$('.clients-projects-wrapper a').removeClass('clients-map__item');
			$('.clients-projects-wrapper a').removeAttr('data-target');

		}

		// страница проекта
		if ($(window).width() > 991) {
			let numberItem = $('.number-wrapper-first .number__right .number__item:first-child').innerHeight();

			$('.number-wrapper-first .number__right .number__item').each(function (i, elem) {
				if ($(elem).innerHeight() > numberItem) {
					numberItem = $(elem).innerHeight();
				}
			})

			$('.number-wrapper-first .number__right .number__item').css({
				minHeight: numberItem + 4 + 'px'
			})

			$(".number-wrapper-first .number__item_big").css({
				minHeight: $('.number__right').height() - 51 + 'px'
			})

		} else {
			$('.number__item').removeAttr('style');
		}
	}

	fixedMenu();

	// Табы на карте 
	$('.clients-map__tabs button').on('click', function () {
		$('.clients-map__tabs button').removeClass('active');
		$(this).addClass('active');
		let tab = $(this).attr('data-tab');
		$('.clients-map-mobile .clients-map__item').hide();
		let elem = $('.clients-map-mobile .clients-map__item[data-target=' + tab + ']');
		elem.css({
			display: 'flex'
		});
	});

	$(".clients-map__button").on('click', function (e) {
		e.preventDefault();
		dataTab = $(this).parent().find('.clients-map__tabs button.active').attr('data-tab');

		$('.clients-map__item').each(function (i, elem) {
			if (dataTab == $(elem).attr('data-target')) {
				$(elem).css({
					'display': 'flex'
				})
			}
		})

		// $(".clients-map__item:hidden").slice(0, 200).css({ // 	'display': 'flex' // }); if ($(".clients-map__item:hidden").length == 0) {
		$(".clients-map__button").hide();
		// }
	});

	$(window).on('scroll', function () {
		fixedMenu();
	});

	$(window).resize(function () {
		fixedMenu();
		if ($(window).width() > 991) {
			$('.header__bottom').removeClass('header__bottom_active');
			$('.menu-link').removeClass('menu-link_active');
		} else {
			$('.header__top-wrapper').removeClass('header__top-wrapper_fixed');
			$('.carret').on('click', function (e) {
				e.preventDefault();

				$('.sub-menu').not($(this).parent().parent().parent().find('.sub-menu')).removeClass('sub-menu_active');
				$(this).parent().parent().parent().find('.sub-menu').toggleClass('sub-menu_active');

				$('.carret').not($(this).parent().find('.carret')).removeClass('carret_active');
				$(this).parent().find('.carret').toggleClass('carret_active')
			})
		}
	})

	// Вакансии
	$('.vacancy__bottom').slideUp();

	$('.vacancy__item').on('click', f_acc);

	function f_acc() {
		$('.vacancy__item_active').not(this).removeClass('vacancy__item_active');
		$(this).toggleClass('vacancy__item_active');

		$('.vacancy .more-button').not($(this).find('.more-button')).removeClass('active');

		$('.more-button span').text('Подробнее');
		if ($(this).hasClass('vacancy__item_active')) {
			$(this).find('.more-button span').text('Свернуть');
		} else {}
		$(this).find('.more-button').toggleClass('active');
		$('.vacancy__bottom').not($(this).find('.vacancy__bottom')).slideUp(400);
		$(this).find('.vacancy__bottom').slideToggle(400);
	}

	// Открытие/закрытие модальных окон
	$('.popup__close').on('click', function () {
		$('.popup').removeClass('flex');
	});

	$('.modal__button').on('click', function () {
		$('.header__bottom').removeClass('header__bottom_active');
		$('.menu-link').removeClass('menu-link_active');
		$('.popup-call').addClass('flex');
	});

	$('.clients-map__item').on('click', function (e) {
		if ($(window).width() > 1199) {
			e.preventDefault();
			$('.popup-clients').addClass('flex');
		} else {
			$('.header__bottom').removeClass('header__bottom_active');
			$('.menu-link').removeClass('menu-link_active');
		}
	});

	$('.popup form').on('submit', function (e) {
		e.preventDefault();
		$('.popup').removeClass('flex');
		$('.popup-thank').addClass('flex');
	});

	$('form').on('submit', function (e) {
		e.preventDefault();
		$('.popup-thank').addClass('flex');
	});

	$('.popup-thank__button').on('click', function () {
		$('.popup').removeClass('flex')();
	})

});