/* arabellahc.app — interactions (no dependencies) */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      nav.classList.toggle("is-open", open);
    };
    toggle.addEventListener("click", function () { setOpen(toggle.getAttribute("aria-expanded") !== "true"); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
  }

  /* ---------- YouTube facade ---------- */
  document.querySelectorAll(".yt[data-yt-id]").forEach(function (box) {
    var btn = box.querySelector("button");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube-nocookie.com/embed/" + box.getAttribute("data-yt-id") +
        "?autoplay=1&rel=0&start=" + (box.getAttribute("data-yt-start") || "0");
      iframe.title = "Elevate Collection Podcast on YouTube";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      box.innerHTML = "";
      box.appendChild(iframe);
      if (window.va) window.va("event", { name: "Podcast play" });
    });
  });

  /* ---------- Scroll-linked motion ---------- */
  var phones = Array.prototype.slice.call(document.querySelectorAll(".slide-in"));
  var archive = document.querySelector(".archive");
  var layers = archive ? Array.prototype.slice.call(archive.querySelectorAll("[data-speed]")) : [];
  var wide = window.matchMedia("(min-width: 601px)");
  var ticking = false;

  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function ease(t) { return 1 - Math.pow(1 - t, 3); }

  function reset() {
    phones.forEach(function (el) { el.style.transform = ""; el.style.opacity = ""; });
    layers.forEach(function (el) { el.style.transform = ""; });
  }

  function update() {
    ticking = false;
    if (reduceMotion.matches) return;
    var vh = window.innerHeight;

    // Phones glide in from the side they sit on as their case scrolls into view
    var dist = Math.min(window.innerWidth * 0.35, 260);
    phones.forEach(function (el) {
      var host = el.closest(".case__phones") || el;
      var r = host.getBoundingClientRect();
      if (r.top > vh * 1.2 || r.bottom < -vh * 0.2) return;
      var order = parseFloat(el.getAttribute("data-order")) || 0;
      // 0 when the phones' top edge is at the bottom of the screen, 1 when it reaches ~45% up
      var p = clamp((vh - r.top - order * vh * 0.08) / (vh * 0.55), 0, 1);
      var e = ease(p);
      var dir = el.getAttribute("data-from") === "left" ? -1 : 1;
      var x = (1 - e) * dist * dir * (1 + order * 0.35);
      var rot = (1 - e) * 8 * dir;
      el.style.transform = "translate3d(" + x.toFixed(1) + "px,0,0) rotate(" + rot.toFixed(2) + "deg)";
      el.style.opacity = (0.15 + 0.85 * e).toFixed(3);
    });

    // Archive wall: columns drift at different speeds
    if (archive) {
      var rect = archive.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < vh) {
        var offset = ((vh - rect.top) / (vh + rect.height) - 0.5) * rect.height;
        layers.forEach(function (el) {
          var isWord = el.classList.contains("archive__word");
          if (!isWord && !wide.matches) { el.style.transform = ""; return; }
          var speed = parseFloat(el.getAttribute("data-speed")) || 0;
          el.style.transform = "translate3d(0," + (offset * speed).toFixed(1) + "px,0)";
        });
      }
    }
  }

  function onScroll() { if (!ticking) { ticking = true; window.requestAnimationFrame(update); } }

  if (!reduceMotion.matches) document.documentElement.classList.add("js-motion");
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  if (reduceMotion.addEventListener) {
    reduceMotion.addEventListener("change", function () { reset(); onScroll(); });
  }
  update();

  /* ---------- Resume: print / save as PDF ---------- */
  document.querySelectorAll("[data-print]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (window.va) window.va("event", { name: "Resume print" });
      window.print();
    });
  });

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
