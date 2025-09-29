export type THost = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type TLocationCoordinates = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type TCity = {
  name: string;
  location: TLocationCoordinates;
}

export type TSingleOffer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: TCity;
  location: TLocationCoordinates;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: THost;
  images: string[];
  maxAdults: number;
}

export type TOffer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: TCity;
  location: TLocationCoordinates;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}

export type TOffers = TOffer[];
