const CONFIG = {
    target: {
        name: "Country Hills Resort",
        lat: 42.1156,
        lng: -123.6495,
        price: 1150000,
        address: "7901 Caves Hwy, Cave Junction, OR 97523",
        description: "An income-generating resort on 38.58 acres near the Oregon Caves National Monument.",
        url: "https://martinoutdoorproperties.com/property/country-hills-resort/",
        images: [
            "https://martinoutdoorproperties.com/wp-content/uploads/2025/03/Country-Hills-1-1240x720.jpg",
            "https://martinoutdoorproperties.com/wp-content/uploads/2025/03/Country-Hills-2-1240x720.jpg",
            "https://martinoutdoorproperties.com/wp-content/uploads/2025/03/Country-Hills-3-1240x720.jpg"
        ],
        details: {
            "Lot Size": "38.58 Acres",
            "Year Built": "2008",
            "Waterfront": "Sucker Creek",
            "Manager Unit": "1,838 SqFt"
        }
    }
};

// Initialize Map
const map = L.map('map').setView([CONFIG.target.lat, CONFIG.target.lng], 11);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map);

// Icons
const targetIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const competitorIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const directIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const landmarkIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// State
let activeRadius = null;
let currentFilter = 'all';
let competitorMarkers = [];

// Add Target Property
L.marker([CONFIG.target.lat, CONFIG.target.lng], { icon: targetIcon, zIndexOffset: 1000 })
    .addTo(map)
    .bindTooltip(`<b>${CONFIG.target.name}</b><br>$${(CONFIG.target.price / 1000000).toFixed(2)}M`, { permanent: true, direction: 'top', offset: [0, -40] })
    .on('click', () => showTargetDetails());

// Add Oregon Caves
L.marker([42.0989, -123.4056], { icon: landmarkIcon, zIndexOffset: 900 })
    .addTo(map)
    .bindTooltip(`<b>Oregon Caves National Monument</b><br>Key Attraction`, { permanent: true, direction: 'top', offset: [0, -40] })
    .bindPopup('<b>Oregon Caves National Monument</b><br>The primary demand driver for the area.');

// Radius Rings
const rings = {
    5: L.circle([CONFIG.target.lat, CONFIG.target.lng], { radius: 8046, color: '#e67e22', fill: false, weight: 1, dashArray: '5, 5' }),
    10: L.circle([CONFIG.target.lat, CONFIG.target.lng], { radius: 16093, color: '#e67e22', fill: false, weight: 1, opacity: 0.5 }),
    15: L.circle([CONFIG.target.lat, CONFIG.target.lng], { radius: 24140, color: '#e67e22', fill: false, weight: 1, opacity: 0.3 })
};

// Tourist Routes logic
let routeLayers = [];

function drawRoutes() {
    routeLayers.forEach(l => map.removeLayer(l));
    routeLayers = [];

    const hwy199 = [
        [42.44, -123.33], [42.35, -123.41], [42.27, -123.55],
        [42.1632, -123.6482], [42.05, -123.68], [41.95, -123.75]
    ];

    const route199 = L.polyline(hwy199, {
        color: '#e74c3c', weight: 6, opacity: 0.7, dashArray: '10, 10', lineCap: 'round'
    }).bindTooltip("<b>US-199 (Redwood Hwy)</b><br>Major Tourist Artery", { sticky: true });

    const hwy46_schematic = [
        [42.1632, -123.6482], [42.12, -123.65], [42.10, -123.55], [42.0989, -123.4056]
    ];

    const route46 = L.polyline(hwy46_schematic, {
        color: '#27ae60', weight: 6, opacity: 0.8, lineJoin: 'round'
    }).bindTooltip("<b>OR-46 (Caves Hwy)</b><br>Sole Route to National Monument", { sticky: true });

    routeLayers.push(route199);
    routeLayers.push(route46);
    routeLayers.forEach(l => l.addTo(map));
}

window.toggleRoutes = () => {
    const btn = document.getElementById('btn-routes');
    if (btn.classList.contains('active')) {
        routeLayers.forEach(l => map.removeLayer(l));
        btn.classList.remove('active');
    } else {
        drawRoutes();
        btn.classList.add('active');
    }
};

window.toggleRadius = (miles) => {
    if (activeRadius) map.removeLayer(activeRadius);
    if (miles > 0 && rings[miles]) {
        activeRadius = rings[miles].addTo(map);
        map.fitBounds(activeRadius.getBounds());
    }
    document.querySelectorAll('.radius-btn').forEach(b => b.classList.remove('active'));
    if (miles > 0) document.getElementById(`btn-r-${miles}`).classList.add('active');
};

