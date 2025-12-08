# 🛡️ Border Safety Risk Checker

A full-stack web application for civilians in Thai border provinces to check their proximity risk to Cambodia artillery ranges (BM-21 and PHL-03).

![Risk Zones](https://img.shields.io/badge/BM--21-52km-orange)
![Risk Zones](https://img.shields.io/badge/PHL--03-130km-yellow)
![Tech](https://img.shields.io/badge/React-18-blue)
![Tech](https://img.shields.io/badge/Express-4-green)

> ⚠️ **DISCLAIMER**: This is an approximate risk model using simplified GeoJSON data. Always follow official civil defence guidance from Thai government authorities.

---

## 🎯 Features

- **Location Detection**: Auto GPS, IP-based, or manual coordinate input
- **Risk Zone Classification**:
  - 🔴 **High Danger** (<20km from border)
  - 🟠 **BM-21 Range** (≤52km) - Grad rocket launcher range
  - 🟡 **PHL-03 Range** (≤130km) - Long-range MLRS
  - 🟢 **Safe** (>130km from border)
- **Interactive Map**: Leaflet-based with province overlays and danger radii
- **Bilingual UI**: English + Thai (ไทย)
- **Emergency Panel**: Placeholder for civil defence instructions
- **REST API**: Versioned endpoints for location checking

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd border-safety-risk-checker

# Install all dependencies
npm install

# Start development server
npm run dev
```

The application will be available at:

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

---

## 📁 Project Structure

```
border-safety-risk-checker/
├── package.json              # Root config with dev scripts
├── README.md
├── Dockerfile
├── backend/
│   ├── server.js             # Express server
│   ├── riskCalculator.js     # Risk zone logic
│   ├── sendAlert.js          # Notification stub
│   ├── routes/
│   │   ├── health.js         # GET /api/health
│   │   └── v1/
│   │       ├── locate.js     # POST /api/v1/locate
│   │       └── status.js     # GET /api/v1/status
│   └── data/
│       ├── border_provinces.geojson
│       ├── border_line.geojson
│       └── subdistrict_centroids.json
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── src/
        ├── App.jsx
        ├── index.css
        ├── components/
        │   ├── LocationInput.jsx
        │   ├── RiskDisplay.jsx
        │   ├── StatusBanner.jsx
        │   └── EmergencyPanel.jsx
        ├── map/
        │   └── RiskMap.jsx
        └── pages/
            └── HomePage.jsx
```

---

## 🔧 Tech Architecture

### Backend

| Technology | Purpose                      |
| ---------- | ---------------------------- |
| Express.js | REST API server              |
| Turf.js    | Geospatial calculations      |
| Morgan     | Request logging              |
| request-ip | Client IP detection          |
| Axios      | IP geolocation service calls |

### Frontend

| Technology    | Purpose                    |
| ------------- | -------------------------- |
| React 18      | UI framework               |
| Vite          | Build tool                 |
| TailwindCSS   | Styling                    |
| Leaflet       | Interactive maps           |
| React-Leaflet | React bindings for Leaflet |

---

## 📡 API Endpoints

### Health Check

```
GET /api/health
Response: { status: "ok", timestamp: "..." }
```

### Locate & Calculate Risk

```
POST /api/v1/locate
Content-Type: application/json

# Using GPS coordinates
{ "lat": 14.5, "lon": 103.5 }

# Using IP address
{ "ip": "8.8.8.8" }

Response:
{
  "lat": 14.5,
  "lon": 103.5,
  "distance_km": 45.23,
  "zone": "bm21_range",
  "zone_info": {...},
  "province": {...}
}
```

### System Status

```
GET /api/v1/status
Response: { status: "operational", config: {...} }
```

---

## 🔄 Replacing the Geolocation Service

The default IP geolocation uses [ip-api.com](http://ip-api.com) (free tier). To replace:

1. Edit `backend/routes/v1/locate.js`
2. Modify the `resolveIpLocation()` function:

```javascript
// Example: Using ipinfo.io
async function resolveIpLocation(ip) {
  const response = await axios.get(`https://ipinfo.io/${ip}?token=YOUR_TOKEN`);
  const [lat, lon] = response.data.loc.split(",");
  return {
    success: true,
    coordinates: { lat: parseFloat(lat), lon: parseFloat(lon) },
  };
}
```

Alternative services:

- [ipinfo.io](https://ipinfo.io)
- [MaxMind GeoIP2](https://www.maxmind.com)
- [ipgeolocation.io](https://ipgeolocation.io)

---

## 🚢 Deployment

### Netlify (Frontend) + Railway (Backend)

**Frontend on Netlify:**

```bash
cd frontend
npm run build
# Deploy 'dist' folder to Netlify
```

Add `_redirects` file for SPA:

```
/*    /index.html   200
```

**Backend on Railway:**

```bash
cd backend
# Railway auto-detects Node.js and runs npm start
```

### Vercel (Full-Stack)

```bash
# vercel.json
{
  "builds": [
    { "src": "backend/server.js", "use": "@vercel/node" },
    { "src": "frontend/package.json", "use": "@vercel/static-build" }
  ]
}
```

### Docker

```bash
# Build image
docker build -t border-safety-checker .

# Run container
docker run -p 3001:3001 border-safety-checker
```

---

## 📊 Risk Model Explanation

### Artillery Systems

| System     | Origin      | Max Range | Risk Classification |
| ---------- | ----------- | --------- | ------------------- |
| BM-21 Grad | Russia/USSR | ~52 km    | 🟠 Moderate-High    |
| PHL-03     | China       | ~130 km   | 🟡 Moderate         |

### Zone Thresholds

```
Distance < 20 km  → HIGH DANGER (immediate threat)
Distance ≤ 52 km  → BM-21 RANGE
Distance ≤ 130 km → PHL-03 RANGE
Distance > 130 km → SAFE (outside known ranges)
```

### Limitations

- GeoJSON data is **simplified approximations**
- Border line is not official surveyed data
- Artillery ranges are theoretical maximums
- Does not account for terrain, weather, or actual military positions

For production use, integrate with:

- Thai Royal Survey Department geodata
- Real-time military intelligence feeds
- Official civil defence alert systems

---

## 🔐 Security Considerations

- CORS configured for specific origins
- Input validation on all coordinates
- IP resolution fallback prevents service disruption
- No PII stored on server

---

## 📜 License

MIT License - See [LICENSE](LICENSE) for details.

---

## 🆘 Emergency Contacts (Thailand)

| Service             | Number |
| ------------------- | ------ |
| Emergency           | 191    |
| Ambulance           | 1669   |
| Fire                | 199    |
| Tourist Police      | 1155   |
| Disaster Prevention | 1784   |

---

**Built for civilian safety awareness. Not affiliated with any government agency.**
