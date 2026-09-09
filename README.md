# Profit Remaining Calculator

A lightweight, GitHub-ready web app that recreates the core calculation from the provided Profit Calculator workbook.

## Core inputs

1. Estimated sales
2. Commission rate (%)
3. Marketing investment

## Calculation logic

The app follows the formulas shown in the provided workbook:

- Commission amount = Estimated sales × Commission rate
- Net after commission = Estimated sales − Commission amount
- Remaining after marketing = Net after commission − Marketing investment

In JavaScript, the percentage input is converted from a displayed percentage (for example, `30`) into its decimal equivalent (`0.30`) before multiplication.

## Run locally

Open `index.html` in a browser.

## Deploy with GitHub Pages

1. Create a new GitHub repository.
2. Upload `index.html`, `styles.css`, `app.js`, and `README.md`.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the main branch and `/ (root)` folder, then save.

GitHub will publish the app at the repository's Pages URL.

## Files

- `index.html` — app structure and accessibility markup
- `styles.css` — dark responsive visual design
- `app.js` — calculation logic and UI behavior
- `README.md` — setup and deployment instructions
