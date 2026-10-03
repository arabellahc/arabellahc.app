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

## iPhone images

Every phone shows a real screenshot from `assets/work/`. To swap one, replace the file with a new portrait
screenshot of the same name (crop off the phone's own status bar first; the template draws its own 9:41 bar).

Case studies: `adidas-runners-1/2`, `nfl-uk-ire-1/2`, `tottenham-hotspur-1/2`, `volleyball-world-1/2/3`
More from the portfolio: `mccoys`, `atp`, `peres-jepchirchir`, `w-series`, `redbreast`, `tangle-teezer`, `sophie-hulme`, `world-athletics`

The status-bar colour behind each phone's 9:41 is set per phone in `index.html` (`style="--bar:#xxxxxx"`).

## Fonts

Three-font system, set at the top of `css/style.css`:
`--f-italic` Newsreader italic (personality), `--f-display` Schibsted Grotesk (authority), `--f-sys` Montserrat (labels and metadata).

## Custom analytics events

Two events are tracked: `Podcast play` and `Resume print`. Custom events need a Vercel Pro plan; page views work on all plans.
