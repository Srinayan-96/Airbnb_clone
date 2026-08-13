export interface Destination {
  id: string;
  name: string;
  subtitle: string;
  iconType: 'nearby' | 'pin' | 'tree' | 'beach' | 'mountain';
}

export const suggestedDestinations: Destination[] = [
  { id: '1', name: 'Nearby', subtitle: "Find what's around you", iconType: 'nearby' },
  { id: '2', name: 'Chandigarh', subtitle: 'Near you', iconType: 'tree' },
  { id: '3', name: 'Zirakpur, Punjab', subtitle: 'A hidden gem', iconType: 'pin' },
  { id: '4', name: 'Kasauli, Himachal Pradesh', subtitle: 'For nature lovers', iconType: 'mountain' },
  { id: '5', name: 'Kharar, Punjab', subtitle: 'Near you', iconType: 'tree' },
  { id: '6', name: 'North Goa, Goa', subtitle: 'Popular beach destination', iconType: 'beach' },
  { id: '7', name: 'Dehradun, Uttarakhand', subtitle: 'For nature lovers', iconType: 'mountain' },
  { id: '8', name: 'Shimla, Himachal Pradesh', subtitle: 'Mountain retreat', iconType: 'mountain' },
  { id: '9', name: 'Jaipur, Rajasthan', subtitle: 'Cultural heritage', iconType: 'pin' },
  { id: '10', name: 'Manali, Himachal Pradesh', subtitle: 'Adventure awaits', iconType: 'mountain' },
];

export interface Listing {
  id: string;
  title: string;
  subtitle: string;
  details?: string;
  dates?: string;
  price: string;
  priceLabel?: string;
  rating: number;
  reviewCount?: number;
  imageUrl?: string;
  images?: string[];
  badge?: 'Guest favourite' | 'Original' | 'Popular' | 'Superhost';
  isGuestFavorite?: boolean;
  lat?: number;
  lng?: number;
}

const pool1 = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop'
];

const pool2 = [
  'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format&fit=crop'
];

const pool3 = [
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1502672260266-1c1cd2cb442c?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop'
];

const pool4 = [
  'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1516483638261-f40af5a5efa6?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&auto=format&fit=crop'
];

const pool5 = [
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop'
];

const pool6 = [
  'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&auto=format&fit=crop'
];

const pool7 = [
  'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop'
];

export const listingsChandigarh: Listing[] = [
  {
    id: 'c1',
    title: 'Home in Chandigarh',
    subtitle: 'The Loft | Self Check-in | 1BHK | The Eastern Park',
    dates: '18–23 Aug',
    price: '₹20,998',
    priceLabel: ' for 2 nights',
    rating: 4.95,
    images: pool1,
    badge: 'Guest favourite',
    lat: 30.9010,
    lng: 75.8573
  },
  {
    id: 'c2',
    title: 'Home in Chandigarh',
    subtitle: 'Auranest Stays - Stay with Aura, Stay with comfort',
    dates: '14–19 Aug',
    price: '₹8,840',
    priceLabel: ' for 2 nights',
    rating: 4.89,
    images: pool2,
    badge: 'Guest favourite',
    lat: 30.9050,
    lng: 75.8600
  },
  {
    id: 'c3',
    title: 'Home in Sector 22B',
    subtitle: 'Luxury living in the heart of the city',
    dates: '20–25 Aug',
    price: '₹17,635',
    priceLabel: ' for 2 nights',
    rating: 5.0,
    images: pool3,
    badge: 'Guest favourite',
    lat: 30.8950,
    lng: 75.8500
  },
  {
    id: 'c4',
    title: 'Home in Chandigarh',
    subtitle: 'Cozy private room with a lovely garden',
    dates: '10–12 Aug',
    price: '₹11,742',
    priceLabel: ' for 2 nights',
    rating: 4.95,
    images: pool4,
    badge: 'Guest favourite',
    lat: 30.9100,
    lng: 75.8550
  },
  {
    id: 'c5',
    title: 'Apartment in Chandigarh',
    subtitle: 'Spacious apartment near the market',
    dates: '5–10 Sep',
    price: '₹14,000',
    priceLabel: ' for 2 nights',
    rating: 4.92,
    images: pool5,
    badge: 'Guest favourite',
    lat: 30.8900,
    lng: 75.8650
  },
  {
    id: 'c6',
    title: 'Villa in Chandigarh',
    subtitle: 'Luxury villa with private pool',
    dates: '15–20 Sep',
    price: '₹11,949',
    priceLabel: ' for 2 nights',
    rating: 5.0,
    images: pool6,
    badge: 'Guest favourite',
    lat: 30.8850,
    lng: 75.8450
  },
  {
    id: 'c7',
    title: 'Farm stay in Chandigarh',
    subtitle: 'Peaceful getaway from the city',
    dates: '1–5 Oct',
    price: '₹14,200',
    priceLabel: ' for 2 nights',
    rating: 4.98,
    images: pool7,
    badge: 'Guest favourite',
    lat: 30.9200,
    lng: 75.8700
  }
];

