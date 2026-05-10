const modals = document.querySelectorAll('.modal');

// відкрити модалку
function openModal(id) {
  document.getElementById(id).classList.add('active');
  document.body.style.overflow = 'hidden';
}

// закрити всі
function closeAllModals() {
  modals.forEach((modal) => modal.classList.remove('active'));
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-modal]').forEach((btn) => {
  btn.addEventListener('click', () => {
    openModal(btn.dataset.modal);
  });
});

modals.forEach((modal) => {
  modal.addEventListener('click', (e) => {
    if (
      e.target.classList.contains('modal__overlay') ||
      e.target.classList.contains('modal__close')
    ) {
      closeAllModals();
    }
  });
});

// document.querySelectorAll('.form').forEach((form) => {
//   form.addEventListener('submit', (e) => {
//     e.preventDefault();

//     closeAllModals();
//     openModal('thanks-modal');

//     form.reset();
//   });
// });

document.querySelectorAll('.form').forEach((form) => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const phoneInput = form.querySelector('input[type="tel"]');

    const phone = phoneInput.value;

    try {
      const response = await fetch('../send.php', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          phone,
        }),
      });

      const result = await response.json();

      if (result.success) {
        closeAllModals();
        openModal('thanks-modal');

        form.reset();
      } else {
        alert('Помилка відправки');
      }
    } catch (error) {
      console.error(error);
      alert('Помилка сервера');
    }
  });
});

// openModal('projects-modal');

const allProjects = document.querySelectorAll('.projects__item');

allProjects.forEach((prItem, id) => {
  if (id > 5) {
    prItem.classList.add('projects__item--hidden');
  }
});

const projectsBtn = document.querySelector('.projects__btn');

projectsBtn.addEventListener('click', () => {
  allProjects.forEach((project) => project.classList.remove('projects__item--hidden'));

  projectsBtn.style.display = 'none';
});

//PROJECTS
import { projectsData } from './projectsData.js';

const projectsModal = document.getElementById('projects-modal');

const modalTitle = projectsModal.querySelector('.modal-projects__name');

const modalTexts = projectsModal.querySelectorAll('.modal-projects__text');

const swiperWrapper = projectsModal.querySelector('.swiper-wrapper');

document.querySelectorAll('.projects__item-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const projectId = button.dataset.project;

    const project = projectsData[projectId];

    if (!project) return;

    // title
    modalTitle.textContent = project.name;

    // descriptions
    modalTexts[0].textContent = project.description[0] || '';
    modalTexts[1].textContent = project.description[1] || '';

    // slider images
    swiperWrapper.innerHTML = '';

    project.images.forEach((image) => {
      swiperWrapper.innerHTML += `
        <div class="swiper-slide">
          <img src="${image}" alt="${project.name}">
        </div>
      `;
    });

    // reopen swiper
    if (window.projectSwiper) {
      window.projectSwiper.destroy(true, true);
    }

    window.projectSwiper = new Swiper('.swiper', {
      // Optional parameters
      // direction: 'vertical',
      loop: true,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
        bulletActiveClass: 'active',
        clickable: true,
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        addIcons: false,
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });

    openModal('projects-modal');
  });
});

//MENU
const menuBtn = document.querySelector('.burger');
const navList = document.querySelector('.nav__list');
menuBtn.addEventListener('click', () => {
  navList.classList.toggle('active');
  menuBtn.classList.toggle('active');
});
