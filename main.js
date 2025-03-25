const carousel = document.querySelector('.carousel-container');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
const searchInput = document.getElementById('search');
const filterRadios = document.querySelectorAll('.filter-radio');
const resetButton = document.getElementById('reset-filters');
const cards = document.querySelectorAll('.card');
const burgerMenu = document.querySelector('.burger-menu');
const navMenu = document.querySelector('.nav-menu');

let currentIndex = 0;

function updateCarousel() {
  const cardWidth = carousel.querySelector('.card').offsetWidth + 30; // Ширина карточки + отступ
  carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

nextButton.addEventListener('click', () => {
  const totalCards = carousel.children.length;
  const visibleCards = Math.floor(carousel.offsetWidth / (carousel.querySelector('.card').offsetWidth + 20));
  if (currentIndex < totalCards - visibleCards) {
    currentIndex++;
    updateCarousel();
  }
});






// Функция для фильтрации карточек
function filterCards() {
  // Получаем выбранные фильтры
  const categoryFilter = Array.from(filterRadios)
    .find(radio => radio.name === 'category' && radio.checked)?.dataset.filter || 'all';
  const priceFilter = Array.from(filterRadios)
    .find(radio => radio.name === 'price' && radio.checked)?.dataset.filter || 'all';
  const availFilter = Array.from(filterRadios)
    .find(radio => radio.name === 'availabe' && radio.checked)?.dataset.filter || 'all';
  // Получаем текст поиска
  const query = searchInput.value.toLowerCase();

  let hasResults = false; // Флаг для проверки наличия результатов

  // Фильтруем карточки
  cards.forEach(card => {
    const cardCategories = card.dataset.category.split(' ');
    const title = card.querySelector('h3').textContent.toLowerCase();
    const description = card.querySelector('p').textContent.toLowerCase();

    // Условие для фильтров
    const matchesCategory = categoryFilter === 'all' || cardCategories.includes(categoryFilter);
    const matchesPrice = priceFilter === 'all' || cardCategories.includes(priceFilter);
    const matchesAvail = availFilter === 'all' || cardCategories.includes(availFilter);

    // Условие для поиска
    const matchesSearch = title.includes(query) || description.includes(query);

    // Показываем или скрываем карточку
    if (matchesCategory && matchesPrice && matchesSearch && matchesAvail) {
      card.style.display = 'flex';
      hasResults = true; // Есть хотя бы одна карточка
    } else {
      card.style.display = 'none';
    }
  });

  // Показываем/скрываем сообщение об отсутствии результатов
  const noResultsMessage = document.getElementById('no-results');
  if (!hasResults) {
    noResultsMessage.style.display = 'block';
  } else {
    noResultsMessage.style.display = 'none';
  }
}

// Обработчик для кнопки сброса
resetButton.addEventListener('click', () => {
  // Очищаем поле поиска
  searchInput.value = '';

  // Возвращаем все радиокнопки в исходное состояние
  filterRadios.forEach(radio => {
    if (radio.dataset.filter === 'all') {
      radio.checked = true;
    } else {
      radio.checked = false;
    }
  });

  // Применяем фильтрацию заново
  filterCards();
});

// Обработчики событий для фильтров
filterRadios.forEach(radio => {
  radio.addEventListener('change', filterCards);
});

// Обработчик события для поиска
searchInput.addEventListener('input', filterCards);

document.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('.section');

  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight * 1) {
      section.classList.add('visible');
    }
  });
});


burgerMenu.addEventListener('click', () => {
  navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
});

// document.addEventListener('DOMContentLoaded', () => {
//   const carouselContainer = document.querySelector('.swiper-wrapper');

//   // Находим все карточки внутри контейнера
//   const cards = document.querySelectorAll('.card');

//   // Оборачиваем каждую карточку в swiper-slide
//   cards.forEach(card => {
//     const slide = document.createElement('div');
//     slide.classList.add('swiper-slide');
//     card.parentNode.replaceChild(slide, card);
//     slide.appendChild(card);
//   });

//   // Инициализируем Swiper.js
//   const swiper = new Swiper('.swiper', {
//     slidesPerView: 'auto',
//     spaceBetween: 20,
//     navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//     },
//     pagination: {
//       el: '.swiper-pagination',
//       clickable: true,
//     },
//   });
// });

// document.addEventListener('DOMContentLoaded', () => {
//   const swiper = new Swiper('.swiper', {
//     // Основные параметры
//     slidesPerView: 'auto', // Автоматическая ширина слайдов
//     spaceBetween: 20, // Отступы между слайдами
//     centeredSlides: false, // Центрировать активный слайд

//     // Навигация
//     navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//     },

//     // Пагинация
//     pagination: {
//       el: '.swiper-pagination',
//       clickable: true,
//     },

//     // Адаптивность
//     breakpoints: {
//       768: {
//         slidesPerView: 2, // Два слайда на экране при ширине > 768px
//       },
//       1024: {
//         slidesPerView: 3, // Три слайда на экране при ширине > 1024px
//       },
//     },
//   });
// });