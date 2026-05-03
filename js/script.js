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

document.querySelectorAll('.form').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    closeAllModals();
    openModal('thanks-modal');

    form.reset();
  });
});
