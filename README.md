# ELA Bell Ringer Hub and Classroom Tools

**Bell Ringer Hub:** https://ambmas.github.io/bell_ringer_hub/  
**Business Walrus game:** https://ambmas.github.io/bell_ringer_hub/business-walrus/

This repository is a **static GitHub Pages website**. It does not have a server-side backend: the HTML, CSS, and JavaScript run in the student's browser. GitHub Actions validates and publishes the site.

## Layout and ownership

| Path | Responsibility |
|---|---|
| `index.html`, `styles.css`, `app.js` | Shared Bell Ringer Hub shell, interactions, progress, local saves and exports |
| `monday.js` through `friday.js` | Lesson data, 18 weeks per weekday |
| `business-walrus/index.html` | Self-contained Walrus Pitch Game, deployed at its own stable path |
| `tests/site.test.mjs` | Automated checks of 90 day/week lessons, assets, and critical controls |
| `.github/workflows/pages.yml` | Pull request QA and main-only GitHub Pages deployment |
| `dist/` | Generated publication directory (never commit it) |

**Keep lesson content separate from UI code.** The weekday files assign arrays to `window.BELL_DATA.<day>`. Do not change the shape without updating the renderer and test suite. The Walrus game stays independent and should not reuse Bell Ringer script/global names.

## Routes and links

GitHub Pages publishes this repository under the path `/bell_ringer_hub/`; use **relative** URLs in internal links.

- Bell Ringer Hub: `./`
- Wednesday, week 4: `?day=wednesday&week=4`
- Business Walrus: `./business-walrus/`

The **Copy Activity Link** button shares a lesson selection (day/week), never student responses. It works well as a direct Canvas link.

## Student response privacy

Answers autosave only in that browser's local storage, scoped by day/week. There is **no server-side student database** and no automatic Canvas submission. Students must use **Copy My Responses** and paste into Canvas; **Download Responses** is an optional local backup. Browser storage may be unavailable or cleared. Do not add personally identifying information, grades, private student submissions, or credentials to this public repository.

## Safe branching and releases

1. Start from `main` and create a short-lived branch, e.g. `feat/new-game`, `fix/copy-workflow`, or `content/week-19`.
2. Keep changes within the relevant activity. If adding a new standalone game, use a separate folder with its own `index.html`.
3. Open a pull request to `main`. GitHub Actions checks all weekday question banks, syntax, critical controls, and routing.
4. Merge **only after** checks pass. Deployment runs only for commits on `main`; feature branches do not publish into the live Pages site.
5. Check the live homepage and changed game after successful deployment.

For new independent games (e.g. `apps/new-game/index.html`), add the folder to the workflow's **Assemble public site** step, create an internal link from the homepage, and add a validation test. Avoid moving existing public paths, because links may already be shared in Canvas.

A repository administrator can additionally configure **Settings → Rules → Rulesets** to require pull requests and a passing build check for changes to `main`. The workflow does not automatically configure repository protection.

## Local testing

No framework, database, external JavaScript library, or npm install is required. With Node 22:

    node --test tests/site.test.mjs
    python3 -m http.server 8000

Open `http://localhost:8000/` in a browser to test the experience.

## GitHub Pages deployment

The custom workflow validates the content, assembles only the public website into `dist/`, adds `.nojekyll`, and uploads the site artifact. After validation succeeds on the `main` branch, a separate deployment job publishes the artifact with narrowly scoped GitHub Pages permissions.

Private repository files, tests, documentation, and GitHub workflows are excluded from the website artifact. This reduces accidental exposure and keeps new classroom tools modular.
