# arabellahc.app

Portfolio site for Arabella Hibbert-Corkhill. Plain HTML/CSS/JS, no build step.

```
index.html          Home: hero, logo marquee, case studies (iPhones), speaking, career, parallax portfolio
resume.html         Resume (served at /resume); "Save as PDF" uses print styles
css/style.css       All styles for both pages
js/main.js          Mobile menu, lazy YouTube player, parallax, print button
assets/img/         Photos, lecture slide, favicon set
assets/logos/       Client logos for the marquee and project cards
assets/work/        Your campaign screenshots for the iPhones (see below)
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

## Adding your campaign images to the iPhones

No code changes needed. Save portrait screenshots (ideally 1170×2532, JPG) into `assets/work/` with these exact names
and they appear inside the phones automatically, replacing the designed covers:

| Case study          | Left phone                 | Right phone                |
|---------------------|----------------------------|----------------------------|
| adidas Runners      | `adidas-runners-1.jpg`     | `adidas-runners-2.jpg`     |
| NFL UK&IRE          | `nfl-uk-ire-1.jpg`         | `nfl-uk-ire-2.jpg`         |
| Tottenham Hotspur   | `tottenham-hotspur-1.jpg`  | `tottenham-hotspur-2.jpg`  |
| Volleyball World    | `volleyball-world-1.jpg`   | `volleyball-world-2.jpg`   |

A full-screen screenshot of the post (with Instagram/TikTok's own UI) drops in cleanly; the phone's status bar and
dynamic island stay on top.

## Fonts

The type pairing lives in two lines at the top of `css/style.css` (`--font-display` and `--font-body`).
To switch to a different Google Fonts pairing, update those two lines and the Google Fonts `<link>` in both HTML files.

## Custom analytics events

Two events are tracked: `Podcast play` and `Resume print`. Custom events need a Vercel Pro plan; page views work on all plans.
