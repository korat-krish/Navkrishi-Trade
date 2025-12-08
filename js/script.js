
  // Home Page
  const revealEl = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealEl.forEach(el => io.observe(el));

    // ---------- Product scroller: single-card scroll + center card detection ----------
    (function () {
      const scroller = document.getElementById('scroller');
      const prev = document.getElementById('prevBtn');
      const next = document.getElementById('nextBtn');

      // determine card width including gap
      function cardWidth() {
        const card = scroller.querySelector('.product-card');
        const style = getComputedStyle(scroller);
        const gap = parseInt(style.gap || style.columnGap || 18);
        return card.offsetWidth + gap;
      }

      // click handlers: move exactly one card
      prev.addEventListener('click', () => { scroller.scrollBy({ left: -cardWidth(), behavior: 'smooth' }); });
      next.addEventListener('click', () => { scroller.scrollBy({ left: cardWidth(), behavior: 'smooth' }); });

      // touch / wheel: allow natural swipe. Add snap to nearest card after scroll ends
      let isScrolling;
      scroller.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => snapToCard(), 90);
        highlightCenter();
      });

      // snap to nearest card
      function snapToCard() {
        const scrollLeft = scroller.scrollLeft;
        const w = cardWidth();
        const index = Math.round(scrollLeft / w);
        scroller.scrollTo({ left: index * w, behavior: 'smooth' });
      }

      // highlight center card (scale + class)
      function highlightCenter() {
        const cards = Array.from(scroller.querySelectorAll('.product-card'));
        const viewportCenter = scroller.scrollLeft + (scroller.offsetWidth / 2);
        let closest = null;
        let minDist = Infinity;
        cards.forEach(c => {
          const rect = c.getBoundingClientRect();
          const cCenter = (c.offsetLeft - scroller.scrollLeft) + (c.offsetWidth / 2);
          const dist = Math.abs(viewportCenter - (scroller.scrollLeft + cCenter));
          if (dist < minDist) { minDist = dist; closest = c; }
          c.classList.remove('center');
        });
        if (closest) closest.classList.add('center');
      }

      // init highlight
      window.addEventListener('load', () => highlightCenter());
      window.addEventListener('resize', () => highlightCenter());

      // keyboard nav
      document.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') next.click();
        if (e.key === 'ArrowLeft') prev.click();
      });

      // allow mouse wheel (horizontal) while pressing Shift for convenience
      scroller.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
          e.preventDefault();
          scroller.scrollBy({ left: e.deltaY + e.deltaX, behavior: 'auto' });
        }
      }, { passive: false });
    })();

    // small parallax effect for banner background on scroll
    (function () {
      const banner = document.querySelector('.banner');
      if (!banner) return;
      window.addEventListener('scroll', () => {
        const offset = window.scrollY * 0.15;
        banner.style.backgroundPositionY = `${offset}px`;
      }, { passive: true });
    })();

    // process step micro animation: hover + reveal
    document.querySelectorAll('.process .step').forEach((el, i) => {
      el.style.transitionDelay = (i * 80) + 'ms';
      el.addEventListener('mouseenter', () => el.style.transform = 'translateY(-8px) scale(1.01)');
      el.addEventListener('mouseleave', () => el.style.transform = 'none');
    });
  
    // form

   