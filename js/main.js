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
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  /* ---------- YouTube facade: load the player only when asked ---------- */
  document.querySelectorAll(".yt[data-yt-id]").forEach(function (box) {
    var btn = box.querySelector("button");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var id = box.getAttribute("data-yt-id");
      var start = box.getAttribute("data-yt-start") || "0";
      var iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0&start=" + start;
      iframe.title = "Elevate Collection Podcast on YouTube";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      box.innerHTML = "";
      box.appendChild(iframe);
      if (window.va) window.va("event", { name: "Podcast play" });
    });
  });

  /* ---------- Parallax project wall ---------- */
  var archive = document.querySelector(".archive");
  if (archive) {
    var layers = Array.prototype.slice.call(archive.querySelectorAll("[data-speed]"));
    var ticking = false;
    var wide = window.matchMedia("(min-width: 601px)");

    var update = function () {
      ticking = false;
      if (reduceMotion.matches) return;
      var rect = archive.getBoundingClientRect();
      var vh = window.innerHeight;
      if (rect.bottom < 0 || rect.top > vh) return;
      // 0 when the section enters from below, 1 when it leaves at the top
      var progress = (vh - rect.top) / (vh + rect.height);
      var offset = (progress - 0.5) * rect.height;
      layers.forEach(function (el) {
        var isWord = el.classList.contains("archive__word");
        if (!isWord && !wide.matches) { el.style.transform = ""; return; }
        var speed = parseFloat(el.getAttribute("data-speed")) || 0;
        el.style.transform = "translate3d(0," + (offset * speed).toFixed(1) + "px,0)";
      });
    };

    var onScroll = function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    reduceMotion.addEventListener && reduceMotion.addEventListener("change", function () {
      layers.forEach(function (el) { el.style.transform = ""; });
      onScroll();
    });
    update();
  }

  /* ---------- Resume: print / save as PDF ---------- */
  document.querySelectorAll("[data-print]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (window.va) window.va("event", { name: "Resume print" });
      window.print();
    });
  });

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
