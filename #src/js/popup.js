//получаю все объекты с классом (.popup-link)
const popupLinks = document.querySelectorAll('.popup-link'); 
//получаю тэг body для блокирования скролла
const body = document.querySelector('body');
//чтобы не скакал контент
const lockPadding = document.querySelectorAll('.lock-padding');

//чтобы не было двойных нажатий
let unlock = true;

//зависит от времени trantision в popup
const timeout = 800;

//проверка на поп-апы
if (popupLinks.length > 0) {
   for (let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      //при клике убираю с href заглушку #
      popupLink.addEventListener('click', function (e) {
         const popupName = popupLink.getAttribute('href').replace('#', '');
         const curentPopup = document.getElementById(popupName);
         //отправляю имя поп-апа для фукнции popupOpen
         popupOpen(curentPopup);
         //запрет на перезагрузку
         e.preventDefault();
      });
   }
}

//закрытия поп-апа для объекта с классом .close-popup
const popupCloseIcon = document.querySelectorAll('.close-popup')
if (popupCloseIcon.length > 0) {
   for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      //вешаю событие 'click'
      el.addEventListener('click', function (e) {
         //отправляю в функцию popupClose объект который является ближайшим родителем с классом .popup
         popupClose(el.closest('.popup'));
         e.preventDefault();
      });
   }
}

//Открытие поп-апа /передаем уже готовый объект
function popupOpen(curentPopup) {
   //проверка есть ли такой объект и открыта ли пременная unlock
   if (curentPopup && unlock) {
      //в видео вместо .popup-active был .open
      const popupActive = document.querySelector('.popup.popup-active');
      if (popupActive) {
         popupClose(popupActive, false);
      } else {
         bodyLock();
      }
      //добавляем класс .popup-active в видео был .open
      curentPopup.classList.add('popup-active');
      //событие при клике на темнную область для закрытия поп-апа
      curentPopup.addEventListener('click', function (e) {
         if (!e.target.closest('.popup__content')) {
            popupClose(e.target.closest('.popup'));
         }
      });
   }
}

//в видео класс был open вместо popup-active
function popupClose(popupActive, doUnlock = true) {
   if (unlock) {
      popupActive.classList.remove('popup-active');
      if (doUnlock) {
         bodyUnLock();
      }
   }
}

function bodyLock() {
   const lockPaddingValue = window.innerWidth - document.querySelector('.popup-wrapper').offsetWidth + 'px';

   if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
         const el = lockPadding[index];
         el.style.paddingRight = lockPaddingValue;
      }
   }
   body.style.paddingRight = lockPaddingValue;
   body.classList.add('lock');

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

function bodyUnLock() {
   setTimeout(function () {
      if (lockPadding.length > 0) {
         for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = '0px'
         }
      }
      body.style.paddingRight = '0px'
      body.classList.remove('lock');
   }, timeout);
}

document.addEventListener('keydown', function (e) {
   if (e.which === 27) {
      const popupActive = document.querySelector('.popup.popup-active');
      popupClose(popupActive);
   }
});

(function () {
   //проверяем поддержку
   if (!Element.prototype.closest) {
      //реализуем
      Element.prototype.closest = function (css) {
         var node = this;
         while (node) {
            if (node.matches(css)) return node;
            else node = node.parentElement;
         }
         return null;
      };
   }
})();

(function () {
   //проверяем поддержку
   if (!Element.prototype.matches) {
      //определяем свойство 
      Element.prototype.matches = Element.prototype.matchesSelector || 
         Element.prototype.webkitMatchesSelector ||
         Element.prototype.mozMatchesSelector ||
         Element.prototype.mszMatchesSelector;
   }
})();