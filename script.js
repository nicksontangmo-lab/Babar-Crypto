// Render Lucide icons (loaded via CDN as a global `lucide` object)
if (window.lucide) {
  lucide.createIcons();
}

// ---------------------------------------------------------------------
// Scroll-reveal: fade-up entrance the first time a section scrolls into view
// ---------------------------------------------------------------------
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// ---------------------------------------------------------------------
// Curriculum: clicking a module row crossfades the matching illustration
// ---------------------------------------------------------------------
const moduleRows = document.querySelectorAll('.module-row');
const illustrations = document.querySelectorAll('.illustration');

function setActiveModule(index) {
  moduleRows.forEach((row) => {
    const isActive = row.dataset.index === String(index);
    row.classList.toggle('is-active', isActive);
    row.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  illustrations.forEach((illu) => {
    const isActive = illu.dataset.index === String(index);
    illu.classList.toggle('is-active', isActive);
  });
}

moduleRows.forEach((row) => {
  row.addEventListener('click', () => setActiveModule(row.dataset.index));

  row.addEventListener('keydown', (event) => {
    const currentIndex = moduleRows.indexOf ? moduleRows.indexOf(row) : Array.from(moduleRows).indexOf(row);
    let nextIndex = null;

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % moduleRows.length;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + moduleRows.length) % moduleRows.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = moduleRows.length - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      moduleRows[nextIndex].focus();
      setActiveModule(moduleRows[nextIndex].dataset.index);
    }
  });
});
