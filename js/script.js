const menuBurger = document.querySelector('.header__burger');
const menuBody = document.querySelector('.menu__body');
if (menuBurger) {
   menuBurger.addEventListener("click", function (e) {
      document.body.classList.toggle('_lock');
      menuBurger.classList.toggle('_active');
      menuBody.classList.toggle('_active');
   });
}

/*scrollTo*/

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
   menuLinks.forEach(menuLink => {
      menuLink.addEventListener("click", onMenuLinkClick);
   });

   function onMenuLinkClick(e) {
      const menuLink = e.target;
      if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
         const gotoBlock = document.querySelector(menuLink.dataset.goto);
         const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

         if (menuBurger.classList.contains('_active')) {
            document.body.classList.remove('_lock');
            menuBurger.classList.remove('_active');
            menuBody.classList.remove('_active');
         }

         window.scrollTo({
            top: gotoBlockValue,
            behavior: "smooth"
         });
         e.preventDefault();
      }
   }
}

/*scrollTo*/



const isMobile = {
   Android: function () {
      return navigator.userAgent.match(/Android/i);
   },
   BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
   },
   iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
   },
   Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
   },
   Windows: function () {
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
   },
   any: function () {
      return (
         isMobile.Android() ||
         isMobile.BlackBerry() ||
         isMobile.iOS() ||
         isMobile.Opera() ||
         isMobile.Windows());
   }
};

if (isMobile.any()) {
   document.body.classList.add('_mobile')

   let menuArrows = document.querySelectorAll('.menu__arrow');
   if (menuArrows.length > 0) {
      for (let index = 0; index < menuArrows.length; index++) {
         const menuArrow = menuArrows[index];
         menuArrow.addEventListener('click', function (e) {
            menuArrow.parentElement.classList.toggle('_active')
         })
      }
   }
} else {
   document.body.classList.add('_comp')
}
















const sliderFirst = new Swiper('.project__slider', {
   // Optional parameters
   loop: true,
   slidesPerView: 1,
   slideToClickedSlide: true,
   thumbs: {
      swiper: {
         el: '.project-image__slider',
         slidesPerView: 8,
         spaceBetween: 5,
      },
   },
}
)


function addZero(num) {
   return (num > 9) ? num : '0' + num;
}

const swiper = new Swiper('.slider',
   {
      // Optional parameters

      loop: false,
      slidesPerView: 1,
      effect: "fade",
      autoplay: {
         delay: 5000,
      },
      autoplay: {
         delay: 5000,
      },



      // If we need pagination

      pagination: {
         el: '.slider__pagination',
         type: 'fraction',

         formatFractionCurrent: addZero,
         formatFractionTotal: addZero,
         renderFraction: function (currentClass, totalClass) {
            return '<span class="' + currentClass + '"></span>' + '<span class="swiper-pagination-slash">|</span>' + '<span class="' + totalClass + '"></span>';
         },
      },

      // Navigation arrows
      navigation: {
         nextEl: '.slider__arrow--right',
         prevEl: '.slider__arrow--left',
      },

      // And if we need scrollbar
      scrollbar: {
         el: '.swiper-scrollbar',
         draggable: true,

      },
   },
);


