# Store Locator

## Overview

عرض فروع المتاجر على الخريطة:
- خريطة تفاعلية
- فروع المتاجر
- معلومات الاتصال
- ساعات العمل
- تحكم من الـ Dashboard

## Dashboard Control

### Feature Toggle
```
Dashboard → Settings → Features → Store Locator
├── Enable Feature: [Toggle ON/OFF]
├── Show Map: [Toggle ON/OFF]
├── Show Working Hours: [Toggle ON/OFF]
├── Show Phone Numbers: [Toggle ON/OFF]
└── Default Map Center: [Cairo ▼]
```

### Store Management
```
Dashboard → Store → Locations
├── Active Stores
│   ├── Smart Store - Cairo Festival City
│   │   ├── Address: Cairo Festival City, New Cairo
│   │   ├── Phone: 0228101234
│   │   ├── Hours: 10AM - 12AM
│   │   ├── Status: Active
│   │   └── [Edit] [Deactivate]
│   ├── Smart Store - Mall of Egypt
│   │   └── ...
│   └── ...
├── Inactive Stores
│   └── ...
└── [+ Add New Store]
```

## Features

### 1. Store Locator Page
```
┌─────────────────────────────────────────────────────────────┐
│ 📍 Find Our Stores                                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐│
│ │                                                         ││
│ │                    [Google Map]                         ││
│ │                                                         ││
│ │    📍 Store 1    📍 Store 2    📍 Store 3              ││
│ │                                                         ││
│ └─────────────────────────────────────────────────────────┘│
│                                                             │
│ Search: [Enter your location...]              [Search]      │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ 📍 Smart Store - Cairo Festival City                   ││
│ │    📏 2.5 km away                                       ││
│ │    📍 Cairo Festival City, New Cairo                    ││
│ │    📞 0228101234                                        ││
│ │    🕐 10:00 AM - 12:00 AM                              ││
│ │    [Get Directions] [Call]                              ││
│ └─────────────────────────────────────────────────────────┘│
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ 📍 Smart Store - Mall of Egypt                         ││
│ │    📏 5.2 km away                                       ││
│ │    📍 Mall of Egypt, 6th of October City                ││
│ │    📞 0238501234                                        ││
│ │    🕐 10:00 AM - 12:00 AM                              ││
│ │    [Get Directions] [Call]                              ││
│ └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### 2. Store Card
```
┌─────────────────────────────────────┐
│ 📍 Smart Store - Cairo Festival City│
│                                     │
│ 📍 Cairo Festival City              │
│    New Cairo, Cairo                 │
│                                     │
│ 📞 0228101234                       │
│                                     │
│ 🕐 Working Hours:                   │
│    Sat-Thu: 10:00 AM - 12:00 AM    │
│    Friday: 2:00 PM - 12:00 AM      │
│                                     │
│ [Get Directions] [Call Now]         │
└─────────────────────────────────────┘
```

## Database Schema

```sql
-- Stores table
CREATE TABLE stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ar VARCHAR(255) NOT NULL,
  name_en VARCHAR(255) NOT NULL,
  address_ar TEXT NOT NULL,
  address_en TEXT NOT NULL,
  governorate VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Store Working Hours table
CREATE TABLE store_working_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  day_of_week INT NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  open_time TIME NOT NULL,
  close_time TIME NOT NULL,
  is_closed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Store Holidays table
