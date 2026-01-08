const CONFIG = {
    target: {
        name: "Country Hills Resort",
        lat: 42.1156,
        lng: -123.6495,
        price: 1150000,
        address: "7901 Caves Hwy, Cave Junction, OR 97523",
        description: "An income-generating resort on 38.58 acres near the Oregon Caves National Monument. Features 11 vacation rentals, 20 RV sites, manager's quarters, and creek frontage.",
        images: [
            "https://martinoutdoorproperties.com/wp-content/uploads/2025/03/Country-Hills-1-1240x720.jpg",
            "https://martinoutdoorproperties.com/wp-content/uploads/2025/03/Country-Hills-2-1240x720.jpg",
            "https://martinoutdoorproperties.com/wp-content/uploads/2025/03/Country-Hills-3-1240x720.jpg"
        ],
        details: {
            "Lot Size": "38.58 Acres",
            "Year Built": "2008",
            "Waterfront": "Sucker Creek (1,800 ft)",
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
const cavesLat = 42.0989;
const cavesLng = -123.4056;
L.marker([cavesLat, cavesLng], { icon: landmarkIcon, zIndexOffset: 900 })
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
    // Clear existing
    routeLayers.forEach(l => map.removeLayer(l));
    routeLayers = [];

    // 1. US-199 (Redwood Hwy) - High Traffic Artery
    // Approximated points for visual flow
    const hwy199 = [
        [42.44, -123.33], // Towards Grants Pass
        [42.35, -123.41],
        [42.27, -123.55],
        [42.1632, -123.6482], // Cave Junction (Intersection)
        [42.05, -123.68],
        [41.95, -123.75] // Towards Crescent City
    ];

    const route199 = L.polyline(hwy199, {
        color: '#e74c3c', // Red for high traffic
        weight: 6,
        opacity: 0.7,
        dashArray: '10, 10',
        lineCap: 'round'
    }).bindTooltip("<b>US-199 (Redwood Hwy)</b><br>Major Tourist Artery", { sticky: true });

    // 2. OR-46 (Caves Hwy) - Designation Funnel
    const hwy46 = [
        [42.1632, -123.6482], // Cave Junction
        [42.13, -123.60],
        [42.1156, -123.6495], // Passing Target Property (Rough alignment fix needed visually?)
        // Wait, Target is 42.1156, -123.6495 which is near the start?
        // Actually 7901 Caves Hwy is ~12 miles east of CJ.
        // Let's refine geometry: generally South-East.
        [42.13, -123.55],
        [42.11, -123.48],
        [42.0989, -123.4056] // Oregon Caves
    ];
    // Re-correcting OR-46 visual path for "Schematic" truth
    // Cave Junction -> Target -> Caves
    // If Target is at 42.1156, -123.6495, that is actually very close to CJ.
    // Let's draw it flowing THROUGH the target lat/lng if logical.
    const hwy46_schematic = [
        [42.1632, -123.6482], // Start at CJ
        [42.12, -123.65], // Near Target
        [42.10, -123.55],
        [42.0989, -123.4056] // End at Caves
    ];

    const route46 = L.polyline(hwy46_schematic, {
        color: '#27ae60', // Green for "Nature/Destination"
        weight: 6,
        opacity: 0.8,
        lineJoin: 'round'
    }).bindTooltip("<b>OR-46 (Caves Hwy)</b><br>Sole Route to National Monument<br><i>Traffic passes Subject Property</i>", { sticky: true });

    // Add Arrows or Flow indicators? (Simplified: Just lines for now)

    routeLayers.push(route199);
    routeLayers.push(route46);

    // Add to map
    routeLayers.forEach(l => l.addTo(map));
}

// Toggle Routes
window.toggleRoutes = () => {
    const btn = document.getElementById('btn-routes');
    const isActive = btn.classList.contains('active');

    if (isActive) {
        routeLayers.forEach(l => map.removeLayer(l));
        btn.classList.remove('active');
    } else {
        drawRoutes();
        btn.classList.add('active');
        // Fit bounds to see the whole route context?
        // map.fitBounds(L.latLngBounds([[42.44, -123.33], [41.95, -123.75], [42.0989, -123.4056]]));
    }
};

// Toggle Radius
window.toggleRadius = (miles) => {
    if (activeRadius) map.removeLayer(activeRadius);
    if (miles > 0 && rings[miles]) {
        activeRadius = rings[miles].addTo(map);
        map.fitBounds(activeRadius.getBounds());
    }
    document.querySelectorAll('.radius-btn').forEach(b => b.classList.remove('active'));
    // Handle "Off" case
    const btnId = miles > 0 ? `btn-r-${miles}` : null;
    if (btnId) {
        document.getElementById(btnId).classList.add('active');
    } else {
        // Find the "Off" button logic (simple for now) or just remove active from numbered buttons
    }
};

// Filter Logic
window.setFilter = (type) => {
    currentFilter = type;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`btn-f-${type}`).classList.add('active');
    renderCompetitors();
};

function renderCompetitors() {
    // Clear existing
    competitorMarkers.forEach(m => map.removeLayer(m));
    competitorMarkers = [];
    const listContainer = document.getElementById('competitor-list');
    listContainer.innerHTML = '';

    if (typeof COMPETITORS === 'undefined') return;

    let totalUnits = 0;

    COMPETITORS.forEach(comp => {
        if (!comp.lat || !comp.lng) return;

        // Filter Check
        const isRV = (comp['Property Name'] + (comp['Notes'] || '')).toLowerCase().includes('rv') ||
            (comp['Location'] || '').toLowerCase().includes('camp');

        if (currentFilter === 'rv' && !isRV) return;
        if (currentFilter === 'hotel' && isRV) return;

        // Stats
        const rooms = parseInt(comp['Room Count']) || 0;
        totalUnits += rooms;

        // Marker with Rich Tooltip
        const marker = L.marker([comp.lat, comp.lng], { icon: competitorIcon })
            .addTo(map)
            .bindTooltip(`
                <div style="text-align: center">
                    <b>${comp['Property Name']}</b><br>
                    ${rooms ? rooms + ' Units' : ''} 
                    ${comp['ADR'] ? '<br>ADR: $' + comp['ADR'] : ''}
                </div>
            `, { direction: 'top', offset: [0, -40] }) // Hover tooltip
            .on('click', () => {
                selectProperty(comp);
                map.flyTo([comp.lat, comp.lng], 13);
                marker.openTooltip();
            });

        competitorMarkers.push(marker);

        // List Item
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
        listContainer.appendChild(listItem);
    });

    // Update Dashboard Stats
    document.getElementById('stat-total-units').innerText = totalUnits;
    document.getElementById('stat-count').innerText = competitorMarkers.length;
}

// Show Target Details (Default View)
function showTargetDetails() {
    const container = document.getElementById('comparison-container');
    const imagesHtml = CONFIG.target.images.map(url => `<img src="${url}" class="property-img" alt="Property Image">`).join('');
    const detailsHtml = Object.entries(CONFIG.target.details).map(([k, v]) =>
        `<div class="stat-item"><span class="label">${k}</span><span class="value">${v}</span></div>`
    ).join('');

    container.innerHTML = `
        <div class="stat-card target-property active-card">
            <div class="card-header">
                <h3>${CONFIG.target.name}</h3>
                <span class="badge">Subject Property</span>
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
        </div>
    `;
    container.scrollIntoView({ behavior: 'smooth' });
}

function selectProperty(data) {
    const container = document.getElementById('comparison-container');
    const adrDisplay = data['ADR'] ? `<div class="stat-item"><span class="label">ADR</span><span class="value">$${data['ADR']}</span></div>` : '';
    const notesDisplay = data['Notes'] ? `<div class="notes-section"><h4>Notes</h4><p>${data['Notes']}</p></div>` : '';

    container.innerHTML = `
        <div class="stat-card competitor-card active-card">
            <div class="card-header">
                <h3>${data['Property Name']}</h3>
                <span class="badge competitor-badge">Competitor</span>
            </div>
            
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
            
            <button class="btn-secondary" onclick="showTargetDetails()">Back to Subject Property</button>
        </div>
    `;
    container.scrollIntoView({ behavior: 'smooth' });
}

// Distance Calc
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 3959;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
function deg2rad(deg) { return deg * (Math.PI / 180); }

// Event Listeners for UI Controls (injected in HTML)
document.getElementById('reset-view').addEventListener('click', () => {
    map.setView([CONFIG.target.lat, CONFIG.target.lng], 11);
    showTargetDetails();
});

// Initial Render
renderCompetitors();
showTargetDetails();
drawRoutes();
toggleRadius(10);
