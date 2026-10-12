const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');

if (menuToggle && primaryNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    primaryNav.classList.toggle('is-open', !isOpen);
  });

  primaryNav.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
      primaryNav.classList.remove('is-open');
    }
  });
}

const galleryItems = [...document.querySelectorAll('.gallery-item')];
const lightbox = document.querySelector('.lightbox');

if (galleryItems.length && lightbox) {
  const lightboxImage = lightbox.querySelector('.lightbox-image');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const lightboxCounter = lightbox.querySelector('.lightbox-counter');
  let activeIndex = 0;

  const showImage = (index) => {
    activeIndex = (index + galleryItems.length) % galleryItems.length;
    const selected = galleryItems[activeIndex];
    lightboxImage.src = selected.dataset.full;
    lightboxImage.alt = selected.querySelector('img').alt;
    lightboxCaption.textContent = selected.dataset.title;
    lightboxCounter.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(galleryItems.length).padStart(2, '0')}`;
  };

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      showImage(index);
      lightbox.showModal();
    });
  });

  lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.querySelector('.lightbox-prev').addEventListener('click', () => showImage(activeIndex - 1));
  lightbox.querySelector('.lightbox-next').addEventListener('click', () => showImage(activeIndex + 1));
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') showImage(activeIndex - 1);
    if (event.key === 'ArrowRight') showImage(activeIndex + 1);
  });
}
