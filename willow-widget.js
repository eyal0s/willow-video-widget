/*!
 * Willow — Meet Willow Video Bubble
 * Drop this file on a CDN and load it from Webflow with:
 *   <script src="https://your-cdn/willow-widget.js" defer></script>
 *
 * Tweak the CONFIG block below to change video sources, copy, position, size.
 */
(function () {
  if (window.__willowWidgetLoaded) return;
  window.__willowWidgetLoaded = true;

  // ====================== CONFIG ======================
  var CONFIG = {
    youtubeId: '7xtJqSdP7ak',
    bubbleMp4: 'https://res.cloudinary.com/dyvjgm447/video/upload/q_auto/f_auto/v1779873685/willow-loop-bubble_uho4mq.mp4',
    ctaText: 'Meet Willow 👋',
    ariaLabel: 'Watch: Meet Willow',
    bubbleSize: '96px',          // desktop bubble diameter
    bubbleSizeMobile: '76px',    // mobile bubble diameter
    offsetRight: '20px',
    offsetBottom: '20px'
  };
  // ====================================================

  var CSS = `
  .willow-wrap {
    --willow-bubble-size: ${CONFIG.bubbleSize};
    --willow-bubble-size-mobile: ${CONFIG.bubbleSizeMobile};
    --willow-offset-right: ${CONFIG.offsetRight};
    --willow-offset-bottom: ${CONFIG.offsetBottom};
    --willow-green: #4f7a3d;
    --willow-green-dark: #3f6330;
    --willow-cream: #f5f1ea;
    --willow-ink: #1f2a24;
    --willow-bubble-bg: #fff;

    position: fixed;
    right: var(--willow-offset-right);
    bottom: var(--willow-offset-bottom);
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 14px;
    font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif;
    transition: transform .25s cubic-bezier(.2,.8,.2,1), opacity .25s ease;
  }
  .willow-wrap.willow-hidden {
    transform: translateY(20px) scale(.9);
    opacity: 0;
    pointer-events: none;
  }
  .willow-cta {
    position: relative;
    background: var(--willow-bubble-bg);
    color: var(--willow-ink);
    font-size: 14px;
    font-weight: 500;
    line-height: 1.3;
    padding: 10px 14px;
    border-radius: 16px 16px 4px 16px;
    box-shadow: 0 6px 18px rgba(31, 42, 36, 0.18);
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    transition: transform .2s ease, box-shadow .2s ease;
    transform-origin: 100% 100%;
    animation: willow-pop-in .5s cubic-bezier(.2,.9,.3,1.2) .4s both;
  }
  .willow-cta:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 22px rgba(31, 42, 36, 0.22);
  }
  .willow-cta::after {
    content: "";
    position: absolute;
    right: -7px;
    bottom: 10px;
    width: 0; height: 0;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    border-left: 9px solid var(--willow-bubble-bg);
    filter: drop-shadow(2px 1px 1px rgba(31, 42, 36, 0.06));
  }
  @keyframes willow-pop-in {
    0%   { transform: scale(.2) translate(20px, 10px); opacity: 0; }
    100% { transform: scale(1) translate(0, 0);        opacity: 1; }
  }
  .willow-bubble {
    position: relative;
    width: var(--willow-bubble-size);
    height: var(--willow-bubble-size);
    border-radius: 50%;
    overflow: visible;
    background: #000;
    box-shadow: 0 10px 24px rgba(31, 42, 36, 0.28), 0 2px 6px rgba(31, 42, 36, 0.18);
    cursor: pointer;
    border: 3px solid var(--willow-cream);
    transition: transform .25s cubic-bezier(.2,.8,.2,1);
    flex-shrink: 0;
  }
  .willow-bubble:hover { transform: scale(1.06); }
  .willow-bubble:active { transform: scale(.97); }
  .willow-bubble__media {
    width: 100%; height: 100%;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
  }
  .willow-bubble__media video {
    width: 100%; height: 100%;
    object-fit: cover; display: block;
  }
  .willow-bubble::before {
    content: "";
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    border: 2px solid var(--willow-green);
    opacity: 0;
    animation: willow-pulse 2.4s ease-out infinite;
    pointer-events: none;
  }
  @keyframes willow-pulse {
    0%   { transform: scale(1);    opacity: .55; }
    100% { transform: scale(1.35); opacity: 0; }
  }
  .willow-bubble__play {
    position: absolute;
    right: -2px; bottom: -2px;
    width: 26px; height: 26px;
    border-radius: 50%;
    background: var(--willow-green);
    border: 2px solid var(--willow-cream);
    display: flex; align-items: center; justify-content: center;
    z-index: 2;
  }
  .willow-bubble__play svg {
    width: 9px; height: 9px;
    fill: #fff;
    margin-left: 1px;
  }
  .willow-bubble__close {
    position: absolute;
    top: -6px; right: -6px;
    width: 22px; height: 22px;
    border-radius: 50%;
    background: var(--willow-ink);
    border: 2px solid var(--willow-cream);
    color: #fff;
    font-size: 12px; line-height: 1;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    padding: 0;
    opacity: 0;
    transform: scale(.7);
    transition: opacity .2s, transform .2s;
    z-index: 3;
  }
  .willow-bubble:hover .willow-bubble__close,
  .willow-bubble:focus-within .willow-bubble__close {
    opacity: 1;
    transform: scale(1);
  }
  .willow-lightbox {
    position: fixed;
    inset: 0;
    background: rgba(31, 42, 36, 0.88);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: 10000;
    display: none;
    align-items: center;
    justify-content: center;
    padding: 24px;
    cursor: pointer;
    opacity: 0;
    transition: opacity .2s ease;
  }
  .willow-lightbox.willow-open { display: flex; opacity: 1; }
  .willow-lightbox__frame {
    position: relative;
    width: 100%;
    max-width: 1100px;
    cursor: default;
  }
  .willow-lightbox__player {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
    background: #000;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0,0,0,.5);
  }
  .willow-lightbox__player iframe {
    position: absolute;
    inset: 0;
    width: 100%; height: 100%;
    border: 0;
  }
  .willow-lightbox__close {
    position: absolute;
    top: -56px; right: 0;
    width: 44px; height: 44px;
    border-radius: 50%;
    background: rgba(255,255,255,.12);
    border: 1px solid rgba(255,255,255,.2);
    color: #fff;
    font-size: 22px; line-height: 1;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    padding: 0;
    transition: background .2s ease, transform .2s ease;
  }
  .willow-lightbox__close:hover {
    background: rgba(255,255,255,.2);
    transform: scale(1.06);
  }
  @media (max-width: 640px) {
    .willow-wrap { right: 14px; bottom: 14px; gap: 10px; }
    .willow-bubble {
      width: var(--willow-bubble-size-mobile);
      height: var(--willow-bubble-size-mobile);
      border-width: 2px;
    }
    .willow-bubble__play { width: 22px; height: 22px; }
    .willow-bubble__close { opacity: 1; transform: scale(1); }
    .willow-cta { font-size: 13px; padding: 9px 12px; }
    .willow-lightbox { padding: 16px; }
    .willow-lightbox__close {
      top: auto; bottom: -56px;
      right: 50%;
      transform: translateX(50%);
    }
    .willow-lightbox__close:hover { transform: translateX(50%) scale(1.06); }
  }
  @media (prefers-reduced-motion: reduce) {
    .willow-wrap,
    .willow-bubble,
    .willow-bubble::before,
    .willow-cta { transition: none; animation: none; }
  }
  `;

  var HTML = `
  <div class="willow-wrap" id="willowWrap">
    <div class="willow-cta" id="willowCta" role="button" tabindex="0" aria-label="${CONFIG.ariaLabel}">
      ${CONFIG.ctaText}
    </div>
    <div class="willow-bubble" id="willowBubble" role="button" tabindex="0" aria-label="${CONFIG.ariaLabel}">
      <div class="willow-bubble__media">
        <video id="willowThumb" muted loop playsinline preload="metadata" aria-hidden="true">
          <source src="${CONFIG.bubbleMp4}" type="video/mp4">
        </video>
      </div>
      <div class="willow-bubble__play" aria-hidden="true">
        <svg viewBox="0 0 12 12"><path d="M2 1.2v9.6L11 6z"/></svg>
      </div>
      <button class="willow-bubble__close" id="willowClose" aria-label="Dismiss">×</button>
    </div>
  </div>
  <div class="willow-lightbox" id="willowLightbox" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Meet Willow video">
    <div class="willow-lightbox__frame">
      <button class="willow-lightbox__close" id="willowLightboxClose" aria-label="Close video">×</button>
      <div class="willow-lightbox__player">
        <iframe id="willowYouTube" title="Meet Willow" src=""
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen></iframe>
      </div>
    </div>
  </div>
  `;

  function mount() {
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    var container = document.createElement('div');
    container.innerHTML = HTML;
    while (container.firstChild) document.body.appendChild(container.firstChild);

    var YT_SRC = 'https://www.youtube.com/embed/' + CONFIG.youtubeId +
                 '?autoplay=1&rel=0&modestbranding=1&playsinline=1';

    var wrap = document.getElementById('willowWrap');
    var bubble = document.getElementById('willowBubble');
    var cta = document.getElementById('willowCta');
    var thumb = document.getElementById('willowThumb');
    var closeBtn = document.getElementById('willowClose');
    var lightbox = document.getElementById('willowLightbox');
    var iframe = document.getElementById('willowYouTube');
    var lightboxClose = document.getElementById('willowLightboxClose');

    var tryPlay = function () {
      var p = thumb.play();
      if (p && typeof p.catch === 'function') p.catch(function () {});
    };
    if (thumb.readyState >= 2) tryPlay();
    else thumb.addEventListener('loadeddata', tryPlay, { once: true });

    function openLightbox() {
      lightbox.classList.add('willow-open');
      lightbox.setAttribute('aria-hidden', 'false');
      iframe.src = YT_SRC;
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      lightbox.classList.remove('willow-open');
      lightbox.setAttribute('aria-hidden', 'true');
      iframe.src = '';
      document.body.style.overflow = '';
    }
    function onTrigger(e) {
      if (e && e.target === closeBtn) return;
      openLightbox();
    }

    bubble.addEventListener('click', onTrigger);
    cta.addEventListener('click', onTrigger);
    [bubble, cta].forEach(function (el) {
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox();
        }
      });
    });

    closeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      wrap.classList.add('willow-hidden');
      thumb.pause();
    });

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    lightboxClose.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('willow-open')) {
        closeLightbox();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