window.setFilter = (type) => {
    currentFilter = type;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`btn-f-${type}`).classList.add('active');
    renderCompetitors();
};

// Image Mapping
const COMPETITOR_IMAGES = {
    "KOA Journey": "https://placehold.co/600x400/2c3e50/ffffff?text=KOA+Journey",
    "Laughing Alpaca": "https://placehold.co/600x400/2c3e50/ffffff?text=Laughing+Alpaca",
    "Ol' Jo": "https://placehold.co/600x400/2c3e50/ffffff?text=Ol'+Jo+RV",
    "Lone Mountain RV": "https://placehold.co/600x400/2c3e50/ffffff?text=Lone+Mountain",
    "Out 'n' About Treehouse Treesort": "https://placehold.co/600x400/2c3e50/ffffff?text=Treehouse",
    "Kerbyville Inn": "https://placehold.co/600x400/2c3e50/ffffff?text=Kerbyville+Inn",
    "Vertical Horizons Treehouse": "https://placehold.co/600x400/2c3e50/ffffff?text=Vertical+Horizons"
};

// Website Mapping
const COMPETITOR_WEBSITES = {
    "KOA Journey": "https://koa.com/campgrounds/cave-junction/",
    "Laughing Alpaca": "https://www.laughingalpacacampground.com/",
    "Ol' Jo": "https://www.oljorvcampground.com/",
    "Lone Mountain RV": "https://lonemountainresort.com/",
    "Out 'n' About Treehouse Treesort": "https://treehouses.com/",
    // Adding generic fallbacks or assumed structures if needed, but keeping it clean to knowns first.
};

const DIRECT_LOCATIONS = ['cave junction', 'kerby', "o'brien", 'selma'];

function renderCompetitors() {
    competitorMarkers.forEach(m => map.removeLayer(m));
    competitorMarkers = [];

    const listContainer = document.getElementById('competitor-list');
    listContainer.innerHTML = '';

    if (typeof COMPETITORS === 'undefined') return;

    let directUnits = 0;
    let ancillaryUnits = 0;
    let directCount = 0;
    let ancillaryCount = 0;

    const directList = document.createElement('div');
    directList.innerHTML = '<h3>Direct Competitors</h3>';

    const ancillaryList = document.createElement('div');
    ancillaryList.innerHTML = '<h3>Ancillary Competitors</h3>';

    let hasDirect = false;
    let hasAncillary = false;

    COMPETITORS.sort((a, b) => {
        const distA = calculateDistance(CONFIG.target.lat, CONFIG.target.lng, a.lat, a.lng);
        const distB = calculateDistance(CONFIG.target.lat, CONFIG.target.lng, b.lat, b.lng);
        return distA - distB;
    }).forEach(comp => {
        if (!comp.lat || !comp.lng) return;

        const isRV = (comp['Property Name'] + (comp['Notes'] || '')).toLowerCase().includes('rv') ||
            (comp['Location'] || '').toLowerCase().includes('camp');

        if (currentFilter === 'rv' && !isRV) return;
        if (currentFilter === 'hotel' && isRV) return;

        const loc = (comp['Location'] || '').toLowerCase();
        const isDirect = DIRECT_LOCATIONS.some(l => loc.includes(l));

        const rooms = parseInt(comp['Room Count']) || 0;
        if (isDirect) {
            directUnits += rooms;
            directCount++;
        } else {
            ancillaryUnits += rooms;
            ancillaryCount++;
        }

        // Color Logic
        const icon = isDirect ? directIcon : competitorIcon;

        const marker = L.marker([comp.lat, comp.lng], { icon: icon })
            .addTo(map)
            .bindTooltip(`
                <div style="text-align: center">
                    <b>${comp['Property Name']}</b><br>
                    ${rooms ? rooms + ' Units' : ''} 
                    ${comp['ADR'] ? '<br>ADR: $' + comp['ADR'] : ''}
                </div>
            `, { direction: 'top', offset: [0, -40] })
            .on('click', () => {
                selectProperty(comp);
                map.flyTo([comp.lat, comp.lng], 13);
                marker.openTooltip();
            });

        competitorMarkers.push(marker);

        const listItem = document.createElement('div');
        listItem.className = 'competitor-item';
        listItem.innerHTML = `
            <div class="comp-name">${comp['Property Name']}</div>
            <div class="comp-meta">
                <span>${calculateDistance(CONFIG.target.lat, CONFIG.target.lng, comp.lat, comp.lng).toFixed(1)} mi</span>
                <span>${rooms ? rooms + ' Units' : 'N/A'}</span>
            </div>
        `;
        listItem.addEventListener('click', () => {
            selectProperty(comp);
            map.flyTo([comp.lat, comp.lng], 13);
            marker.openTooltip();
        });

        if (isDirect) {
            directList.appendChild(listItem);
            hasDirect = true;
        } else {
            ancillaryList.appendChild(listItem);
            hasAncillary = true;
        }
    });

    if (hasDirect) listContainer.appendChild(directList);
    if (hasAncillary) listContainer.appendChild(ancillaryList);

    if (document.getElementById('stat-direct-units')) {
        document.getElementById('stat-direct-units').innerText = directUnits;
        document.getElementById('stat-ancillary-units').innerText = ancillaryUnits;
        document.getElementById('stat-direct-count').innerText = directCount;
        document.getElementById('stat-ancillary-count').innerText = ancillaryCount;
    }
}

