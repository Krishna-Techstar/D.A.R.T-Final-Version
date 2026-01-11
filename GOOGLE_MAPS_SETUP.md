# Google Maps Integration Setup Guide

## Steps to Integrate Google Maps

### 1. Get Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - **Maps JavaScript API**
   - **Places API** (optional, for search functionality)
   - **Geocoding API** (optional, for address conversion)

4. Create credentials:
   - Go to "Credentials" in the sidebar
   - Click "Create Credentials" > "API Key"
   - Copy your API key

### 2. Configure API Key Restrictions (Recommended)

For security, restrict your API key:

1. Click on your API key to edit it
2. Under "Application restrictions":
   - Select "HTTP referrers (web sites)"
   - Add your domains:
     - `localhost:3000/*` (for development)
     - `yourdomain.com/*` (for production)

3. Under "API restrictions":
   - Select "Restrict key"
   - Select only the APIs you need:
     - Maps JavaScript API
     - Places API (if used)
     - Geocoding API (if used)

### 3. Add API Key to Your Project

Create a `.env.local` file in the root of your project (same level as `package.json`):

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-api-key-here
```

**Important:**
- The variable name must start with `NEXT_PUBLIC_` to be accessible in the browser
- Never commit `.env.local` to git (it should already be in `.gitignore`)
- Restart your Next.js dev server after adding the key

### 4. Verify Setup

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the Map page (`/map`)
3. You should see Google Maps instead of the placeholder grid
4. All sensor locations should appear as markers on the map

### 5. Billing Setup (Important)

Google Maps requires a billing account:

1. Go to Google Cloud Console
2. Navigate to "Billing"
3. Link a billing account to your project
4. **Note:** Google provides $200 free credit per month, which covers most small to medium usage

## Cost Estimation

- Maps JavaScript API: $7 per 1000 map loads
- With $200 free credit, you can load ~28,000 maps per month for free
- For a small application, this is usually sufficient

## Alternative: Use Static Placeholder Map

If you don't want to set up Google Maps:
- The application will work with the current placeholder map
- All location markers will still function
- Coordinates are accurately positioned for Navi Mumbai area

## Troubleshooting

### Map Not Loading
- Check browser console for errors
- Verify API key is correct in `.env.local`
- Ensure API key restrictions allow your domain
- Check that Maps JavaScript API is enabled

### Markers Not Showing
- Verify locations array has valid lat/lng coordinates
- Check browser console for JavaScript errors

### API Key Errors
- Ensure variable name is exactly `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- Restart dev server after adding the key
- Clear browser cache

## Current Implementation

The Google Maps component (`components/google-map.jsx`) is already created and ready to use. It will:
- Automatically detect if API key is configured
- Fall back to placeholder map if no key is found
- Display all Navi Mumbai sensor locations as markers
- Show info windows with AQI data when markers are clicked
- Support both light and dark theme map styles

## Navi Mumbai Locations Configured

The following locations are already set up with coordinates:
- Kharghar Sector 12 (19.0312, 73.0656)
- MIDC Mahape (19.1178, 73.0189)
- MIDC Taloja (19.0956, 73.0934)
- Belapur CBD (19.0162, 73.0423)
- Seawoods Darave (19.0198, 73.0556)
- Nerul Sector 19 (19.0423, 73.0823)
- Juinagar (19.0589, 73.0523)
- Sanpada (19.0723, 73.0223)
- Vashi Sector 17 (19.0812, 72.9989)
- Kharghar Station (19.0278, 73.0612)

All locations will appear on the map once Google Maps API key is configured!
