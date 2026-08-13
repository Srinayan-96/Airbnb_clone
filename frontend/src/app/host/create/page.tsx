"use client";

import { useEffect, useState, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

function CreateListingForm() {
  const { user, openAuthModal } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    property_type: "house",
    city: "",
    state: "",
    country: "",
    address_line: "",
    latitude: 0,
    longitude: 0,
    max_guests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    price_per_night: 1000,
    cleaning_fee: 0,
    photos: [] as { url: string; position: number }[]
  });

  useEffect(() => {
    if (user === null) {
      router.push("/");
      openAuthModal();
    }
  }, [user, router, openAuthModal]);

  useEffect(() => {
    if (editId && user) {
      // Fetch listing details if editing
      api.getListingById(editId).then(data => {
        setFormData({
          title: data.title,
          description: data.description,
          property_type: data.property_type,
          city: data.city,
          state: data.state,
          country: data.country,
          address_line: data.address_line || "",
          latitude: data.latitude,
          longitude: data.longitude,
          max_guests: data.max_guests,
          bedrooms: data.bedrooms,
          beds: data.beds,
          bathrooms: data.bathrooms,
          price_per_night: data.price_per_night,
          cleaning_fee: data.cleaning_fee,
          photos: data.photos.map(p => ({ url: p.url, position: p.position }))
        });
      }).catch(console.error);
    }
  }, [editId, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handlePhotoAdd = (url: string) => {
    if (!url) return;
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, { url, position: prev.photos.length }]
    }));
  };

  const handlePhotoRemove = (index: number) => {
    setFormData(prev => {
      const newPhotos = [...prev.photos];
      newPhotos.splice(index, 1);
      // Re-assign positions
      return {
        ...prev,
        photos: newPhotos.map((p, i) => ({ ...p, position: i }))
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editId) {
        await api.updateListing(Number(editId), formData);
        toast.success("Listing updated successfully!");
      } else {
        await api.createListing(formData);
        toast.success("Listing created successfully!");
      }
      router.push("/host");
    } catch (err) {
      console.error("Failed to save listing", err);
      toast.error("Failed to save listing");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <main className="flex-1 mx-auto w-full max-w-[800px] px-6 py-12">
      <h1 className="text-[32px] font-semibold text-ink mb-8">
        {editId ? "Edit Listing" : "Create New Listing"}
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white border border-hairline p-6 rounded-xl space-y-4">
          <h2 className="text-[20px] font-semibold text-ink">The Basics</h2>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Title</label>
            <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border border-hairline rounded-lg p-3 outline-none focus:border-black" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Description</label>
            <textarea required name="description" value={formData.description} onChange={handleChange} className="w-full border border-hairline rounded-lg p-3 outline-none focus:border-black h-32" />
          </div>
        </div>

        <div className="bg-white border border-hairline p-6 rounded-xl space-y-4">
          <h2 className="text-[20px] font-semibold text-ink">Location</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1">City</label>
              <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full border border-hairline rounded-lg p-3 outline-none focus:border-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">State</label>
              <input required type="text" name="state" value={formData.state} onChange={handleChange} className="w-full border border-hairline rounded-lg p-3 outline-none focus:border-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Country</label>
              <input required type="text" name="country" value={formData.country} onChange={handleChange} className="w-full border border-hairline rounded-lg p-3 outline-none focus:border-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Property Type</label>
              <select name="property_type" value={formData.property_type} onChange={handleChange} className="w-full border border-hairline rounded-lg p-3 outline-none focus:border-black">
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="guesthouse">Guesthouse</option>
                <option value="hotel">Hotel</option>
                <option value="experience">Experience</option>
                <option value="service">Service</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white border border-hairline p-6 rounded-xl space-y-4">
          <h2 className="text-[20px] font-semibold text-ink">Rooms and Capacity</h2>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Guests</label>
              <input required type="number" min="1" name="max_guests" value={formData.max_guests} onChange={handleChange} className="w-full border border-hairline rounded-lg p-3 outline-none focus:border-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Bedrooms</label>
              <input required type="number" min="1" name="bedrooms" value={formData.bedrooms} onChange={handleChange} className="w-full border border-hairline rounded-lg p-3 outline-none focus:border-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Beds</label>
              <input required type="number" min="1" name="beds" value={formData.beds} onChange={handleChange} className="w-full border border-hairline rounded-lg p-3 outline-none focus:border-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Baths</label>
              <input required type="number" min="0.5" step="0.5" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="w-full border border-hairline rounded-lg p-3 outline-none focus:border-black" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-hairline p-6 rounded-xl space-y-4">
          <h2 className="text-[20px] font-semibold text-ink">Pricing</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Price per night (₹)</label>
              <input required type="number" min="0" name="price_per_night" value={formData.price_per_night} onChange={handleChange} className="w-full border border-hairline rounded-lg p-3 outline-none focus:border-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Cleaning fee (₹)</label>
              <input required type="number" min="0" name="cleaning_fee" value={formData.cleaning_fee} onChange={handleChange} className="w-full border border-hairline rounded-lg p-3 outline-none focus:border-black" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-hairline p-6 rounded-xl space-y-4">
          <h2 className="text-[20px] font-semibold text-ink">Photos</h2>
          <div className="flex gap-2">
            <input type="url" id="newPhotoUrl" placeholder="https://images.unsplash.com/..." className="flex-1 border border-hairline rounded-lg p-3 outline-none focus:border-black" />
            <button type="button" onClick={() => {
              const el = document.getElementById("newPhotoUrl") as HTMLInputElement;
              handlePhotoAdd(el.value);
              el.value = "";
            }} className="px-4 bg-gray-200 rounded-lg hover:bg-gray-300 font-semibold">Add</button>
          </div>
          {formData.photos.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {formData.photos.map((photo, i) => (
                <div key={i} className="relative aspect-video rounded-lg overflow-hidden group">
                  <img src={photo.url} alt="Listing photo" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => handlePhotoRemove(i)} className="absolute top-2 right-2 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 shadow-sm text-red-500 hover:text-red-700">
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-[#E61E4D] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#D70466] transition disabled:opacity-50"
        >
          {loading ? "Saving..." : (editId ? "Update Listing" : "Publish Listing")}
        </button>
      </form>
    </main>
  );
}

export default function CreateListingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar activeTab="All" setActiveTab={() => {}} />
      <Suspense fallback={<div className="flex h-[50vh] items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-ink"></div></div>}>
        <CreateListingForm />
      </Suspense>
      <Footer />
    </div>
  );
}
