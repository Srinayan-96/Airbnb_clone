// src/lib/api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// API Types
export interface User {
  id: number;
  email: string;
  full_name: string;
  role: 'guest' | 'host' | 'both';
  is_superhost: boolean;
  avatar_url?: string;
}

export interface ListingCard {
  id: number;
  host_id: number;
  title: string;
  property_type: string;
  city: string;
  state: string;
  country: string;
  price_per_night: number;
  is_guest_favourite: boolean;
  rating: number;
  review_count: number;
  cover_photo_url?: string;
  latitude?: number;
  longitude?: number;
}

export interface Photo {
  id: number;
  url: string;
  position: number;
}

export interface Amenity {
  id: number;
  name: string;
  category: string;
  icon: string;
}

export interface HostInfo {
  id: number;
  full_name: string;
  avatar_url?: string;
  is_superhost: boolean;
  bio?: string;
  created_at: string;
}

export interface ListingDetail {
  id: number;
  title: string;
  description: string;
  property_type: string;
  city: string;
  state: string;
  country: string;
  address_line?: string;
  latitude: number;
  longitude: number;
  max_guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  price_per_night: number;
  cleaning_fee: number;
  service_fee_percent: number;
  tax_percent: number;
  cancellation_policy: string;
  house_rules: string;
  safety_info?: string;
  is_guest_favourite: boolean;
  status: string;
  host: HostInfo;
  photos: Photo[];
  amenities: Amenity[];
  rating: {
    overall: number;
    cleanliness: number;
    accuracy: number;
    checkin: number;
    communication: number;
    location: number;
    value: number;
  };
  review_count: number;
}

export interface BookingResponse {
  id: number;
  listing_id: number;
  guest_id: number;
  check_in: string;
  check_out: string;
  num_guests: number;
  total_price: number;
  status: string;
  is_upcoming: boolean;
  is_past: boolean;
  listing?: ListingCard;
}

// Fetch Wrapper
async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
    cache: 'no-store',
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    let errorMessage = `API error: ${response.status}`;
    if (typeof error.detail === 'string') {
      errorMessage = error.detail;
    } else if (error.detail && typeof error.detail.detail === 'string') {
      errorMessage = error.detail.detail;
    } else if (error.detail) {
      errorMessage = JSON.stringify(error.detail);
    }
    throw new Error(errorMessage);
  }
  
  return response.json();
}

// API Methods
export const api = {
  // Auth
  login: async (email: string, password: string = "password123") => {
    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);
    
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    return response.json(); // { access_token, token_type, user }
  },
  
  getMe: () => fetchWithAuth('/auth/me'),
  
  // Listings
  getListings: (params?: Record<string, string>) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return fetchWithAuth(`/listings${qs}`);
  },
  
  getListingById: (id: string | number): Promise<ListingDetail> => fetchWithAuth(`/listings/${id}`),
  
  // Bookings
  createBooking: (data: { listing_id: number; check_in: string; check_out: string; num_guests: number }) => {
    return fetchWithAuth('/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },
  
  getMyTrips: () => fetchWithAuth('/bookings/me'),

  // Wishlist
  getWishlist: () => fetchWithAuth('/wishlist'),
  
  addToWishlist: (listing_id: number) => {
    return fetchWithAuth(`/wishlist/${listing_id}`, {
      method: 'POST',
    });
  },
  
  removeFromWishlist: (listing_id: number) => {
    return fetchWithAuth(`/wishlist/${listing_id}`, {
      method: 'DELETE',
    });
  },

  // Host Dashboard
  getHostListings: () => fetchWithAuth('/host/listings'),
  
  createListing: (data: any) => {
    return fetchWithAuth('/host/listings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },
  
  updateListing: (id: number, data: any) => {
    return fetchWithAuth(`/host/listings/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },
  
  deleteListing: (id: number) => {
    return fetchWithAuth(`/host/listings/${id}`, {
      method: 'DELETE',
    });
  },

  getHostListingBookings: (id: number) => {
    return fetchWithAuth(`/host/listings/${id}/bookings`);
  }
};
