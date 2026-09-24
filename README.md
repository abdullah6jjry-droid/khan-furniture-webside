# Khan Furniture — Website

A bilingual (English / Urdu) furniture showroom website with an interactive
3D showroom (Three.js), product collections, and one-click WhatsApp
ordering, for **Khan Furniture**.

## Files

```
khan-furniture/
├── index.html          the page structure
├── style.css            all styling (colors, fonts, layout, RTL)
├── data.js               product list — names, descriptions, prices, colors
├── script.js             language switch, product cards, 3D showroom
└── assets/
    ├── images/            put real product photos here
    └── models/             put real .glb 3D models here (optional)
```

---

## 1. Run it on your laptop

No build tools needed — it's plain HTML/CSS/JS. Because the page loads
files with JavaScript (`data.js`), opening `index.html` by double-clicking
it will fail in some browsers. Instead, serve the folder locally:

**If you have Python installed:**
```
cd khan-furniture
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

**If you have Node.js installed:**
```
cd khan-furniture
npx serve .
```

**Or:** install the free "Live Server" extension in VS Code, right-click
`index.html`, and choose "Open with Live Server."

---

## 2. Add your own furniture photos

Right now, product cards, the hero background, and the "About" photo use
soft gradient placeholders (clearly marked `/* REPLACE: ... */` in
`style.css` and `<!-- REPLACE: ... -->` in `index.html`) so nothing looks
broken while you don't have photos yet.

To use a real photo on a product card:
1. Save the photo into `assets/images/`, e.g. `assets/images/king-bed.jpg`.
2. Open `script.js`, find the `cardHTML()` function, and change:
   ```js
   <div class="card-photo"></div>
   ```
   to:
   ```js
   <div class="card-photo" style="background-image:url('assets/images/${p.id}.jpg')"></div>
   ```
   That automatically uses each product's `id` (from `data.js`) as its
   filename — so `king-bed.jpg`, `sofa-set.jpg`, etc.
3. For the hero background or About photo, open `style.css` and replace the
   `background: linear-gradient(...)` line under `.about-photo` (or set an
   inline background on `#hero-canvas-wrap`) with
   `background-image: url('assets/images/your-photo.jpg'); background-size: cover;`.

For real 3D furniture models instead of the placeholder boxes in the 3D
showroom, see `assets/models/PUT_YOUR_3D_MODELS_HERE.txt` for exact steps.

---

## 3. Change prices

Open `data.js`. Every product has a `price` field, e.g.:
```js
price: "PKR 85,000", // EDIT PRICE HERE
```
Edit the text directly — prices aren't currently shown on the cards
(to keep them clean), but they do appear in the product detail popup.
To show prices on every card too, add `<p>${p.price}</p>` inside the
`cardHTML()` function in `script.js`.

---

## 4. Change the phone number

Open `data.js` and edit the very first line:
```js
const WHATSAPP_NUMBER = "923299920992"; // country code + number, no + or spaces
```
Then open `index.html` and update the two visible phone lines (search for
`0329 9920992`) and the `tel:+923299920992` link in the Contact section.

---

## 5. Upload the project to GitHub

1. Create a free account at [github.com](https://github.com) if you don't
   have one.
2. Click **New repository**, name it e.g. `khan-furniture`, keep it Public,
   and click **Create repository**.
3. On your laptop, inside the `khan-furniture` folder, run:
   ```
   git init
   git add .
   git commit -m "Khan Furniture website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/khan-furniture.git
   git push -u origin main
   ```
   (Replace `YOUR-USERNAME` with your GitHub username. If `git` isn't
   installed, download it from [git-scm.com](https://git-scm.com).)

---

## 6. Publish it with GitHub Pages

1. On GitHub, open your `khan-furniture` repository.
2. Go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to "Deploy from a branch,"
   branch `main`, folder `/ (root)`, then **Save**.
4. Wait about a minute, then your site will be live at:
   `https://YOUR-USERNAME.github.io/khan-furniture/`

---

## 7. Connect a custom domain later

1. Buy a domain (e.g. from Namecheap, GoDaddy, or a local Pakistani
   registrar).
2. In your domain's DNS settings, add a **CNAME** record pointing
   `www` (or your chosen subdomain) to `YOUR-USERNAME.github.io`.
   For a root domain (`khanfurniture.com` with no `www`), instead add
   **A records** pointing to GitHub Pages' IP addresses — GitHub lists
   the current ones at
   `https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site`.
3. Back in GitHub → **Settings → Pages**, enter your domain under
   "Custom domain" and save. GitHub will create a `CNAME` file in your
   repo automatically and issue an HTTPS certificate (this can take up
   to 24 hours).

---

## Notes on the 3D showroom

- The showroom uses simple, clean geometric shapes for furniture rather
  than photorealistic models, so it loads fast on all devices — see
  `assets/models/PUT_YOUR_3D_MODELS_HERE.txt` for how to swap in real
  models once you have them.
- On phones or low-power devices, the site automatically shows a 2D
  fallback (four tappable room sections) instead of the 3D scene.
- Drag inside the 3D showroom to look around; click a glowing dot to see
  that product's details and order it on WhatsApp.
