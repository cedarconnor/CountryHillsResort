const COMPETITORS = [
  {
    "Property Name": "KOA Journey",
    "Location": "Cave Junction",
    "Room Count": 66,
    "ADR": "50-85",
    "Notes": "Brand new in 2024-15 tent sites, 1 glamping tent.  No amenities developed yet.  Barren parking lot vibe",
    "lat": 42.1633443,
    "lng": -123.6479309,
    "isApprox": true
  },
  {
    "Property Name": "Laughing Alpaca",
    "Location": "Cave Junction",
    "Room Count": 50,
    "ADR": "35-50",
    "Notes": "primarily long term rv stays-only 5 short term sites available",
    "lat": 42.1633443,
    "lng": -123.6479309,
    "isApprox": true
  },
  {
    "Property Name": "Ol' Jo",
    "Location": "Cave Junction",
    "Room Count": 68,
    "ADR": "35-45",
    "Notes": "Primarily long term rv stays-no online booking",
    "lat": 42.173554,
    "lng": -123.6615072
  },
  {
    "Property Name": "Shady Acres",
    "Location": "Cave Junction",
    "Room Count": 41,
    "ADR": 35,
    "Notes": "No tents, 10 amp hook ups only, 10 pull through. 2024 reviews are very bad",
    "lat": 42.1633443,
    "lng": -123.6479309,
    "isApprox": true
  },
  {
    "Property Name": "Grayback Campground",
    "Location": "Cave Junction",
    "Room Count": "39 tent sites",
    "ADR": 15,
    "Notes": "primitive campground run by forest service, does allow RV but no hook ups",
    "lat": 42.1633443,
    "lng": -123.6479309,
    "isApprox": true
  },
  {
    "Property Name": "Lone Mountain RV",
    "Location": "O'Brien",
    "Room Count": 38,
    "ADR": "20-150",
    "Notes": "tents 20, rv 53, cabins 150-this is a direct competitor for what we are trying to set up",
    "lat": 42.0664321,
    "lng": -123.7220194
  },
  {
    "Property Name": "Little Falls Campground",
    "Location": "Selma",
    "Room Count": "3 tent sites",
    "ADR": 10,
    "Notes": "primitive campsite run by forest service",
    "lat": 42.2790023,
    "lng": -123.615901,
    "isApprox": true
  },
  {
    "Property Name": "Resort at Lake Selmac",
    "Location": "Selma",
    "Room Count": 33,
    "ADR": "49-79",
    "Notes": "CLOSED-2 cabins, 3 tipis, 28 rv sites-caters to fishing demographic",
    "lat": 42.2790023,
    "lng": -123.615901,
    "isApprox": true
  },
  {
    "Property Name": "Lake Selma's Josephine County Park",
    "Location": "Selma",
    "Room Count": 6,
    "ADR": 0,
    "Notes": "tent camping run by forest service-6 primitive sites-no reservation no fee",
    "lat": 42.2790023,
    "lng": -123.615901,
    "isApprox": true
  },
  {
    "Property Name": "Cedar Bloom",
    "Location": "Cave Junction",
    "Room Count": 46,
    "ADR": "50-177",
    "Notes": "Tent sites are $50, a frames and domes are $133-177-REVIEWS ARE MIXED ON HIPCAMP-looks very rustic, no electricity to most sites and communal bathrooms.  Advertises ev charging but doesn't actually have the capacity",
    "lat": 42.1633443,
    "lng": -123.6479309,
    "isApprox": true
  },
  {
    "Property Name": "Redwood Highway Campground",
    "Location": "Grants Pass",
    "Room Count": "???",
    "ADR": "???",
    "Notes": "CLOSED",
    "lat": 42.4393707,
    "lng": -123.3272489,
    "isApprox": true
  },
  {
    "Property Name": "Jack's Landing",
    "Location": "Grants Pass",
    "Room Count": 11,
    "ADR": 62,
    "Notes": "minimal website, no online booking.  Reviews show older park but nice staff",
    "lat": 42.4614167,
    "lng": -123.3177225
  },
  {
    "Property Name": "Out 'n' About Treehouse Treesort",
    "Location": "Cave Junction, OR",
    "Room Count": 16,
    "ADR": "108-270",
    "lat": 42.1633443,
    "lng": -123.6479309,
    "isApprox": true
  },
  {
    "Property Name": "Holiday Motel",
    "Location": "Kerby, OR",
    "Room Count": 11,
    "ADR": "???",
    "Notes": "no website and very hard to find information",
    "lat": 42.1943549,
    "lng": -123.6499857,
    "isApprox": true
  },
  {
    "Property Name": "Kerbyville Inn",
    "Location": "Kerby",
    "Room Count": 5,
    "ADR": "137+",
    "Notes": "bed and breakfast-meant to be \"romantic\"",
    "lat": 42.1947685,
    "lng": -123.6506778
  },
  {
    "Property Name": "Vertical Horizons Treehouse",
    "Location": "Cave Junction",
    "Room Count": 4,
    "ADR": "279-379",
    "Notes": "no pets-two night minimum stay",
    "lat": 42.1633443,
    "lng": -123.6479309,
    "isApprox": true
  },
  {
    "Property Name": "Oregon Caves Chateau (Closed for renovation)",
    "Location": "Cave Junction, OR",
    "Room Count": 23,
    "Notes": "no information on scheduled rates or reopening date",
    "lat": 42.1633443,
    "lng": -123.6479309,
    "isApprox": true
  },
  {
    "Property Name": "Riverside Inn",
    "Location": "Grants Pass, OR",
    "Room Count": 63,
    "ADR": "100-160",
    "lat": 42.4393707,
    "lng": -123.3272489,
    "isApprox": true
  },
  {
    "Property Name": "The Lodge at Riverside",
    "Location": "Grants Pass, OR",
    "Room Count": 33,
    "ADR": "100-400",
    "lat": 42.4393707,
    "lng": -123.3272489,
    "isApprox": true
  },
  {
    "Property Name": "Weasku Inn",
    "Location": "Grants Pass, OR",
    "Room Count": 18,
    "ADR": "150-350",
    "Notes": "5 lodge rooms, 11 cabins, house.  Total occupancy for property is 50 guests-full buyout is 4000-6000/night and has a 2 night minimum",
    "lat": 42.4393707,
    "lng": -123.3272489,
    "isApprox": true
  },
  {
    "Property Name": "Best Western Grants Pass Inn",
    "Location": "Grants Pass, OR",
    "Room Count": 84,
    "ADR": "94-110",
    "Notes": "exact number of rooms is estimated",
    "lat": 42.4372579,
    "lng": -123.2969714
  },
  {
    "Property Name": "Red Lion Inn & Suites",
    "Location": "Grants Pass, OR",
    "Room Count": 70,
    "ADR": "67+",
    "lat": 42.4601934,
    "lng": -123.3238561
  },
  {
    "Property Name": "Super 8 by Wyndham",
    "Location": "Grants Pass, OR",
    "Room Count": 80,
    "ADR": "60-100",
    "lat": 42.4393707,
    "lng": -123.3272489,
    "isApprox": true
  },
  {
    "Property Name": "Motel 6",
    "Location": "Grants Pass, OR",
    "Room Count": 122,
    "ADR": "50+",
    "Notes": "kids and pets free, seasonal heated pool",
    "lat": 42.4589425,
    "lng": -123.3217027
  },
  {
    "Property Name": "La Quinta Inn & Suites",
    "Location": "Grants Pass, OR",
    "Room Count": 59,
    "ADR": "90-130",
    "lat": 42.4620806,
    "lng": -123.3192005
  },
  {
    "Property Name": "Best Western Inn at the Rogue",
    "Location": "Rogue River, OR",
    "Room Count": 54,
    "ADR": "94-216",
    "Notes": "has cabins, casitas, and cottages",
    "lat": 42.4309777,
    "lng": -123.333258,
    "isApprox": true
  },
  {
    "Property Name": "Travelodge by Wyndham",
    "Location": "Grants Pass, OR",
    "Room Count": 61,
    "ADR": "52-74",
    "lat": 42.4393707,
    "lng": -123.3272489,
    "isApprox": true
  },
  {
    "Property Name": "Knight's Inn Motel",
    "Location": "Grants Pass, OR",
    "Room Count": 30,
    "ADR": "75-90",
    "lat": 42.4393707,
    "lng": -123.3272489,
    "isApprox": true
  },
  {
    "Property Name": "Rogue River Resort",
    "Location": "Grants Pass, OR",
    "Room Count": 7,
    "ADR": "100-300",
    "Notes": "difficult to get accurate infomation from google",
    "lat": 42.4393707,
    "lng": -123.3272489,
    "isApprox": true
  },
  {
    "Property Name": "Motel del Rogue",
    "Location": "Grants Pass, OR",
    "Room Count": 15,
    "ADR": "119-225",
    "Notes": "beautiful spot and run down rooms",
    "lat": 42.4393707,
    "lng": -123.3272489,
    "isApprox": true
  },
  {
    "Property Name": "Redwood Garden Inn",
    "Location": "Grants Pass",
    "Room Count": 8,
    "ADR": "100-200",
    "Notes": "difficult to find accurate property info ",
    "lat": 42.4393707,
    "lng": -123.3272489,
    "isApprox": true
  },
  {
    "Property Name": "Sweet Breeze Inn",
    "Location": "Grants Pass",
    "Room Count": 21,
    "ADR": "50+",
    "lat": 42.4567863,
    "lng": -123.3221033
  }
];