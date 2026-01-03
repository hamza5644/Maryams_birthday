document.addEventListener('DOMContentLoaded', () => {
  // SET YOUR TARGET DATE HERE
  const targetDate = new Date("2026-01-03T21:45:00").getTime();
  
  const timerEl = document.getElementById('timer');
  const unlockBtn = document.getElementById('unlockBtn');
  const lockScreen = document.getElementById('lockScreen');
  const mainContent = document.getElementById('mainContent');
  const music = document.getElementById('bgMusic');

  // TIMER LOGIC
  const updateTimer = () => {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff > 0) {
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      
      timerEl.innerHTML = `${d}d ${h}h ${m}m ${s}s`;
      timerEl.classList.remove('hidden');
      unlockBtn.classList.add('hidden');
    } else {
      timerEl.classList.add('hidden');
      unlockBtn.classList.remove('hidden');
      clearInterval(timerInterval);
    }
  };

  const timerInterval = setInterval(updateTimer, 1000);
  updateTimer();

  // UNLOCK ACTION
  unlockBtn.addEventListener('click', () => {
    lockScreen.style.opacity = '0';
    setTimeout(() => {
      lockScreen.classList.add('hidden');
      mainContent.classList.remove('hidden');
      music.play();
      music.volume = 0.3;
    }, 1000);
  });

  // PHOTO OVERLAY
  const overlay = document.getElementById('photoOverlay');
  const overlayImg = document.getElementById('overlayImg');

  document.querySelectorAll('.photo-item img').forEach(img => {
    img.addEventListener('click', () => {
      overlayImg.src = img.src;
      overlay.classList.remove('hidden');
    });
  });

  overlay.addEventListener('click', () => overlay.classList.add('hidden'));

  // REVEAL OBSERVER
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.photo-item, .message-card, .reveal-up').forEach(el => {
    revealObserver.observe(el);
  });

});

