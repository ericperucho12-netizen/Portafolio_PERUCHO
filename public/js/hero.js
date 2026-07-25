// ═══════════════════════════════════════════════
// OCEAN ENTRY — Splash Screen Controller
// Audio · Foam Particles · Dive Transition
// ═══════════════════════════════════════════════

(function () {
  'use strict';

  // ─── LOCK SCROLL while splash is visible ─────
  var oceanEntry = document.getElementById('ocean-entry');
  if (oceanEntry) {
    document.body.style.overflow = 'hidden';
  }

  // ─── OCEAN AUDIO CONTROLLER ───────────────────
  var audio = document.getElementById('ocean-audio');
  var toggleBtn = document.getElementById('audio-toggle');
  var soundOnIcon = document.getElementById('sound-on-icon');
  var soundOffIcon = document.getElementById('sound-off-icon');

  var isPlaying = false;

  function updateAudioIcons() {
    if (!soundOnIcon || !soundOffIcon) return;
    if (isPlaying) {
      soundOnIcon.classList.remove('hidden');
      soundOffIcon.classList.add('hidden');
    } else {
      soundOnIcon.classList.add('hidden');
      soundOffIcon.classList.remove('hidden');
    }
  }

  if (audio && toggleBtn) {
    audio.volume = 0.12;

    toggleBtn.addEventListener('click', function () {
      if (isPlaying) {
        audio.pause();
        isPlaying = false;
      } else {
        audio.play().catch(function () {});
        isPlaying = true;
      }
      updateAudioIcons();
    });

    // Attempt autoplay (browsers usually block this)
    var playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(function () {
        isPlaying = true;
        updateAudioIcons();
      }).catch(function () {
        isPlaying = false;
        updateAudioIcons();
      });
    }
  }

  // ─── FOAM PARTICLES ──────────────────────────
  var foamContainer = document.getElementById('foam-container');
  var foamInterval = null;

  function spawnFoam() {
    if (!foamContainer) return;

    var particle = document.createElement('div');
    var size = Math.random() * 5 + 2;
    var x = Math.random() * 100;
    var y = 74 + Math.random() * 8;
    var duration = Math.random() * 3 + 2.5;
    var dx = (Math.random() - 0.5) * 50;
    var dy = -(Math.random() * 20 + 5);

    particle.style.cssText =
      'position:absolute;' +
      'left:' + x + '%;' +
      'top:' + y + '%;' +
      'width:' + size + 'px;' +
      'height:' + size + 'px;' +
      'background:rgba(255,255,255,0.5);' +
      'border-radius:50%;' +
      'pointer-events:none;' +
      '--foam-dx:' + dx + 'px;' +
      '--foam-dy:' + dy + 'px;' +
      'animation:foamDrift ' + duration + 's ease-out forwards;';

    foamContainer.appendChild(particle);

    setTimeout(function () {
      if (particle.parentNode) particle.remove();
    }, duration * 1000 + 200);
  }

  if (foamContainer) {
    foamInterval = setInterval(spawnFoam, 350);
    for (var i = 0; i < 6; i++) {
      setTimeout(spawnFoam, Math.random() * 1200);
    }
  }

  // ─── DIVE BUTTON — Trigger the transition ────
  var diveBtn = document.getElementById('dive-btn');

  if (diveBtn && oceanEntry) {
    diveBtn.addEventListener('click', function () {
      // Start audio on user interaction (bypasses autoplay block)
      if (audio && !isPlaying) {
        audio.play().catch(function () {});
        isPlaying = true;
        updateAudioIcons();
      }

      // Trigger dive animation
      oceanEntry.classList.add('diving');

      // After animation completes, remove splash and unlock scroll
      oceanEntry.addEventListener('animationend', function () {
        // Stop foam generation
        if (foamInterval) clearInterval(foamInterval);

        // Remove the splash overlay
        oceanEntry.remove();

        // Unlock scroll
        document.body.style.overflow = '';
      });
    });
  }

})();
