export interface Wonder {
  name: string;
  location: string;
  coordinates: [number, number];
  description: string;
}

export interface TourPackage {
  id: string;
  title: string;
  wonderName: string;
  duration: string;
  price: number;
  currency: string;
  inclusions: string[];
  description: string;
  imageUrl: string;
  ratings: number;
  reviewCount: number;
  featured: boolean;
  departureLocations: string[];
  availableDates: string[];
}