# Country Hills Resort - Competitive Grid

An interactive map comparing Country Hills Resort with local competitors.

## Features
-   **Interactive Map**: Powered by Leaflet.js.
-   **Competitor Data**: Visualizes key metrics like room count and location.
-   **Distance Calculation**: Automatically calculates distance from Country Hills Resort.
-   **Responsive Design**: Works on mobile and desktop.

## Setup
1.  This is a static website. No backend is required.
2.  The data is pre-compiled in `data.js` using `convert_data.js`.

## updating Data
To update the competitor list:
1.  Edit `JosephineCounty_CompetitiveRoomInventory.xlsx`.
2.  Run `node convert_data.js` to regenerate `data.js`.

## Deployment
This site is ready for [GitHub Pages](https://pages.github.com/).
1.  Upload these files to a GitHub repository.
2.  Go to Settings > Pages.
3.  Select the `main` branch as the source.