const spoilersArray = document.querySelectorAll('[data-spoilers]');
if (spoilersArray.length > 0) {
   const spoilersRegular = Array.from(spoilersArray).filter(function (item, index, self) {
      return !item.dataset.spoilers.split(",")[0];
   });

   if (spoilersRegular.length > 0) {
      initSpoilers(spoilersRegular);
   }

   const spoilersMedia = Array.from(spoilersArray).filter(function (item, index, self) {
      return item.dataset.spoilers.split(",")[0];
   });

   if (spoilersMedia.length > 0) {
      const breakpointsArray = [];
      spoilersMedia.forEach(item => {
         const params = item.dataset.spoilers;
         const breakpoint = {};
         const paramsArray = params.split(",");
         breakpoint.value = paramsArray[0];
         breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
         breakpoint.item = item;
         breakpointsArray.push(breakpoint);
      });



      let MediaQueries = breakpointsArray.map(function (item) {
         return '(' + item.type + "-width:" + item.value + "px)," + item.value + ',' + item.type;
      });
      MediaQueries = MediaQueries.filter(function (item, index, self) {
         return self.indexOf(item) === index;
      });



      MediaQueries.forEach(breakpoint => {
         const paramsArray = breakpoint.split(",");
         const mediaBreakpoint = paramsArray[1];
         const mediaType = paramsArray[2];
         const matchMedia = window.matchMedia(paramsArray[0]);

         const spoilersArray = breakpointsArray.filter(function (item) {
            if (item.value === mediaBreakpoint && item.type === mediaType) {
               return true;
            }
         });

         matchMedia.addListener(function () {
            initSpoilers(spoilersArray, matchMedia);
         });
         initSpoilers(spoilersArray, matchMedia);
      });
   }

   function initSpoilers(spoilersArray, matchMedia = false) {
      spoilersArray.forEach(spoilersBlock => {
         spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;
         if (matchMedia.matches || !matchMedia) {
            spoilersBlock.classList.add("_init");
            initSpoilerBody(spoilersBlock);
            spoilersBlock.addEventListener("click", setSpoilerAction);
         } else {
            spoilersBlock.classList.remove("_init");
            initSpoilerBody(spoilersBlock, false);
            spoilersBlock.removeEventListener("click", setSpoilerAction);
         }
      });
   }



   function initSpoilerBody(spoilersBlock, hideSpoilerBody = true) {
      const spoilerTitles = spoilersBlock.querySelectorAll('[data-spoiler]');
      if (spoilerTitles.length > 0) {
         spoilerTitles.forEach(spoilerTitle => {
            if (hideSpoilerBody) {
               spoilerTitle.removeAttribute('tabindex');
               if (!spoilerTitle.classList.contains("_active")) {
                  spoilerTitle.nextElementSibling.hidden = true;
               }
            } else {
               spoilerTitle.setAttribute("tabindex", "-1");
               spoilerTitle.nextElementSibling.hidden = false;
            }
         });
      }
   }



   function setSpoilerAction(e) {
      const el = e.target;
      if (el.hasAttribute("data-spoiler") || el.closest('[data-spoiler]')) {
         const spoilerTitle = el.hasAttribute('data-spoiler') ? el : el.closest('[data-spoiler]');
         const spoilersBlock = spoilerTitle.closest('[data-spoilers]');
         const oneSpoiler = spoilersBlock.hasAttribute('data-one-spoiler') ? true : false;
         if (!spoilersBlock.querySelectorAll('._slide').length) {
            if (oneSpoiler && !spoilerTitle.classList.contains('_active')) {
               hideSpoilersBody(spoilersBlock);
            }
            spoilerTitle.classList.toggle('_active');
            _slideToggle(spoilerTitle.nextElementSibling, 500);
         }
         e.preventDefault();
      }
   }

   function hideSpoilersBody(spoilersBlock) {
      const spoilerActiveTitle = spoilersBlock.querySelector('[data-spoiler]._active');
      if (spoilerActiveTitle) {
         spoilerActiveTitle.classList.remove('_active');
         _slideUp(spoilerActiveTitle.nextElementSibling, 500);
      }
   }
}




let _slideUp = (target, duration = 500) => {
   if (!target.classList.contains('_slide')) {
      target.classList.add('_slide');
      target.style.transitionProperty = 'height, margin, padding';
      target.style.transitionDuration = duration + 'ms';
      target.style.height = target.offsetHeight + 'px';
      target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      window.setTimeout(() => {
         target.hidden = true;
         target.style.removeProperty('height');
         target.style.removeProperty('padding-top');
         target.style.removeProperty('padding-bottom');
         target.style.removeProperty('margin-top');
         target.style.removeProperty('margin-bottom');
         target.style.removeProperty('overflow');
         target.style.removeProperty('transition-duration');
         target.style.removeProperty('transition-property');
         target.classList.remove('_slide');
      }, duration);
   }
}
let _slideDown = (target, duration = 500) => {
   if (!target.classList.contains('_slide')) {
      target.classList.add('_slide');
      if (target.hidden) {
         target.hidden = false;
      }
      let height = target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      target.offsetHeight;
      target.style.transitionProperty = 'height, margin, padding';
      target.style.transitionDuration = duration + 'ms';
      target.style.height = target.offsetHeight + 'px';
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      window.setTimeout(() => {
         target.style.removeProperty('height');
         target.style.removeProperty('overflow');
         target.style.removeProperty('transition-duration');
         target.style.removeProperty('transition-property');
         target.classList.remove('_slide');
      }, duration);
   }
}
let _slideToggle = (target, duration = 500) => {
   if (target.hidden) {
      return _slideDown(target, duration);
   } else {
      return _slideUp(target, duration);
   }
}



const blogSlider = new Swiper('.blog__slider', {

   slidesPerView: 3,
   spaceBetween: 20,

   breakpoints: {
      300: {
         slidesPerView: 1,
      },
      567: {
         slidesPerView: 1,
      },
      768: {
         slidesPerView: 2,
      },
      993: {
         slidesPerView: 3,
      }
   },

   pagination: {
      el: '.blog__pages',
   },


});