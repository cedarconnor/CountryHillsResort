const XLSX = require('xlsx');
const fs = require('fs');
const https = require('https');

// Helper to delay (rate limiting)
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Geocode function
function geocode(query) {
    return new Promise((resolve, reject) => {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`;
        const options = {
            headers: {
                'User-Agent': 'InteractiveMapBuilder/1.0'
            }
        };

        https.get(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (json && json.length > 0) {
                        resolve({ lat: parseFloat(json[0].lat), lng: parseFloat(json[0].lon) });
                    } else {
                        resolve(null);
                    }
                } catch (e) {
                    console.error('Error parsing JSON for ' + query, e);
                    resolve(null);
                }
            });
        }).on('error', err => {
            console.error('Network error for ' + query, err);
            resolve(null);
        });
    });
}

(async () => {
    console.log("Reading Excel...");
    const workbook = XLSX.readFile('JosephineCounty_CompetitiveRoomInventory.xlsx');
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawData = XLSX.utils.sheet_to_json(sheet);

    // Filter out rows that don't look like property listings (e.g. headers or summaries)
    const ignoreNames = [
        'Property Name',
        'RV Properties',
        'Total units',
        'total units',
        'Hotel/Motel/Cabins',
        'Direct competitors are bold and in italics',
        'Direct competitors are 2 RV (46 sites) and 8 motels (198 rooms) '
    ];

    const cleanData = rawData.filter(row => {
        const name = row['Property Name'];
        return name && !ignoreNames.includes(name);
    });

    console.log(`Found ${cleanData.length} entries. Geocoding...`);

    const processedData = [];

    for (const item of cleanData) {
        const name = item['Property Name'];
        const location = item['Location'] || '';
        // Construct query: Name + Location + "Oregon" to be safe
        let query = `${name}, ${location}, Oregon`;

        // If location is vague like just a city, maybe use name + city + Oregon

        console.log(`Geocoding: ${query}`);
        const coords = await geocode(query);

        if (coords) {
            console.log(`  -> Found: ${coords.lat}, ${coords.lng}`);
            processedData.push({ ...item, ...coords });
        } else {
            // Fallback: try just the location if specific name fails
            if (location) {
                console.log(`  -> Failed. Retrying with location only: ${location}, Josephine County, Oregon`);
                const locCoords = await geocode(`${location}, Josephine County, Oregon`);
                if (locCoords) {
                    console.log(`  -> Found (Approx): ${locCoords.lat}, ${locCoords.lng}`);
                    // Add a flag saying it's approximate?
                    processedData.push({ ...item, ...locCoords, isApprox: true });
                } else {
                    console.log(`  -> Not found.`);
                    processedData.push({ ...item, lat: null, lng: null });
                }
            } else {
                processedData.push({ ...item, lat: null, lng: null });
            }
        }

        // Respect Nominatim's rate limit (1 sec)
        await delay(1100);
    }

    const outputContent = `const COMPETITORS = ${JSON.stringify(processedData, null, 2)};`;
    fs.writeFileSync('data.js', outputContent);
    console.log("Done! Written to data.js");
})();