CREATE TABLE store_holidays (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  is_recurring BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## API Routes

```
GET    /api/stores                       - Get all active stores
GET    /api/stores/[id]                  - Get store details
GET    /api/stores/nearby                - Get nearby stores
GET    /api/stores/[id]/hours            - Get store hours

POST   /api/admin/stores                 - Create store
GET    /api/admin/stores                 - Get all stores
PUT    /api/admin/stores/[id]            - Update store
DELETE /api/admin/stores/[id]            - Delete store
POST   /api/admin/stores/[id]/hours      - Set working hours
POST   /api/admin/stores/[id]/holidays   - Add holiday
```

## Frontend Implementation

### Store Locator Component
```typescript
// src/components/store/StoreLocator.tsx
'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { StoreCard } from './StoreCard';

interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
  distance?: number;
}

export function StoreLocator() {
  const [stores, setStores] = useState<Store[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation([
          position.coords.latitude,
          position.coords.longitude,
        ]);
      });
    }

    // Fetch stores
    fetch('/api/stores')
      .then((res) => res.json())
      .then((data) => setStores(data.stores));
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Map */}
      <div className="flex-1 h-[500px] rounded-lg overflow-hidden">
        <MapContainer
          center={userLocation || [30.0444, 31.2357]} // Cairo default
          zoom={12}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {stores.map((store) => (
            <Marker
              key={store.id}
              position={[store.latitude, store.longitude]}
              eventHandlers={{
                click: () => setSelectedStore(store),
              }}
            >
              <Popup>{store.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Store List */}
      <div className="lg:w-96 space-y-4">
        <h2 className="text-xl font-bold">Nearby Stores</h2>
        {stores.map((store) => (
          <StoreCard
            key={store.id}
            store={store}
            isSelected={selectedStore?.id === store.id}
            onClick={() => setSelectedStore(store)}
          />
        ))}
      </div>
    </div>
  );
}
```

### Store Card Component
```typescript
// src/components/store/StoreCard.tsx
import { PhoneIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';

interface StoreCardProps {
  store: Store;
  isSelected: boolean;
  onClick: () => void;
}

export function StoreCard({ store, isSelected, onClick }: StoreCardProps) {
  return (
    <div
      className={`p-4 rounded-lg border cursor-pointer transition-all ${
        isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={onClick}
    >
      <h3 className="font-bold">{store.name}</h3>
      
      <div className="flex items-center gap-2 text-gray-600 mt-2">
        <MapPinIcon className="w-4 h-4" />
        <span className="text-sm">{store.address}</span>
      </div>
      
      <div className="flex items-center gap-2 text-gray-600 mt-1">
        <PhoneIcon className="w-4 h-4" />
        <span className="text-sm">{store.phone}</span>
      </div>
      
      <div className="flex items-center gap-2 text-gray-600 mt-1">
        <ClockIcon className="w-4 h-4" />
        <span className="text-sm">{store.workingHours}</span>
      </div>

      {store.distance && (
        <div className="mt-2 text-sm text-blue-600">
          📏 {store.distance.toFixed(1)} km away
        </div>
      )}

      <div className="flex gap-2 mt-3">
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${store.latitude},${store.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center py-2 bg-blue-500 text-white rounded-lg text-sm"
        >
          Get Directions
        </a>
        <a
          href={`tel:${store.phone}`}
          className="flex-1 text-center py-2 bg-gray-200 text-gray-800 rounded-lg text-sm"
        >
          Call Now
        </a>
      </div>
    </div>
  );
}
```

## Tasks

### Task 1: Database Setup
- [ ] Create stores table
- [ ] Create store_working_hours table
- [ ] Create store_holidays table
- [ ] Add seed data for stores

### Task 2: Dashboard Management
- [ ] Store list page
- [ ] Create/edit store form
- [ ] Working hours editor
- [ ] Holiday management

### Task 3: API Implementation
- [ ] Get stores endpoint
- [ ] Get nearby stores
- [ ] CRUD operations
- [ ] Working hours API

### Task 4: Frontend Components
- [ ] Map integration (Leaflet)
- [ ] Store locator page
- [ ] Store card component
- [ ] Working hours display

### Task 5: Location Features
- [ ] User geolocation
- [ ] Distance calculation
- [ ] Directions integration
- [ ] Mobile map view

## Notes

- Use Leaflet for free mapping (OpenStreetMap)
- Calculate distance from user location
- Show working hours in Arabic/English
- Holiday management for special hours
- Mobile-responsive map