function showTargetDetails() {
    const container = document.getElementById('comparison-container');
    const imagesHtml = CONFIG.target.images.map(url => `<img src="${url}" class="property-img" alt="Property Image">`).join('');
    const detailsHtml = Object.entries(CONFIG.target.details).map(([k, v]) =>
        `<div class="stat-item"><span class="label">${k}</span><span class="value">${v}</span></div>`
    ).join('');

    container.innerHTML = `
        <div class="stat-card target-property active-card">
            <div class="card-header">
                <div>
                    <h3>${CONFIG.target.name}</h3>
                    <span class="badge">Subject Property</span>
                </div>
            </div>
            
            <div class="image-gallery">${imagesHtml}</div>
            
            <p class="prop-desc">${CONFIG.target.description}</p>

            <div class="stat-grid">
                <div class="stat-item">
                    <span class="label">Ask Price</span>
                    <span class="value">$${(CONFIG.target.price).toLocaleString()}</span>
                </div>
                 ${detailsHtml}
            </div>
            
            <div class="stat-row location-row">
                <span class="label">Location</span>
                <strong>${CONFIG.target.address}</strong>
            </div>

            <a href="${CONFIG.target.url}" target="_blank" class="btn-secondary" style="display:block; text-align:center; padding: 8px; margin-top:10px;">View Listing</a>
        </div>
    `;
    container.scrollIntoView({ behavior: 'smooth' });
}

function selectProperty(data) {
    const container = document.getElementById('comparison-container');
    const adrDisplay = data['ADR'] ? `<div class="stat-item"><span class="label">ADR</span><span class="value">$${data['ADR']}</span></div>` : '';
    const notesDisplay = data['Notes'] ? `<div class="notes-section"><h4>Notes</h4><p>${data['Notes']}</p></div>` : '';

    const imageUrl = COMPETITOR_IMAGES[data['Property Name']] || null;
    const imageHtml = imageUrl ? `<div class="image-gallery"><img src="${imageUrl}" class="property-img" alt="${data['Property Name']}"></div>` : '';

    // Website Logic
    const webUrl = COMPETITOR_WEBSITES[data['Property Name']] || `https://www.google.com/search?q=${encodeURIComponent(data['Property Name'] + ' ' + data['Location'])}`;
    const webBtn = `<a href="${webUrl}" target="_blank" class="btn-secondary" style="display:block; text-align:center; padding: 8px; margin-top:10px; margin-bottom:5px;">Visit Website</a>`;

    container.innerHTML = `
        <div class="stat-card competitor-card active-card">
            <div class="card-header">
                <div>
                     <h3>${data['Property Name']}</h3>
                     <span class="badge competitor-badge">Competitor</span>
                </div>
                <button class="close-btn" onclick="showTargetDetails()">×</button>
            </div>
            
            ${imageHtml}

            <div class="stat-grid">
                <div class="stat-item">
                    <span class="label">Distance</span>
                    <span class="value">${calculateDistance(CONFIG.target.lat, CONFIG.target.lng, data.lat, data.lng).toFixed(1)} miles</span>
                </div>
                <div class="stat-item">
                    <span class="label">Units</span>
                    <span class="value">${data['Room Count'] || 'N/A'}</span>
                </div>
                ${adrDisplay}
            </div>
            
            <div class="stat-row location-row">
                <span class="label">Location</span>
                <strong>${data['Location'] || 'N/A'}</strong>
            </div>

            ${notesDisplay}
            ${webBtn}
        </div>
    `;
    container.scrollTop = 0; // Ensure top visibility
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 3959;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
function deg2rad(deg) { return deg * (Math.PI / 180); }

document.getElementById('reset-view').addEventListener('click', () => {
    map.setView([CONFIG.target.lat, CONFIG.target.lng], 11);
    showTargetDetails();
});

renderCompetitors();
showTargetDetails();
drawRoutes();
toggleRadius(10);
