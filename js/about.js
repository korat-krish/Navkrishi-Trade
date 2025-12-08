AOS.init({ duration: 900, once: true });

    // animate trend bars when in view
    const barsWrap = document.getElementById('trendBars');
    function animateBars() {
      if (!barsWrap) return;
      const bars = barsWrap.querySelectorAll('.bar > i');
      bars.forEach(i => {
        const w = i.getAttribute('data-width') || '20%';
        setTimeout(() => i.style.width = w, 100);
      });
    }

    // simple intersection observer
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          animateBars();
          obs.disconnect();
        }
      });
    }, { threshold: .25 });
    if (barsWrap) obs.observe(barsWrap);