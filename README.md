# arabellahc.app

Portfolio site for Arabella Hibbert-Corkhill. Plain HTML/CSS/JS, no build step.

```
index.html          Home: hero, featured work (iPhone mockups), speaking, career, parallax portfolio
resume.html         Resume (served at /resume); "Save as PDF" uses print styles
css/style.css       All styles for both pages
js/main.js          Mobile menu, lazy YouTube player, parallax, print button
assets/img/         Photos, lecture slide, favicon
vercel.json         Clean URLs (/resume) and asset caching
```

## Deploy

1. **GitHub** – create a repo (e.g. `arabellahc-site`), upload these files to the root, commit.
2. **Vercel** – Add New → Project → import the repo. Framework preset: **Other**. No build command, output directory = root. Deploy.
3. **Analytics** – in the Vercel project: **Analytics → Enable**. The script tag is already in both pages
   (`/_vercel/insights/script.js`); it only reports once Analytics is enabled and the site is on Vercel.
4. **Domain** – Project → Settings → Domains → add `arabellahc.app` and `www.arabellahc.app`.
   At your registrar, add the DNS records Vercel shows you (usually an `A` record for `@` → `76.76.21.21`
   and a `CNAME` for `www` → `cname.vercel-dns.com`). `.app` domains require HTTPS, which Vercel provisions automatically.

Every push to `main` redeploys automatically.

## Swapping in real campaign screenshots

Each iPhone mockup has a designed cover. To show a real post instead, save a portrait screenshot
(ideally 1170×2532) to `assets/work/` and add this line inside that phone's `.iphone__screen` div:

```html
<img class="iphone__shot" src="/assets/work/spurs-away.jpg" alt="">
```

It covers both the designed cover and the Reel overlay; only the status bar and dynamic island stay on top,
so a straight screenshot of the post (with Instagram's own UI) drops in cleanly.

## Custom analytics events

Two events are tracked: `Podcast play` and `Resume print`. Custom events need a Vercel Pro plan; page views work on all plans.
