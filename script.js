document.addEventListener('DOMContentLoaded', () => {

  // 1. Dark Mode Toggle
  const themeToggleBtn = document.getElementById('theme-toggle');
  themeToggleBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const icon = themeToggleBtn.querySelector('i');
    if (document.documentElement.classList.contains('dark')) {
      icon.className = 'fa-solid fa-sun';
    } else {
      icon.className = 'fa-solid fa-moon';
    }
  });

  // 2. Mobile Menu Navigation Toggling
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // 3. Project Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Live Interactive Postcard Text Synchronization
  const inputHeading = document.getElementById('input-heading');
  const inputTo = document.getElementById('input-to');
  const inputMessage = document.getElementById('input-message');

  const previewHeading = document.getElementById('preview-heading');
  const previewTo = document.getElementById('preview-to');
  const previewMessage = document.getElementById('preview-message');

  inputHeading?.addEventListener('input', (e) => {
    previewHeading.textContent = e.target.value || "Greetings";
  });

  inputTo?.addEventListener('input', (e) => {
    previewTo.textContent = `To: ${e.target.value || "Visitor"}`;
  });

  inputMessage?.addEventListener('input', (e) => {
    previewMessage.textContent = `"${e.target.value}"`;
  });

  // 5. Copy Postcard Note to Clipboard
  document.getElementById('copy-postcard-btn')?.addEventListener('click', () => {
    const cardContent = `${previewHeading.textContent} | ${previewTo.textContent} | ${previewMessage.textContent}`;
    navigator.clipboard.writeText(cardContent);
    alert('Postcard content copied to clipboard!');
  });

  // 6. Contact Form Dispatch Simulation
  const contactForm = document.getElementById('contact-form');
  const formToast = document.getElementById('form-toast');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    formToast.classList.remove('hidden');
  });

  // Copy Email Helper
  document.getElementById('copy-email-btn')?.addEventListener('click', () => {
    navigator.clipboard.writeText('jeah@lacra.design');
    const status = document.getElementById('copy-status');
    status.textContent = ' — Copied!';
    setTimeout(() => { status.textContent = ''; }, 2000);
  });
});

// Helper Functions
function resetForm() {
  document.getElementById('contact-form').reset();
  document.getElementById('form-toast').classList.add('hidden');
}

function closeMobileMenu() {
  document.getElementById('mobile-menu').classList.add('hidden');
}

// Modal Functions
function openDossier() {
  document.getElementById('dossier-modal').classList.remove('hidden');
}

function closeDossier() {
  document.getElementById('dossier-modal').classList.add('hidden');
}

function openModal(title, desc, imgUrl) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-desc').textContent = desc;
  document.getElementById('modal-img').src = imgUrl;
  document.getElementById('case-modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('case-modal').classList.add('hidden');
}
let currentImages = [];
let currentSlideIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    // Event listener para sa mga "View Details" buttons
    document.querySelectorAll('.open-gallery-btn').forEach(button => {
        button.addEventListener('click', () => {
            const title = button.getAttribute('data-title');
            const desc = button.getAttribute('data-desc');
            const rawImages = button.getAttribute('data-images');
            
            // I-convert ang comma-separated list ng images papuntang array
            const images = rawImages.split(',').map(img => img.trim());
            openGalleryModal(title, desc, images);
        });
    });

    // Navigation arrow listeners
    document.getElementById('prev-btn')?.addEventListener('click', () => changeSlide(-1));
    document.getElementById('next-btn')?.addEventListener('click', () => changeSlide(1));
});

function openGalleryModal(title, description, images) {
    currentImages = images;
    currentSlideIndex = 0;

    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-desc').textContent = description;

    updateCarousel();

    const modal = document.getElementById('case-modal');
    modal.classList.remove('hidden');
}

function closeModal() {
    const modal = document.getElementById('case-modal');
    modal.classList.add('hidden');
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    if (currentSlideIndex < 0) {
        currentSlideIndex = currentImages.length - 1;
    } else if (currentSlideIndex >= currentImages.length) {
        currentSlideIndex = 0;
    }
    updateCarousel();
}

function updateCarousel() {
    const imgElement = document.getElementById('modal-img');
    const dotsContainer = document.getElementById('carousel-dots');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    imgElement.src = currentImages[currentSlideIndex];

  
    if (currentImages.length <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        dotsContainer.style.display = 'none';
        return;
    }

    prevBtn.style.display = 'block';
    nextBtn.style.display = 'block';
    dotsContainer.style.display = 'flex';

    dotsContainer.innerHTML = '';
    currentImages.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = `dot ${index === currentSlideIndex ? 'active' : ''}`;
        dot.onclick = () => {
            currentSlideIndex = index;
            updateCarousel();
        };
        dotsContainer.appendChild(dot);
    });
}