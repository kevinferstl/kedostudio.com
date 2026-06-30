/* ============================================================
   KEDO STUDIO — interactions (vanilla JS, no dependencies)
   ============================================================ */
(function () {
  "use strict";
  var lang = document.body.getAttribute("data-lang") || "de";
  var BASE = document.body.getAttribute("data-base") || "";
  var MAIL = "hello@kedostudio.com";
  var t = {
    de: { more: "Mehr Arbeiten", less: "Weniger anzeigen", of: "von" },
    en: { more: "More work", less: "Show less", of: "of" }
  }[lang];

  /* ---------- year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- NAV scroll behaviour ---------- */
  var nav = document.getElementById("nav");
  var lastY = window.scrollY, ticking = false;
  function onScroll() {
    var sy = window.scrollY;
    if (sy > 40) nav.classList.add("is-scrolled"); else nav.classList.remove("is-scrolled");
    if (sy > 400 && sy > lastY && !nav.classList.contains("menu-open")) nav.classList.add("is-hidden");
    else nav.classList.remove("is-hidden");
    lastY = sy; ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });

  /* ---------- mobile menu ---------- */
  var burger = document.getElementById("burger");
  var mm = document.getElementById("mobileMenu");
  function closeMenu() { nav.classList.remove("menu-open"); mm.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; }
  if (burger) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("menu-open");
      mm.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    mm.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
  }

  /* ---------- reveal on scroll ---------- */
  var revs = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revs.forEach(function (r) { io.observe(r); });
  } else { revs.forEach(function (r) { r.classList.add("in"); }); }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq__item").forEach(function (item) {
    var q = item.querySelector(".faq__q");
    var a = item.querySelector(".faq__a");
    q.addEventListener("click", function () {
      var open = item.classList.contains("open");
      document.querySelectorAll(".faq__item.open").forEach(function (o) {
        o.classList.remove("open"); o.querySelector(".faq__a").style.maxHeight = null;
      });
      if (!open) { item.classList.add("open"); a.style.maxHeight = a.scrollHeight + "px"; }
    });
  });

  /* ---------- GALLERY ---------- */
  var galleryData = [
    { n: "work-01", c: "Black & White · Emotion", land: true },
    { n: "work-02", c: "Fashion Editorial · Red Light" },
    { n: "work-03", c: "Mirrored Portrait" },
    { n: "work-04", c: "Authentic Couple · B&W", land: true },
    { n: "work-05", c: "Lifestyle Portrait" },
    { n: "work-06", c: "Behind the Scenes" },
    { n: "work-07", c: "Artist Press Portrait" },
    { n: "work-08", c: "Babybauch · B&W" },
    { n: "work-09", c: "Movement · Dance" },
    { n: "work-10", c: "Expressive Dance · B&W" },
    { n: "work-11", c: "Conceptual Realism" },
    { n: "work-12", c: "Contemporary Studio" },
    { n: "work-13", c: "Konfetti · Behind the Scenes" },
    { n: "work-14", c: "Intimate & Contemporary", land: true },
    { n: "work-15", c: "Timeless Portrait · B&W" },
    { n: "work-16", c: "Produktfotografie · Parfum" },
    { n: "work-17", c: "Sonnenbrillen · Portrait" },
    { n: "work-18", c: "Editorial Portrait" },
    { n: "work-19", c: "Commercial Product Shot" },
    { n: "work-20", c: "Neo-cinematic · Light" },
    { n: "work-21", c: "Cinematic & Timeless" },
    { n: "work-22", c: "Inside the Studio" },
    { n: "work-23", c: "Expressive Art" },
    { n: "work-24", c: "Conceptual · Blue Light" },
    { n: "work-25", c: "Set-up · Behind the Scenes" },
    { n: "work-26", c: "Authentic Portrait" },
    { n: "work-27", c: "Unternehmensportrait" },
    { n: "work-28", c: "Veiled Portrait" }
  ];
  var INITIAL = 12;
  var gallery = document.getElementById("gallery");
  var moreBtn = document.getElementById("galleryMore");
  var expanded = false;
  if (gallery) {
    galleryData.forEach(function (g, i) {
      var fig = document.createElement("figure");
      fig.className = "g-item" + (i >= INITIAL ? " is-hidden" : "");
      fig.setAttribute("data-i", i);
      var iw = g.land ? 1800 : 1200, ih = g.land ? 1200 : 1800;
      fig.innerHTML =
        '<img src="' + BASE + 'assets/img/' + g.n + '.webp" ' +
        'srcset="' + BASE + 'assets/img/' + g.n + '-800.webp 800w, ' + BASE + 'assets/img/' + g.n + '.webp 1200w" ' +
        'sizes="(max-width:540px) 50vw, (max-width:900px) 33vw, 300px" width="' + iw + '" height="' + ih + '" ' +
        'alt="' + g.c + ' – KEDO Studio" loading="lazy" decoding="async">' +
        '<span class="g-plus" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></span>';
      fig.addEventListener("click", function () { openLb(i); });
      gallery.appendChild(fig);
    });
    if (moreBtn) {
      moreBtn.querySelector("span").textContent = t.more;
      moreBtn.addEventListener("click", function () {
        expanded = !expanded;
        document.querySelectorAll(".g-item").forEach(function (el, i) {
          if (i >= INITIAL) el.classList.toggle("is-hidden", !expanded);
        });
        moreBtn.querySelector("span").textContent = expanded ? t.less : t.more;
        if (!expanded) document.getElementById("work").scrollIntoView({ behavior: "smooth" });
      });
    }
  }

  /* ---------- LIGHTBOX ---------- */
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbCount = document.getElementById("lbCount");
  var cur = 0;
  function showLb(i) {
    cur = (i + galleryData.length) % galleryData.length;
    var g = galleryData[cur];
    lbImg.src = BASE + "assets/img/" + g.n + ".webp";
    lbImg.alt = g.c;
    lbCount.textContent = (cur + 1) + " " + t.of + " " + galleryData.length;
  }
  function openLb(i) { showLb(i); lb.classList.add("open"); lb.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; }
  function closeLb() { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }
  if (lb) {
    document.getElementById("lbClose").addEventListener("click", closeLb);
    document.getElementById("lbNext").addEventListener("click", function () { showLb(cur + 1); });
    document.getElementById("lbPrev").addEventListener("click", function () { showLb(cur - 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowRight") showLb(cur + 1);
      if (e.key === "ArrowLeft") showLb(cur - 1);
    });
  }

  /* ---------- HERO video: vertical on mobile ---------- */
  function setupHeroVideo() {
    var wide = document.querySelector(".hero__media .v-wide");
    var vert = document.querySelector(".hero__media .v-vertical");
    if (!wide || !vert) return;
    var mobile = window.matchMedia("(max-width:760px)").matches;
    if (mobile) {
      var src = vert.querySelector("source");
      if (src && !src.src) { src.src = src.getAttribute("data-src"); vert.load(); }
      vert.style.display = "block"; wide.style.display = "none";
      vert.play().catch(function () {});
    }
  }
  setupHeroVideo();

  /* ---------- COOKIE ---------- */
  var cookie = document.getElementById("cookie");
  function ck(name, val) {
    try {
      if (val === undefined) return localStorage.getItem(name);
      localStorage.setItem(name, val);
    } catch (e) { return null; }
  }
  if (cookie && !ck("kedo_cookie")) {
    setTimeout(function () { cookie.classList.add("show"); }, 1400);
  }
  function dismissCookie(v) { ck("kedo_cookie", v); cookie.classList.remove("show"); }
  var ca = document.getElementById("cookieAccept"), cd = document.getElementById("cookieDecline");
  if (ca) ca.addEventListener("click", function () { dismissCookie("all"); });
  if (cd) cd.addEventListener("click", function () { dismissCookie("necessary"); });

  /* ---------- MAP consent (DSGVO: load only on click) ---------- */
  var mapConsent = document.getElementById("mapConsent");
  var mapLoad = document.getElementById("mapLoad");
  function loadMap() {
    if (!mapConsent) return;
    var src = mapConsent.getAttribute("data-src");
    var iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.title = mapConsent.getAttribute("data-title") || "Map";
    iframe.loading = "lazy";
    iframe.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
    mapConsent.parentNode.appendChild(iframe);
    mapConsent.remove();
    ck("kedo_map", "1");
  }
  if (mapLoad) mapLoad.addEventListener("click", loadMap);
  if (mapConsent && ck("kedo_map") === "1") loadMap();

  /* ---------- Google reviews widget (DSGVO: load on click) ---------- */
  var reviewsConsent = document.getElementById("reviewsConsent");
  var reviewsLoad = document.getElementById("reviewsLoad");
  function loadReviews() {
    var tpl = document.getElementById("reviewsEmbed");
    var wrap = reviewsConsent ? reviewsConsent.parentNode : null;
    if (!tpl || !wrap) return;
    var mount = document.createElement("div");
    mount.className = "reviews-mount";
    mount.appendChild(tpl.content.cloneNode(true));
    // re-create script tags so the provider widget actually executes
    mount.querySelectorAll("script").forEach(function (old) {
      var s = document.createElement("script");
      for (var i = 0; i < old.attributes.length; i++) { s.setAttribute(old.attributes[i].name, old.attributes[i].value); }
      s.text = old.text || "";
      old.parentNode.replaceChild(s, old);
    });
    wrap.appendChild(mount);
    if (reviewsConsent) reviewsConsent.remove();
    ck("kedo_reviews", "1");
  }
  if (reviewsLoad) reviewsLoad.addEventListener("click", loadReviews);
  if (reviewsConsent && ck("kedo_reviews") === "1") loadReviews();

  /* ---------- mobile booking bar ---------- */
  var bookbar = document.getElementById("bookbar");
  if (bookbar) {
    var contactEl = document.getElementById("contact");
    var heroEl = document.getElementById("hero");
    var bbTicking = false;
    function bookbarUpdate() {
      var past = window.scrollY > (heroEl ? heroEl.offsetHeight * 0.6 : 500);
      var inContact = false;
      if (contactEl) { var r = contactEl.getBoundingClientRect(); inContact = r.top < window.innerHeight * 0.85 && r.bottom > 0; }
      bookbar.classList.toggle("show", past && !inContact);
      bbTicking = false;
    }
    window.addEventListener("scroll", function () { if (!bbTicking) { window.requestAnimationFrame(bookbarUpdate); bbTicking = true; } }, { passive: true });
    window.addEventListener("resize", bookbarUpdate);
    bookbarUpdate();
  }

  /* ---------- BOOKING FORM (Formspree-ready, mailto fallback) ---------- */
  var form = document.getElementById("bookingForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (form.name.value || "").trim();
      var email = (form.email.value || "").trim();
      var pkg = form.package.value;
      var date = form.date.value;
      var msg = (form.message.value || "").trim();
      var consent = document.getElementById("consent").checked;
      var hp = form.querySelector('input[name="_gotcha"]');
      if (hp && hp.value) return; // honeypot: silently drop bots
      if (!name || !email || !consent) {
        if (!consent) document.getElementById("consent").parentElement.style.color = "#e1fc21";
        return;
      }
      var ok = document.getElementById("formOk");
      var btn = form.querySelector('button[type="submit"]');
      var subject = (lang === "en" ? "Studio booking request – " : "Studio-Anfrage – ") + name;
      var body =
        "Name: " + name + "\n" +
        "E-Mail: " + email + "\n" +
        (lang === "en" ? "Package: " : "Paket: ") + pkg + "\n" +
        (lang === "en" ? "Preferred date: " : "Wunschtermin: ") + (date || "-") + "\n\n" +
        (lang === "en" ? "Project: " : "Projekt: ") + "\n" + (msg || "-");

      function track() { if (window.plausible) window.plausible("Buchungsanfrage"); }
      function mailtoFallback() {
        window.location.href = "mailto:" + MAIL + "?subject=" +
          encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
        if (ok) ok.classList.add("show");
        track();
      }

      var endpoint = form.getAttribute("data-endpoint") || "";
      var configured = endpoint.indexOf("formspree.io/f/") > -1 && endpoint.toUpperCase().indexOf("XXXX") === -1;
      if (!configured || !window.fetch) { mailtoFallback(); return; }

      if (btn) { btn.disabled = true; btn.querySelector("span").textContent = lang === "en" ? "Sending …" : "Senden …"; }
      var data = new FormData(form);
      data.append("_subject", subject);
      fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (r) {
          if (r.ok) {
            form.reset();
            if (ok) { ok.classList.add("show"); ok.scrollIntoView({ behavior: "smooth", block: "center" }); }
            track();
          } else { mailtoFallback(); }
        })
        .catch(mailtoFallback)
        .finally(function () {
          if (btn) { btn.disabled = false; btn.querySelector("span").textContent = lang === "en" ? "Send request" : "Anfrage senden"; }
        });
    });
  }
})();
