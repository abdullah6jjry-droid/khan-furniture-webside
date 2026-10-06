// ============================================================
// KHAN FURNITURE — site logic
// ============================================================
(function () {
  "use strict";

  const state = { lang: "en" };

  /* ---------------------------------------------------------
     LANGUAGE SWITCHING
     Every translatable element carries data-en / data-ur.
     We swap textContent and flip <html dir/lang>.
  --------------------------------------------------------- */
  function applyLanguage(lang) {
    state.lang = lang;
    const html = document.documentElement;
    html.setAttribute("dir", lang === "ur" ? "rtl" : "ltr");
    html.setAttribute("lang", lang === "ur" ? "ur" : "en");
    html.setAttribute("data-lang", lang);

    document.querySelectorAll("[data-en]").forEach((el) => {
      const text = lang === "ur" ? el.getAttribute("data-ur") : el.getAttribute("data-en");
      if (text != null) el.textContent = text;
    });

    updateWhatsAppLinks();
    renderCards(); // re-render so card copy + WA links follow the language
    localStorage.setItem("kf-lang", lang);
  }

  function updateWhatsAppLinks(productNameEn, productNameUr, targetId) {
    const generic = state.lang === "ur"
      ? "السلام علیکم خان فرنیچر، مجھے آپ کے فرنیچر میں دلچسپی ہے۔ براہ کرم تفصیلات اور قیمت بتا دیں۔"
      : "Hello Khan Furniture, I am interested in your furniture. Please share details and price.";
    const genericLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(generic)}`;
    document.querySelectorAll(".wa-link").forEach((a) => {
      if (!a.id || a.id !== "modal-wa") a.href = genericLink;
    });
  }

  document.getElementById("lang-switch").addEventListener("click", () => {
    applyLanguage(state.lang === "en" ? "ur" : "en");
  });

  /* ---------------------------------------------------------
     NAV: scroll shadow + mobile toggle
  --------------------------------------------------------- */
  const nav = document.getElementById("site-nav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("solid", window.scrollY > 40);
  }, { passive: true });

  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => navLinks.classList.remove("open"))
  );

  /* ---------------------------------------------------------
     PRODUCT CARDS
  --------------------------------------------------------- */
  const grids = {
    bedroom: document.getElementById("grid-bedroom"),
    living: document.getElementById("grid-living"),
    dining: document.getElementById("grid-dining"),
    featured: document.getElementById("grid-featured"),
  };

  function cardHTML(p) {
    const name = p.name[state.lang];
    const desc = p.desc[state.lang];
    const swatches = p.colors
      .map((c) => `<span class="swatch" style="background:${c}"></span>`)
      .join("");
    const view3dLabel = state.lang === "ur" ? "3D میں دیکھیں" : "View in 3D";
    const detailsLabel = state.lang === "ur" ? "تفصیلات دیکھیں" : "View Details";
    const waLabel = state.lang === "ur" ? "واٹس ایپ پر آرڈر کریں" : "Order on WhatsApp";
    const wa = waLink(p.name.en, p.name.ur, state.lang);
    return `
      <article class="product-card" data-id="${p.id}">
        <div class="card-photo"></div>
        <div class="card-body">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="card-swatches">${swatches}</div>
          <div class="card-actions">
            ${p.hotspot ? `<button class="btn btn-ghost view-3d" data-id="${p.id}">${view3dLabel}</button>` : ""}
            <button class="btn btn-ghost view-details" data-id="${p.id}">${detailsLabel}</button>
            <a class="btn btn-wa wa-link" href="${wa}" target="_blank" rel="noopener">${waLabel}</a>
          </div>
        </div>
      </article>`;
  }

  function renderCards() {
    Object.entries(grids).forEach(([key, el]) => {
      if (!el) return;
      const list = key === "featured"
        ? PRODUCTS.filter((p) => p.featured)
        : PRODUCTS.filter((p) => p.category === key);
      el.innerHTML = list.map(cardHTML).join("");
    });

    document.querySelectorAll(".view-details, .view-3d").forEach((btn) => {
      btn.addEventListener("click", () => {
        const p = PRODUCTS.find((x) => x.id === btn.dataset.id);
        if (btn.classList.contains("view-3d") && p.hotspot) {
          document.getElementById("showroom").scrollIntoView({ behavior: "smooth" });
          setTimeout(() => flyToHotspot(p), 500);
        } else {
          openModal(p);
        }
      });
    });
  }

  /* ---------------------------------------------------------
     PRODUCT MODAL
  --------------------------------------------------------- */
  const modal = document.getElementById("product-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const modalSwatches = document.getElementById("modal-swatches");
  const modalWa = document.getElementById("modal-wa");
  const modalPhoto = document.getElementById("modal-photo");

  function openModal(p) {
    modalTitle.textContent = p.name[state.lang];
    modalDesc.textContent = p.desc[state.lang] + (p.price ? `  ·  ${p.price}` : "");
    modalSwatches.innerHTML = p.colors
      .map((c) => `<span class="swatch" style="background:${c};width:22px;height:22px;"></span>`)
      .join("");
    modalWa.href = waLink(p.name.en, p.name.ur, state.lang);
    modalPhoto.style.background = `linear-gradient(155deg, ${p.colors[0]}, var(--walnut-800))`;
    document.getElementById("modal-view-details").style.display = "none";
    modal.hidden = false;
  }
  function closeModal() { modal.hidden = true; }
  document.getElementById("modal-close").addEventListener("click", closeModal);
  document.getElementById("modal-backdrop").addEventListener("click", closeModal);

  /* ---------------------------------------------------------
     2D fallback panel clicks -> scroll to matching collection
  --------------------------------------------------------- */
  document.querySelectorAll(".fallback-panel").forEach((panel) => {
    panel.addEventListener("click", () => {
      const room = panel.dataset.room;
      const target = room === "wardrobe" ? "bedroom" : room;
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ---------------------------------------------------------
     INIT: language (remember choice) + first render
  --------------------------------------------------------- */
  const savedLang = localStorage.getItem("kf-lang");
  applyLanguage(savedLang === "ur" ? "ur" : "en");
  document.getElementById("footer-year").textContent = new Date().getFullYear();

  /* ---------------------------------------------------------
     LOADING SCREEN
  --------------------------------------------------------- */
  const loadingScreen = document.getElementById("loading-screen");
  const loaderFill = document.getElementById("loader-fill");
  let progress = 0;
  const loaderInterval = setInterval(() => {
    progress = Math.min(progress + Math.random() * 18, 92);
    loaderFill.style.width = progress + "%";
  }, 140);
  function finishLoading() {
    clearInterval(loaderInterval);
    loaderFill.style.width = "100%";
    setTimeout(() => loadingScreen.classList.add("hidden"), 350);
  }

  /* ===========================================================
     WEBGL SUPPORT / DEVICE CAPABILITY CHECK
     Decides whether to run the 3D showroom or the 2D fallback.
  =========================================================== */
  function hasDecentWebGL() {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) return false;
      const cores = navigator.hardwareConcurrency || 4;
      const lowMemory = navigator.deviceMemory && navigator.deviceMemory <= 2;
      if (lowMemory || cores < 2) return false;
      return true;
    } catch (e) {
      return false;
    }
  }

  const CAN_3D = typeof THREE !== "undefined" && hasDecentWebGL();

  /* ===========================================================
     HERO — soft ambient 3D wood-grain backdrop (lightweight)
  =========================================================== */
  function initHeroScene() {
    const canvas = document.getElementById("hero-canvas");
    const wrap = document.getElementById("hero-canvas-wrap");
    if (!CAN_3D) { wrap.style.background = "linear-gradient(155deg,#3d2818,#221510)"; return; }

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0.6, 6);

    const key = new THREE.PointLight(0xe0b563, 2.2, 20);
    key.position.set(3, 3, 4);
    scene.add(key);
    const fill = new THREE.PointLight(0x8a5a34, 1, 20);
    fill.position.set(-4, -1, 2);
    scene.add(fill);
    scene.add(new THREE.AmbientLight(0x2c1c14, 1.2));

    // Softly rotating wood-tone torus knots suggesting turned furniture legs / craftsmanship
    const group = new THREE.Group();
    const mat1 = new THREE.MeshStandardMaterial({ color: 0x8a5a34, roughness: 0.55, metalness: 0.15 });
    const mat2 = new THREE.MeshStandardMaterial({ color: 0xc9973d, roughness: 0.4, metalness: 0.35 });
    const geo = new THREE.TorusKnotGeometry(1.15, 0.32, 140, 16, 2, 3);
    const knot = new THREE.Mesh(geo, mat1);
    knot.position.set(1.8, 0.2, -1);
    group.add(knot);
    const sphere = new THREE.Mesh(new THREE.IcosahedronGeometry(0.7, 1), mat2);
    sphere.position.set(-2.4, -0.6, -2);
    group.add(sphere);
    scene.add(group);

    function resize() {
      const w = wrap.clientWidth, h = wrap.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    window.addEventListener("resize", resize);
    resize();

    let raf;
    function animate(t) {
      raf = requestAnimationFrame(animate);
      group.rotation.y = t * 0.00008;
      group.rotation.x = Math.sin(t * 0.0002) * 0.15;
      renderer.render(scene, camera);
    }
    requestAnimationFrame(animate);
  }

  /* ===========================================================
     3D SHOWROOM
     A simplified but real furniture showroom: room shell, warm
     lighting, boxed furniture forms per section, orbit controls,
     and clickable hotspots (raycast) that open the product modal.

     REPLACE: swap the primitive meshes below for your own GLTF
     furniture models (use THREE.GLTFLoader) when you have them —
     each mesh is labeled with the product id it stands in for.
  =========================================================== */
  let showroomInitialized = false;
  let showroomCamera, showroomControls, hotspotMarkers = [];

  function buildRoomShell(scene) {
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x4a3018, roughness: 0.85 });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), floorMat);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    const wallMat = new THREE.MeshStandardMaterial({ color: 0x2c1c14, roughness: 0.9 });
    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(20, 6), wallMat);
    backWall.position.set(0, 3, -5);
    scene.add(backWall);
    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(20, 6), wallMat);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-6, 3, 0);
    scene.add(leftWall);
    const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(20, 6), wallMat);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(6, 3, 5);
    scene.add(rightWall);

    // ceiling lights (warm glow points)
    [[-2, 5.6, -1], [2, 5.6, -1], [0, 5.6, 2.5]].forEach((pos) => {
      const l = new THREE.PointLight(0xffcf8a, 1.4, 10, 2);
      l.position.set(...pos);
      scene.add(l);
      const bulb = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0xffe3ad })
      );
      bulb.position.set(...pos);
      scene.add(bulb);
    });
  }

  function box(w, h, d, color, x, y, z, rotY) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(w, h, d),
      new THREE.MeshStandardMaterial({ color, roughness: 0.6, metalness: 0.05 })
    );
    mesh.position.set(x, y, z);
    if (rotY) mesh.rotation.y = rotY;
    return mesh;
  }

  function buildFurniture(scene) {
    const g = new THREE.Group();
    // Bedroom section (id: king-bed, wardrobe, dressing-table, side-tables)
    g.add(box(1.9, 0.55, 2.4, 0x6b4226, -2.4, 0.5, -1.6));      // king-bed base
    g.add(box(1.9, 0.9, 0.15, 0x5a3a22, -2.4, 1.25, -2.75));     // king-bed headboard
    g.add(box(1.6, 2.0, 0.6, 0x3d2818, -3.7, 1.0, -3.6));        // wardrobe
    g.add(box(0.8, 1.3, 0.5, 0x8a5a34, -1.2, 0.65, -3.0));       // dressing table
    g.add(box(0.4, 0.5, 0.4, 0xa4713f, -3.9, 0.25, -1.4));       // side table

    // Living room section (sofa-set, coffee-table, tv-unit, showcase)
    g.add(box(2.2, 0.7, 0.9, 0x8a5a34, 1.6, 0.35, -1.4));        // sofa
    g.add(box(0.9, 0.4, 0.9, 0x5a3a22, 1.9, 0.2, -0.4));         // coffee table
    g.add(box(2.0, 0.7, 0.4, 0x2c1c14, 2.8, 0.35, -2.4));        // tv unit
    g.add(box(0.9, 1.8, 0.5, 0x3d2818, 3.4, 0.9, -1.2));         // showcase

    // Dining section (dining-table, dining-chairs)
    g.add(box(1.8, 0.4, 1.0, 0x5a3a22, 0.2, 0.4, 2.6));          // dining table
    [[-0.6, 3.0], [0.9, 3.0], [-0.6, 2.2], [0.9, 2.2]].forEach(([x, z]) =>
      g.add(box(0.4, 0.7, 0.4, 0x3d2818, x, 0.35, z))
    );

    scene.add(g);
  }

  function createHotspotDOM(id) {
    const dot = document.createElement("div");
    dot.className = "hotspot-dot";
    dot.dataset.id = id;
    document.getElementById("showroom-stage").appendChild(dot);
    return dot;
  }

  function flyToHotspot(p) {
    if (!showroomInitialized || !p.hotspot) return;
    const target = new THREE.Vector3(p.hotspot.x, p.hotspot.y, p.hotspot.z);
    showroomControls.target.copy(target);
    showroomCamera.position.set(target.x + 2, target.y + 1.6, target.z + 3);
    showroomControls.update();
  }

  function initShowroomScene() {
    const stage = document.getElementById("showroom-stage");
    const canvas = document.getElementById("showroom-canvas");
    const loadingEl = document.getElementById("showroom-loading");
    const fallbackEl = document.getElementById("showroom-fallback");

    if (!CAN_3D) {
      canvas.hidden = true;
      fallbackEl.hidden = false;
      loadingEl.classList.add("hidden");
      return;
    }

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.shadowMap.enabled = false;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1109);
    scene.fog = new THREE.Fog(0x1a1109, 8, 18);

    showroomCamera = new THREE.PerspectiveCamera(55, 1, 0.1, 60);
    showroomCamera.position.set(2, 2.4, 6);

    scene.add(new THREE.AmbientLight(0x4a3018, 1.1));
    const sun = new THREE.DirectionalLight(0xffe3ad, 0.6);
    sun.position.set(4, 8, 4);
    scene.add(sun);

    buildRoomShell(scene);
    buildFurniture(scene);

    showroomControls = new THREE.OrbitControls(showroomCamera, renderer.domElement);
    showroomControls.enableDamping = true;
    showroomControls.dampingFactor = 0.08;
    showroomControls.minDistance = 2.5;
    showroomControls.maxDistance = 9;
    showroomControls.maxPolarAngle = Math.PI / 2.05;
    showroomControls.target.set(0, 0.8, -0.5);
    showroomControls.update();

    // hotspot markers (DOM overlay, positioned each frame from 3D->2D projection)
    hotspotMarkers = PRODUCTS.filter((p) => p.hotspot).map((p) => ({
      product: p,
      dom: createHotspotDOM(p.id),
      pos: new THREE.Vector3(p.hotspot.x, p.hotspot.y + 0.6, p.hotspot.z),
    }));
    hotspotMarkers.forEach((m) => {
      m.dom.addEventListener("click", () => openModal(m.product));
    });

    function resize() {
      const w = stage.clientWidth, h = stage.clientHeight;
      renderer.setSize(w, h, false);
      showroomCamera.aspect = w / h;
      showroomCamera.updateProjectionMatrix();
    }
    window.addEventListener("resize", resize);
    resize();

    function updateMarkers() {
      hotspotMarkers.forEach((m) => {
        const v = m.pos.clone().project(showroomCamera);
        const visible = v.z < 1;
        const x = (v.x * 0.5 + 0.5) * stage.clientWidth;
        const y = (-v.y * 0.5 + 0.5) * stage.clientHeight;
        m.dom.style.left = x + "px";
        m.dom.style.top = y + "px";
        m.dom.style.display = visible ? "block" : "none";
      });
    }

    function animate() {
      requestAnimationFrame(animate);
      showroomControls.update();
      updateMarkers();
      renderer.render(scene, showroomCamera);
    }
    animate();

    loadingEl.classList.add("hidden");
    showroomInitialized = true;
  }

  // Lazy-init the showroom once it scrolls into view (keeps first paint light)
  const showroomSection = document.getElementById("showroom");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !showroomInitialized) {
          initShowroomScene();
          io.disconnect();
        }
      });
    },
    { rootMargin: "200px" }
  );
  io.observe(showroomSection);

  /* ---------------------------------------------------------
     Kick things off
  --------------------------------------------------------- */
  window.addEventListener("load", () => {
    initHeroScene();
    finishLoading();
  });
  // safety net in case 'load' is delayed by slow assets
  setTimeout(finishLoading, 3500);
})();