export const airbnbOriginals: Listing[] = [
  { id: 'e1', title: 'Carve marble with a third-generation sculptor', subtitle: 'Athens, Greece', price: 'From ₹6,609 / guest', rating: 5.0, imageUrl: 'https://images.unsplash.com/photo-1516483638261-f40af5a5efa6?q=80&w=600&auto=format&fit=crop', badge: 'Original' },
  { id: 'e2', title: 'Art Walking Tour in San Miguel de Allende', subtitle: 'San Miguel de Allende, Mexico', price: 'From ₹3,744 / guest', rating: 4.98, imageUrl: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=600&auto=format&fit=crop', badge: 'Original' },
  { id: 'e5', title: 'Sky Garden Early Access Ticket with Pastry & Drink', subtitle: 'Greater London, United Kingdom', price: 'From ₹1,667 / guest', rating: 4.9, imageUrl: 'https://images.unsplash.com/photo-1522083111810-7e9c56f2e245?q=80&w=600&auto=format&fit=crop', badge: 'Original' },
  { id: 'e3', title: 'Savor Premium Matcha in a tea ceremony in Shibuya', subtitle: 'Shibuya, Japan', price: 'From ₹3,595 / guest', rating: 5.0, imageUrl: 'https://images.unsplash.com/photo-1542044896530-05d85be9b11a?q=80&w=600&auto=format&fit=crop', badge: 'Original' },
  { id: 'e6', title: 'Learn pot painting with natural cochinilla dye', subtitle: 'Los Angeles, United States', price: 'From ₹4,767 / guest', rating: 4.98, imageUrl: 'https://images.unsplash.com/photo-1461360228754-6e81c478b882?q=80&w=600&auto=format&fit=crop', badge: 'Original' },
  { id: 'e7', title: 'Discover Melbourne\'s acclaimed coffee culture', subtitle: 'West Melbourne, Australia', price: 'From ₹5,725 / guest', rating: 5.0, imageUrl: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&auto=format&fit=crop', badge: 'Original' },
  { id: 'e8', title: 'Learn mahjong and sip tea in Brooklyn', subtitle: 'Brooklyn, United States', price: 'From ₹5,721 / guest', rating: 5.0, imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=600&auto=format&fit=crop', badge: 'Original' },
  { id: 'e4', title: 'Kayak to Hudson-Athens lighthouse at golden hour', subtitle: 'Athens, United States', price: 'From ₹8,588 / guest', rating: 5.0, imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=600&auto=format&fit=crop', badge: 'Original' }
];

export const experiencesInCity: Listing[] = [
  { id: 'ec1', title: 'The Hipster Chandigarh Architecture Experience', subtitle: 'From ₹3,299 / guest', price: 'From ₹3,299 / guest', rating: 4.98, imageUrl: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=600&auto=format&fit=crop' },
  { id: 'ec2', title: 'Stories from British Shimla - A Heritage Walk', subtitle: 'From ₹1,650 / guest', price: 'From ₹1,650 / guest', rating: 4.9, imageUrl: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?q=80&w=600&auto=format&fit=crop' },
  { id: 'ec3', title: 'Hands-On Eco Printing Workshop in Chandigarh', subtitle: 'From ₹4,000 / guest', price: 'From ₹4,000 / guest', rating: 5.0, imageUrl: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=600&auto=format&fit=crop' },
  { id: 'ec4', title: 'Explore Shimla\'s heritage and find hidden gems', subtitle: 'From ₹1,490 / guest', price: 'From ₹1,490 / guest', rating: 4.8, imageUrl: 'https://images.unsplash.com/photo-1506869640319-baa1f2983ba3?q=80&w=600&auto=format&fit=crop' },
  { id: 'ec5', title: 'Uncover Shimla\'s colonial past with a historian', subtitle: 'From ₹2,000 / guest', price: 'From ₹2,000 / guest', rating: 4.95, imageUrl: 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?q=80&w=600&auto=format&fit=crop' },
  { id: 'ec6', title: 'Spineline Trail', subtitle: 'From ₹3,500 / guest', price: 'From ₹3,500 / guest', rating: 4.7, imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=600&auto=format&fit=crop' },
  { id: 'ec7', title: 'Explore Shimla\'s heritage', subtitle: 'From ₹2,800 / guest', price: 'From ₹2,800 / guest', rating: 4.85, imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop' },
  { id: 'ec8', title: 'Mountain biking through the pines', subtitle: 'From ₹1,200 / guest', price: 'From ₹1,200 / guest', rating: 4.6, imageUrl: 'https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?q=80&w=600&auto=format&fit=crop' }
];

export const servicesGurgaon: Listing[] = [
  { id: 's1', title: 'New Delhi photo session by a Female Photographer', subtitle: 'From ₹8,500 / guest', price: 'From ₹8,500 / guest', rating: 5.0, imageUrl: 'https://images.unsplash.com/photo-1516972238977-8ea873db23cc?q=80&w=600&auto=format&fit=crop', badge: 'Popular' },
  { id: 's2', title: 'Intimate raw aesthetic photos in Delhi by bugzy', subtitle: 'From ₹5,000 / group', price: 'From ₹5,000 / group', rating: 5.0, imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop' },
  { id: 's3', title: 'Makeup artistry by Sukoon', subtitle: 'From ₹2,000 / guest', price: 'From ₹2,000 / guest', rating: 5.0, imageUrl: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=600&auto=format&fit=crop' },
  { id: 's4', title: 'Taj Mahal portraits by Sameer', subtitle: 'From ₹5,700 / guest', price: 'From ₹5,700 / guest', rating: 5.0, imageUrl: 'https://images.unsplash.com/photo-1509305717900-84f40e786d82?q=80&w=600&auto=format&fit=crop' },
  { id: 's5', title: 'Professional Headshots in Cyber Hub', subtitle: 'From ₹4,500 / guest', price: 'From ₹4,500 / guest', rating: 4.9, imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop' },
  { id: 's6', title: 'Personal Shopping Assistant in Delhi', subtitle: 'From ₹3,000 / guest', price: 'From ₹3,000 / guest', rating: 4.8, imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop' },
  { id: 's7', title: 'Private Yoga Session at Home', subtitle: 'From ₹1,500 / guest', price: 'From ₹1,500 / guest', rating: 5.0, imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop' },
  { id: 's8', title: 'Styling consultation by Ritu', subtitle: 'From ₹2,500 / guest', price: 'From ₹2,500 / guest', rating: 4.7, imageUrl: 'https://images.unsplash.com/photo-1485230405346-71acb9518d9c?q=80&w=600&auto=format&fit=crop' }
];

export const servicesDehradun: Listing[] = [
  { id: 'sd1', title: 'Occasion ready looks by Happy', subtitle: 'From ₹4,000 / guest', price: 'From ₹4,000 / guest', rating: 5.0, imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600&auto=format&fit=crop' },
  { id: 'sd2', title: 'Editorial love stories by Rishab', subtitle: 'From ₹9,000 / guest', price: 'From ₹9,000 / guest', rating: 5.0, imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop' },
  { id: 'sd3', title: 'Bridal and party looks by Nirmala', subtitle: 'From ₹2,500 / guest', price: 'From ₹2,500 / guest', rating: 5.0, imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=600&auto=format&fit=crop' },
  { id: 'sd4', title: 'Fashion and event portraits by Ashish', subtitle: 'From ₹2,800 / guest', price: 'From ₹2,800 / guest', rating: 4.8, imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop' },
  { id: 'sd5', title: 'Candid Wedding Photography', subtitle: 'From ₹15,000 / day', price: 'From ₹15,000 / day', rating: 5.0, imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop' },
  { id: 'sd6', title: 'Mountain Trail Guided Hike & Photos', subtitle: 'From ₹3,500 / guest', price: 'From ₹3,500 / guest', rating: 4.9, imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=600&auto=format&fit=crop' },
  { id: 'sd7', title: 'Organic Cooking Masterclass', subtitle: 'From ₹2,000 / guest', price: 'From ₹2,000 / guest', rating: 4.95, imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600&auto=format&fit=crop' },
  { id: 'sd8', title: 'Local artisan craft tour', subtitle: 'From ₹1,800 / guest', price: 'From ₹1,800 / guest', rating: 4.8, imageUrl: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=600&auto=format&fit=crop' }
];

export interface InspirationItem {
  id: string;
  city: string;
  category: string;
}

export const inspirationData: InspirationItem[] = [
  { id: 'i1', city: 'Galveston', category: 'Cottage rentals' },
  { id: 'i2', city: 'Broken Bow', category: 'House rentals' },
  { id: 'i3', city: 'Savannah', category: 'Cottage rentals' },
  { id: 'i4', city: 'Manhattan', category: 'Holiday rentals' },
  { id: 'i5', city: 'Kansas City', category: 'Monthly rentals' },
  { id: 'i6', city: 'Charlotte', category: 'Apartment rentals' },
];

export const serviceCategories = [
  { id: 'cat1', name: 'Photography', subtitle: 'Capture your moments' },
  { id: 'cat2', name: 'Makeup & Beauty', subtitle: 'Get ready for your event' },
  { id: 'cat3', name: 'Wellness & Fitness', subtitle: 'Stay active and relaxed' },
  { id: 'cat4', name: 'Local Guides', subtitle: 'Explore the city with a pro' }
];

export interface Review {
  id: string;
  author: string;
  avatar: string;
  tenure: string;
  rating: number;
  date: string;
  content: string;
}

export interface DetailedListing extends Listing {
  location: string;
  host: {
    name: string;
    avatar: string;
    isSuperhost: boolean;
    monthsHosting: number;
    school: string;
    work: string;
    bio: string;
    responseRate: string;
    responseTime: string;
  };
  coHosts: { name: string; avatar: string }[];
  description?: string;
  amenities: string[];
  reviews: Review[];
  ratingBreakdown: {
    cleanliness: number;
    accuracy: number;
    checkIn: number;
    communication: number;
    location: number;
    value: number;
  };
  stats: {
    reviews: number;
    rating: number;
  };
  maxGuests?: number;
  bedrooms?: number;
  beds?: number;
  baths?: number;
  cleaningFee?: number;
  serviceFee?: number;
}

export const atelierResidence: DetailedListing = {
  id: 'atelier-residence',
  title: 'The Atelier Residence | Luxury Living in Sector 19',
  subtitle: 'Entire home in Chandigarh, India',
  details: '4 guests · 2 bedrooms · 4 beds · 2.5 bathrooms',
  dates: '14 Aug 2026 - 16 Aug 2026',
  price: '₹20,998',
  priceLabel: ' for 2 nights',
  rating: 4.95,
  reviewCount: 19,
  badge: 'Guest favourite',
  isGuestFavorite: true,
  lat: 30.7300,
  lng: 76.7900,
  location: 'Chandigarh, India',
  images: [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop'
  ],
  host: {
    name: 'Nidhi',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop',
    isSuperhost: true,
    monthsHosting: 5,
    school: 'Chandigarh, India',
    work: 'Curating spaces !',
    bio: 'I love thoughtfully designed spaces and the little details that elevate everyday living. My home reflects a modern-vintage aesthetic with comfort at its core. Hosting for me is about creating an experience—not just offering a place to stay.',
    responseRate: '100%',
    responseTime: 'Responds within an hour'
  },
  coHosts: [
    { name: 'Sanya', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop' }
  ],
  description: "Designer-curated luxury 2BHK in Sector 19, one of Chandigarh's most sought-after neighbourhoods. Located on the second floor with lift access and a rare private porch entry, this home offers both privacy and convenience.\n\nFeatures a spacious living area with plush seating, curated décor, indoor plants, and a massage chair. Two well-appointed bedrooms with premium bedding and work desks make it ideal for families, workcations, and longer stays.\n\nThe modern kitchen is fully equipped for all your culinary needs, and the en-suite bathrooms feature luxury fixtures. Step out onto the private balcony to enjoy your morning coffee with a view of the quiet, tree-lined street.",
  amenities: ['Wifi', 'Air conditioning', 'Kitchen', 'Free parking on premises', 'TV', 'Washing machine', 'Dedicated workspace', 'Balcony'],
  ratingBreakdown: {
    cleanliness: 5.0,
    accuracy: 5.0,
    checkIn: 4.9,
    communication: 4.8,
    location: 5.0,
    value: 4.8
  },
  stats: {
    reviews: 19,
    rating: 4.95
  },
  reviews: [
    {
      id: 'r1',
      author: 'Mannan',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop',
      tenure: 'New to Airbnb',
      rating: 5,
      date: '2 days ago',
      content: "One of the best stays I've ever had! Nidhi's homestay was comfortable, welcoming, and had everything I needed for a great experience. Nidhi is incredibly friendly, kind, and helpfu…"
    },
    {
      id: 'r2',
      author: 'Anurag',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop',
      tenure: '2 years on Airbnb',
      rating: 5,
      date: '1 week ago',
      content: "We had a wonderful stay at this Airbnb. The property was clean, well-maintained, and exactly as described. It was comfortable, peaceful, and had all the amenities we needed.…"
    },
    {
      id: 'r3',
      author: 'Arzu',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop',
      tenure: '9 years on Airbnb',
      rating: 5,
      date: '2 weeks ago',
      content: "Absolutely stunning property! The attention to detail in the decor is unmatched. The massage chair was a huge plus after a long day of exploring. We will definitely be coming back!"
    },
    {
      id: 'r4',
      author: 'Diya',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop',
      tenure: '7 years on Airbnb',
      rating: 4,
      date: 'July 2026',
      content: "Great location and very responsive host. The porch is a lovely spot to hang out in the evenings. The only minor issue was the Wi-Fi speed, but everything else was perfect."
    },
    {
      id: 'r5',
      author: 'Rahul',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop',
      tenure: '1 year on Airbnb',
      rating: 5,
      date: 'June 2026',
      content: "Nidhi was extremely accommodating for our late check-in. The space is massive and feels very premium. Sector 19 is super central too."
    },
    {
      id: 'r6',
      author: 'Neha',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop',
      tenure: '4 years on Airbnb',
      rating: 5,
      date: 'June 2026',
      content: "Spotless cleanliness and great amenities. Having a dedicated workspace made it very easy to get some remote work done during our stay."
    }
  ]
};

export function getDetailedListing(id: string): DetailedListing {
  const allListings = [
    ...listingsChandigarh,
    ...airbnbOriginals,
    ...experiencesInCity,
    ...servicesGurgaon,
    ...servicesDehradun
  ];
  
  const hosts = [
    { name: 'Nidhi', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop' },
    { name: 'Rahul', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop' },
    { name: 'Priya', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop' },
    { name: 'Amit', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop' },
    { name: 'Sneha', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop' },
    { name: 'Vikram', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop' },
    { name: 'Anjali', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop' }
  ];

  const found = allListings.find(l => l.id === id);
  if (found) {
    const baseImages: string[] = found.images || (found.imageUrl ? [found.imageUrl] : (atelierResidence.images ?? []));
    
    let fallbackPool: string[] = atelierResidence.images ?? [];
    if (found.id.startsWith('e') || found.id.startsWith('ec')) {
      fallbackPool = [
        'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800&auto=format&fit=crop', // Tour/Event
        'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=800&auto=format&fit=crop', // Outdoors/Activity
        'https://images.unsplash.com/photo-1506869640319-baa1f2983ba3?q=80&w=800&auto=format&fit=crop', // Heritage/City
        'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=800&auto=format&fit=crop', // Cultural
        'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop'  // Party/Group
      ];
    } else if (found.id.startsWith('s') || found.id.startsWith('sd')) {
      fallbackPool = [
        'https://images.unsplash.com/photo-1516972238977-8ea873db23cc?q=80&w=800&auto=format&fit=crop', // Services/Camera
        'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop', // Makeup/Brushes
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop', // Event/Stage
        'https://images.unsplash.com/photo-1509305717900-84f40e786d82?q=80&w=800&auto=format&fit=crop', // Photoshoot
        'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop'  // Portrait
      ];
    }

    // Filter out duplicates (if the base image is already in the fallback pool)
    const uniqueFallbacks = fallbackPool.filter(url => !baseImages.includes(url));
    const paddedImages = [...baseImages, ...uniqueFallbacks].slice(0, 5);
    
    // Pick a deterministic host based on the length or character code of the ID
    const hostIndex = Array.from(found.id).reduce((acc, char) => acc + char.charCodeAt(0), 0) % hosts.length;
    const selectedHost = hosts[hostIndex];

    return {
      ...atelierResidence,
      id: found.id,
      title: found.title,
      price: found.price,
      priceLabel: found.priceLabel || '',
      rating: found.rating || atelierResidence.rating,
      images: paddedImages,
      subtitle: found.subtitle || atelierResidence.subtitle,
      badge: found.badge || undefined,
      isGuestFavorite: found.badge?.toLowerCase().includes('favourite'),
      lat: found.lat || atelierResidence.lat,
      lng: found.lng || atelierResidence.lng,
      host: {
        ...atelierResidence.host,
        name: selectedHost.name,
        avatar: selectedHost.avatar
      },
      stats: {
        reviews: found.reviewCount || 19,
        rating: found.rating || atelierResidence.rating
      }
    };
  }
  return atelierResidence; // fallback
}
